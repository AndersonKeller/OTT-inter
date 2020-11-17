// import sleep from 'sleep-promise'
import withAuth from "~/components/withAuth";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "~/contexts/UserContext";

import { TENANT } from "~/constants/constants";
import { CONFIG } from "~/config";
import Color from "color";
import { ThemeContext } from "styled-components";

const SubscriptionSuccess = ({ handleFormState }) => {
  // const SubscriptionSuccess = ({ layoutProps }) => {

  const theme = useContext(ThemeContext);

  const primaryColor = Color(theme.colors.primary)
    .hsl()
    .string();

  const [values, setValues] = useState({
    name: ""
  });

  const { user } = useContext(UserContext);

  /* fill user form */
  useEffect(
    _ => {
      if (user) {
        console.log(user);
        setValues({
          ...values,
          name: user.name
        });
      }
    },
    [user]
  );

  function appName() {
    if (CONFIG.projectName) {
      return (
        <div style={ { display: "inline-block" } }>
          <strong className="">{ CONFIG.projectName.split(" ")[0] }</strong>
          { CONFIG.projectName.split(" ")[1] }
        </div>
      );
    } else if (CONFIG.appName) {
      return (
        <div style={ { display: "inline-block" } }>
          <strong className="">{ CONFIG.appName.split(" ")[0] }</strong>
          { CONFIG.appName.split(" ")[1] }
        </div>
      );
    }
    return (
      <div style={ { display: "inline-block" } }>
        <strong className="">Project</strong>Name!
      </div>
    );
  }

  return (
    <div className="register-confirm container text-center">
      <h2 className="card-title">
        Bienvenido(a) <strong className="text-primary">{ values.name }</strong>
      </h2>
      <div className={ "card-subtitle" }>

        <p>
          Gracias por completar tu suscripción a La U Play en esta etapa.
        </p>

        <br/>

        <p>
          Tu plan comenzará a correr desde el día del lanzamiento oficial, mismo tiempo desde el cual podrás disfrutar de
          esta nueva experiencia.
        </p>

        <br/>

        <p>
          Te llegará un correo electrónico a la dirección que registraste con todos los detalles del pago.
        </p>

        <br/>

        <img src={ `/static/${ TENANT }/logos/logo_gray.png` } alt={ CONFIG.appName } width={ 300 }
             style={ { marginTop: "20px" } }/>

      </div>

      {/*<div className="row">*/ }
      {/*  <div className="col-md-12">*/ }
      {/*    <div className="text-center">*/ }
      {/*      <Button*/ }
      {/*        color="secondary"*/ }
      {/*        type="button"*/ }
      {/*        style={{ width: "250px" }}*/ }
      {/*        onClick={() =>*/ }
      {/*          Router.push(*/ }
      {/*            {*/ }
      {/*              pathname: "/"*/ }
      {/*            },*/ }
      {/*            "/"*/ }
      {/*          )*/ }
      {/*        }*/ }
      {/*      >*/ }
      {/*        Ir a {appName()}*/ }
      {/*      </Button>*/ }
      {/*    </div>*/ }
      {/*  </div>*/ }
      {/*</div>*/ }
      
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
  );
};

export default withAuth(SubscriptionSuccess, true);
