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
import Layout       from '../../components/layout/Layout'
import Button       from '../../components/button'
import api          from '../../services/api'
import { CONFIG }   from '../../config'

const passwordPage = ({ layoutProps, user, updateUser }) => {

  // create formik input field
  const FkInputText = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    //field.value= field.value || undefined;
    return (
      <>
        { props.type == 'hidden' ? '' : <Label htmlFor={props.id || props.name}>{label}</Label> }
        <Input style={{color: 'black'}} {...field} {...props} />
        {/* {console.table(meta)} */}
        {meta.touched && meta.error ? ( <div className="invalid-feedback">{ meta.error }</div> ) : null}
      </>
    )
  }

  // create Yup validation Schema
  const nullable8CharMinString = Yup.string()
    .nullable().required('Obligatorio')
    .min(8, 'Debe tener 8 caracteres o más');
  const getYupSchema = () => Yup.object({
    password: nullable8CharMinString
      .max(255, 'Debe tener 255 caracteres o menos'),
    password_confirmation: nullable8CharMinString
      .max(255, 'Debe tener 255 caracteres o menos')
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir'),
    oldpassword: Yup.string().nullable()
  })

  const handleSubmit = async  (fields, actions) => {
    try{
      const res = await api().post('password', fields)
      console.table(res)
      let message = ''
      if( ! (message = res.data.message) ) {
        message = "Cambio de datos completo."
      }

      message = JSON.stringify({ success: message })
      nookies.set({}, 'flash_message', message , { path: '/' })
      Router.push('/user/account')

    }catch(error) {
      let { message, errors } = error.response ? error.response.data : (error.message ? error : {message: ''})

      errors ?
        actions.setErrors(errors) :
        actions.setStatus({
          error: 'Problemas al realizar esta operación. Inténtalo de nuevo más tarde'
        })

      console.log(message)
      console.table(error)
    }
  }

  const DataForm = () => {
    return ( user &&
      <Formik
        // initialTouched={{name: true, country: true, document: true}}
        initialValues={
          (({ email }) => {
            return { email, oldpassword: '', password: '', password_confirmation: '' }})(user)
        }
        validationSchema={
          getYupSchema()
        }
        onSubmit={ handleSubmit }
      >
      {({ isSubmitting, status, values }) => (<Form>
        { status && <div className="invalid-feedback"><h5>{status.error}</h5></div> }
                <FormGroup>
                  <FkInputText name="username" type="hidden"
                    label="Username" autoComplete="username" value={values.email} />
                </FormGroup>
                <FormGroup>
                  <FkInputText name="oldpassword" type="password"
                    label="Contraseña anterior" autoComplete="current-password" />
                </FormGroup>
                <FormGroup>
                  <FkInputText name="password" type="password"
                    label="Nueva contraseña" autoComplete="new-password" />
                </FormGroup>
                <FormGroup>
                  <FkInputText name="password_confirmation" type="password"
                    label="Confirmar nueva contraseña" autoComplete="new-password" />
                </FormGroup>
          <hr />

          <div className="row">
            <div className="col-md-12 text-right">
              <Button color="danger" type="submit" disabled={isSubmitting}>
                Cambiar datos
              </Button>
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
        <title>Cambiar la Contraseña &lt; {CONFIG.appName}</title>
      </Head>
      <div className="rgpage container-fluid">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1 className="h2">Cambiar la Contraseña</h1>
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

export default withAuth(passwordPage)
