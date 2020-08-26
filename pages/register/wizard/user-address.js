// import sleep from 'sleep-promise'
import { useContext, useEffect, useState } from 'react'
import withAuth from '~/components/withAuth'
import { IS_PRODUCTION } from "~/constants/constants";
import UserContext from "~/contexts/UserContext";
import Address from "~/pages/register/wizard/partials/address"
import Button from "~/components/button";
import { ThemeContext } from "styled-components";
import Color from "color";


const UserAddressForm = ({ api, layoutProps, handleSubmit }) => {

  const theme = useContext(ThemeContext)
  const primaryColor = Color(theme.colors.primary).hsl().string()

  const requireds = IS_PRODUCTION

  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    country_id: '',
    address_1st_level: '',
    city: '',
    address_3rd_level: '',
    address: '',
  })

  const { user } = useContext(UserContext)
  const [error, setError] = useState()

  /* fill user form */
  useEffect(_ => {
    if (user) {
      console.log(user);
      setValues({
        ...values,
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

      let userData = {
        country_id: values.country_id,
        address_1st_level: values.address_1st_level,
        city: values.city,
        address_3rd_level: values.address_3rd_level,
        address: values.address,
        email: user.email
      }

      const res = await api.post(`register/complete-user-address`, userData)

      handleSubmit(2, userData)

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

  }

  return (
    <form method="post" onSubmit={submit}>
      <div className="register-confirm container text-center responsive">

        <h2 className="card-title"><span className={"text-primary"}>¡</span>Sé parte de <strong
          className="text-primary">NACIONAL</strong>PLAY<span className={"text-primary"}>!</span></h2>
        <div className="card-subtitle d-inline-block">
          ¡Conéctate con otros usuarios a tu alrededor, sin tener que salir de casa!
        </div>

        <div className="row">
          <div className="col-md-6 offset-3">
            <Address
              api={api}
              error={error}
              handleInputChange={handleInputChange}
              loading={loading}
              requireds={requireds}
              setValues={setValues}
              values={values}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <div className="text-center">
              <Button color="secondary" type="submit" disabled={loading}
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
        div.card-subtitle {
          font-size: 1.1em;
          font-weight: 500;
          margin-bottom: 2.5em;
          max-width: 380px;
        }

        .text-primary {
           color: ${ primaryColor} !important;
        }
        .register-confirm {
          padding-top: 50px;
          padding-bottom: 50px;
          color: #666666;
        }

         @media(max-width: 765px) {

        .responsive{
              padding: 20px 30px 15px 30px!important;
          // padding: 40px!important;
          padding: 0px;
          display: flex;
          flex-wrap: wrap;
          height: 100%!importat;
          justify-content: center;
          height:100%!important;

          }
         .card{
           height:99%!important;

         }
         .card-body{
           background-image: url()!important;
         }

         label {
              display: inline-block;
              margin-bottom: .5rem;
              text-align: center;
            }

         .justify-content-end {
           display:flex;
           justify-content:center!important;
         }
         form{
           padding 0px!important;
         }
         .row {
          display: -ms-flexbox;
          display: flex;
          -ms-flex-wrap: wrap;
           margin-right: 0px;
           margin-left: 0px;
          }
        .col-8 {
         max-width: 100%!important;
          }
         .offset-3{
          margin-left:0px;
          }
        }

      ` }</style>
    </form>
  )
}

export default withAuth(UserAddressForm, true);
