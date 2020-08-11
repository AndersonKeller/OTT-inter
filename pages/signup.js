import Layout from "~/components/layout/Layout";
import React, { useContext, useState } from "react";
import { CLIENT_ID, CLIENT_SECRET, IS_PRODUCTION } from "~/constants/constants";
import FormGroup from "~/components/layout/AuthModal/FormGroup";
import Input from "~/components/layout/AuthModal/Input";
import Button from "~/components/button";
import OrEnterWith from "~/components/layout/AuthModal/OrEnterWith";
import SocialButtons from "~/components/layout/AuthModal/SocialButtons";
import nookies from "nookies";
import UserContext from "~/contexts/UserContext";
import { ThemeContext } from "styled-components";
import Color from "color";
import Label from "~/components/Form/Label";
import InvalidFeedback from "~/components/Form/InvalidFeedback";
import { setAccessToken } from "~/services/auth";
import Router from "next/router";
import api from '../services/api'

const Signup = ({  }) => {


  const handleInputChange = e => {
    const { checked, name, value, type } = e.target
    setValues({
      ...values,
      [name]: type === 'checkbox' ?
        (checked ? (value === 'true' ? true : value) : false) :
        value,
    })
  }

  const theme = useContext(ThemeContext)
  const primaryColor = Color(theme.colors.primary).hsl().string()

  const { signIn } = useContext(UserContext)
  const requireds = IS_PRODUCTION

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    terms: false
  })

  const [loading, setLoading] = useState()
  const [error, setError] = useState()

  const socialLogin = async e => {
    let provider = e.currentTarget.innerText;
    try {
      nookies.set({}, 'pkg_int_id', JSON.stringify(packageId), { path: '/' })
      const res = await api().get(`auth/${ provider }`)
      // console.table(res)
      // console.log(res.data.url)
      window.location = res.data.url

    } catch (error) {
      console.table(error)
    }

  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const tokenResponse = await api().post('register', {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        email: values.email,
        name: values.name,
        password: values.password,
      })
      const { access_token, } = tokenResponse.data
      setAccessToken(access_token)
      const userResponse = await api().get('user')
      signIn(userResponse.data, tokenResponse.data)
      Router.push({
        pathname: '/subscribe'
      }, '/register/wizard/complete-test')
    } catch (error) {
      if (error.response) {
        setError(error.response.data)
      } else {
        setError('An error has occurred!')
        console.log('error', error)
      }
    }
    setLoading(false)
  }

  return (

    <Layout header={ "hidden" } footer={ "hidden" }>
      <div
        className="d-flex align-items-center justify-content-center h-100"
        style={ {
          padding: "50 20",
          backgroundImage: "url('/static/atlnacional/subs/background.jpg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        } }>
        <div className="card" style={ {
          width: "100%",
          maxWidth: "800px",
          margin: "50px 0",
          backgroundColor: "rgba(255,255,255,0.85)",
          borderRadius: "0",
          border: "none"
        } }>
          <div className={ "card-header text-center" } style={ {
            backgroundColor: "#000",
            padding: "25px 15px",
            border: "none",
            borderRadius: "0",
          } }>
            <img src="/static/atlnacional/logos/logo_project.png" alt="Nacional Play"/>
          </div>
          <div className="card-body" style={
            {
              backgroundImage: "url('/static/atlnacional/subs/bg_modal.png')",
              backgroundRepeat: "no-repeat",
              height: "600px"
            }
          }>
            <h2 className="card-title text-center"><span className={ "text-primary" }>¡</span>Sé parte de <strong
              className="text-primary">NACIONAL</strong>PLAY<span className={ "text-primary" }>!</span></h2>

            <div className="row w-100 justify-content-end">
              <div className="col-8">
                <form method="post" onSubmit={ handleSubmit } style={
                  {
                    maxWidth: "480px",
                    display: "block",
                    padding: "14px 0px 10px 100px",
                  }
                }>

                  { error && <div className="invalid-feedback">{ error.message }</div> }

                  <FormGroup>
                    <Label htmlFor="name" className="text-dark">Nombre completo</Label>
                    <Input
                      id="name"
                      name="name"
                      value={ values.name }
                      onChange={ handleInputChange }
                      required
                      // onChange={ handleInputChange }
                    />
                    <InvalidFeedback error={ error } loading={ loading } name="name"/>
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="name" className="text-dark">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={ values.email }
                      onChange={ handleInputChange }
                      required
                    />

                    <InvalidFeedback error={ error } loading={ loading } name="email"/>
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="name" className="text-dark">Clave</Label>
                    <Input
                      id="password"
                      name="password"
                      required
                      type="password"
                      value={values.password}
                      onChange={ handleInputChange }
                    />
                    <InvalidFeedback error={ error } loading={ loading } name="password"/>
                  </FormGroup>

                  <div className="already-subscriptor">
                    {/*<span>{ alreadyRegistered }</span>*/ }
                    { ' ' }
                    {/*<a className="bold text-uppercase" href="/login" onClick={ goToLogin }>{ login }</a>*/ }
                  </div>
                  <OrEnterWith/>
                  <SocialButtons socialLogin={ socialLogin }/>

                  <FormGroup>
                    <label className="terms">
                      <input
                        checked={ values.terms }
                        name="terms"
                        onChange={ handleInputChange }
                        // required={ requireds }
                        type="checkbox"
                        value={ `true` }
                      />
                      <span className="text-dark" style={ { paddingLeft: "10px" } }>He leído y acepto el contrato de NacionalPlay</span>
                    </label>
                    <InvalidFeedback error={ error } loading={ loading } name="terms"/>
                  </FormGroup>

                  <div className="already-subscriptor">
                    <span>¿Ya estás registrado?</span>
                    { ' ' }
                    <a className="bold text-uppercase" href="/login">Inicia sesión</a>
                  </div>

                  <Button block className="enter-btn" size="sm" type="submit" loading={ loading }
                          disabled={ loading }>Registrar</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <style jsx global>{ `
        
        h2.card-title {
          font-weight: normal;
          color: #000;
          margin-bottom: 1em;
          font-size: 1.7em;
        }
        div.card-subtitle {
          font-size: 1.1em;
          font-weight: 500;
          margin-bottom: 2.5em;
        }
        
        .text-primary {
           color: ${ primaryColor } !important;
        }
        .register-confirm {
          padding-top: 50px;
          padding-bottom: 50px;
          color: #666666;
        } 
        .or-enter-with {
          align-items: center;
          display: flex;
          font-size: 18px;
          margin-bottom: 20px;
          color: #666;
        }
        .or-enter-with::before,
        .or-enter-with::after {
          border-top: 2px solid rgba(var(--gray2-rgb), .55);
          content: '';
          display: block;
          margin-right: -5px;
          margin-left: -5px;
          flex-grow: 1;
        }
        .or-enter-with::before {
          margin-right: 15px;
        }
        .or-enter-with::after {
          margin-left: 15px;
        }
        .social-btns {
          margin-bottom: 1.2em;
        }
        
        .already-subscriptor {
          font-size: 16px;
          margin-bottom: 20px;
          text-align: center;
          color: #666;
        }
        .already-subscriptor a {
          color: inherit;
        }
      ` }</style>
      </div>
    </Layout>

  )

}


export default Signup;