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
import { CONFIG }   from '../../config'

const passwordPage = ({ layoutProps, user, updateUser }) => {

  // create formik input field
  const FkInputText = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    //field.value= field.value || undefined;
    return (
      <>
        <Label htmlFor={props.id || props.name}>{label}</Label>
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
    oldpassword: nullable8CharMinString,
  })

  const handleSubmit = async  ({ email, oldpassword, password, password_confirmation }, actions) => {
    try{
      const res = await api().post('password',{
        email,
        password,
        password_confirmation,
        oldpassword,
      })
      console.table(res)
      let message = ''
      // updateUser(res.data)
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
            return { email }})(user)
        }
        validationSchema={
          getYupSchema()
        }
        onSubmit={ handleSubmit }
      >
      {({ isSubmitting, status }) => (<Form>
        { status && <div className="invalid-feedback"><h5>{status.error}</h5></div> }

                <FormGroup>
                  <FkInputText name="password" type="password" label="Nueva contraseña" autoComplete="new-password" />
                </FormGroup>
                <FormGroup>
                  <FkInputText name="password_confirmation" type="password" label="Confirmar nueva contraseña" autoComplete="new-password" />
                </FormGroup>
                <FormGroup>
                  <FkInputText name="oldpassword" type="password" label="Contraseña" autoComplete="current-password" />
                </FormGroup>

          <hr />

          <div className="row">
            <div className="col-md-12 text-right">
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
        <title>Cambiar la Contraseña &lt; {CONFIG.appName}</title>
      </Head>
      <div className="rgpage container-fluid">
        <div className="row">
          <div className="col-xl-8 offset-xl-2">
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