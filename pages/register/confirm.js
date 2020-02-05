import { useRouter } from 'next/router'
import Layout from "~/components/layout/Layout"
import H2 from "~/components/h2"

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

      <h1>Gracias!</h1>

      <H2 mb={6} uppercase>Bienvenido a Dale.</H2>

      <p>Su plan estará activo después de la confirmación del pago.</p>
      <p><small>Si la descarga del boleto no se inicia, haga <a href={link} target="_blank">clic aquí</a>.</small></p>
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

export default RegisterConfirmPage
