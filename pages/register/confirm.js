import Router from 'next/router'
import nookies from 'nookies'
import { useEffect, useState } from 'react'
import Button from '~/components/button'
import H2 from '~/components/h2'
import Layout from '~/components/layout/Layout'
import withAuth from '~/components/withAuth'
import { CONFIG } from '~/config'

const RegisterConfirmPage = ({ downloadLink, layoutProps, link }) => {

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

  return (
    <Layout {...layoutProps}>
      <div className="register-confirm container text-center">

        <h1>Gracias</h1>

        <H2 mb={3} uppercase>¡Bienvenido a {CONFIG.appName}!</H2>

        <p className="lead register-confirm__lead">
          {timer ? <>
            El recibo bancario se descargará en {seconds} segundos.
          </> : <>
            Si la descarga no se inició automáticamente,<br className="d-none d-md-inline" /> ház click en el botón de abajo.
          </>}
        </p>

        <div className="register-confirm__btn-container">
          <Button href={link} onClick={handleClick} target="_blank">Abrir Recibo Bancario</Button>
        </div>

        {!timer && (
          <p className="small register-confirm__small">Su plan se activará después de la confirmación del pago.</p>
        )}

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
        .register-confirm__btn-container :global(.btn),
        .register-confirm__btn-container :global(.btn):active {
          border-bottom: 5px solid var(--primary-hover);
          line-height: 1;
        }
        .register-confirm__small {
          margin-top: 30px;
          opacity: .5;
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
