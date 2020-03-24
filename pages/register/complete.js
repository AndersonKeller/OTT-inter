// other imports
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'

import nookies from 'nookies'
// import sleep from 'sleep-promise'

// app imports
import Layout from '../../components/layout/Layout'
import { CONFIG } from '../../config'
import FormGroup from '../../components/layout/AuthModal/FormGroup'
import Label from '../../components/layout/AuthModal/Label'
import Input from '../../components/layout/AuthModal/Input'
import Button from '../../components/button'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../../contexts/UserContext'
import Packages from '../../components/Packages'
import Select from '../../components/Select/Select'
import { IS_PRODUCTION, HAS_WINDOW } from '../../constants/constants'
import useScript, { ScriptStatus } from '@charlietango/use-script'
import withApi from '../../components/withApi/withApi'

// page
const CompleteRegisterPage = ({ api, layoutProps, packages }) => {

  const { user } = useContext(UserContext)

  // temporary handle user presence
  useEffect( _ => {
    const timeout = setTimeout( _ => {
      if ( ! user) {
        Router.push('/login')
      }
    }, 1000)
    return function cleanup() {
      clearTimeout(timeout)
    }
  }, [user])

  const [ ready, status ] = useScript('https://js.paymentsos.com/v2/latest/secure-fields.min.js')
  const POS = ready && HAS_WINDOW ? window.POS : null
  const payUEnv = 'test'
  const businessUnitPublicKey = '88985036-6530-4b5a-a7ec-c4e07ec07f6c'
  const [ isPayUReady, setIsPayUReady ] = useState(false)
  const POSStyle = {
    base: {
      borderRadius: '.15rem',
      backgroundColor: 'white',
      height: 'calc(1.5em + .75rem + 2px)',
      fontSize: '12px',
      padding:'0px 3px',
      marginLeft: '5px',
      cardImage: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        margin: 0,
      },
      pan:{
        width:'160px',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        marginLeft: 0,
      },
      expirationDate: { width: '47px' },
      secureFields: { left: '40px' },
      cvv: { width: '35px' }
    }
  }

  if (status === ScriptStatus.ERROR) {
    console.log('Failed to load POS API')
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

  return (
    <Layout {...layoutProps}>
      <Head>
        <title>Confirmación &lt; Registro &lt; {CONFIG.appName}</title>
      </Head>
      <div className="rgpage container-fluid">
        <div className="row">
          <div className="col-xl-8 offset-xl-2">

            <h1 className="h2">Completa tu registro</h1>

            { user && (
              <CompleteRegisterForm {...{api, isPayUReady, packages, POS}} />
            ) }

          </div>
        </div>
      </div>
      <style jsx>{`
        .rgpage {
          padding-top: 40px;
          padding-bottom: 120px;
        }
        .h2 {
          margin-bottom: 10px;
        }
      `}</style>
    </Layout>
  )
}

