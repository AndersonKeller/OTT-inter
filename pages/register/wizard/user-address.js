// import sleep from 'sleep-promise'
import React, { useContext, useEffect, useState } from 'react'
import withAuth from '~/components/withAuth'
import { IS_PRODUCTION } from "~/constants/constants";
import UserContext from "~/contexts/UserContext";
import Address from "~/pages/register/wizard/partials/address"
import Button from "~/components/button";
import { ThemeContext } from "styled-components";
import Color from "color";
import NameProject from '~/components/NameProject/index'

const UserAddressForm = ({
  api,
  layoutProps,
  handleSubmit,
  handleFormState,
  formData,
  setFormData
}) => {

  const formDataHasProperties = formData.hasOwnProperty("country_id")
    && formData.hasOwnProperty("address_1st_level")
    && formData.hasOwnProperty("city")
    && formData.hasOwnProperty("address_3rd_level")
    && formData.hasOwnProperty("address");

  const theme = useContext(ThemeContext);
  const primaryColor = Color(theme.colors.primary)
    .hsl()
    .string();

  const requireds = IS_PRODUCTION;

  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    country_id: "",
    address_1st_level: "",
    city: "",
    address_3rd_level: "",
    address: ""
  });

  const { user } = useContext(UserContext);
  const [error, setError] = useState();

  /* fill user form */
  useEffect(
    _ => {
      if (user) {
        console.log("Primeiro useEffect (componentDidMount)")

        console.log(`\n\n user --  ${JSON.stringify(user)} \n\n`);

        console.log(`\n\n formData before set ${JSON.stringify(formData)} \n\n`);

        if (!formDataHasProperties) {
          setFormData({
            ...formData,
            address: user.address ? user.address : "",
            city: user.city ? user.city : "",
            country_id: user.country_id ? user.country_id : "",
            address_1st_level: user.address_1st_level_id,
            address_3rd_level: user.address_3rd_level
          });
        }

        console.log(`\n\n formData after set ${JSON.stringify(formData)} \n\n`);

      }
    },
    [user]
  );

  const handleInputChange = e => {
    const { checked, name, value, type } = e.target;
    // setValues({
    //   ...values,
    //   [name]:
    //     type === "checkbox"
    //       ? checked
    //         ? value === "true"
    //           ? true
    //           : value
    //         : false
    //       : value
    // });

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
            ? value === "true"
              ? true
              : value
            : false
          : value
    });
  };

  const submit = async e => {
    e.preventDefault();

    setLoading(true);

    try {
      let userData = {
        country_id: formData.country_id,
        address_1st_level: formData.address_1st_level,
        city: formData.city,
        address_3rd_level: formData.address_3rd_level,
        address: formData.address,
        email: user.email
      };

      // let userData;

      // if (formDataHasProperties) {
      //   userData = {
      //     country_id: formData.country_id,
      //     address_1st_level: formData.address_1st_level,
      //     city: formData.city,
      //     address_3rd_level: formData.address_3rd_level,
      //     address: formData.address,
      //     email: user.email
      //   };
      // } else {
      //   userData = {
      //     country_id: values.country_id,
      //     address_1st_level: values.address_1st_level,
      //     city: values.city,
      //     address_3rd_level: values.address_3rd_level,
      //     address: values.address,
      //     email: user.email
      //   };
      // }

      const res = await api.post(`register/complete-user-address`, userData);

      // setFormData({...values});
      // setFormData({...formData});

      // console.log(`\n\n formData ${JSON.stringify(formData)}`);

      handleSubmit(2, userData);
    } catch (error) {
      if (error.response) {
        const { data, status } = error.response;
        if (status === 422) {
          setError(data);
        }
      } else if (error.request) {
        setError(error);
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form method="post" onSubmit={submit}>
      <div className="register-confirm container text-center responsive">
        <h2 className="card-title text-center">
          <span className={"text-primary"}>¡</span>Sé parte de {<NameProject />}
          <span className={"text-primary"}>!</span>
        </h2>
        <div className="card-subtitle d-inline-block">
          ¡Conéctate con otros usuarios a tu alrededor, sin tener que salir de
          casa!
        </div>

        <div className="row">
          <div className="col-md-6 aling-items">
            <Address
              api={api}
              error={error}
              handleInputChange={handleInputChange}
              loading={loading}
              requireds={requireds}
              setValues={setValues}
              values={values}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <div className="text-center">
              <Button color="primary" onClick={() => handleFormState(1)}>
                Volver
              </Button>
              <Button
                color="secondary"
                type="submit"
                disabled={loading}
                loading={loading}
                style={{ marginLeft: "20px" }}
              >
                Siguiente
              </Button>
            </div>
          </div>
        </div>
      </div>
      <style jsx global={true}>{`

        .text-primary {
          color: ${primaryColor} !important;
        }

        strong.text-primary {
           color: ${primaryColor} !important;
        }


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
          color: ${primaryColor} !important;
        }

        .register-confirm {
          color: #666666;
        }

        @media(min-width:765px){
          .aling-items {
            margin-left: 25%;
          }
        }

        @media(max-width: 765px) {
          .responsive{
            padding: 0px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
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
            padding: 0px!important;
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

          .text-primary {
            color: ${primaryColor} !important;
          }
        }

      .text-primary {
        color: ${primaryColor} !important;
      }

      `}</style>
    </form>
  );
};

export default withAuth(UserAddressForm, true);
