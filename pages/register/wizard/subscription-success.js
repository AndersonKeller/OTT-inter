// import sleep from 'sleep-promise'
import withAuth from "~/components/withAuth";
import { useContext, useEffect, useState } from 'react'
import UserContext from "~/contexts/UserContext";
import Button from "~/components/button";

import Color from 'color'
import { ThemeContext } from 'styled-components'


const SubscriptionSuccess = ({ layoutProps }) => {

  const theme = useContext(ThemeContext)

  const primaryColor = Color(theme.colors.primary).hsl().string()

  const [values, setValues] = useState({
    name: '',
  })

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

  return (
    <div className="register-confirm container text-center">

      <h2 className="card-title">
        Bienvenido <strong
        className="text-primary">{ values.name }</strong></h2>
      <div className={ "card-subtitle" }>
        Gracias por completar tu perfil de <br/>
        <img src="/static/atlnacional/logos/logo_project.png" alt="Nacional play"/>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="text-center">
            <Button color="secondary" type="button"
                    style={ { width: "250px" } }
            >Ir a NacionalPlay</Button>
          </div>
        </div>
      </div>
      <style jsx>{ `
        
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
        
      ` }</style>
    </div>
  )
}


export default withAuth(SubscriptionSuccess, true);
