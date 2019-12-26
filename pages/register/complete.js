// other imports
import Head from 'next/head'
import sleep from 'sleep-promise'

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
import api from '../../services/api'
import Router from 'next/router'
import { IS_PRODUCTION } from '../../constants/constants'

// page
const CompleteRegisterPage = ({ layoutProps, packages }) => {
  const { user } = useContext(UserContext)
  return (
    <Layout color="white" {...layoutProps}>
      <Head>
        <title>Confirmación &lt; Registro &lt; {CONFIG.appName}</title>
      </Head>
      <div className="rgpage container-fluid">
        <div className="row">
          <div className="col-xl-8 offset-xl-2">

            <h1 className="h2">Completa tu registro</h1>

            { user && (
              <CompleteRegisterForm {...{packages}} />
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
  );
}

const CompleteRegisterForm = ({ packages }) => {

  const requireds = IS_PRODUCTION

  const { user } = useContext(UserContext)

  const [ genres, setGenres ] = useState()
  const [ countries, setCountries ] = useState()

  const [ values, setValues ] = useState({
    name: '',
    user_genre_id: '',
    document: '',
    address: '',
  })

  // const [ packages, setPackages ] = useState()
  const [ payment, setPayment ] = useState()
  const [ error, setError ] = useState()

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  function handlePaymentChange(e) {
    setPayment(e.target.value)
  }

  /* temporarily handle user presence */
  useEffect(_ => {
    const timeout = setTimeout(_ => {
      if ( ! user) {
        Router.push('/login')
      }
    }, 1000)
    return function cleanup() {
      clearTimeout(timeout)
    }
  }, [user])

  /* get genres */
  useEffect(_ => {
    (async _ => {
      const {data} = await api.get('user_genres')
      setGenres(data)
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
        name: user.name,
        user_genre_id: user.user_genre_id ? user.user_genre_id : '',
        document: user.document ? user.document : '',
        address: user.address ? user.address : '',
      })
    }
  }, [user])

  /* handle submit */
  const handleSubmit = async e => {
    e.preventDefault()
    // setLoading(true)
    try {
      const response = await api.post('register/complete', values)
      console.log(response)
    } catch (error) {
      if (error.response) {
        setError(error.response.data)
      } else {
        setError('An error has occurred!')
        console.log('error', error)
      }
    }
    // setLoading(false)
  }

  return (
    <form method="post" onSubmit={handleSubmit}>

      <div className="row">

        <div className="col-md-6">
          <div className="data">

            {/* heading */}
            <h3 className="h3">Sus datos</h3>

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
            </FormGroup>

            {/* genre */}
            <FormGroup>
              <Label htmlFor="user_genre_id">Género</Label>
              <Select
                id="user_genre_id"
                name="user_genre_id"
                onChange={handleInputChange}
                required={requireds}
                value={values.user_genre_id}
              >
                { ! genres ? (
                  <option disabled value="">Cargando...</option>
                ) : genres.length ? <>
                  <option disabled value="">Selecciona tu género</option>
                  { genres.map((genre, key) => (
                    <option {...{key}} value={genre.id}>{genre.name}</option>
                  ))}
                </> : (
                  <option disabled value="">Incapaz de cargar géneros</option>
                ) }
              </Select>
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
            </FormGroup>

            {/* city */}
            <FormGroup>
              <Label htmlFor="city">Ciudad</Label>
              <Input id="city" name="city" required={requireds} type="text" />
            </FormGroup>

            {/* country */}
            <FormGroup>
              <Label htmlFor="country">País</Label>
              <Select defaultValue={0} id="country" name="country" required={requireds}>
                { ! countries ? (
                  <option disabled value={0}>Cargando...</option>
                ) : countries.length ? <>
                  <option disabled value={0}>Selecciona tu país</option>
                  { countries.map((country, key) => (
                    <option {...{key}} value={country.id}>{country.name}</option>
                  ))}
                </> : (
                  <option disabled value={0}>Incapaz de cargar países</option>
                ) }
              </Select>
            </FormGroup>

          </div>
        </div>

      </div>

      {/* package */}
      <Packages
        {...{
          error: packages.error ? packages.error : null,
          items: packages.items ? packages.items : null,
          id_intention: user.package_id_intention,
        }}
      />

      {/* payment */}
      <div className="row">
        <div className="offset-md-2 col-md-8">
          <h3 className="h3">Pago</h3>
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <InputRadio
                  label="Tarjeta de crédito"
                  name="payment"
                  onChange={handlePaymentChange}
                  state={payment}
                  value="credit"
                />
                <InputRadio
                  label="Tarjeta de débito"
                  name="payment"
                  onChange={handlePaymentChange}
                  state={payment}
                  value="debit"
                />
                <InputRadio
                  label="Recibo bancario"
                  name="payment"
                  onChange={handlePaymentChange}
                  state={payment}
                  value="boleto"
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              { payment === 'credit' && (
                <div className="card-inputs">
                  <FormGroup>
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
                  </div>
                </div>
              ) }
              </div>
          </div>
        </div>
      </div>

      <div className="row align-items-center">
        <div className="col-md-6 offset-md-4">
          <label className="terms">
            <input name="terms" required={requireds} type="checkbox" />
            <span>He leído y acepto el contrato de Dale Campéon</span>
          </label>
        </div>
        <div className="col-md-2 text-right">
          <Button block color="secondary" type="submit">Continuar</Button>
        </div>
      </div>

      {/* <p>Acceda al correo electrónico registrado para confirmar su cuenta.</p> */}


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
      `}</style>
    </form>
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
        input:focus + .fake-input {
          border-color: var(--black);
        }
      `}</style>
    </label>
  )
}

CompleteRegisterPage.getInitialProps = async _ => {
  try {
    const { data } = await api.get('packages')
    return { packages: { items: data } }
  } catch(error) {
    return { packages: { error } }
  }
}

export default CompleteRegisterPage
