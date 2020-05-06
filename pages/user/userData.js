// next
import Router from 'next/router'
import Head   from 'next/head'

// react
import nookies  from 'nookies'

//components
import Layout       from '~/components/layout/Layout'
import UserForm     from '~/components/form-user'
import withAuth     from '~/components/withAuth'
import api          from '~/services/api'
import { CONFIG }   from '~/config'

const userDataPage = ({ layoutProps, user, updateUser }) => {

  const initialValues = (({gender_id: gender, country_id: country, ...data}) => {
    return {gender, country, ...data}})(user)

  const handleSubmit = async  (fields, actions) => {
    var msg = ''

    try{
      const res = await api().post(`user/${user.id}`, fields)
      updateUser(res.data)
      msg = JSON.stringify({ success: "Cambio de datos completo." })

    }catch(error) {
      var { message } = error.message ? error : error.response ? error.response.data : ''
      msg = JSON.stringify({ error: "An Error Occured while updating: " + message })

    }finally{
      nookies.set({}, 'flash_message', msg , { path: '/' })
      Router.push('/user/account')
    }
  }

  return (
    <Layout {...layoutProps}>
      <Head>
        <title>Mi Cuenta &lt; {CONFIG.appName}</title>
      </Head>
      <div className="rgpage container-fluid">
        <div className="row">
          <div className="col-xl-8 offset-xl-2">
            <h1 className="h2">Datos Personales</h1>
            <hr />
              {user &&
                <UserForm {...{handleSubmit, initialValues}} button />
              }
          </div>
        </div>
      </div>
      <style jsx>{`
        .rgpage {
          padding-top: 40px;
          padding-bottom: 120px;
        }
        .h2 {
          margin-bottom: 10px;
        }
        :global(.h3) {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        hr {
          margin-top: 25px;
          margin-bottom: 15px;
          background-color: white;
        }
      `}</style>
    </Layout>
  );
}

export default withAuth(userDataPage)
