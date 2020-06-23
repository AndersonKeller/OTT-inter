import { useEffect, useState } from "react";
import FormGroup from "~/components/layout/AuthModal/FormGroup";
import Label from "~/components/layout/AuthModal/Label";
import Input from "~/components/layout/AuthModal/Input";
import InputRadio from "~/components/Form/InputRadio";
import withAuth from "~/components/withAuth";
import InvalidFeedback from "~/components/Form/InvalidFeedback"
import { HAS_WINDOW } from "~/constants/constants";
import useScript from "@charlietango/use-script";
import Select from "~/components/Select/Select";

const Payment = ({
                   layoutProps,
                   api,
                   error,
                   requireds
                 }) => {

  const [ready, status] = useScript('https://js.paymentsos.com/v2/latest/secure-fields.min.js')

  const [values, setValues] = useState({
    package_id: '',
    payment_method_id: null,
    payment_os: null,
    cash_payment_method_id: null,
    terms: null,
    discount_id: null,
  })

  const [loading, setLoading] = useState();

  const payUEnv = 'test'
  const businessUnitPublicKey = '88985036-6530-4b5a-a7ec-c4e07ec07f6c'
  const [isPayUReady, setIsPayUReady] = useState(false)
  const POS = ready && HAS_WINDOW ? window.POS : null
  const credit_card_id = 1
  const debit_card_id = 2
  const isCardPayment = [credit_card_id, debit_card_id].includes(values.payment_method_id)


  const POSStyle = {
    base: {
      borderRadius: '.15rem',
      backgroundColor: 'white',
      height: 'calc(1.5em + .75rem + 2px)',
      fontSize: '12px',
      padding: '0px 3px',
      marginLeft: '5px',
      cardImage: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        margin: 0,
      },
      pan: {
        width: '160px',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        marginLeft: 0,
      },
      expirationDate: { width: '47px' },
      secureFields: { left: '40px' },
      cvv: { width: '35px' }
    }
  }


  useEffect(_ => {
    if (POS) {
      POS.setPublicKey(businessUnitPublicKey)
      POS.setEnvironment(payUEnv)
      POS.setStyle(POSStyle)
      POS.setCardNumberPlaceholder('Tarjeta de crédito')
      POS.setExpirationDatePlaceholder('MM/AA');
      setIsPayUReady(true)
    }
  }, [POS])


  /* handle payment method change */
  function onPaymentChange(e) {
    setValues({
      ...values,
      payment_method_id: parseInt(e.target.value, 10),
      cash_payment_method_id: null,
    })
  }

  function onCashPaymentMethodChange(e) {
    setValues({
      ...values,
      cash_payment_method_id: parseInt(e.target.value, 10),
    })
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

  // init card secure fields
  useEffect(_ => {
    if (isPayUReady && isCardPayment) {
      POS.initSecureFields('card-secure-fields')
    }
  }, [isPayUReady, isCardPayment])

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


  return (
    <div className="row">
      <div className="offset-md-2 col-md-8">

        <h3 className="h3">Pago</h3>

        <div className="row">

          <div className="col-md-6">
            <FormGroup>
              <Select
                id="gender_id"
                name="gender_id"
                required={ requireds }
                onChange={ handleInputChange }
                value={ values.gender_id }
              >
                <option disabled value="">Incapaz de cargar géneros</option>
              </Select>
              <InvalidFeedback error={ error } loading={ loading } name="gender_id"/>
            </FormGroup>
            <FormGroup>
              { paymentMethods && paymentMethods.map((paymentMethod, key) => (
                <InputRadio
                  key={ key }
                  label={ paymentMethod.name }
                  name="payment"
                  onChange={ onPaymentChange }
                  state={ values.payment_method_id }
                  value={ paymentMethod.id }
                />
              )) }
              {/*{ validationError && (*/ }
              {/*  <div className="invalid-feedback">{ validationError }</div>*/ }
              {/*) }*/ }
            </FormGroup>
          </div>

          <div className="col-md-6">

            {/* credit / debit card */ }
            { isCardPayment ? (
              <div className="card-inputs">

                {/* mandatory data */ }
                <FormGroup>
                  <Label htmlFor="cardholder-name">Nombre impreso en tarjeta</Label>
                  <Input id="cardholder-name" name="cardholder-name" required={ requireds } type="text"/>
                </FormGroup>

                {/* card fields */ }
                <FormGroup>
                  <div id="card-secure-fields"/>
                  <InvalidFeedback error={ error } loading={ loading } name="payment_os"/>
                </FormGroup>

              </div>

              // cash payment methods
            ) : values.payment_method_id === 3 && (
              <FormGroup>
                { cashPaymentMethods == null ? (
                  <p>Cargando...</p>
                ) : cashPaymentMethods.length ? cashPaymentMethods.map((item, key) => (
                  <InputRadio
                    key={ key }
                    label={ item.name }
                    name="cash_payment_method_id"
                    onChange={ onCashPaymentMethodChange }
                    state={ values.cash_payment_method_id }
                    value={ item.id }
                  />
                )) : (
                  <p>Sin método de pago configurado.</p>
                ) }
                <InvalidFeedback error={ error } loading={ loading } name="cash_payment_method_id"/>
              </FormGroup>
            ) }
          </div>
        </div>

      </div>
      <style jsx>{ `
        @media (min-width: 768px) {
          .card-inputs {
            margin-top: -21px;
          }
        }
      ` }</style>
    </div>
  )
}

export default withAuth(Payment, true);
