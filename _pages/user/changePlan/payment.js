//react
import { useEffect, useState } from 'react'

//components
import FormGroup    from '~/components/layout/AuthModal/FormGroup'
import Label        from '~/components/layout/AuthModal/Label'
import Input        from '~/components/layout/AuthModal/Input'

// Payment
const Payment = ({
  api,
  cash_payment_method_id,
  error,
  isCardPayment,
  isPayUReady,
  loading,
  onCashPaymentMethodChange,
  onChange,
  payment_method_id,
  POS,
  requireds,
  validationError
}) => {

  // payment methods
  const [ paymentMethods, setPaymentMethods ] = useState()
  // cash payment methods
  const [ cashPaymentMethods, setCashPaymentMethods ] = useState()

  // get payment methods
  useEffect(_ => {
    (async _ => {
      const { data } = await api.get('payment-methods')
      setPaymentMethods(data)
    })()
  }, [])

  // init card secure fields
  useEffect(_ => { isPayUReady && isCardPayment && POS.initSecureFields('card-secure-fields') },
    [isPayUReady, isCardPayment]
  )

  // get cash payment methods
  useEffect(_ => {
    (async _ => {
      const { data } = await api.get('cash-payment-methods')
      setCashPaymentMethods(data)
    })()
  }, [])


  return (
    <div className="row">
      <div className="offset-md-2 col-md-8">
        <h3 className="h3">Pago</h3>
        <div className="row">

          <div className="col-md-6">
            <FormGroup>
              { paymentMethods && paymentMethods.map((paymentMethod, key) => (
                <InputRadio
                  key={key}
                  label={paymentMethod.name}
                  name="payment"
                  onChange={onChange}
                  state={payment_method_id}
                  value={paymentMethod.id}
                />
              )) }
              { validationError && (
                <div className="invalid-feedback">{validationError}</div>
              ) }
            </FormGroup>
          </div>

          <div className="col-md-6">

            {/* credit / debit card */}
            {isCardPayment ? (
              <div className="card-inputs">

                {/* mandatory data */}
                <FormGroup>
                  <Label htmlFor="cardholder-name">Nombre impreso en tarjeta</Label>
                  <Input id="cardholder-name" name="cardholder-name" required={requireds} type="text" />
                </FormGroup>

                {/* card fields */}
                <FormGroup>
                  <div id="card-secure-fields" />
                  { ! loading && error && error.errors && error.errors.payment_os && (
                    <div className="invalid-feedback">{error.errors.payment_os}</div>
                  ) }
                </FormGroup>
              </div>

            // cash payment methods
            ) : payment_method_id === 3 && (
              <FormGroup>
                {cashPaymentMethods == null ? (
                  <p>Cargando...</p>
                ) : cashPaymentMethods.length ? cashPaymentMethods.map((item, key) => (
                  <InputRadio
                    key={key}
                    label={item.name}
                    name="cash_payment_method_id"
                    onChange={onCashPaymentMethodChange}
                    state={cash_payment_method_id}
                    value={item.id}
                  />
                )) : (
                  <p>Sin método de pago configurado.</p>
                )}
                { ! loading && error && error.errors && error.errors.cash_payment_method_id && (
                  <div className="invalid-feedback">{error.errors.cash_payment_method_id}</div>
                ) }
              </FormGroup>
            ) }
          </div>
        </div>
      </div>
    </div>
  )
}


// Radio
const InputRadio = ({ label, name, onChange, state, value }) => {
  return (
    <label>
      <input checked={state === value} type="radio" {...{name, onChange, value}} />
      <span className="fake-input">
        <span className="fake-radio"></span>
        <span>{label}</span>
      </span>
      <style jsx>{`
        label {
          display: block;
          margin-bottom: 5px;
          overflow: hidden;
          position: relative;
        }
        input {
          opacity: 0;
          position: absolute;
        }
        .fake-input {
          border: 2px solid var(--primary);
          border-radius: 4px;
          display: block;
          font-size: 1rem;
          line-height: 1.4;
          padding: .375rem .75rem;
          transition: background-color .3s, border-color .3s, color .3s;
        }
        .fake-radio {
          background-color: var(--white);
          border: 1px solid var(--gray2);
          border-radius: 50%;
          display: inline-block;
          height: 15px;
          margin-right: 7.5px;
          padding: 1px;
          vertical-align: -2px;
          width: 15px;
        }
        .fake-radio::before {
          background-color: var(--black);
          border-radius: 50%;
          content: '';
          display: block;
          opacity: 0;
          height: 100%;
          transition: opacity .3s;
          width: 100%;
        }
        input:checked + .fake-input {
          background-color: var(--primary);
          color: white;
        }
        input:checked + .fake-input .fake-radio::before {
          opacity: 1;
        }
      `}</style>
    </label>
  )
}

export default Payment
