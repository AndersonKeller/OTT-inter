// import sleep from 'sleep-promise'
import withAuth from "~/components/withAuth";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "~/contexts/UserContext";
import { CONFIG } from "~/config";
import Color from "color";
import { ThemeContext } from "styled-components";
import Button from "~/components/button";
import Router from "next/router";

const SubscriptionSuccess = ({ formData, handleFormState }) => {
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
    return CONFIG.appName;
  }

  function renderText() {
    if (formData.package_id != 1) {
      return <div>
        <p>
          Tu plan comenzará a correr desde el día del lanzamiento oficial, mismo tiempo desde el cual podrás disfrutar
          de
          esta nueva experiencia.
        </p>

        <br/>

        <p>
          Te llegará un correo electrónico a la dirección que registraste con todos los detalles del pago.
        </p>
      </div>
    } else {
      return <div></div>
    }
  }

  return (
    <div className="register-confirm container text-center">
      <h2 className="card-title">
        Bienvenido(a) <strong className="text-primary">{ values.name }</strong>
      </h2>
      <div className={ "card-subtitle" }>

        <p>
          Gracias por completar tu suscripción a <strong>{ CONFIG.appName }</strong> en esta etapa.
        </p>

        <br/>


        { renderText() }

        <br/>

      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="text-center">
            <Button
              color="secondary"
              type="button"
              style={ { width: "250px" } }
              onClick={ () =>
                Router.push(
                  {
                    pathname: "/"
                  },
                  "/"
                )
              }
            >
              { formData.package_id === 1 ? `Volver al menú principal` : `Ir a ${ appName() }` }
            </Button>
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
  );
};

export default withAuth(SubscriptionSuccess, true);
