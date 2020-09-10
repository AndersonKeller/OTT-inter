// nextjs imports
import Router from 'next/router'
import Head from 'next/head'

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
import CardLogoHeader from '~/components/CardLogoHeader/index'
import { StyleForm } from '~/components/layout/changeEmail/index'

const changeEmailPage = ({ layoutProps, user, updateUser }) => {

  const handleSubmit = async (fields, actions) => {
    var msg = ''

    try {
      const res = await api().post('email', fields)
      updateUser(res.data)
      msg = JSON.stringify({ success: "Acceda al correo electrónico para confirmación" })

    } catch (error) {
      var { message } = error.message ? error : error.response ? error.response.data : ''
      console.table(error);
      msg = JSON.stringify({ error: "An Error Occured while updating: " + message })
    } finally {
      nookies.set({}, 'flash_message', msg, { path: '/' })
      Router.push('/user/account')
    }
  }

  return (
    <Layout {...layoutProps}>


      <div className="detail">

        {user &&
          <Formik
            initialValues={
              (({ email: oldEmail }) => {
                return { oldEmail, email: '' }
              })(user)
            }
            validationSchema={getYupSchema()}
            onSubmit={handleSubmit}
            component={DataForm}
          />
        }
      </div>


    </Layout>
  );
}



const DataForm = ({ isSubmitting }) => <Form>



  <CardLogoHeader>
    <StyleForm>
      <h1 className="h2">Cambiar Email</h1>
      <div class="painel">
        <div className="row">
          <div style={{ width: "100%" }}>
            <FormGroup className="form-input">
              <FkInput name="oldEmail" label="Email Actual" type="email" disabled />
            </FormGroup>
          </div>
        </div>
      </div>
      <div className="row row-aling " >
        <div className="input-aling">
          <FormGroup className="form-input">
            <FkInput name="email" label="Nuevo Email" type="email" />
          </FormGroup>
        </div>
        <div style={{ padding: " 20px" }} >
          <Button style={{ bakground: "#008e38!important" }} type="submit" disabled={isSubmitting} loading={isSubmitting}>
            Aceptar
      </Button>
        </div>
      </div>
    </StyleForm>
  </CardLogoHeader >
</Form >
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
