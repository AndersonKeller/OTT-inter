// nextjs imports
import Head   from 'next/head'
import Router from 'next/router'

// react imports
import { useContext, useEffect, useState }  from 'react'
import { Formik, Form, useField }           from 'formik'
import * as Yup from 'yup'

// app imports
import Layout       from '../../components/layout/Layout'
import Label        from '../../components/layout/AuthModal/Label'
import Input        from '../../components/layout/AuthModal/Input'
import FormGroup    from '../../components/layout/AuthModal/FormGroup'
import Packages     from '../../components/Packages'
import withAuth     from '../../components/withAuth/withAuth'
import UserContext  from '../../contexts/UserContext'
import Select       from '../../components/Select/Select'
import Button       from '../../components/button'
import api          from '../../services/api'
import { CONFIG }   from '../../config'


// form
const AccountPage = ({ layoutProps, user }) => {

  const [ genres, setGenres ] = useState([])
  const [ countries, setCountries ] = useState([])
  const [ packages, setPackages ] = useState([])
  const { updateUser } = useContext(UserContext)

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
      .oneOf(countries.map(c => c.id),"Invalid Country")
      .required('Required'),
    genre: Yup.number().nullable()
      .oneOf(genres.map(c => c.id),"Invalid Genre")
      .required('Required'),
  })

  const handleSubmit = async  ({ name, genre, document, country, city, address }, { setStatus } ) => {
    try{
      setStatus('Data successfully updated')
      const res = await api().post(`user/${user.id}`,{
        name, genre, document,
        country, city, address,
      })
      console.table(res)
      updateUser(res.data)
      setStatus({success: 'Data updated successfully'})

    }catch(error) {
      const { message } = error.response ? error.response.data : '';
      setStatus({fail:'An Error Occured while updating'})
      console.log(message,error)
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
            <h1 className="h2">Mi Cuenta</h1>

            { user &&
                <Formik
                  initialValues={
                    (({user_genre_id: genre, country_id: country, ...data}) => {
                      return {genre, country, ...data}})(user)
                  }
                  validationSchema={
                    getYupSchema(countries,genres)
                  }
                  onSubmit={ handleSubmit }
                >
                {({status, isSubmitting, values}) => (<Form>
                { status ? <div className="valid-feedback"><h5>{status.success}</h5></div> :''}
                    {/* <div className="invalid-feedback">{status.fail}</div> */}
                    <div className="row">
                      <div className="col-md-6">
                        <div className="data">
                          <h3 className="h3">Sus datos</h3>
                          <FormGroup>
                            <FkInputText label="Nombre Completo" name="name" />
                            {/* {errors ? errors.nome : ''} */}
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
                          {/* address */}
                          <FormGroup>
                            <FkInputText name="address" type="text" label="Dirección" />
                          </FormGroup>

                          {/* city */}
                          <FormGroup>
                            <FkInputText name="city" type="text" label="Ciudad" />
                          </FormGroup>

                          {/* country */}
                          <FormGroup>
                            <FkSelect name="country" label="País" list={countries} />
                          </FormGroup>
                        </div>
                      </div>
                    </div>

                    <hr className="hr" />
                    {/* package */}
                    <h2>Detalles del plan</h2>
                    <Packages
                      {...{
                        items: packages ? packages : null,
                        package_id: values.package_id_intention,
                      }}
                    />
                    <hr className="hr" />

                    <div className="row align-items-center">
                      <div className="col-md-12 text-right">
                        <Button block color="danger" type="submit" disabled={isSubmitting}>Cambiar datos</Button>
                      </div>
                    </div>
                  </Form>)}
                </Formik>
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
        hr,
        .hr {
          margin-top: 0;
          margin-bottom: 15px;
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

export default withAuth(AccountPage)
