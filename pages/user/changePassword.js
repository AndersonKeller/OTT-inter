// nextjs imports
import Router from 'next/router'
import Head   from 'next/head'
// import Link   from 'next/link'

// react imports
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import nookies  from 'nookies'

// app imports
import FormGroup    from '~/components/layout/AuthModal/FormGroup'
import withAuth     from '~/components/withAuth'
import { FkInput }  from '~/components/Formik/fields'
import Layout       from '~/components/layout/Layout'
import Button       from '~/components/button'
import api          from '~/services/api'
import { CONFIG }   from '~/config'

const passwordPage = ({ layoutProps, user }) => {

  const handleSubmit = async  (fields, actions) => {
    var msg = undefined

    try {
      const { data:{ message } } = await api().post('password', {
        email: fields.username,
        ...fields
      })
      msg = { success: message || "Cambio de datos completo." }

    }catch({ response:{ data:{ errors } }, message: error }) {
      msg = errors ?
        actions.setErrors(errors) : { error: 'Problemas al realizar esta operación. Inténtalo de nuevo más tarde' }

      console.log(error)

    }finally {
      if(msg) {
        msg = JSON.stringify(msg)
        nookies.set({}, 'flash_message', msg , { path: '/' })
        Router.push('/user/account')
      }
    }
  }

  return (
    <Layout {...layoutProps}>
      <Head>
        <title>Cambiar la Contraseña &lt; {CONFIG.appName}</title>
      </Head>
      <div className="rgpage container-fluid">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1 className="h2">Cambiar la Contraseña</h1>
            { user &&
              <Formik
                initialValues={
                  (({ email:username }) => {
                    return { username, oldpassword: '', password: '', password_confirmation: '' }})(user)
                }
                validationSchema={ getYupSchema() }
                onSubmit={handleSubmit}
                component={DataForm}
              />
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
        hr {
          margin-top: 25px;
          margin-bottom: 15px;
          background-color: white;
        }
      `}</style>
    </Layout>
  );

}

const DataForm = ({ isSubmitting, status }) =>
  <Form>
    { status && <div className="invalid-feedback"><h5>{status.error}</h5></div> }
    <FormGroup>
      <FkInput name="username" type="hidden"
        label="Username" autoComplete="username" />
    </FormGroup>
    <FormGroup>
      <FkInput name="oldpassword" type="password"
        label="Contraseña anterior" autoComplete="current-password" />
    </FormGroup>
    <FormGroup>
      <FkInput name="password" type="password"
        label="Nueva contraseña" autoComplete="new-password" />
    </FormGroup>
    <FormGroup>
      <FkInput name="password_confirmation" type="password"
        label="Confirmar nueva contraseña" autoComplete="new-password" />
    </FormGroup>
    <hr />

    <div className="row">
      <div className="col-md-12 text-right">
        <Button color="danger" type="submit" disabled={isSubmitting} loading={isSubmitting}>
          Cambiar datos
        </Button>
      </div>
    </div>
  </Form>

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
