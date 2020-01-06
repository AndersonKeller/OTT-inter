import Head from 'next/head'
import { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import { CONFIG } from '../../config'
import UserContext from '../../contexts/UserContext'

const AccountPage = ({ layoutProps }) => {

  const { user } = useContext(UserContext)

  return (
    <Layout {...layoutProps}>
      <Head>
        <title>{CONFIG.appName}</title>
      </Head>
      <div className="col-10 offset-1">
        <h2>Cuenta</h2>
        <p>Nombre: { user.name }</p>
        <h2>Detalles del plan</h2>
        <table>
          <thead>
          </thead>
          <tbody>
            <tr>
              {/* <td>Pacote</td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default AccountPage
