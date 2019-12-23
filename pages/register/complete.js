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
import Select from '../../components/Select/Select'
import api from '../../services/api'
import Router from 'next/router'
import { IS_PRODUCTION } from '../../constants/constants'

// page
const RegisterConfirmPage = ({ layoutProps, packages, packagesError }) => {

  const { user } = useContext(UserContext)
  const [ genres, setGenres ] = useState()
  const [ countries, setCountries ] = useState()
  const [ payment, setPayment ] = useState()
  const requireds = IS_PRODUCTION
  const [ name, setName ] = useState(user ? user.name : '')
  const [ user_genre_id, setUserGenreId ] = useState(user ? user.user_genre_id : 0)
  const [ error, setError ] = useState()

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
      setName(user.name)
      setUserGenreId(user.user_genre_id)
    }
  }, [user])

  /* handle submit */
  const handleSubmit = async e => {
    e.preventDefault()
    // setLoading(true)
    try {
      const response = await api.post('register/complete', {
        name,
        user_genre_id,
      })
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
    <Layout color="white" {...layoutProps}>
      <Head>
        <title>Confirmación &lt; Registro &lt; {CONFIG.appName}</title>
      </Head>
      <div className="rgpage container-fluid">
        <div className="row">
          <div className="col-xl-8 offset-xl-2">

            {/* heading */}
            <h1 className="h2">Completa tu registro</h1>

            { user && (
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
                          onChange={e => setName(e.target.value)}
                          required={requireds}
                          value={name}
                        />
                      </FormGroup>

                      {/* genre */}
                      <FormGroup>
                        <Label htmlFor="user_genre_id">Género</Label>
                        <Select
                          id="user_genre_id"
                          name="user_genre_id"
                          onChange={e => setUserGenreId(e.target.value)}
                          required={requireds}
                          value={user_genre_id}
                        >
                          { ! genres ? (
                            <option disabled value={0}>Cargando...</option>
                          ) : genres.length ? (
                            <>
                              <option disabled value={0}>Selecciona tu género</option>
                              { genres.map((genre, key) => (
                                <option {...{key}} value={genre.id}>{genre.name}</option>
                              ))}
                            </>
                          ) : (
                            <option disabled value={0}>Incapaz de cargar géneros</option>
                          ) }
                        </Select>
                      </FormGroup>

                      {/* document */}
                      <FormGroup>
                        <Label htmlFor="document">Documento</Label>
                        <Input id="document" name="document" required={requireds} type="text" />
                      </FormGroup>

                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="localization">
                      <h3 className="h3">Ubicación</h3>

                      {/* address */}
                      <FormGroup>
                        <Label htmlFor="address">Dirección</Label>
                        <Input id="address" name="address" required={requireds} type="text" />
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
                          ) : countries.length ? (
                            <>
                              <option disabled value={0}>Selecciona tu país</option>
                              { countries.map((country, key) => (
                                <option {...{key}} value={country.id}>{country.name}</option>
                              ))}
                            </>
                          ) : (
                            <option disabled value={0}>Incapaz de cargar países</option>
                          ) }
                        </Select>
                      </FormGroup>

                    </div>
                  </div>

                </div>

                {/* package */}
                <Packages {...{packages, packagesError}} package_id_intention={user.package_id_intention} />

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

              </form>
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
    </Layout>
  );
}

const Packages = ({packages, packagesError, package_id_intention}) => {

  const [items, setItems] = useState(packages)
  const [package_id, setPackageId] = useState(package_id_intention)

  if ( ! packages) {
    useEffect(_ => {
      (async _ => {
        const {data} = await api.get('packages')
        setItems(data)
      })()
    }, [])
  }

  function handlePackage(e) {
    setPackageId(e.target.value)
  }

  return (
    <section className="packages">
      <h3 className="h3">Selecciona tu plan</h3>
      <div className="row gutter-15">
        { items && items.map((item, key) => (
          <div className="col-6 col-md-3" {...{key}}>
            <FormGroup>
              <PackageRadio {...{onChange: handlePackage, package_id, plan: item}} />
            </FormGroup>
          </div>
        )) }
      </div>
    </section>
  )
}

const PackageRadio = ({ onChange, package_id, plan }) => {
  return (
    <label className="text-center">
      <input
        checked={plan.id == package_id}
        name="package"
        onChange={onChange}
        type="radio"
        value={plan.id}
      />
      <span className="fake-input">
        <span className="d-block name">{ plan.name }</span>
        <span className="value">{ (plan.currency === 'ars' ? '$' : '') + plan.amount }</span>
      </span>
      <style jsx>{`
        label {
          cursor: pointer;
          display: block;
          margin-bottom: 15px;
          overflow: hidden;
          position: relative;
        }
        input {
          opacity: 0;
          position: absolute;
        }
        .fake-input {
          border: 1px solid lightgray;
          border-radius: 4px;
          display: block;
          padding: 15px;
          transition: border-color .3s;
        }
        input:checked + .fake-input {
          border-color: var(--primary);
        }
        .name {
          font-size: 1.33em;
          margin-bottom: 5px;
        }
      `}</style>
    </label>
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

RegisterConfirmPage.getInitialProps = async _ => {
  try {
    const {data} = await api.get('packages')
    return { packages: data }
  } catch(error) {
    return { packagesError: error }
  }
}

export default RegisterConfirmPage
