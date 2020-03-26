// nextjs imports
import Router from 'next/router'
import Head   from 'next/head'
// import Link   from 'next/link'

// react imports
import { useEffect, useState }  from 'react'
import { Formik, Form }         from 'formik'

import * as Yup from 'yup'
import nookies  from 'nookies'

// app imports
import { FkSelect, FkInput } from '~/components/Formik/fields'
import FormGroup    from '~/components/layout/AuthModal/FormGroup'
import withAuth     from '~/components/withAuth'
import Layout       from '~/components/layout/Layout'
import Button       from '~/components/button'
import api          from '~/services/api'
import { CONFIG }   from '~/config'

const userDataPage = ({ layoutProps, user, updateUser }) => {
  const [ genders, setGenders ] = useState([])
  const [ countries, setCountries ] = useState([])

  /* get genders */
  useEffect(_ => {
    (async _ => {
      const {data} = await api().get('genders')
      setGenders(data)
    })()
  }, [])

  /* get countries */
  useEffect(_ => {
    (async _ => {
      const {data} = await api().get('countries')
      setCountries(data)
    })()
  }, [])

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

            { user &&
              <Formik
                initialValues={
                  (({gender_id: gender, country_id: country, ...data}) => {
                    return {gender, country, ...data}})(user)
                }
                validationSchema={
                  getYupSchema(countries, genders)
                }
                onSubmit={handleSubmit}
                component={props => <DataForm {...{countries, genders, ...props}} />}
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

const DataForm = ({isSubmitting, countries, genders})  =>
  <Form>
    <div className="row">
      <div className="col-md-6">
        <div className="data">
          <h4>Tus datos</h4>
          <FormGroup>
            <FkInput name="name" label="Nombre Completo" />
          </FormGroup>
          <FormGroup>
            <FkSelect name="gender" label="Género" list={genders} />
          </FormGroup>
          <FormGroup>
            <FkInput name="document" label="Documento" />
          </FormGroup>
        </div>
      </div>

      <div className="col-md-6">
        <div className="localization">
          <h3 className="h3">Ubicación</h3>
          <FormGroup>
            <FkInput name="address" label="Dirección" />
          </FormGroup>
          <FormGroup>
            <FkInput name="city" label="Ciudad" />
          </FormGroup>
          <FormGroup>
            <FkSelect name="country" label="País" list={countries} />
          </FormGroup>
        </div>
      </div>
    </div>

    <div className="row align-items-center">
      <div className="col-md-12 text-right">
        <Button color="danger" type="submit" disabled={isSubmitting} loading={isSubmitting}>
          Cambiar datos
        </Button>
      </div>
    </div>
  </Form>

// create Yup validation Schema
const getYupSchema = (countries, genders) => {
  const nullable3CharMinString = Yup.string()
    .trim().nullable()
    .required('Obligatorio')
    .min(3, 'Debe tener 3 caracteres o más.')

  return Yup.object({
    name: nullable3CharMinString
      .max(25, 'Debe tener 25 caracteres o menos'),
    document: nullable3CharMinString
      .max(20, 'Debe tener 20 caracteres o menos'),
    address: nullable3CharMinString
      .max(80, 'Debe tener 80 caracteres o menos'),
    city: nullable3CharMinString
      .max(20, 'Debe tener 20 caracteres o menos'),
    country: Yup.number().nullable()
      .oneOf(countries.map(c => c.id), "País inválido")
      .required('Obligatorio'),
    gender: Yup.number().nullable()
      .oneOf(genders.map(g => g.id), "Género inválido")
      .required('Obligatorio'),
  })
}

export default withAuth(userDataPage)
