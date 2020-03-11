// nextjs imports
import Router from 'next/router'
import Head   from 'next/head'

// react imports
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import nookies from 'nookies'

// app imports
import FormGroup    from '../../components/layout/AuthModal/FormGroup'
import withAuth     from '../../components/withAuth/withAuth'
import { FkInput }  from '../../components/Formik/fields'
import Layout       from '../../components/layout/Layout'
import Button       from '../../components/button'
import api          from '../../services/api'
import { CONFIG }   from '../../config'

const changeEmailPage = ({ layoutProps, user, updateUser }) => {

  const handleSubmit = async (fields, actions) => {
    var msg = ''

    try {
      const res = await api().post('email',fields)
      updateUser(res.data)
      msg = JSON.stringify({ success: "Acceda al correo electrónico para confirmación" })

    }catch(error) {
      var { message } = error.message ? error : error.response ? error.response.data : ''
      console.table(error);
      msg = JSON.stringify({ error: "An Error Occured while updating: " + message })
    }finally {
      nookies.set({}, 'flash_message', msg , { path: '/' })
      Router.push('/user/account')
    }
  }

  return (
    <Layout {...layoutProps}>
      <Head>
        <title>Cambiar Email &lt; {CONFIG.appName}</title>
      </Head>
      <div className="rgpage container-fluid">
        <div className="row">
          <div className="col-xl-8 offset-xl-2">
            <h1 className="h2">Cambiar Email</h1>

            { user &&
              <Formik
                initialValues={
                  (({ email: oldEmail }) => {
                    return {oldEmail, email: ''}})(user)
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
        @media (min-width: 768px) {
          .card-inputs {
            margin-top: -21px;
          }
        }
      `}</style>
    </Layout>
  );
}

const DataForm = ({ isSubmitting }) =>
  <Form>
    <hr />
    <div className="row">
      <div className="col-md-8">
        <div className="data">
          <FormGroup>
            <FkInput name="oldEmail" label="Email Actual" type="email" disabled />
          </FormGroup>
          <FormGroup>
            <FkInput name="email" label="Nuevo Email" type="email" autoFocus />
          </FormGroup>
        </div>
      </div>
    </div>

    <div className="row align-items-center">
      <div className="col-md-12 offset-md-2 text-left">
        <Button color="danger" type="submit" disabled={isSubmitting}>Cambiar datos</Button>
      </div>
    </div>
  </Form>

// create Yup validation Schema
const getYupSchema = _ => {
  const nullable3CharMinString = Yup.string()
    .trim().nullable()
    .required('Obligatorio')
    .min(3, 'Debe tener 3 caracteres o más.')

  return Yup.object({
    email: nullable3CharMinString
      .email('Correo inválido'),
  })
}

export default withAuth(changeEmailPage)
