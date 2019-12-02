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
import UserContext from '../../components/UserContext'
import Select from '../../components/Select/Select'
import api from '../../services/api'
import Router from 'next/router'

// page
const RegisterConfirmPage = ({ layoutProps }) => {

  const { user } = useContext(UserContext)
  const [ creditCard, setCreditCard ] = useState(false)
  const [ genres, setGenres ] = useState()
  const [ countries, setCountries ] = useState()

  function showCreditCardInputs(e) {
    e.preventDefault()
    setCreditCard(true)
  }

  function hideCreditCardInputs(e) {
    e.preventDefault()
    setCreditCard(false)
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
              <form>

                <div className="row">

                  <div className="col-md-6">
                    <div className="data">

                      {/* heading */}
                      <h3 className="h3">Sus datos</h3>

                      {/* name */}
                      <FormGroup>
                        <Label htmlFor="fullName">Nombre completo</Label>
                        <Input defaultValue={user.name} id="fullName" name="fullName" required />
                      </FormGroup>

                      {/* genre */}
                      <FormGroup>
                        <Label htmlFor="genre">Género</Label>
                        <Select defaultValue={0} id="genre" name="genre" required>
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
                        <Input id="document" name="document" required type="text" />
                      </FormGroup>

                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="localization">
                      <h3 className="h3">Ubicación</h3>

                      {/* address */}
                      <FormGroup>
                        <Label htmlFor="address">Dirección</Label>
                        <Input id="address" name="address" required type="text" />
                      </FormGroup>

                      {/* city */}
                      <FormGroup>
                        <Label htmlFor="city">Ciudad</Label>
                        <Input id="city" name="city" required type="text" />
                      </FormGroup>

                      {/* country */}
                      <FormGroup>
                        <Label htmlFor="country">País</Label>
                        <Select defaultValue={0} id="country" name="country" required>
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

                {/* hr */}
                <hr className="hr" />

                <div className="row">

                  {/* package */}
                  <div className="col-md-4">
                    <PackageSelector intention={user.package_intention} />
                  </div>

                  {/* payment */}
                  <div className="col-md-8">
                    <h3 className="h3">Pago</h3>
                    <div className="row">
                      <div className="col-6">
                        <FormGroup>
                          <Input id="payment" onFocus={showCreditCardInputs} placeholder="Tarjeta de crédito" style={{ marginBottom: 5 }} type="text" />
                          <Input id="payment" onFocus={hideCreditCardInputs} placeholder="Tarjeta de débito" style={{ marginBottom: 5 }} type="text" />
                          <Input id="payment" onFocus={hideCreditCardInputs} placeholder="Recibo bancario" style={{ marginBottom: 5 }} type="text" />
                        </FormGroup>
                      </div>
                      <div className="col-6">
                        { creditCard && (
                          <div className="card-inputs">
                            <FormGroup>
                              <Label htmlFor="creditCardName">Nombre impreso</Label>
                              <Input id="creditCardName" name="creditCardName" required type="text" />
                            </FormGroup>
                            <FormGroup>
                              <Label htmlFor="creditCardNumber">Numero</Label>
                              <Input id="creditCardNumber" name="creditCardNumber" required type="text" />
                            </FormGroup>
                            <div className="row">
                              <div className="col-6">
                                <FormGroup>
                                  <Label htmlFor="creditCardDate">Validez</Label>
                                  <Input id="creditCardDate" name="creditCardDate" required type="text" />
                                </FormGroup>
                              </div>
                              <div className="col-6">
                                <FormGroup>
                                  <Label htmlFor="creditCardCode">
                                    <abbr title="Código de seguridad">CVV</abbr>
                                  </Label>
                                  <Input id="creditCardCode" name="creditCardCode" required type="text" />
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
                  <div className="col-6 offset-md-4" style={{ fontSize: 18}}>
                    <input type="checkbox" /> He leído y acepto el contrato de Dale Campéon
                  </div>
                  <div className="col-2 text-right">
                    <Button color="secondary" type="submit">Continuar</Button>
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
        .hr {
          margin-top: 15px;
          margin-bottom: 30px;
        }
        .card-inputs {
          margin-top: -21px;
        }
      `}</style>
    </Layout>
  );
}

const PackageSelector = ({intention}) => {

  const [pkg, setPkg] = useState(intention)
  const [items, setItems] = useState()

  /* get genres */
  useEffect(_ => {
    (async _ => {
      const {data} = await api.get('packages')
      setItems(data)
    })()
  }, [])

  function swapPlan(e) {
    e.preventDefault()
    if (items) {
      setPkg(items[parseInt(Math.random()*4)])
    }
  }

  return (
    <div className="package">
      <div className="row">
        <div className="col-9">
          <h3 className="h3">Plan seleccionado</h3>
        </div>
        <div className="col-3 align-self-start">
          <button className="swap-btn" onClick={swapPlan}>
            <img src="/static/icons/swap.svg" />
          </button>
        </div>
      </div>
      { pkg && (
        <div className="plan-card text-center">
          <h4>{ pkg.name }</h4>
          <h5>{ (pkg.currency === 'usd' ? '$' : '') + pkg.amount }</h5>
        </div>
      ) }
      <style jsx>{`
        .plan-card {
          border: 1px solid lightgray;
          border-radius: 3px;
          padding: 27px;
        }
        .card-inputs {
          margin-top: -21px;
        }
        .swap-btn {
          background-color: transparent;
          border: 0;
          display: block;
          font-size: 14px;
          line-height: 1;
          margin: 0 0 0 auto;
          outline: 0;
          padding: 1px 2px;
          width: auto;
        }
      `}</style>
    </div>
  )
}

RegisterConfirmPage.getInitialProps = () => {
}

export default RegisterConfirmPage
