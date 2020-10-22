import React, { useContext, useEffect, useState } from "react";
import FormGroup from "~/components/layout/AuthModal/FormGroup";
import Label from "~/components/Form/Label";
import Input from "~/components/layout/AuthModal/Input";
import withAuth from "~/components/withAuth";
import InvalidFeedback from "~/components/Form/InvalidFeedback";
import { HAS_WINDOW } from "~/constants/constants";
import useScript from "@charlietango/use-script";
import Select from "~/components/Select/Select";
import Button from "~/components/button";
import MaskedInput from "react-text-mask";
import UserContext from "~/contexts/UserContext";
import { ThemeContext } from "styled-components";
import Color from "color";
import NameProject from "~/components/NameProject";
import { toast } from "react-toastify";

const Payment = ({
  layoutProps,
  userData,
  package_id,
  packages,
  api,
  requireds,
  handleSubmit,
  handleFormState,
  formData,
  setFormData
}) => {
  const theme = useContext(ThemeContext);
  const primaryColor = Color(theme.colors.primary)
    .hsl()
    .string();

  const [ready, status] = useScript(
    "https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"
  );

  let selectedPackage = null;
  if (packages && package_id) {
    selectedPackage = packages.items.find(i => i.id == package_id);
  }

  const { user } = useContext(UserContext);
  const [error, setError] = useState({
    errors: {}
  });

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

  const [cardImg, setCardImg] = useState(null);
  const [creditCard, setCreditCard] = useState(null);

  const [loading, setLoading] = useState();

  const businessUnitPublicKey = 'APP_USR-fe20d55f-f7d1-49e0-855b-4d5c147ddd0b'
  const [isMercadoPagoReady, setIsMercadoPagoReady] = useState(false)
  const MercadoPago = ready && HAS_WINDOW ? window.Mercadopago : null

  const credit_card_id = 1;
  const debit_card_id = 2;
  const isCardPayment = [credit_card_id, debit_card_id].includes(
    values.paymentMethodId
  );

  const [payMethods, setPayMethods] = useState();

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

  /* handle payment method change */
  function onPaymentChange(e) {
    setValues({
      ...values,
      paymentMethodId: parseInt(e.target.value, 10),
      cash_paymentMethodId: null
    });
  }

  function onCashPaymentMethodChange(e) {
    setValues({
      ...values,
      cash_paymentMethodId: parseInt(e.target.value, 10)
    });
  }

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

  // payment methods
  const [paymentMethods, setPaymentMethods] = useState();

  // get payment methods
  useEffect(_ => {
    const getPaymentMethods = async _ => {
      const { data } = await api.get("payment-methods");
      setPaymentMethods(data);
    };
    getPaymentMethods();
  }, []);

  // cash payment methods
  const [cashPaymentMethods, setCashPaymentMethods] = useState();

  // get cash payment methods
  useEffect(_ => {
    const getCashPaymentMethods = async _ => {
      const { data } = await api.get("cash-payment-methods");
      setCashPaymentMethods(data);
    };
    getCashPaymentMethods();
  }, []);

  let payMethodsHtml = () => {
    {
      payMethods &&
        payMethods.map((m, key) => {
          return <div className="col-6 col-md">{m.id}</div>;
        });
    }
  };

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
                  errors["cardNumber"] =
                    "Há algo de errado com esse número. Digite novamente.";
                }
                if (error.code === "E302") {
                  errors["cardSecurityCode"] = "Confira o código de segurança.";
                }
                if (error.code === "316") {
                  error["cardHolderName"] = "Por favor, digite um nome válido.";
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
              });

              handleSubmit(4, null);
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
          const res = await api.post(`register/subscribe`, {
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

  function open(url) {
    const win = window.open(url, '_blank');
    if (win != null) {
      win.focus();
    }
  }

  return (
    <div className="register-confirm container text-center responsive">
      <h2 className="card-title text-center">
        <span className={"text-primary"}>¡</span>Sé parte de {<NameProject />}
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
                  <option value="0">Selecione</option>
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
                  <Label htmlFor="cardNumber">Nro Cartão</Label>
                  <img src={cardImg} className="creditCardBrand" />
                  <MaskedInput
                    mask={[
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      " ",
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      " ",
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      " ",
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
                  <InvalidFeedback
                    error={error}
                    loading={loading}
                    name="cardNumber"
                  />
                </FormGroup>
              </div>
              <div className="col-12">
                <FormGroup>
                  <Label htmlFor="docNumber">Documento</Label>
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
              <div className="col-6">
                <FormGroup>
                  <Label htmlFor="card-duedate">Dt Vencimento</Label>
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
          <Button color="primary" onClick={() => handleFormState(3)}>
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
    </div>
  )
}

export default withAuth(Payment, true);
