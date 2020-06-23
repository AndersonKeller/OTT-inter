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
import Address from "~/pages/register/wizard/partials/address"
import Button from "~/components/button";
import InvalidFeedback from "~/components/Form/InvalidFeedback";

const UserDataForm = ({ api, layoutProps, handleSubmit }) => {

  const requireds = IS_PRODUCTION

  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    name: '',
    gender_id: '',
    document: '',
    country_id: '',
    address_1st_level: '',
    city: '',
    address_3rd_level: '',
    address: '',
  })

  const { user } = useContext(UserContext)

  const [genders, setGenders] = useState()
  const [discounts, setDiscounts] = useState(false)
  const [blockDiscountFields, setBlockDiscountFields] = useState(false)

  const [error, setError] = useState()


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
      console.log(user);
      setValues({
        ...values,
        name: user.name,
        gender_id: user.gender_id ? user.gender_id : '',
        document: user.document ? user.document : '',
        address: user.address ? user.address : '',
        city: user.city ? user.city : '',
        country_id: user.country_id ? user.country_id : '',
        address_1st_level: user.address_1st_level_id,
        address_3rd_level: user.address_3rd_level
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

      const res = await api.post(`register/complete-user`, {
        name: values.name,
        gender_id: values.gender_id,
        document: values.document,
        country_id: values.country_id,
        address_1st_level: values.address_1st_level,
        city: values.city,
        address_3rd_level: values.address_3rd_level,
        address: values.address
      })

      handleSubmit(1)

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

  return (
    <form method="post" onSubmit={ submit }>
      <div className="register-confirm container text-center">

        <h1>Seus dados</h1>

        <div className="col-md-6 offset-3">
          <FormGroup>
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              name="name"
              value={ values.name }
              onChange={ handleInputChange }
            />
            <InvalidFeedback error={ error } loading={ loading } name="name"/>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="gender_id">Género</Label>
            <Select
              id="gender_id"
              name="gender_id"
              required={ requireds }
              onChange={ handleInputChange }
              value={ values.gender_id }
            >
              { !genders ? (
                <option disabled value="">Cargando...</option>
              ) : genders.length ? <>
                <option disabled value="">Selecciona tu género</option>
                { genders.map((genre, key) => (
                  <option { ...{ key } } value={ genre.id }>{ genre.name }</option>
                )) }
              </> : (
                <option disabled value="">Incapaz de cargar géneros</option>
              ) }
            </Select>
            <InvalidFeedback error={ error } loading={ loading } name="gender_id"/>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="document">Documento</Label>
            <Input
              id="document"
              name="document"
              onChange={ handleInputChange }
              required={ requireds }
              type="text"
              value={ values.document }
            />
            <InvalidFeedback error={ error } loading={ loading } name="document"/>
          </FormGroup>
          { discounts && discounts.map(d => (
            <FormGroup key={ d.id }>
              <Label htmlFor={ d.dsc_id }>{ d.name }</Label>
              <Input
                disabled={ discounts.find(
                  disc => (!['', undefined].includes(values[disc.dsc_id]) && disc.id != d.id)
                ) }
                id={ d.id }
                maxLength={ 5 }
                name={ d.dsc_id }
                onChange={ handleDiscountChange }
                type="text"
                style={ values.discount_id == d.id ? { backgroundColor: 'rgb(206, 249, 206)' } : {} }
                value={ values[d.dsc_id] || '' }
                readOnly={ blockDiscountFields }
              />
              <div style={ { float: 'right', paddingTop: '10px' } }>
                <Loading size="20" color="white" loadingState={ values.discount_id == d.id && blockDiscountFields }/>
              </div>
            </FormGroup>
          )) }

          <Address
            api={ api }
            error={ error }
            handleInputChange={ handleInputChange }
            loading={ loading }
            requireds={ requireds }
            setValues={ setValues }
            values={ values }
          />

          <div className="text-right">
            <Button block color="secondary" type="submit" disabled={ loading }
                    loading={ loading }>Próximo</Button>
          </div>

        </div>
      </div>
    </form>
  )
}

export default withAuth(UserDataForm, true);
