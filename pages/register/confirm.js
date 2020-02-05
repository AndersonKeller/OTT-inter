import Layout from "../../components/layout/Layout"
import H1 from "../../components/h1"
import H2 from "../../components/h2"

const RegisterConfirmPage = ({ layoutProps }) => {
  return <Layout {...layoutProps}>
    <div className="container text-center">
      <h1>Gracias!</h1>

      <H2 mb={6} uppercase>Bienvenido a Dale.</H2>

      {/* <h1>Bienvenido a Dale.</h1> */}
      {/* <h2>Bienvenido a Dale.</h2> */}

      <p>Su plan estará activo después de la confirmación del pago.</p>
      <p><small>Si la descarga del boleto no se inicia, haga <a href="" target="_blank">clic aquí</a>.</small></p>
    </div>
    <style jsx>{`
      .container {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: center;
      }
    `}</style>
  </Layout>
}

export default RegisterConfirmPage
