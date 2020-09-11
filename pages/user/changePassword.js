// nextjs imports
import Router from 'next/router'
import Head from 'next/head'
// import Link   from 'next/link'

// react imports
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import nookies from 'nookies'

// app imports
import FormGroup from '~/components/layout/AuthModal/FormGroup'
import withAuth from '~/components/withAuth'
import { FkInput } from '~/components/Formik/fields'
import Layout from '~/components/layout/Layout'
import Button from '~/components/button'
import api from '~/services/api'
import { CONFIG } from '~/config'
import { StyleChangePassword } from '~/components/layout/changePassword/index'
import CardLogoHeader from '~/components/CardLogoHeader/index'

const passwordPage = ({ layoutProps, user }) => {

  const handleSubmit = async (fields, actions) => {
    var msg = undefined

    try {
      const { data: { message } } = await api().post('password', {
        email: fields.username,
        ...fields
      })
      msg = { success: message || "Cambio de datos completo." }

    } catch ({ response: { data: { errors } }, message: error }) {
      msg = errors ?
        actions.setErrors(errors) : { error: 'Problemas al realizar esta operación. Inténtalo de nuevo más tarde' }

      console.log(error)

    } finally {
      if (msg) {
        msg = JSON.stringify(msg)
        nookies.set({}, 'flash_message', msg, { path: '/' })
        Router.push('/user/account')
      }
    }
  }

  return (
    <Layout {...layoutProps}>
      <Head>
        <title>Cambiar la Contraseña &lt; {CONFIG.appName}</title>
      </Head>
      {user &&
        <Formik
          initialValues={
            (({ email: username }) => {
              return { username, oldpassword: '', password: '', password_confirmation: '' }
            })(user)
          }
          validationSchema={getYupSchema()}
          onSubmit={handleSubmit}
          component={DataForm}
        />
      }
      {/* <style jsx>{`
        .rgpage {
          padding-top: 40px;
          padding-bottom: 120px;
        }
        .h2 {
          margin-bottom: 10px;
        }
        hr {
          margin-top: 25px;
          margin-bottom: 15px;
          background-color: white;
        }
      `}</style> */}
    </Layout>
  );

}

const DataForm = ({ isSubmitting, status }) => <Form>
  {status && <div className="invalid-feedback"><h5>{status.error}</h5></div>}
  <CardLogoHeader>
    <StyleChangePassword>
      <h1 className="h2">Cambiar la contraseña</h1>

      <div class="painel">
        <div className="row" >
          <FormGroup>
            <FkInput name="username" type="hidden"
              label="Username" autoComplete="username" />
          </FormGroup>
        </div>
        <div className="row" >
          <FormGroup>
            <FkInput name="oldpassword" type="password"
              label="Contraseña anterior" autoComplete="current-password" />
          </FormGroup>
        </div>
        <div className="row" >
          <FormGroup>
            <FkInput name="password" type="password"
              label="Nueva contraseña" autoComplete="new-password" />
          </FormGroup>
        </div>
      </div>
      <div className="row row-aling">
        <div className="painel">
          <FormGroup >
            <FkInput name="password_confirmation" type="password"
              label="Confirmar nueva contraseña" autoComplete="new-password" />
          </FormGroup>
          <hr />
        </div>
        <div className=" aling-button">
          <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
            Aceptar
      </Button>
        </div>
      </div>

    </StyleChangePassword>
  </CardLogoHeader >
</Form >

// create Yup validation Schema
const getYupSchema = _ => {
  const nullable8CharMinString = Yup.string()
    .nullable().required('Obligatorio')
    .min(8, 'Debe tener 8 caracteres o más');

  return Yup.object({
    password: nullable8CharMinString
      .max(255, 'Debe tener 255 caracteres o menos'),
    password_confirmation: nullable8CharMinString
      .max(255, 'Debe tener 255 caracteres o menos')
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir'),
    oldpassword: Yup.string().nullable(),
  })
}

export default withAuth(passwordPage)
