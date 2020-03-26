import { useRouter } from 'next/router'
import Layout from "~/components/layout/Layout"
import H2 from "~/components/h2"
import { CONFIG } from '~/config'
import { STATIC_PATH } from '~/constants/constants'
import withAuth from '~/components/withAuth'

const RegisterConfirmPage = ({ layoutProps }) => {

  const router = useRouter()
  const download_link = router.query.download_link
  const link = router.query.link

  if (download_link && window) {
    setTimeout(_ => {
      window.open(download_link, '_self');
    }, 1000)
  }

  return <Layout {...layoutProps}>
    <div className="container text-center">

      <h1>¡Gracias!</h1>

      <H2 mb={6} uppercase>Bienvenido a <img alt={CONFIG.appName} className="text-uppercase" src={`${STATIC_PATH}/logos/app.svg`} width="110" height="23" style={{ verticalAlign: 0 }} /></H2>

      <p>Tu plan estará activo después de la confirmación de pago.</p>
      <p><small>Si la descarga del boleto no se inicia, ház <a href={link} target="_blank">click aqui</a>.</small></p>
    </div>
    <style jsx>{`
      .container {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: center;
      }
      h1 {
        color: var(--primary);
      }
      small {
        color: var(--gray);
      }
    `}</style>
  </Layout>
}

export default withAuth(RegisterConfirmPage)
