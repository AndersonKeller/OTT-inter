// other imports
import Head from 'next/head'

// app imports
import Layout from '../../components/layout/Layout'
import { CONFIG } from '../../config'
import FormGroup from '../../components/layout/AuthModal/FormGroup';
import Label from '../../components/layout/AuthModal/Label';
import Input from '../../components/layout/AuthModal/Input';
import Button from '../../components/button';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../components/UserContext';
import Select from '../../components/Select/Select';
import api from '../../services/api';

// page
export default function RegisterConfirmPage({ layoutProps }) {

  const { user } = useContext(UserContext)
  const [ creditCard, setCreditCard ] = useState(false)
  const [ genres, setGenres ] = useState()

  function showCreditCardInputs(e) {
    e.preventDefault();
    setCreditCard(true)
  }

  function hideCreditCardInputs(e) {
    e.preventDefault();
    setCreditCard(false)
  }

  useEffect(_ => {
    (async _ => {
      const {data} = await api.get('user_genres')
      setGenres(data)
    })()
  })

  return (
    <Layout color="white" {...layoutProps}>
      <Head>
        <title>Confirmación &lt; Registro &lt; {CONFIG.appName}</title>
      </Head>
      <div className="rgpage container-fluid">
        <div className="row">
          <div className="col-xl-8 offset-xl-2">

            <h1 className="h2">Completa tu registro</h1>

            <div className="row">

              <div className="col-md-6">
                <div className="data">
                  <h3 className="h3">Sus datos</h3>
                  <FormGroup>
                    <Label htmlFor="fullName">Nombre completo</Label>
                    <Input id="fullName" name="fullName" value={user ? user.name : ''} />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="genre">Género</Label>
                    <Select id="genre" name="genre">
                      <option disabled selected>Selecciona tu genero</option>
                      { genres && genres.length && genres.map((genre, key) => (
                        <option key={key} value={genre.id}>{genre.name}</option>
                      ))}
                    </Select>
                  </FormGroup>
                  <FormGroup>
                    <Label hmtlFor="document">Documento</Label>
                    <Input id="document" type="text" />
                  </FormGroup>
                </div>
              </div>

              <div className="col-md-6">
                <div className="localization">
                  <h3 className="h3">Ubicación</h3>
                  <FormGroup>
                    <Label hmtlFor="address">Dirección</Label>
                    <Input id="address" type="text" />
                  </FormGroup>
                  <FormGroup>
                    <Label hmtlFor="city">Ciudad</Label>
                    <Input id="city" type="text" />
                  </FormGroup>
                  <FormGroup>
                    <Label hmtlFor="country">País</Label>
                    <Input id="country" type="text" />
                  </FormGroup>
                </div>
              </div>
            </div>

            <hr className="hr" />

            <div className="row">
              <div className="col-md-4">
                <h3 className="h3">Plan</h3>
                <div className="plan-card text-center">
                  <h4>3 Meses</h4>
                  <h5>$297</h5>
                </div>
              </div>
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
                      <div className="card-inputs" style={{marginTop: -21}}>
                        <FormGroup>
                          <Label hmtlFor="country">Nombre impreso</Label>
                          <Input id="country" type="text" />
                        </FormGroup>
                        <FormGroup>
                          <Label hmtlFor="country">Numero</Label>
                          <Input id="country" type="text" />
                        </FormGroup>
                        <div className="row">
                          <div className="col-6">
                            <FormGroup>
                              <Label hmtlFor="country">Validez</Label>
                              <Input id="country" type="text" />
                            </FormGroup>
                          </div>
                          <div className="col-6">
                            <FormGroup>
                              <Label hmtlFor="country"><abbr title="Código de seguridad">CVV</abbr></Label>
                              <Input id="country" type="text" />
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
                <Button color="secondary">Continuar</Button>
              </div>
            </div>

            {/* <p>Acceda al correo electrónico registrado para confirmar su cuenta.</p> */}

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
        .h3 {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .hr {
          margin-top: 15px;
          margin-bottom: 30px;
        }
        .plan-card {
          border: 1px solid lightgray;
          border-radius: 5px;
          padding: 30px;
        }
      `}</style>
    </Layout>
  );
}
