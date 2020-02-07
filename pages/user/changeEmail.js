// nextjs imports
import Router from 'next/router'
import Head   from 'next/head'
// import Link   from 'next/link'

// react imports
import { useEffect, useState }  from 'react'
import { Formik, Form, useField }           from 'formik'
import * as Yup from 'yup'

import nookies from 'nookies'

// app imports
import FormGroup    from '../../components/layout/AuthModal/FormGroup'
import Label        from '../../components/layout/AuthModal/Label'
import Input        from '../../components/layout/AuthModal/Input'
import withAuth     from '../../components/withAuth/withAuth'
import Select       from '../../components/Select/Select'
import Layout       from '../../components/layout/Layout'
import Packages     from '../../components/Packages'
import Button       from '../../components/button'
import api          from '../../services/api'
import { CONFIG }       from '../../config'

const changeEmailPage = ({ layoutProps, user, updateUser }) => {

  // create formik input field
  const FkInputText = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
      <>
        <Label htmlFor={props.id || props.name}>{label}</Label>
        <Input style={{color: 'black'}} {...field} {...props} />
        {meta.touched && meta.error ? ( <div className="invalid-feedback">{ meta.error }</div> ) : null}
      </>
    )
  }


// create Yup validation Schema
  const nullable3CharMinString = Yup.string()
    .trim().nullable()
    .required('Obligatorio')
    .min(3, 'Debe tener 3 caracteres o más.')
  const getYupSchema = _ => Yup.object({
    email: nullable3CharMinString
      .email('Correo inválido'),
  })

  const handleSubmit = async ({ email }) => {
    try{
      const res = await api().post('email',{ email })
      updateUser(res.data)
      let message = JSON.stringify({ success: "Acceda al correo electrónico para confirmación" })
      nookies.set({}, 'flash_message', message , { path: '/' })
      Router.push('/user/account')

    }catch(error) {
      let { message } = error.message ? error : error.response ? error.response.data : ''
      console.table(error);
      message = JSON.stringify({ error: "An Error Occured while updating: " + message })
      nookies.set({}, 'flash_message', message , { path: '/' })
      Router.push('/user/account')
    }
  }

  const DataForm = () => {
    return ( user &&
      <Formik
        // initialTouched={{name: true, country: true, document: true}}
        initialValues={
          (({ email: oldEmail }) => {
            return {oldEmail, email: ''}})(user)
        }
        validationSchema={
          getYupSchema()
        }
        onSubmit={ handleSubmit }
      >
      {({isSubmitting, values}) => (<Form>
          <hr />
          <div className="row">
            <div className="col-md-8">
              <div className="data">
                <h4>Sus datos</h4>
                <FormGroup>
                  <FkInputText name="oldEmail" label="Correo Actual" type="email" readOnly />
                </FormGroup>
                <FormGroup>
                  <FkInputText name="email" label="Nuevo Correo" type="email" />
                </FormGroup>
              </div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-md-12 offset-md-2 text-left">
              <Button color="danger" type="submit" disabled={isSubmitting}>Cambiar datos</Button>
            </div>
          </div>
          <style jsx>{`
          .btn .btn-danger {
            color: #fff;
            background-color: var(--primary);
          }
          .btn .btn-danger:hover {
            background-color: green;
          }
        `}</style>
        </Form>)}
      </Formik>
    )
  }

  return (
    <Layout {...layoutProps}>
      <Head>
        <title>Cambiar Correo &lt; {CONFIG.appName}</title>
      </Head>
      <div className="rgpage container-fluid">
        <div className="row">
          <div className="col-xl-8 offset-xl-2">
            <h1 className="h2">Cambiar Correo</h1>
              <DataForm />
          </div>
        </div>
      </div>
      <style jsx>{`
        .rgpage {
          padding-top: 40px;
          padding-bottom: 120px;
        }
        .info {
          font-size: 16px;
          font-weight: none;
        }
        a {
          display: inline-block;
          font-size: 16px;
          color: cornflowerblue;
          line-height: 1.5;
        }
        .vertical-align {
          align-self: center;
        }
        .profile-pic {
          display: flex;
          height: 120px;
          width: 120px;
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
        @media (min-width: 768px) {
          .card-inputs {
            margin-top: -21px;
          }
        }
      `}</style>
    </Layout>
  );

}

export default withAuth(changeEmailPage)
