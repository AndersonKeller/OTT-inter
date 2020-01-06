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
import UserContext  from '../../contexts/UserContext'
import Select       from '../../components/Select/Select'
import Button       from '../../components/button'
import api          from '../../services/api'
import { CONFIG }   from '../../config'


// form
const AccountPage = ({ layoutProps }) => {

  const [ genres, setGenres ] = useState()
  const [ countries, setCountries ] = useState()
  const [ packages, setPackages ] = useState()
  const [ initialValues, setInitialValues] = useState({name: 'Danner Terra',})
  const { user, signIn } = useContext(UserContext)

  /* temporarily handle user presence */
  useEffect(_ => {
    const timeout = setTimeout(_ => {
      if ( ! user) {
        Router.push('/')
      }
    }, 1000)

    if(user) setInitialValues(getUserData())
    return function cleanup() {
      clearTimeout(timeout)
    }
  }, [user])

  /* get genres */
  useEffect(_ => {
    (async _ => {
      const {data} = await api.get('user_genres')
      setGenres(data)
    })()
  }, [])

  /* get countries */
  useEffect(_ => {
    (async _ => {
      const {data} = await api.get('countries')
      setCountries(data)
    })()
  }, [])

  /* get packages */
  useEffect(_ => {
    (async _ => {
      const {data} = await api.get('packages')
      setPackages(data)
    })()
  }, [])

    /* get user data */
    const getUserData = _ => {
      return  {
                name: user.name,
                genre: user.user_genre_id,
                document: user.document,
                country: user.country_id,
                city: user.city,
                address: user.address,
              }
    }

  const FkInputText = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <Label htmlFor={props.id || props.name}>{label}</Label>
        <Input style={{color: 'black'}} {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

  const FkSelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <Label htmlFor={props.id || props.name}>{label}</Label>
        <Select style={{color: 'black'}} {...field} {...props} />
        {meta.touched && meta.error ? (
          <div>{meta.error}</div>
        ) : null}
      </>
    );
  };

  return (

    <Layout {...layoutProps}>
      <Head>
        <title>Confirmación &lt; Registro &lt; {CONFIG.appName}</title>
      </Head>
      <div className="rgpage container-fluid">
        <div className="row">
          <div className="col-xl-8 offset-xl-2">
            <h1 className="h2">Mi Cuenta</h1>

    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        docuemnt: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >


    <Form>
              <div className="row">
                <div className="col-md-6">
                  <div className="data">
                  <h3 className="h3">Sus datos</h3>

                    <FormGroup>
                      <FkInputText
                        label="Nombre Completo"
                        id="name"
                        name="name"
                        type="text"
                      />
                    </FormGroup>

                    <FormGroup>
                      <FkSelect
                        id="genre"
                        name="genre"
                        label="Género"
                      >
                        { ! genres ? (
                          <option disabled value={0}>Cargando...</option>
                        ) : genres.length ? (
                          <>
                            <option disabled value={0}>Selecciona tu género</option>
                            { genres.map((genre, key) => (
                              <option {...{key}} value={genre.id}>{genre.name}</option>
                            ))}
                          </>
                        ) : (
                          <option disabled value={0}>Incapaz de cargar géneros</option>
                        ) }
                      </FkSelect>
                    </FormGroup>

                    <FormGroup>
                      <FkInputText
                        id="document"
                        name="document"
                        type="text"
                        label="Documento"
                      />
                    </FormGroup>

                  </div>
                </div>

                <div className="col-md-6">
                  <div className="localization">

                    <h3 className="h3">Ubicación</h3>
                    {/* address */}
                    <FormGroup>
                      <FkInputText
                        id="address"
                        name="address"
                        type="text"
                        label="Dirección"
                      />
                    </FormGroup>

                    {/* city */}
                    <FormGroup>
                      <FkInputText
                        id="city"
                        name="city"
                        type="text"
                        label="Ciudad"
                      />
                    </FormGroup>

                    {/* country */}
                    <FormGroup>
                      <FkSelect
                        id="country"
                        name="country"
                        label="País"
                      >
                        { ! countries ? (
                          <option disabled value={0}>Cargando...</option>
                        ) : countries.length ? (
                          <>
                            <option disabled value={0}>Selecciona tu país</option>
                            { countries.map((country, key) => (
                              <option {...{key}} value={country.id}>{country.name}</option>
                            ))}
                          </>
                        ) : (
                          <option disabled value={0}>Incapaz de cargar países</option>
                        ) }
                      </FkSelect>
                    </FormGroup>

                  </div>
                </div>

              </div>

              <hr className="hr" />
              {/* package */}
              <h2>Detalles del plan</h2>
              {/* <table>
                <thead>
                </thead>
                <tbody> */}
                  {/* <tr> */}
                    {/* <td>Pacote</td> */}
                     {user && <Packages package_id_intention={user.package_id_intention} packages={packages} />}
                  {/* </tr>
                </tbody>
              </table> */}

              <hr className="hr" />

              <div className="row align-items-center">
                <div className="col-md-12 text-right">
                  <Button block color="danger" type="submit">Cambiar datos</Button>
                </div>
              </div>
            </Form>
      </Formik>
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

// page
const AccountPageold = ({ layoutProps }) => {

  // const [ genres, setGenres ] = useState()
  // const [ countries, setCountries ] = useState()
  // const [ packages, setPackages ] = useState()

  // const { user, signIn } = useContext(UserContext)
  // const [ name, setName] = useState('')
  // const [ genre, setGenre ] = useState(0)
  // const [ document, setDocument ] = useState('')
  // const [ country, setCountry ] = useState(0)
  // const [ city, setCity] = useState('')
  // const [ address, setAddress ] = useState('')
  const [ formStatus, setFormStatus ] = useState('')

  const handleSubmit = async e => {
    e.preventDefault();
    try{
      const res = await api.post(`user/${user.id}`,{
        name,
        genre,
        document,
        country,
        city,
        address
      })

      console.table(res)
      setFormStatus(res.statusText)
      signIn(res.data)

    }catch(error) {
      const { message } = error.response ? error.response.data : '';

      console.log(message,error)
      setFormStatus('Não foi possivel atualizar os dados');
    }
  }

  /* get user data */
  const setUserData = _ => {
    // if(user)
    // setName(user.name)
    // console.log(user)
    // setGenre(user.user_genre_id)
    // setDocument(user.document)
    // setCountry(user.country_id)
    // setCity(user.city)
    // setAddress(user.address)
  }

  /* get genres */
  // useEffect(_ => {
  //   (async _ => {
  //     const {data} = await api.get('user_genres')
  //     setGenres(data)
  //   })()
  // }, [])

  /* get countries */
  // useEffect(_ => {
  //   (async _ => {
  //     const {data} = await api.get('countries')
  //     setCountries(data)
  //   })()
  // }, [])

  /* get packages */
  // useEffect(_ => {
  //   (async _ => {
  //     const {data} = await api.get('packages')
  //     setPackages(data)
  //   })()
  // }, [])


  return (
    <Layout {...layoutProps}>
      <Head>
        <title>Confirmación &lt; Registro &lt; {CONFIG.appName}</title>
      </Head>
      <div className="rgpage container-fluid">
        <div className="row">
          <div className="col-xl-8 offset-xl-2">
            <h1 className="h2">Mi Cuenta</h1>
            {/* <h3>{formStatus}</h3> */}
          { true && (
            // <form method="post" onSubmit={e => handleSubmit(e)}>
            //   <div className="row">
            //     <div className="col-md-6">
            //       <div className="data">
            //       <h3 className="h3">Sus datos</h3>

            //         <FormGroup>
            //           <Label htmlFor="fullName">Nombre completo</Label>
            //           <Input
            //             id="fullName"
            //             name="fullName"
            //             required
            //             value={name}
            //             onChange={e => setName(e.target.value)}
            //             style={{color: 'black'}}
            //           />
            //         </FormGroup>

            //         <FormGroup>
            //           <Label htmlFor="genre">Género</Label>
            //           <Select
            //             id="genre"
            //             name="genre"
            //             value={genre}
            //             required
            //             onChange={e => setGenre(e.target.value)}
            //             style={{color: 'black'}}
            //           >
            //             { ! genres ? (
            //               <option disabled value={0}>Cargando...</option>
            //             ) : genres.length ? (
            //               <>
            //                 <option disabled value={0}>Selecciona tu género</option>
            //                 { genres.map((genre, key) => (
            //                   <option {...{key}} value={genre.id}>{genre.name}</option>
            //                 ))}
            //               </>
            //             ) : (
            //               <option disabled value={0}>Incapaz de cargar géneros</option>
            //             ) }
            //           </Select>
            //         </FormGroup>

            //         <FormGroup>
            //           <Label htmlFor="document">Documento</Label>
            //           <Input
            //             id="document"
            //             name="document"
            //             type="text"
            //             required
            //             value={document}
            //             onChange={e => setDocument(e.target.value)}
            //             style={{color: 'black'}}
            //           />
            //         </FormGroup>

            //       </div>
            //     </div>

            //     <div className="col-md-6">
            //       <div className="localization">

            //         <h3 className="h3">Ubicación</h3>
            //         {/* address */}
            //         <FormGroup>
            //           <Label htmlFor="address">Dirección</Label>
            //           <Input
            //             id="address"
            //             name="address"
            //             type="text"
            //             required
            //             value={address}
            //             onChange={e => setAddress(e.target.value)}
            //             style={{color: 'black'}}
            //           />
            //         </FormGroup>

            //         {/* city */}
            //         <FormGroup>
            //           <Label htmlFor="city">Ciudad</Label>
            //           <Input
            //             id="city"
            //             name="city"
            //             type="text"
            //             required
            //             value={city}
            //             onChange={e => setCity(e.target.value)}
            //             style={{color: 'black'}}
            //           />
            //         </FormGroup>

            //         {/* country */}
            //         <FormGroup>
            //           <Label htmlFor="country">País</Label>
            //           <Select
            //             id="country"
            //             name="country"
            //             required
            //             value={country}
            //             onChange={e => setCountry(e.target.value)}
            //             style={{color: 'black'}}
            //           >
            //             { ! countries ? (
            //               <option disabled value={0}>Cargando...</option>
            //             ) : countries.length ? (
            //               <>
            //                 <option disabled value={0}>Selecciona tu país</option>
            //                 { countries.map((country, key) => (
            //                   <option {...{key}} value={country.id}>{country.name}</option>
            //                 ))}
            //               </>
            //             ) : (
            //               <option disabled value={0}>Incapaz de cargar países</option>
            //             ) }
            //           </Select>
            //         </FormGroup>

            //       </div>
            //     </div>

            //   </div>

            //   <hr className="hr" />
            //   {/* package */}
            //   <Packages package_id_intention={user.package_id_intention} packages={packages} />
            //   <hr className="hr" />

            //   <div className="row align-items-center">
            //     <div className="col-md-12 text-right">
            //       <Button block color="danger" type="submit">Cambiar datos</Button>
            //     </div>
            //   </div>
            // </form>
            <AccountForm />
          )}
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

AccountPage.getInitialProps = () => {
}

export default AccountPage
