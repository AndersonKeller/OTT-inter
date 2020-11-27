// import sleep from 'sleep-promise'
import withAuth from "~/components/withAuth";
import React, { useContext, useEffect, useState } from 'react'
import UserContext from "~/contexts/UserContext";
import Button from "~/components/button";

import { TENANT } from "~/constants/constants";
import { CONFIG } from '~/config'
import Color from 'color'
import { ThemeContext } from 'styled-components'
import Layout from "~/components/layout/Layout";
import Header from "~/components/layout/HeaderCad";
import LogoApp from "~/components/LogoApp";
import Router from "next/router";


const Welcome = ({ layoutProps }) => {


  const [values, setValues] = useState({
    name: '',
  })

  const theme = useContext(ThemeContext);
  const primaryColor = Color(theme.colors.primary).hsl().string()
  const backgroundColor = Color(theme.colors.background)
    .hsl()
    .string();

  const { user } = useContext(UserContext)

  /* fill user form */
  useEffect(_ => {
    if (user) {
      console.log(user);
      setValues({
        ...values,
        name: user.name,
      })
    }
  }, [user])

  function completeProfile() {
    Router.push('/register/wizard/complete-test');
  }

  function appName() {
    if (CONFIG.projectName) {
      return <div style={ { display: 'inline-block' } }>
        <strong className="">{ CONFIG.projectName.split(' ')[0] }</strong>{ CONFIG.projectName.split(' ')[1] }
      </div>
    } else if (CONFIG.appName) {
      return <div style={ { display: 'inline-block' } }>
        <strong className="">{ CONFIG.appName.split(' ')[0] }</strong>{ CONFIG.appName.split(' ')[1] }
      </div>
    }
    return <div style={ { display: 'inline-block' } }>
      <strong className="">Project</strong>Name!
    </div>
  }

  return (

    <Layout header={ "hidden" } footer={ "hidden" } customClass={ "subscription-screen" }>
      <Header/>
      <div
        className="card-wrapper d-flex align-items-center justify-content-center h-100 responsive"
        style={ {
          backgroundImage: `url('/static/${ TENANT }/subs/background.jpeg')`,
        } }
      >
        <div className="card">
          <div className={ "card-header text-center" } style={ {
            backgroundColor: backgroundColor,
            padding: "25px 15px",
            border: "none",
            borderRadius: "0",
            justifyContent: "center",
            display: "flex",
            width: "100%",
          } }>
            <div className="img-logoApp-card img"><LogoApp/></div>
          </div>
          <div className="card-body">

            <div className="register-confirm container text-center">

              <h2 className="card-title">
                Bienvenido(a) <strong
                className="text-primary">{ values.name }</strong></h2>
              <div className={ "card-subtitle" }>
                Gracias por unirte a <br/>

                <img src={ `/static/${ TENANT }/logos/logo_gray.png` } alt={ CONFIG.appName } width={ 300 }
                     style={ { marginTop: "20px" } }/>
              </div>
              <div className="row">

                <div className="col-md-12" style={ { marginBottom: "20px" } }>
                  <div className="text-center">
                    <Button color="secondary" type="button"
                            style={ { width: "250px" } }
                            onClick={ () => completeProfile() }
                    >Completa tu perfil</Button>
                  </div>
                </div>

              </div>
              <style jsx global={ true }>{ `
        
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
        
        .text-primary {
           color: ${ primaryColor } !important;
        }
        
      ` }</style>
            </div>

          </div>
        </div>
      </div>
      <style sjx>{ `

    
        .signup-screen .card-wrapper .card .card-header
        .img-logoApp-card img,
        .subscription-screen .card-wrapper .card .card-header .img-logoApp-card img {
           width: 100%!important;
        }
        .signup-screen .card-wrapper .card .card-body, .subscription-screen .card-wrapper .card .card-body {
           height:100%!important;
          }

        .img-logoApp-card{
          max-width: 200px;
        }

         @media(max-width: 765px) {

        .responsive{
         padding: 127px 30px 15px 30px!important;
          // padding: 40px!important;
          padding: 0px;
          display: flex;
          flex-wrap: wrap;
          height:100%!important;

          }
         .card{
          //  height:100%!important;
           margin:10px 0px!important;
           background-color: rgba(255,255,255,0.85);

         }

        .card-body{
          background-image: url()!important;
          // height:100%!important;
         }

         label {
        display: inline-block;
         margin-bottom: .5rem;
         text-align: center;
            }

         .justify-content-end {
           display:flex;
           justify-content:center!important;
         }
         form{
           padding 0px!important;
         }
         .row {
          display: -ms-flexbox;
          display: flex;
          -ms-flex-wrap: wrap;
           margin-right: 0px;
           margin-left: 0px;
          }
        .col-8 {
         max-width: 100%!important;
          }
        }

      ` }

      </style>

    </Layout>


  )

}


export default withAuth(Welcome, true);
