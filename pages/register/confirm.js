import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Button from '~/components/button'
import H2 from "~/components/h2"
import Layout from "~/components/layout/Layout"
import withAuth from '~/components/withAuth'
import { CONFIG } from '~/config'

const RegisterConfirmPage = ({ layoutProps }) => {

  const router = useRouter()
  const download_link = router.query.download_link
  const link = router.query.link
  const [seconds, setSeconds] = useState(10)
  const [timer, setTimer] = useState(true)

  useEffect(_ => {
    if (timer) {
      const interval = setInterval(_ => {
        console.log('interval')
        setSeconds(seconds => {
          if (seconds - 1 <= 0) {
            clearInterval(interval)
            setTimer(false)
            window.open(download_link, '_blank');
          }
          return seconds - 1
        })
      }, 1000)
      return _ => clearInterval(interval)
    }
  }, [timer])

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
          <Button href={link} onClick={handleClick} target="_blank">Descargar<br/>
            Recibo Bancario</Button>
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

RegisterConfirmPage.getInitialProps = async ({ user }) => {
  // console.log('user that comes from withAuth', user)
}

export default withAuth(RegisterConfirmPage)
