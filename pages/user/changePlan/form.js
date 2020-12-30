// next
import Link from 'next/link'
import Router from 'next/router'

// react
import { useField } from 'formik'
import { useContext, useEffect, useState } from 'react'

// components
import UserContext from '~/contexts/UserContext'
import Packages from '~/components/Packages'
import Payment from './payment'
import Button from '~/components/button'
import FormGroup from '~/components/layout/AuthModal/FormGroup'

// env
import { IS_PRODUCTION } from '~/constants/constants'
import { CONFIG } from '~/config'

// import Select       from '../Select/Select'
import Label from '~/components/layout/AuthModal/Label'
import Input from '~/components/layout/AuthModal/Input'




const ChangePlanForm = ({ api, isPayUReady, packages, POS }) => {


  const { id: free_package_id } = packages.items.find(item => item.amount == 0) || {}

  const requireds = IS_PRODUCTION
  const debug = false && !IS_PRODUCTION

  const { user, updateUser } = useContext(UserContext)


  const [discount, setDiscount] = useState(false)
  const [supportersDiscount, setSupportersDiscount] = useState()
  const [values, setValues] = useState({
    package_id: '',
    payment_method_id: null,
    payment_os: null,
    cash_payment_method_id: null,
    terms: null,
    supporter_id: '',
    alternate_supporter_id: '',
  })
  const [pack, setPack] = useState()
  const [loading, setLoading] = useState()
  const [error, setError] = useState()

  /* fill user form */
  useEffect(_ => {
    if (user) {
      setValues({
        ...values
      })
    }
  }, [user])

  useEffect(_ => {
    function filterByID(obj) {
      if (obj.id > user.package_id) {
        return true;
      } else {
        return false;
      }
    }
    let packageAvailable = { items: (packages.items).filter(filterByID) };
    setPack(packageAvailable);
  }, [])



  /* handle general input change */
  const handleInputChange = e => {
    const { checked, name, value, type } = e.target
    setValues({
      ...values,
      [name]: type === 'checkbox' ?
        (checked ? (value === 'true' ? true : value) : false) :
        value,
    })
  }

  const handleDiscountChange = e => {
    setValues({
      ...values,
      alternate_supporter_id: e.target.value,
    })
    setDiscount(e.target.value.length === 5)
  }

  const handleSupportersDiscountChange = e => {
    setValues({
      ...values,
      supporter_id: e.target.value,
    })
    setSupportersDiscount(e.target.value.length === 5)
  }

  /* handle package change */
  function onPackageChange(e) {
    const package_id = parseInt(e.target.value, 10)
    setValues({
      ...values,
      package_id: package_id,
      payment_method_id: package_id === free_package_id ? null : values.payment_method_id,
    })
  }

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

  /* token */
  async function createToken() {
    const promise = new Promise((resolve, reject) => {
      const additionalData = {
        holder_name: document.getElementById('cardholder-name').value,
        // custom_data: document.getElementById('custom').value,
      }
      POS.createToken(additionalData, (result) => {
        const json = JSON.parse(result)
        console.log('json', json)
        json.token ? resolve(json) : reject(json)
      })
    })
    return promise
  }

  // is card payment
  const credit_card_id = 1
  const debit_card_id = 2
  const isCardPayment = [credit_card_id, debit_card_id].includes(values.payment_method_id)

  /* submit */
  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const paymentData = values.package_id && values.package_id !== free_package_id &&
        values.payment_method_id && isCardPayment ? await createToken() : null
      const data = { ...values, payment_os: paymentData }
      try {
        const { data: { user, order } } = await api.post('register/changePlan', data)
        updateUser(user)
        if (order) {
          Router.push({
            pathname: '/account/confirm',
            query: {
              download_link: order.download_link,
              link: order.link,
            },
          }, '/register/confirm')
        } else {
          Router.push('/')
        }
      } catch (error) {
        console.log('error', error)
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
      }
    } catch (error) {
      setError(error.description ? { errors: { payment_os: error.description } } : error)
    }
    setLoading(false)
  }

  return (
    <form method="post" onSubmit={handleSubmit}>

      {/* main error msg */}
      {error && error.message && (
        <div className="invalid-feedback">{error.message}</div>
      )}

      {/* form data debug */}
      {debug && (
        <pre>
          {JSON.stringify(values, null, 2)}
        </pre>
      )}

      <h3 className="h3">¿Eres Socio? Obtén un descuento especial </h3>
      <div className="row">
        {/* <div className="col-md-6">
          <div className="data">
            <FormGroup>
              <Label htmlFor="supporter_id">Socio {CONFIG.shortClubName}</Label>
              <Input
                disabled={values.alternate_supporter_id}
                id="supporter_id"
                maxLength={5}
                name="supporter_id"
                onChange={handleSupportersDiscountChange}
                type="text"
                style={supportersDiscount ? { backgroundColor: 'rgb(206, 249, 206)' } : {}}
                value={values.supporter_id}
              />
            </FormGroup>
          </div>
        </div> */}
        {/* <div className="col-md-6">
          <div className="localization">
            <FormGroup>
              <Label htmlFor="alternate_supporter_id">Somos {CONFIG.shortClubName}</Label>
              <Input
                disabled={values.supporter_id}
                id="alternate_supporter_id"
                maxLength={5}
                name="alternate_supporter_id"
                onChange={handleDiscountChange}
                type="text"
                style={discount ? { backgroundColor: 'rgb(206, 249, 206)' } : {}}
                value={values.alternate_supporter_id}
              />
            </FormGroup>
          </div>
        </div> */}
      </div>


      {/* package selection */}
      {pack && (<Packages pack={pack}
        packages={packages} {...{

          error: packages.error ? packages.error : null,
          items: pack.items ? pack.items : null,
          onChange: onPackageChange,
          package_id: values.package_id,
          validationError: !loading && error && error.errors && error.errors.package_id,
          discount,
          supportersDiscount,
        }} />)}


      {/* payment */}
      {/* {values.package_id && values.package_id !== free_package_id && (
        <Payment {...{
          api,
          cash_payment_method_id: values.cash_payment_method_id,
          error,
          isCardPayment,
          isPayUReady,
          loading,
          onCashPaymentMethodChange,
          onChange: onPaymentChange,
          payment_method_id: values.payment_method_id,
          POS,
          requireds,
          validationError: !loading && error && error.errors && error.errors.payment_method_id,
        }} />
      )} */}

      {/* footer */}
      <div className="row align-items-center">

        {/* terms */}
        <div className="col-md-6 offset-md-4">
          <label className="terms">
            <input
              checked={values.terms}
              name="terms"
              onChange={handleInputChange}
              required={requireds}
              type="checkbox"
              value={true}
            />
            <span>He leído y acepto <Link href="/terminos-y-politicas">
              <a target="_blank">el contrato</a>
            </Link> de {CONFIG.appName}</span>
          </label>
          {!loading && error && error.errors && error.errors.terms && (
            <div className="invalid-feedback">{error.errors.terms}</div>
          )}
        </div>

        {/* send btn */}
        <div className="col-md-2">
          <Link
            as="/user/changePlan/pay"
            href={{
              pathname: "/user/changePlan/pay",
              query: {
                package_id: values.package_id,
                required: requireds
              },

            }}
          >
            <Button block color="secondary" disabled={loading} >Seguir</Button>
          </Link>

        </div>


      </div>

      <style jsx>{`
        :global(.h3) {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        hr,
        .hr {
          margin-top: 0;
          margin-bottom: 15px;
        }
        @media (min-width: 768px) {
          .card-inputs {
            margin-top: -21px;
          }
        }
        .terms {
          font-size: 18px;
        }
        .terms input {
          margin-right: 5px;
        }
        .valid-number {
          background-color: rgb(206, 249, 206);
        }
      `}</style>
    </form>
  )
}

// create formik input field
export const FkInput = ({ style, label, ...props }) => {
  const [field, meta] = useField(props)
  field.value = field.value || ''

  return (
    <>
      {props.type == 'hidden' ? '' : <Label htmlFor={props.id || props.name}>{label}</Label>}
      <Input style={{ color: 'black', ...style }}  {...field} {...props} />
      {meta.touched && meta.error ? (<div className="invalid-feedback">{meta.error}</div>) : null}
    </>
  )
}

export default ChangePlanForm
