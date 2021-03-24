// react
import { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

// components
import { FkSelect, FkInput, FkDate } from '~/components/Formik/fields'
import FormGroup from '~/components/layout/AuthModal/FormGroup'
import Button from '~/components/button'
import { CONFIG } from '~/config'
import api from '~/services/api'
import { StyleFormData } from '~/components/layout/FormData/index'


const UserForm = ({ handleSubmit, initialValues, button }) => {
  const [genders, setGenders] = useState([])
  const [countries, setCountries] = useState([])
  /* get genders */
  useEffect(_ => {
    (async _ => {
      const { data } = await api().get('genders')
      setGenders(data)
    })()
  }, [])

  /* get countries */
  useEffect(_ => {
    (async _ => {
      const { data } = await api().get('countries')
      setCountries(data)

    })()
  }, [])

  return (

    <Formik
      initialValues={initialValues}
      validationSchema={
        yupSchema(countries, genders)
      }
      onSubmit={handleSubmit}
      component={props => <DataForm {...{ countries, genders, button, ...props }} />}
    />
  )
}

const DataForm = ({ isSubmitting, countries, genders, button }) => {

  const cityLabel = CONFIG.lang === 'es-CL' ? 'Provincia' : 'Ciudad'

  return (
    <Form>
      <StyleFormData>
        <h1 className="h2">Datos Personales</h1>
        <hr />
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

              <FormGroup>
                <FkDate name="data_of_birth" label="Fecha de nacimiento" />
              </FormGroup>
            </div>
          </div>

          <div className="col-md-6">
            <div className="localization">
              <h3 className="h3">Ubicación</h3>
              <FormGroup>
                <FkSelect name="country" label="País" list={countries} />
              </FormGroup>
              <FormGroup>
                <FkInput name="city" label={cityLabel} />
              </FormGroup>
              <FormGroup>
                <FkInput name="address" label="Dirección" />
              </FormGroup>
            </div>
          </div>
        </div>

        {button && <div className="row align-items-center">
          <div className="aling-button">
            <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
              Guardar cambios
          </Button>
          </div>
        </div>}
      </StyleFormData>
    </Form>

  )
}

// create Yup validation Schema
const yupSchema = (countries, genders) => {
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

export default UserForm
