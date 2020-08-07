import { useContext, useEffect, useState } from "react";
import FormGroup from "~/components/layout/AuthModal/FormGroup";
import Label from "~/components/Form/Label";
import Input from "~/components/layout/AuthModal/Input";
import withAuth from "~/components/withAuth";
import InvalidFeedback from "~/components/Form/InvalidFeedback"
import { HAS_WINDOW } from "~/constants/constants";
import useScript from "@charlietango/use-script";
import Select from "~/components/Select/Select";
import Button from "~/components/button";
import MaskedInput from 'react-text-mask'
import UserContext from "~/contexts/UserContext";
import Router from "next/router";
import { ThemeContext } from "styled-components";
import Color from "color";

const Payment = ({
                   layoutProps,
                   userData,
                   package_id,
                   packages,
                   api,
                   requireds
                 }) => {

  const theme = useContext(ThemeContext)
  const primaryColor = Color(theme.colors.primary).hsl().string()

  const [ready, status] = useScript('https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js')


  let selectedPackage = null
  if (packages && package_id) {
    selectedPackage = packages.items.find(i => i.id == package_id)
    console.log(selectedPackage)
  }

  const { user } = useContext(UserContext)
  const [error, setError] = useState({
    errors: {}
  })

  const [values, setValues] = useState({
    package_id: '',
    paymentMethodId: null,
    payment_os: null,
    cash_paymentMethodId: null,
    terms: null,
    discount_id: null,
    cardNumber: null,
    cardHolderName: null,
    cardExpirationDate: null,
    cardSecurityCode: null,
    paymentMethodCode: null,
    docType: "CPF",
    docNumber: null,
  })

  const [cardImg, setCardImg] = useState(null);
  const [creditCard, setCreditCard] = useState(null);

  const [loading, setLoading] = useState();

  const businessUnitPublicKey = 'TEST-7205c1be-9805-4308-bf00-6557c5b56b88'
  const [isMercadoPagoReady, setIsMercadoPagoReady] = useState(false)
  const MercadoPago = ready && HAS_WINDOW ? window.Mercadopago : null

  const credit_card_id = 1
  const debit_card_id = 2
  const isCardPayment = [credit_card_id, debit_card_id].includes(values.paymentMethodId)


  const [payMethods, setPayMethods] = useState([]);

  useEffect(_ => {
    if (MercadoPago) {
      MercadoPago.setPublishableKey(businessUnitPublicKey)
      setIsMercadoPagoReady(true)
      setPayMethods(MercadoPago.getPaymentMethods());
    }
  }, [MercadoPago])


  /* handle payment method change */
  function onPaymentChange(e) {
    setValues({
      ...values,
      paymentMethodId: parseInt(e.target.value, 10),
      cash_paymentMethodId: null,
    })
  }

  function onCashPaymentMethodChange(e) {
    setValues({
      ...values,
      cash_paymentMethodId: parseInt(e.target.value, 10),
    })
  }

  const handleInputChange = e => {
    const { checked, name, value, type } = e.target
    setValues({
      ...values,
      [name]: type === 'checkbox' ?
        (checked ? (value === 'true' ? true : value) : false) :
        value,
    })
  }

  const handleInputChangeCreditCardNumber = e => {

    const { name, value } = e.target


    setValues({
      ...values,
      [name]: value,
    })

    let cardnumber = value;

    if (cardnumber.length >= 6) {
      let bin = cardnumber.substring(0, 6);

      MercadoPago.getPaymentMethod({
        "bin": bin
      }, (status, details) => {
        if (details.length > 0) {
          setCardImg(details[0].secure_thumbnail);
          setCreditCard(details[0]);
          setValues({
            ...values,
            ['paymentMethodCode']: details[0].id,
            ['cardNumber']: cardnumber
          })

        }
      });

    }
  }

  // payment methods
  const [paymentMethods, setPaymentMethods] = useState()

  // get payment methods
  useEffect(_ => {
    const getPaymentMethods = async _ => {
      const { data } = await api.get('payment-methods')
      setPaymentMethods(data)
    }
    getPaymentMethods()
  }, [])

  // cash payment methods
  const [cashPaymentMethods, setCashPaymentMethods] = useState()

  // get cash payment methods
  useEffect(_ => {
    const getCashPaymentMethods = async _ => {
      const { data } = await api.get('cash-payment-methods')
      setCashPaymentMethods(data)
    }
    getCashPaymentMethods()
  }, [])

  let payMethodsHtml = () => {
    {
      payMethods && payMethods.map((m, key) => {
        return <div className="col-6 col-md">
          { m.id }
        </div>
      })
    }
  }


  const submitCredit = async e => {

    e.preventDefault();

    setLoading(true);

    let expirationMonth = values.cardExpirationDate.split('/')[0];
    let expirationYear = values.cardExpirationDate.split('/')[1];

    MercadoPago.createToken({
      cardNumber: values.cardNumber,
      cardholderName: values.cardHolderName,
      cardExpirationMonth: expirationMonth,
      cardExpirationYear: expirationYear,
      securityCode: values.cardSecurityCode,
      docType: values.docType,
      docNumber: values.docNumber,
      email: user.email
    }, async (statusCode, response) => {

      let token = "";

      if (response && response.cause && response.cause.length > 0) {
        let errors = [];
        for (let error of response.cause) {
          if (error.code === "E301") {
            errors["cardNumber"] = "Há algo de errado com esse número. Digite novamente."
          }
          if (error.code === "E302") {
            errors["cardSecurityCode"] = "Confira o código de segurança."
          }
          if (error.code === "316") {
            error["cardHolderName"] = "Por favor, digite um nome válido."
          }
          if (error.code === "324") {
            errors["docType"] = "Confira seu documento.";
          }
          if (error.code === "325" || error.code === "326") {
            errors["cardExpirationDate"] = "Confira a data.";
          }
        }
        setError({
          errors: errors
        });
      }


      try {

        token = response.id;

        const res = await api.post(`register/subscribe`, {
          package_id: package_id,
          payment_method_id: values.paymentMethodId,
          payment_method_code: values.paymentMethodCode,
          token: token
        })

        Router.push({
          pathname: '/register/confirm',
          query: {
            // download_link: order.download_link,
            // link: order.link,
          },
        }, '/register/confirm')

        // handleSubmit(1)

      } catch (error) {

        if (error.response) {
          const { data, status } = error.response
          if (status === 422) {
            setError(data)
          }
        } else if (error.request) {
          setError(error)
        } else {
          setError(error)
        }

      } finally {
        setLoading(false)
      }


      setLoading(false);

    });


    // const data = { ...values, payment_os: paymentData }
    //

  }

  return (
    <div className="register-confirm container text-center">

      <h2 className="card-title"><span className={ "text-primary" }>¡</span>Sé parte de <strong
        className="text-primary">NACIONAL</strong>PLAY<span className={ "text-primary" }>!</span></h2>
      <div className={ "card-subtitle" }>
        ¡Antes de seguir, queremos saber más de ti!
      </div>
      <h3 className="h3">Pago</h3>

      <div className="row">

        <div className="col-md-6 paymentMethod">
          <div className="row">
            <div className="row w-100">
              <div className="col-12">
                <FormGroup>
                  <Label htmlFor="paymentMethodId" style="margin: 0;">Pague com</Label>
                  <Select
                    id="paymentMethodId"
                    name="paymentMethodId"
                    required={ requireds }
                    onChange={ onPaymentChange }
                    value={ values.paymentMethodId }
                  >
                    <option value="0">Selecione</option>
                    { paymentMethods && paymentMethods.map((paymentMethod, key) => (
                      <option
                        key={ paymentMethod.id }
                        state={ values.paymentMethodId }
                        value={ paymentMethod.id }
                      >
                        { paymentMethod.name }
                      </option>
                    )) }
                  </Select>
                  <InvalidFeedback error={ error } loading={ loading } name="paymentMethodId"/>
                </FormGroup>
              </div>
            </div>
            { values.paymentMethodId == 1 && (
              <div className="row">
                <div className="col-12">
                  <FormGroup>
                    <Label htmlFor="cardHolderName">Nombre impreso en tarjeta</Label>
                    <Input id="cardHolderName" name="cardHolderName" required={ requireds } type="text"
                           onChange={ handleInputChange }/>
                  </FormGroup>
                </div>
                <div className="col-12">
                  <FormGroup>
                    <Label htmlFor="cardNumber">Nro Cartão</Label>
                    <img src={ cardImg } className="creditCardBrand"/>
                    <MaskedInput
                      mask={ [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/] }
                      guide={ false }
                      className={ "form-control" }
                      onChange={ handleInputChangeCreditCardNumber }
                      id="cardNumber" name="cardNumber"
                    />
                    <InvalidFeedback error={ error } loading={ loading } name="cardNumber"/>
                  </FormGroup>
                </div>
                <div className="col-12">
                  <FormGroup>
                    <Label htmlFor="docNumber">Documento</Label>
                    <Input
                      className={ "form-control" }
                      onChange={ handleInputChange }
                      id="docNumber" name="docNumber"
                      maxLength={ 20 }
                    />
                    <InvalidFeedback error={ error } loading={ loading } name="docNumber"/>
                  </FormGroup>
                </div>
                <div className="col-6">
                  <FormGroup>
                    <Label htmlFor="card-duedate">Dt Vencimento</Label>
                    <MaskedInput
                      mask={ [/\d/, /\d/, '/', /\d/, /\d/,] }
                      guide={ false }
                      className={ "form-control" }
                      placeholder={ "MM/AA" }
                      name={ "cardExpirationDate" }
                      onChange={ handleInputChange }
                    />
                    <InvalidFeedback error={ error } loading={ loading } name="cardExpirationDate"/>
                  </FormGroup>
                </div>
                <div className="col-6">
                  <FormGroup>
                    <Label htmlFor="card-cvv">CVV</Label>
                    <MaskedInput
                      mask={ [/\d/, /\d/, /\d/] }
                      guide={ false }
                      className={ "form-control" }
                      name={ "cardSecurityCode" }
                      onChange={ handleInputChange }
                      placeholder={ "***" }
                    />
                    <InvalidFeedback error={ error } loading={ loading } name="cardSecurityCode"/>
                  </FormGroup>
                </div>
                <div className="col-12">
                  <Button block color="secondary" type="button" disabled={ loading }
                          loading={ loading } onClick={ submitCredit }>Pagar</Button>
                </div>
              </div>
            ) }

            { values.paymentMethodId == 3 && (
              <div className={ "row" }>
                <div className="col-12">
                  <Button block color="secondary" type="button" disabled={ loading }
                          loading={ loading } onClick={ submitCredit }>Gerar Boleto</Button>
                </div>
              </div>
            ) }

          </div>
        </div>

        <div className="col-md-6">
          <div className="product-summary">
            <div className="product-image">
              <img src="https://place-hold.it/280x125" alt=""/>
            </div>
            <div className={ "product-name-group" }>
              <h6>
                Você está comprando:
              </h6>
              <p className={ "product-name" }>
                Assinatura LaU Play - <strong>{ selectedPackage.name }</strong> recorrente
              </p>
            </div>
            <div className={ "price-breakdown" }>
              <div className="checkout-total">
                <h6>
                  Total
                </h6>
                <p className={ "price" }>
                  $ { selectedPackage.amount }
                </p>
              </div>
            </div>
          </div>
          <div className={ "row pay-methods" }>
            { payMethods && payMethods.map((m, key) => {
              return <div className={ "col-3 text-center" }>
                <img src={ m.thumbnail } alt=""/>
              </div>
            }) }
          </div>
        </div>
      </div>
      <style jsx>{ `
        
        h2.card-title {
          font-weight: normal;
          color: #000;
          margin-bottom: 1em;
          font-size: 1.7em;
        }
        div.card-subtitle {
          font-size: 1.1em;
          font-weight: 500;
          margin-bottom: 2.5em;
        }
        
        .text-primary {
           color: ${ primaryColor } !important;
        }
        .register-confirm {
          padding-top: 50px;
          padding-bottom: 50px;
          color: #666666;
        }
        
      ` }</style>
    </div>

  )
}

export default withAuth(Payment, true);
