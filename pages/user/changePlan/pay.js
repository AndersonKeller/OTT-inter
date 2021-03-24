import { useContext, useEffect, useState } from 'react'
import { useRouter, withRouter } from 'next/router'
import Router from 'next/router'
import api from '../../../services/api'
import NameProject from "~/components/NameProject";
import FormGroup from "~/components/layout/AuthModal/FormGroup";
import Label from "~/components/Form/Label";
import Input from "~/components/layout/AuthModal/Input";
import Select from "~/components/Select/Select";
import { IS_PRODUCTION } from '~/constants/constants'
import InvalidFeedback from "~/components/Form/InvalidFeedback";
import UserContext from "~/contexts/UserContext";
import { ThemeContext } from "styled-components";
import Button from "~/components/button";
import MaskedInput from "react-text-mask";
import Color from "color";
import { HAS_WINDOW } from "~/constants/constants";
import useScript from "@charlietango/use-script";
import CardLogoHeader from '~/components/CardLogoHeader/index'
import { toast } from "react-toastify";

const pay = withRouter(({ packages, handleSubmit, }) => {

  const router = useRouter()
  const {
    query: { package_id, required },
  } = router

  const requireds = IS_PRODUCTION

  const [values, setValues] = useState({
    package_id: "",
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
    docType: "RUT",
    docNumber: null
  });

  const [ready, status] = useScript(
    "https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"
  );


  const theme = useContext(ThemeContext);
  const primaryColor = Color(theme.colors.primary)
  const [cardImg, setCardImg] = useState(null);
  const MercadoPago = ready && HAS_WINDOW ? window.Mercadopago : null
  const businessUnitPublicKey = 'APP_USR-fe20d55f-f7d1-49e0-855b-4d5c147ddd0b'
  // const businessUnitPublicKey = "TEST-5121749c-2a58-4b7d-b98c-9b9932a3a4cc";


  const [isMercadoPagoReady, setIsMercadoPagoReady] = useState(false)
  const [payMethods, setPayMethods] = useState();
  const [creditCard, setCreditCard] = useState(null);
  // // get packages

  let selectedPackage = null;
  if (packages && package_id) {
    selectedPackage = packages.items.find(i => i.id == package_id);
  }


  const { user } = useContext(UserContext);
  const [error, setError] = useState({
    errors: {}
  });



  useEffect(
    _ => {
      if (MercadoPago) {
        MercadoPago.setPublishableKey(businessUnitPublicKey);
        setIsMercadoPagoReady(true);
        setPayMethods(MercadoPago.getPaymentMethods());
      }
    },
    [MercadoPago]
  );

  const [loading, setLoading] = useState();


  // --------payment methods-----------
  const handleInputChange = e => {
    const { checked, name, value, type } = e.target;
    setValues({
      ...values,
      [name]:
        type === "checkbox"
          ? checked
            ? value === "true"
              ? true
              : value
            : false
          : value
    });
  };

  const handleInputChangeCreditCardNumber = e => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    });

    let cardnumber = value;

    if (cardnumber.length >= 6) {
      let bin = cardnumber.substring(0, 6);

      MercadoPago.getPaymentMethod(
        {
          bin: bin
        },
        (status, details) => {
          if (details.length > 0) {
            setCardImg(details[0].secure_thumbnail);
            setCreditCard(details[0]);
            setValues({
              ...values,
              ["paymentMethodCode"]: details[0].id,
              ["cardNumber"]: cardnumber
            });
          }
        }
      );
    }
  };
  const [paymentMethods, setPaymentMethods] = useState();

  // get payment methods
  useEffect(_ => {
    const getPaymentMethods = async _ => {
      const { data } = await api().get("payment-methods");

      const tempList = [];
      tempList.push(data[0]);
      setPaymentMethods(tempList);
    };
    getPaymentMethods();
  }, []);


  /* handle payment method change */
  function onPaymentChange(e) {
    setValues({
      ...values,
      paymentMethodId: parseInt(e.target.value, 10),
      cash_paymentMethodId: null
    });
  }

  const submitCredit = async e => {
    e.preventDefault();

    setLoading(true);
    let expirationMonth = "";
    let expirationYear = "";

    if (values.cardExpirationDate) {
      expirationMonth = values.cardExpirationDate.split("/")[0];
      expirationYear = values.cardExpirationDate.split("/")[1];
    }

    switch (values.paymentMethodId) {
      case 1:
      case 2:
        MercadoPago.createToken(
          {
            cardNumber: values.cardNumber,
            cardholderName: values.cardHolderName,
            cardExpirationMonth: expirationMonth,
            cardExpirationYear: expirationYear,
            securityCode: values.cardSecurityCode,
            docType: values.docType,
            docNumber: values.docNumber,
            email: user.email
          },

          async (statusCode, response) => {

            let token = "";
            if (response && response.cause && response.cause.length > 0) {
              let errors = [];
              for (let error of response.cause) {
                if (error.code === "E301") {
                  console.log('ERROR', error)
                  errors["cardNumber"] =
                    "Hay un error con ese número. Digita nuevamente.";
                }
                if (error.code === "E302") {
                  errors["cardSecurityCode"] = "Ingresa el código de seguridad o CVV.";
                }
                if (error.code === "316") {
                  error["cardHolderName"] = "Por favor ingresa un nombre válido.";
                }
                if (error.code === "324") {
                  errors["docType"] = "Confirma tu documento.";
                }
                if (error.code === "325" || error.code === "326") {
                  errors["cardExpirationDate"] = "Ingresa una fecha.";
                }
              }
              setError({
                errors: errors
              });
            }


            try {
              token = response.id;

              const res = await api().post(`register/subscribe`, {
                package_id: package_id,
                payment_method_id: values.paymentMethodId,
                payment_method_code: values.paymentMethodCode,
                token: token
              });

              // handleSubmit(4, null);
              Router.push('/user/changePlan/done');

            } catch (error) {

              if (error.response) {
                const { data, status } = error.response;

                MercadoPago.clearSession();

                toast.error(data.message, { delay: 500, autoClose: 5000 });

                if (status === 422) {
                  setError(data);
                }
              } else if (error.request) {
                setError(error);
              } else {
                setError(error);
              }
            } finally {
              setLoading(false);
            }

            setLoading(false);
          }
        );
        break;


      case 3:
        try {
          const res = await api().post(`register/subscribe`, {
            package_id: package_id,
            payment_method_id: values.paymentMethodId,
            payment_method_code: values.paymentMethodCode
          });

          open(res.data.url);


          setLoading(false)



        } catch (e) {
          setLoading(false);
          console.log(e);
        }

        break;
    }

  }



  return (
    <CardLogoHeader>

      <div className="register-confirm container text-center responsive">
        <h2 className="card-title text-center">
          <span className={"text-primary"}>¡</span>Únete a {<NameProject />}
          <span className={"text-primary"}>!</span>
        </h2>
        <div className="row">
          <div className="col-md-6 paymentMethod">
            <div className="row w-100">
              <div className="col-12">
                <FormGroup>
                  <Label htmlFor="paymentMethodId" style="margin: 0;">
                    Paga con
                </Label>
                  <Select
                    id="paymentMethodId"
                    name="paymentMethodId"
                    required={requireds}
                    onChange={onPaymentChange}
                    value={values.paymentMethodId}
                  >
                    <option value="0">Seleccione</option>
                    {paymentMethods &&
                      paymentMethods.map((paymentMethod, key) => (
                        <option
                          key={paymentMethod.id}
                          state={values.paymentMethodId}
                          value={paymentMethod.id}
                        >
                          {paymentMethod.name}
                        </option>
                      ))}
                  </Select>
                  <InvalidFeedback
                    error={error}
                    loading={loading}
                    name="paymentMethodId"
                  />
                </FormGroup>
              </div>
            </div>
            {(values.paymentMethodId == 1 || values.paymentMethodId == 2) && (
              <div className="row">
                <div className="col-12">
                  <FormGroup>
                    <Label htmlFor="cardHolderName">
                      Nombre impreso en tarjeta
                  </Label>
                    <Input
                      id="cardHolderName"
                      name="cardHolderName"
                      required={requireds}
                      type="text"
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </div>
                <div className="col-12">
                  <FormGroup>
                    <Label htmlFor="docNumber">RUT/RUN/DNI asociado a la tarjeta</Label>
                    <Input
                      className={"form-control"}
                      onChange={handleInputChange}
                      id="docNumber"
                      name="docNumber"
                      maxLength={20}
                    />
                    <InvalidFeedback
                      error={error}
                      loading={loading}
                      name="docNumber"
                    />
                  </FormGroup>
                </div>
                <div className="col-12">
                  <FormGroup>
                    <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                    <img src={cardImg} className="creditCardBrand" />
                    <MaskedInput
                      mask={[
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/
                      ]}
                      guide={false}
                      className={"form-control"}
                      onChange={handleInputChangeCreditCardNumber}
                      id="cardNumber"
                      name="cardNumber"
                    />
                    {/* <InvalidFeedback
                      error={error}
                      loading={loading}
                      name="cardNumber"
                    /> */}
                  </FormGroup>
                </div>

                <div className="col-6">
                  <FormGroup>
                    <Label htmlFor="card-duedate">Expiración</Label>
                    <MaskedInput
                      mask={[/\d/, /\d/, "/", /\d/, /\d/]}
                      guide={false}
                      className={"form-control"}
                      placeholder={"MM/AA"}
                      name={"cardExpirationDate"}
                      onChange={handleInputChange}
                    />
                    <InvalidFeedback
                      error={error}
                      loading={loading}
                      name="cardExpirationDate"
                    />
                  </FormGroup>
                </div>
                <div className="col-6">
                  <FormGroup>
                    <Label htmlFor="card-cvv">CVV</Label>
                    <MaskedInput
                      mask={[/\d/, /\d/, /\d/]}
                      guide={false}
                      className={"form-control"}
                      name={"cardSecurityCode"}
                      onChange={handleInputChange}
                      placeholder={"***"}
                    />
                    <InvalidFeedback
                      error={error}
                      loading={loading}
                      name="cardSecurityCode"
                    />
                  </FormGroup>
                </div>
                <div className="col-12">
                  <Button
                    block
                    color="secondary"
                    type="button"
                    disabled={loading}
                    loading={loading}
                    onClick={submitCredit}
                  >
                    Pagar
                </Button>
                </div>
              </div>
            )}

            {values.paymentMethodId == 3 && (
              <div className={"row"}>
                <div className="col-12">
                  <Button
                    block
                    color="secondary"
                    type="button"
                    disabled={loading}
                    loading={loading}
                    onClick={submitCredit}
                  >
                    Gerar Boleto
                </Button>
                </div>
              </div>
            )}


          </div>

          <div className="col-md-6">
            <div className="product-summary">
              <div className="product-image">
                {/*<img src="/static/lau/subs/plan_hero.png" alt="" />*/}
              </div>
              <div className={"product-name-group"}>
                <h6>Estás comprando:</h6>
                <p className={"product-name"}>
                  Suscripción - <strong>{selectedPackage.name}</strong> recurrente
              </p>
              </div>
              <div className={"price-breakdown"}>
                <div className="checkout-total">
                  <h6>Total</h6>
                  <p className={"price"}> {selectedPackage.amount}</p>
                </div>
              </div>
            </div>
            {/* <Button color="primary" onClick={() => handleFormState(3)}>
            Volver
          </Button> */}
            <Button color="primary" onClick={() => router.back()}>
              Volver
          </Button>
          </div>
        </div>
        <style jsx global={true}>{`
        .card {
          min-height: 600px;
        }
        .text-primary {
          color: ${ primaryColor} !important;
        }

        strong.text-primary {
          color: ${ primaryColor} !important;
        }

        h2.card-title {
          font-weight: normal;
          color: #000;
          margin-bottom: 1em;
          font-size: 1.7em;
        }

        .pay-methods {
          margin: 32px;
          display: flex;
          flex-wrap: wrap;
        }
        div.card-subtitle {
          font-size: 1.1em;
          font-weight: 500;
          margin-bottom: 2.5em;
        }

        .text-primary {
          color: ${ primaryColor} !important;
        }
     .register-confirm {
            padding-top: 50px;
            padding-bottom: 50px;
            color: #666666;
          }
        @media (max-width: 765px) {
          .card-title {
            padding: 5px 15px;
          }
          .responsive {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }
          label {
            display: inline-block;
            margin-bottom: 0.5rem;
            text-align: center;
          }

          .justify-content-end {
            display: flex;
            justify-content: center !important;
          }
          .row {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            margin-right: 0px;
            margin-left: 0px;
          }
          .col-8 {
            max-width: 100% !important;
          }
          .offset-3 {
            margin-left: 0px;
          }
        }
      ` }</style>
      </div >
    </CardLogoHeader>)


})
pay.getInitialProps = async ({ api }) => {
  let packages
  try {
    const { data } = await api.get('packages')

    packages = { items: data }
  } catch (error) {
    packages = { error }
  }
  return { packages }
}

export default pay;
