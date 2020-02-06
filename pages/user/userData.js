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

const userDataPage = ({ layoutProps, user, updateUser }) => {
  const [ genres, setGenres ] = useState([])
  const [ countries, setCountries ] = useState([])
  const [ packages, setPackages ] = useState([])

  /* get genres */
  useEffect(_ => {
    (async _ => {
      const {data} = await api().get('user_genres')
      setGenres(data)
    })()
  }, [])

  /* get countries */
  useEffect(_ => {
    (async _ => {
      const {data} = await api().get('countries')
      setCountries(data)
    })()
  }, [])

  /* get packages */
  useEffect(_ => {
    (async _ => {
      const {data} = await api().get('packages')
      setPackages(data)
    })()
  }, [])

    /* get user data */
    // const getUserData = ({user_genre_id: genre, country_id: country, ...data})  => {return {genre, country,...data}}

  // create formik input field
  const FkInputText = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    //field.value= field.value || undefined;
    return (
      <>
        <Label htmlFor={props.id || props.name}>{label}</Label>
        <Input style={{color: 'black'}} {...field} {...props} />
        {meta.touched && meta.error ? ( <div className="invalid-feedback">{ meta.error }</div> ) : null}
      </>
    )
  }

  // create formik select field
  const FkSelect = ({ label, list, ...props }) => {
    const [field, meta] = useField(props)
    //field.value= field.value || undefined;
    let opts = list && list.length ?  [{id:0, name:`Selecciona tu ${label}`},...list] : [{id:0, name:`Selecciona tu ${label}`}]

    return (
      <>
        <Label htmlFor={props.id || props.name}>{label}</Label>
        <Select style={{color: 'black'}} {...field} {...props}>
          {list && list.length ?
            opts.map((opt, key) =>
              <option {...{key}} value={opt.id}>{opt.name}</option>)
            :
            <option disabled value={0}>{`Incapaz de cargar ${label}`}</option>
          }
        </Select>
        {meta.touched && meta.error ? ( <div className="invalid-feedback">{ meta.error }</div> ) : null}
      </>
    )
  }

// create Yup validation Schema
  const nullable3CharMinString= Yup.string()
    .trim().nullable()
    .required('Required')
    .min(3, 'Must be 3 characters or more');
  const getYupSchema = (countries, genres) => Yup.object({
    name: nullable3CharMinString
      .max(25, 'Must be 25 characters or less'),
    document: nullable3CharMinString
      .max(20, 'Must be 20 characters or less'),
    address: nullable3CharMinString
      .max(80, 'Must be 80 characters or less'),
    city: nullable3CharMinString
      .max(20, 'Must be 20 characters or less'),
    country: Yup.number().nullable()
      .oneOf(countries.map(c => c.id), "Invalid Country")
      .required('Required'),
    genre: Yup.number().nullable()
      .oneOf(genres.map(g => g.id), "Invalid Genre")
      .required('Required'),
  })

  const handleSubmit = async  ({ name, genre, document, country, city, address }) => {
    try{
      const res = await api().post(`user/${user.id}`,{
        name, genre, document,
        country, city, address,
      })
      updateUser(res.data)
      let message = JSON.stringify({ success: "Cambio de datos completo." })
      nookies.set({}, 'flash_message', message , { path: '/' })
      Router.push('/user/account')

    }catch(error) {
      let { message } = error.message ? error : error.response ? error.response.data : ''
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
          (({user_genre_id: genre, country_id: country, ...data}) => {
            return {genre, country, ...data}})(user)
        }
        validationSchema={
          getYupSchema(countries,genres)
        }
        onSubmit={ handleSubmit }
      >
      {({isSubmitting, values}) => (<Form>
      {/* { status ? <div className="valid-feedback"><h5>{status.success}</h5></div> :''} */}
          {/* <div className="invalid-feedback">{status.fail}</div> */}
          <hr />
          <div className="row">
            <div className="col-md-6">
              <div className="data">
                <h4>Tus datos</h4>
                <FormGroup>
                  <FkInputText label="Nombre Completo" name="name" />
                </FormGroup>
                <FormGroup>
                  <FkSelect name="genre" label="Género" list={genres} />
                </FormGroup>
                <FormGroup>
                  <FkInputText name="document" type="text" label="Documento" />
                </FormGroup>
              </div>
            </div>

            <div className="col-md-6">
              <div className="localization">
                <h3 className="h3">Ubicación</h3>
                <FormGroup>
                  <FkInputText name="address" type="text" label="Dirección" />
                </FormGroup>
                <FormGroup>
                  <FkInputText name="city" type="text" label="Ciudad" />
                </FormGroup>
                <FormGroup>
                  <FkSelect name="country" label="País" list={countries} />
                </FormGroup>
              </div>
            </div>
          </div>

          <hr />

          <h2>Detalles del plan</h2>
          <Packages readOnly
            {...{
              items: packages ? packages : null,
              package_id: values.package_id_intention,
            }}
          />

          <hr />

          <div className="row align-items-center">
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
        <title>Mi Cuenta &lt; {CONFIG.appName}</title>
      </Head>
      <div className="rgpage container-fluid">
        <div className="row">
          <div className="col-xl-8 offset-xl-2">
            <h1 className="h2">Datos Personales</h1>
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

export default withAuth(userDataPage)