const CompleteRegisterForm = ({ api, isPayUReady, packages, POS }) => {

  const free_package_id = 5

  const debug = false && ! IS_PRODUCTION
  const requireds = IS_PRODUCTION

  const { user, updateUser } = useContext(UserContext)

  const [ genders, setGenders ] = useState()
  const [ countries, setCountries ] = useState()
  const [ discount, setDiscount ] = useState(false)
  const [ supportersDiscount, setSupportersDiscount ] = useState()

  const [ values, setValues ] = useState({
    name: '',
    gender_id: '',
    document: '',
    address: '',
    city: '',
    country_id: '',
    package_id: '',
    payment_method_id: null,
    payment_os: null,
    cash_payment_method_id: null,
    terms: null,
    supporter_id: '',
    alternate_supporter_id: '',
  })

  const [ loading, setLoading ] = useState()
  const [ error, setError ] = useState()

  /* get genders */
  useEffect(_ => {
    (async _ => {
      const {data} = await api.get('genders')
      setGenders(data)
    })()
  }, [])

  /* get countries */
  useEffect(_ => {
    (async _ => {
      const {data} = await api.get('countries')
      setCountries(data)
    })()
  }, [])

  /* fill user form */
  useEffect(_ => {
    if (user) {
      setValues({
        ...values,
        name: user.name,
        gender_id: user.gender_id ? user.gender_id : '',
        document: user.document ? user.document : '',
        address: user.address ? user.address : '',
        city: user.city ? user.city : '',
        country_id: user.country_id ? user.country_id : '',
        package_id: user.package_id_intention ? user.package_id_intention : '',
      })
    }
  }, [user])

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
        const { data: { user, order } } = await api.post('register/complete', data)
        updateUser(user)
        if (order) {
          Router.push({
            pathname: '/register/confirm',
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
      { error && error.message && (
        <div className="invalid-feedback">{error.message}</div>
      ) }

      {/* form data debug */}
      { debug && (
        <pre>
          {JSON.stringify(values, null, 2)}
        </pre>
      )}

      <div className="row">

        <div className="col-md-6">
          <div className="data">

            {/* heading */}
            <h3 className="h3">Tus datos</h3>

            {/* name */}
            <FormGroup>
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                name="name"
                onChange={handleInputChange}
                required={requireds}
                value={values.name}
              />
              { ! loading && error && error.errors && error.errors.name && (
                <div className="invalid-feedback">{error.errors.name}</div>
              ) }
            </FormGroup>

            {/* genre */}
            <FormGroup>
              <Label htmlFor="gender_id">Género</Label>
              <Select
                id="gender_id"
                name="gender_id"
                onChange={handleInputChange}
                required={requireds}
                value={values.gender_id}
              >
                { ! genders ? (
                  <option disabled value="">Cargando...</option>
                ) : genders.length ? <>
                  <option disabled value="">Selecciona tu género</option>
                  { genders.map((genre, key) => (
                    <option {...{key}} value={genre.id}>{genre.name}</option>
                  ))}
                </> : (
                  <option disabled value="">Incapaz de cargar géneros</option>
                ) }
              </Select>
              { ! loading && error && error.errors && error.errors.gender_id && (
                <div className="invalid-feedback">{error.errors.gender_id}</div>
              ) }
            </FormGroup>

            {/* document */}
            <FormGroup>
              <Label htmlFor="document">Documento</Label>
              <Input
                id="document"
                name="document"
                onChange={handleInputChange}
                required={requireds}
                type="text"
                value={values.document}
              />
              { ! loading && error && error.errors && error.errors.document && (
                <div className="invalid-feedback">{error.errors.document}</div>
              ) }
            </FormGroup>

          </div>
        </div>

        <div className="col-md-6">
          <div className="localization">
            <h3 className="h3">Ubicación</h3>

            {/* address */}
            <FormGroup>
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                name="address"
                onChange={handleInputChange}
                required={requireds}
                type="text"
                value={values.address}
              />
              { ! loading && error && error.errors && error.errors.address && (
                <div className="invalid-feedback">{error.errors.address}</div>
              ) }
            </FormGroup>

            {/* city */}
            <FormGroup>
              <Label htmlFor="city">Ciudad</Label>
              <Input
                id="city"
                name="city"
                onChange={handleInputChange}
                required={requireds}
                type="text"
                value={values.city}
              />
              { ! loading && error && error.errors && error.errors.city && (
                <div className="invalid-feedback">{error.errors.city}</div>
              ) }
            </FormGroup>

            {/* country */}
            <FormGroup>
              <Label htmlFor="country_id">País</Label>
              <Select
                id="country_id"
                name="country_id"
                onChange={handleInputChange}
                required={requireds}
                value={values.country_id}
              >
                { ! countries ? (
                  <option disabled value="">Cargando...</option>
                ) : countries.length ? <>
                  <option disabled value="">Selecciona tu país</option>
                  { countries.map((country, key) => (
                    <option {...{key}} value={country.id}>{country.name}</option>
                  ))}
                </> : (
                  <option disabled value="">Incapaz de cargar países</option>
                ) }
              </Select>
              { ! loading && error && error.errors && error.errors.country_id && (
                <div className="invalid-feedback">{error.errors.country_id}</div>
              ) }
            </FormGroup>

          </div>
        </div>

      </div>
      <h3 className="h3">¿Eres Socio? Obtén un descuento especial</h3>
        <div className="row">
          <div className="col-md-6">
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
                  style={supportersDiscount ? {backgroundColor: 'rgb(206, 249, 206)'} : {}}
                  value={values.supporter_id}
                />
              </FormGroup>
            </div>
          </div>
          <div className="col-md-6">
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
                  style={discount ? {backgroundColor: 'rgb(206, 249, 206)'} : {}}
                  value={values.alternate_supporter_id}
                />
              </FormGroup>
            </div>
          </div>
        </div>


      {/* package selection */}
      <Packages {...{
        error: packages.error ? packages.error : null,
        items: packages.items ? packages.items : null,
        onChange: onPackageChange,
        package_id: values.package_id,
        validationError: ! loading && error && error.errors && error.errors.package_id,
        discount,
        supportersDiscount,
      }} />

      {/* payment */}
      { values.package_id && values.package_id !== free_package_id && (
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
          validationError: ! loading && error && error.errors && error.errors.payment_method_id,
        }} />
      ) }

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
          { ! loading && error && error.errors && error.errors.terms && (
            <div className="invalid-feedback">{error.errors.terms}</div>
          ) }
        </div>

        {/* send btn */}
        <div className="col-md-2 text-right">
          <Button block color="secondary" disabled={loading} type="submit">Enviar</Button>
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

  // get payment methods
  useEffect( _ => {
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
  const [ cashPaymentMethods, setCashPaymentMethods ] = useState()

  // get cash payment methods
  useEffect( _ => {
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

                  {/* <FormGroup>
                    <Label htmlFor="creditCardName">Nombre impreso</Label>
                    <Input id="creditCardName" name="creditCardName" required={requireds} type="text" />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="creditCardNumber">Numero</Label>
                    <Input id="creditCardNumber" name="creditCardNumber" required={requireds} type="text" />
                  </FormGroup>
                  <div className="row">
                    <div className="col-6">
                      <FormGroup>
                        <Label htmlFor="creditCardDate">Validez</Label>
                        <Input id="creditCardDate" name="creditCardDate" required={requireds} type="text" />
                      </FormGroup>
                    </div>
                    <div className="col-6">
                      <FormGroup>
                        <Label htmlFor="creditCardCode">
                          <abbr title="Código de seguridad">CVV</abbr>
                        </Label>
                        <Input id="creditCardCode" name="creditCardCode" required={requireds} type="text" />
                      </FormGroup>
                    </div>
                  </div> */}

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
        {/* input:focus + .fake-input {
          border-color: var(--white);
        } */}
      `}</style>
    </label>
  )
}

// getInitialProps
CompleteRegisterPage.getInitialProps = async ctx => {

  // get user
  let user
  try {
    const { data } = await ctx.api.get('user')
    user = data
  } catch(error) {
    return { }
  }

  // save updated user
  nookies.set(ctx, 'user', JSON.stringify(user), { path: '/' })

  // if user has already completed registry, redirect it
  if (user.register_completed_at) {
    let message = JSON.stringify({ info: "Ya ha completado su registro." })
    nookies.set(ctx, 'flash_message', message, { path: '/' })
    if (ctx.res) {
      ctx.res.redirect('/')
      ctx.res.end()
      return { }
    } else {
      Router.back()
    }
  }

  // get packages
  let packages
  try {
    const { data } = await ctx.api.get('packages')
    packages = { items: data }
  } catch(error) {
    packages = { error }
  }

  // return
  return { packages, user }
}

// export
export default withApi(CompleteRegisterPage)
