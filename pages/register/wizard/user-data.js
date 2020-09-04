// import sleep from 'sleep-promise'
import FormGroup from '~/components/layout/AuthModal/FormGroup'
import Label from '~/components/Form/Label'
import Input from '~/components/layout/AuthModal/Input'
import { useContext, useEffect, useState } from 'react'
import withAuth from '~/components/withAuth'
import { IS_PRODUCTION } from "~/constants/constants";
import UserContext from "~/contexts/UserContext";
import Select from "~/components/Select/Select";
import Loading from "~/components/Loading/Loading";
import Button from "~/components/button";
import InvalidFeedback from "~/components/Form/InvalidFeedback";
import { GoSearch } from 'react-icons/go';
import Color from 'color'
import { ThemeContext } from 'styled-components'
import $ from 'jquery';
import ReactDOM from 'react-dom';
import Flatpickr from "react-flatpickr";


const UserDataForm = ({ api, layoutProps, handleSubmit }) => {

  const theme = useContext(ThemeContext)
  const primaryColor = Color(theme.colors.primary).hsl().string()

  const requireds = IS_PRODUCTION

  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState({

    birthdate: null,

  })

  const [values, setValues] = useState({
    name: '',
    gender_id: '',
    document: '',
    nickname: '',
    birthdate: null,
    registration: '',
    isPartner: ''
  })

  const { user } = useContext(UserContext)

  const [genders, setGenders] = useState()
  const [discounts, setDiscounts] = useState(false)
  const [blockDiscountFields, setBlockDiscountFields] = useState(false)

  const [error, setError] = useState()
  // const [errorCod, setErrorCod] = useState([])


  /* get genders */
  useEffect(_ => {
    (async _ => {
      const { data } = await api.get('genders')
      setGenders(data)
    })()
  }, [])

  /* fill user form */
  useEffect(_ => {
    if (user) {
      setDate({
        ...date,
        birthdate: new Date(),
      })
      setValues({
        ...values,
        name: user.name,
        gender_id: user.gender_id,
        document: user.document,
        nickname: user.nickname,
        birthdate: user.birthdate,
        registration: user.registration,
        isPartner: user.is_partner,
        abonado: user.abonado,
        terms: user.terms,
      })
    }

  }, [user])

  const handleInputChange = e => {
    const { checked, name, value, type } = e.target
    setValues({
      ...values,
      [name]: type === 'checkbox' ?
        (checked ? (value === 'true' ? true : value) : false) :
        value,
    })

  }

  const submit = async e => {
    e.preventDefault();

    setLoading(true);

    try {

      let userData = {
        name: values.name,
        gender_id: values.gender_id,
        document: values.document,
        email: user.email,
        nickname: values.nickname,
        registration: values.registration,
        birthdate: date.birthdate,
        is_partner: values.isPartner,
        abonado: values.abonado,
        terms: values.terms,

      }



      const res = await api.post(`register/complete-user`, userData)

      handleSubmit(1, userData)

    } catch (error) {
      if (error.response) {
        const { data, status } = error.response
        if (status === 422) {
          setError(data)
        }
      } else if (error.request) {
        setError(error)
      } else {
        setError(error)
      }

    } finally {
      setLoading(false)
    }


    // setLoading(true)
    // setError(false)
    // handleSubmit(1);

    // if (data.country_id === '') {
    //   delete data.country_id
    // }
    // if (data.address_1st_level === '') {
    //   delete data.address_1st_level
    // }
    // if (data.address_3rd_level === '') {
    //   delete data.address_3rd_level
    // }


  }

  const submitCod = async e => {
    e.preventDefault();

    setLoading(true);

    try {

      let params = {

        abonado: values.abonado,
      }

      const res = await api.get(`register/search-cod/` + params.abonado)
      if (!res.data.status) {
        setError({
          errors: {
            'abonado': 'Código no encontrado'
          }
        });
        setValues({
          name: values.name,
          gender_id: values.gender_id,
          document: values.document,
          email: user.email,
          nickname: values.nickname,
          registration: values.registration,
          birthdate: date.birthdate,
          is_partner: values.isPartner,
          abonado: values.abonado,
          terms: false,
        });
        setLoading(false);
      } else {
        setError();
        setValues({
          name: values.name,
          gender_id: values.gender_id,
          document: values.document,
          email: user.email,
          nickname: values.nickname,
          registration: values.registration,
          birthdate: date.birthdate,
          is_partner: values.isPartner,
          abonado: values.abonado,
          terms: true,
        });
        setLoading(false);
      }

    } catch (error) {


      if (error.response) {
        const { data, status } = error.response
        if (status === 422) {
          setError(data)
        }
      } else if (error.request) {
        setError(error)
      } else {
        setError(error)
      }

    }
  }

  return (
    <form method="post" onSubmit={submit}>
      <div className="register-confirm container text-center">

        <h2 className="card-title"><span className={"text-primary"}>¡</span>Sé parte de <strong
          className="text-primary">NACIONAL</strong>PLAY<span className={"text-primary"}>!</span></h2>
        <div className={"card-subtitle"}>
          ¡Antes de seguir, queremos saber más de ti!
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleInputChange}
                  />
                  <InvalidFeedback error={error} loading={loading} name="name" />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="gender_id">Género</Label>
                  <Select
                    id="gender_id"
                    name="gender_id"
                    required={requireds}
                    onChange={handleInputChange}
                    value={values.gender_id}
                  >
                    {!genders ? (
                      <option disabled value="">Cargando...</option>
                    ) : genders.length ? <>
                      <option disabled value="">Selecciona tu género</option>
                      {genders.map((genre, key) => (
                        <option {...{ key }} value={genre.id}>{genre.name}</option>
                      ))}
                    </> : (
                          <option disabled value="">Incapaz de cargar géneros</option>
                        )}
                  </Select>
                  <InvalidFeedback error={error} loading={loading} name="gender_id" />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="name">Apellidos</Label>
                  <Input
                    id="nickname"
                    name="nickname"
                    value={values.nickname}
                    onChange={handleInputChange}
                  />
                  <InvalidFeedback error={error} loading={loading} name="nickname" />
                </FormGroup>
              </div>


              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="birth">Fecha de nacimiento</Label>
                  <Flatpickr

                    id="birthdate"
                    name=" birthdate"
                    value={date.birthdate}
                    onChange={birthdate => {
                      setDate({ birthdate: birthdate });
                    }}
                    className={"form-control"}
                  />
                </FormGroup>
              </div>

              <div className="col-md-6 ">
                <FormGroup  >
                  <Label htmlFor="document">Abonado</Label>

                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    paddingTop: ' 1px'
                  }
                  }>

                    <Input
                      id="abonado"
                      name="abonado"
                      onChange={handleInputChange}
                      required={requireds}
                      type="text"
                      value={values.abonado}

                    />

                    <Button
                      style={{

                      }} fontSize="14px!important" color="secondary" onClick={submitCod} disabled={loading} loading={loading}>
                      <div style={{
                        padding: '0px', fontSize: '14px!important', width: '19px',
                        height: '16px;'
                      }}>
                        <GoSearch style={{ size: '10px', fontSize: '14px!important', padding: 'padding: 12px 16px 7px 16px!importan' }} fontSize={14} padding={0} />
                      </div>
                    </Button>


                  </div>
                  <InvalidFeedback error={error} loading={loading} name="abonado" />

                </FormGroup>

              </div>
              {/* </div> */}
              <div className="col-md-6">
                <Label></Label>
                <FormGroup>
                  <label className="terms">
                    <input
                      checked={values.terms}
                      name="terms"
                      onChange={handleInputChange}
                      required={requireds}
                      type="checkbox"
                      value={`true`}
                    />
                    <span style={{ paddingLeft: "10px" }}>Miembro del Club</span>
                  </label>
                  <InvalidFeedback error={error} loading={loading} name="terms" />
                </FormGroup>
                <div className="is-miembro ">

                  <FormGroup>
                    <Label htmlFor="document">Documento</Label>
                    <Input
                      id="document"
                      name="document"
                      onChange={handleInputChange}
                      required={requireds}
                      type="text"
                      value={values.document}
                    />
                    <InvalidFeedback error={error} loading={loading} name="document" />
                  </FormGroup>
                </div>
              </div>
            </div>


            {discounts && discounts.map(d => (
              <FormGroup key={d.id}>
                <Label htmlFor={d.dsc_id}>{d.name}</Label>
                <Input
                  disabled={discounts.find(
                    disc => (!['', undefined].includes(values[disc.dsc_id]) && disc.id != d.id)
                  )}
                  id={d.id}
                  maxLength={5}
                  name={d.dsc_id}
                  onChange={handleDiscountChange}
                  type="text"
                  style={values.discount_id == d.id ? { backgroundColor: 'rgb(206, 249, 206)' } : {}}
                  value={values[d.dsc_id] || ''}
                  readOnly={blockDiscountFields}
                />
                <div style={{ float: 'right', paddingTop: '10px' }}>
                  <Loading size="20" color="white" loadingState={values.discount_id == d.id && blockDiscountFields} />
                </div>
              </FormGroup>
            ))}

            <div className="text-center">
              <Button color="secondary" type="submit" disabled={loading}
                style={{ width: "150px" }}
                loading={loading}>Siguiente</Button>
            </div>

          </div>
        </div>
      </div>
      <style jsx>{`

        h2.card-title {
          font-weight: normal;
          color: #000;
          margin-bottom: 1em;
          font-size: 1.7em;
        }
        .pes{
          display>flex;
        }
        div.card-subtitle {
          font-size: 1.1em;
          font-weight: 500;
          margin-bottom: 2.5em;
        }

        .text-primary {
           color: ${ primaryColor} !important;
        }
        .register-confirm {
          padding-top: 50px;
          padding-bottom: 50px;
          color: #666666;
        }
        .is-miembro{

          ${values.terms ? `display:block` : `display:none!important; `}

        }




      ` }</style>
    </form >
  )




}




export default withAuth(UserDataForm, true);
