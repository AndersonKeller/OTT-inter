import Router from 'next/router'
import nookies from 'nookies'
import { useEffect, useState, useContext } from 'react'
import Button from '~/components/button'
import H2 from '~/components/h2'
import Layout from '~/components/layout/Layout'
import withAuth from '~/components/withAuth'
import { CONFIG } from '~/config'
import { STATIC_PATH, TENANT } from '~/constants/constants'
import LogoApp from '~/components/LogoApp';
import UserContext from '~/contexts/UserContext'

const RegisterConfirmPage = ({ downloadLink, layoutProps, link }) => {

  const { signOut, user } = useContext(UserContext)

  const [seconds, setSeconds] = useState(10)
  const [timer, setTimer] = useState(true)

  // useEffect(_ => {
  //   if (timer) {
  //     const interval = setInterval(_ => {
  //       setSeconds(seconds => {
  //         if (seconds - 1 <= 0) {
  //           clearInterval(interval)
  //           setTimer(false)
  //           window.open(downloadLink, '_self');
  //         }
  //         return seconds - 1
  //       })
  //     }, 1000)
  //     return _ => clearInterval(interval)
  //   }
  // }, [timer])

  function handleClick() {
    setTimer(false)
  }

    function getUserName() {
    const nameArray = user.name.split(' ')
    const userName = nameArray.length > 1 ?
      `${nameArray[0]} ${nameArray[nameArray.length - 1]}` : nameArray.join('')
    return userName
  }

  return (
    <Layout {...layoutProps}>
      {/* <div className="register-confirm container text-center"> */}
           <div
        className="card-wrapper d-flex align-items-center justify-content-center h-100 responsive"
        style={{
          backgroundImage: `url('/static/${TENANT}/subs/background.jpg')`,
        }}
      >
      <div className="card">
          <div className={"card-header text-center"} style={{
            backgroundColor: "#242627",
            padding: "25px 15px",
            border: "none",
            borderRadius: "0",
            justifyContent: "center",
            display: "flex",
            width: "100%",
          }}>
            <div className="img-logoApp-card img"> <LogoApp /></div>
          </div>
          <div className="card-body">
            <div className="aling-row">
            {/* {renderComponents()} */}
            <h2 className="h2" mb={3} uppercase>¡Bienvenido 
            {/* <span className="nombre-title"> { getUserName() }</span> */}
            </h2>
            </div>

        <div className="aling-row">
          <H2 className="text-center-gracias" style={{color:"#6b6868", width:"305px"}}>Gracias por completar tu perfil de </H2>
        </div>
        
         <div className="register-confirm__btn-container btn-confirm">
          <Button  href="/index" target="_blank">Ir a LaUPlay  <span></span></Button>
        </div>
        {/* <div className="register-confirm__btn-container">
          <Button href={link} onClick={handleClick} target="_blank">Abrir Recibo Bancario</Button>
        </div> */}

        {!timer && (
          <p className="small register-confirm__small">Su plan se activará después de la confirmación del pago.</p>
        )}
       

          </div>
        </div>
      </div>
      <style jsx>{`
        .register-confirm {
          align-items: center;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: center;
          line-height: normal;
          padding-bottom: 2.5%;
        }
        h1 {
          color: var(--primary);
        }
        .register-confirm__lead {
          margin-bottom: 30px;
        }
        .btn-confirm{
            justify-content: center;
         display: flex;
        }
        .register-confirm__btn-container :global(.btn),
        .register-confirm__btn-container :global(.btn):active {
       
          font-size:24px!important;
          line-height: 1;
          width: 40%;
          border: solid 1px;
          color:red!important;
          background-color:white!important;
        }
        .register-confirm__small {
          margin-top: 30px;
          opacity: .5;
        }

        h2{
          color:black!important;
        }

        .nombre-title{
          color:red!important;
        }



         div.card-subtitle {
          font-size: 1.1em;
          font-weight: 500;
          margin-bottom: 2.5em;
          max-width: 380px;
        }

        .register-confirm {
          padding-top: 50px;
          padding-bottom: 50px;
          color: #666666;
        }
        
      .aling-row {
          display: flex;
          justify-content: center;
          padding: 5px;
         text-align: center;
      }
  

      .card {
        width: 100%;
        max-width: 800px;
        margin: 110px 0;
        background-color: rgba(255, 255, 255, 0.85);
        border-radius: 0;
        border: none;

      }

     @media(max-width: 765px) {

        .register-confirm__btn-container :global(.btn),
        .register-confirm__btn-container :global(.btn):active {
          width: 80%;
        }

        .responsive {
          padding: 20px 30px 15px 30px!important;
          padding: 0px;
          display: flex;
          flex-wrap: wrap;
          height: 100%!importat;
          justify-content: center;
          height:100%!important;
        }

        .aling-row {
          display: flex;
          justify-content: center;
          padding: 5px;
          text-align: center;     
         }
    
         .card-body {
          background-image: url()!important;
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

         form {
          padding 0px!important;
         }

        .row {
       
          display: -ms-flexbox;
          display: flex;
          -ms-flex-wrap: wrap;
          margin-right: 0px;
          margin-left: 0px;
          justify-content: center;
          padding: 5px;
        }

        .col-8 {
          max-width: 100%!important;
        }
  
        .offset-3 {
         margin-left:0px;
       }


      `}</style>
    </Layout>
  )
}

RegisterConfirmPage.getInitialProps = async ctx => {

  const {api, query, res, user} = ctx

  // if the user hasn't completed the registry
  if (!user.register_completed_at) {
    const message = JSON.stringify({ info: 'Necesitas completar tu registro.' })
    nookies.set(ctx, 'flash_message', message, { path: '/' })
    if (res) {
      res.redirect('/register/wizard/complete-test')
      res.end()
      return {}
    } else {
      Router.back()
    }
  }

  // // get download_link and link from router query if it comes
  // let {download_link: downloadLink, link} = query
  //
  // // if it doesn't come, try to get the last cash order
  // if (!downloadLink || !link) {
  //   const {data: cashOrder} = await api.get('cash-orders/last');
  //
  //   // if no pending cash order is found, redirect to user account
  //   if (!cashOrder) {
  //     const message = JSON.stringify({ info: 'No tiene recibos bancarios abiertos.' })
  //     nookies.set(ctx, 'flash_message', message, { path: '/' })
  //     if (res) {
  //       res.redirect('/user/account')
  //       res.end()
  //       return {}
  //     } else {
  //       Router.back()
  //     }
  //   }
  //
  //   downloadLink = cashOrder.download_link
  //   link = cashOrder.link
  // }

  return {}
}

export default withAuth(RegisterConfirmPage, true)
