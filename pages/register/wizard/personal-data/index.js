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
import FormGroup from '~/components/layout/AuthModal/FormGroup'
import Label from '~/components/Form/Label'
import Input from '~/components/layout/AuthModal/Input'
import Select from "~/components/Select/Select";
import Loading from "~/components/Loading/Loading";
import Flatpickr from "react-flatpickr";
import InvalidFeedback from "~/components/Form/InvalidFeedback";


const PersonalDataForm = ({ api, layoutProps, handleSubmit, handleFormState, formData, setFormData,setReleasedPackages,releasedPackages }) => {

  const formDataHasProperties = formData.hasOwnProperty("country_id")
    && formData.hasOwnProperty("address_1st_level")
    && formData.hasOwnProperty("city")
    && formData.hasOwnProperty("address_3rd_level")
    && formData.hasOwnProperty("address");

  const theme = useContext(ThemeContext);
  const primaryColor = Color(theme.colors.primary).hsl().string();
  const [packs, setPacks] = useState();
  const requireds = IS_PRODUCTION;
  const { user } = useContext(UserContext);
  const [genders, setGenders] = useState();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState({
    birthdate: null
  });
  let minDate = new Date().getFullYear() - 18;
  const [initialDate, setinitialDate] = useState(`${minDate}-12-31`);
  const [values, setValues] = useState({
    name: "",
    gender_id: "",
    document: "",
    nickname: "",
    birthdate: "",
    registration: "",
    isPartner: "",
    birth_of_date: "",
    abonado: "",
    country_id: "",
    address_1st_level: "",
    city: "",
    address_3rd_level: "",
    address: ""
  });
  const [discounts, setDiscounts] = useState(false);
  const [blockDiscountFields, setBlockDiscountFields] = useState(false);
  const [error, setError] = useState();


  useEffect(_ => {
    (async _ => {
      const { data } = await api.get("genders");
      setGenders(data);
    })();
  }, []);
  /* fill user form */
  useEffect(
    _ => {
      if (user) {
        // console.log("Primeiro useEffect (componentDidMount)")

        // console.log(`\n\n user --  ${JSON.stringify(user)} \n\n`);

        // console.log(`\n\n formData before set ${JSON.stringify(formData)} \n\n`);
        setDate({
          ...date,
          birthdate: new Date()
        });
        if (!formDataHasProperties) {
          setFormData({
            ...formData,
            address: user.address ? user.address : "",
            city: user.city ? user.city : "",
            country_id: user.country_id ? user.country_id : "",
            address_1st_level: user.address_1st_level_id,
            address_3rd_level: user.address_3rd_level,
            name: user.name ? user.name : "",
            gender_id: user.gender_id ? user.gender_id : "",
            document: user.document ? user.document : "",
            nickname: user.nickname ? user.nickname : "",
            birthdate: user.birthdate ? user.birthdate : "",
            registration: user.registration ? user.registration : "",
            isPartner: user.is_partner ? user.is_partner : "",
            abonado: null,
            terms: user.terms,
            messageismiembro: "",
            abonado_select: null,
            is_miembro: false
          });
        }

        // console.log(`\n\n formData after set ${JSON.stringify(formData)} \n\n`);

      }
    },
    [user]
  );


  useEffect(() => {
    if (Object.values(formData).filter(x => x != null).length > 0) {
      // console.log(`\n\n\nAqui o formData -- ${JSON.stringify(formData)}\n\n\n`);

      for (let key in formData) {
        if (values.hasOwnProperty(key) && values[key] != null) {
          values[key] = formData[key];
        }
      }

    }
  }, [values])

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
        email: user.email,
        name: formData.name,
        gender_id: formData.gender_id,
        document: formData.document,
        nickname: formData.nickname,
        registration: formData.registration,
        birthdate: date.birthdate,
        is_partner: formData.isPartner,
        abonado: "",
        terms: false,
        messageismiembro: "",
        is_miembro: formData.is_miembro
      };
      setError();
      const res = await api.post(`register/complete-user`, userData);


      // handleSubmit(1, userData);
      setReleasedPackages({data:false,packages:true})
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
      <div className="register-confirm container text-center responsive active">
        <h2 className="card-title text-center">
          <span className={"text-primary"}>¡</span>Únete a {<NameProject />}
          <span className={"text-primary"}>!</span>
        </h2>
        <div className="card-subtitle d-inline-block">
          ¡Antes de seguir, queremos saber más de ti!
        </div>

        <div className="row">
          <div className="col-md-12  complete" >
            Complete sus datos personales

               </div>

          <div className="row">
            <div className="col-md-12" style={{ padding: 0 }}>
              <div className="row">
                <div className="col-md-6">
                  <FormGroup>
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name || values.name}
                      onChange={handleInputChange}
                    />
                    <InvalidFeedback
                      error={error}
                      loading={loading}
                      name="name"
                    />
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
                      value={formData.gender_id || values.gender_id}
                    >
                      {!genders ? (
                        <option disabled value="">
                          Cargando...
                      </option>
                      ) : genders.length ? (
                        <>
                          <option disabled value="">
                            Selecciona tu género
                        </option>
                          {genders.map((genre, key) => (
                            <option {...{ key }} value={genre.id}>
                              {genre.name}
                            </option>
                          ))}
                        </>
                      ) : (
                            <option disabled value="">
                              Incapaz de cargar géneros
                      </option>
                          )}
                    </Select>
                    <InvalidFeedback
                      error={error}
                      loading={loading}
                      name="gender_id"
                    />
                  </FormGroup>
                </div>
                <div className="col-md-6">
                  <FormGroup>
                    <Label htmlFor="name">Apellidos</Label>
                    <Input
                      id="nickname"
                      name="nickname"
                      value={formData.nickname || values.nickname}
                      onChange={handleInputChange}
                    />
                    <InvalidFeedback
                      error={error}
                      loading={loading}
                      name="nickname"
                    />
                  </FormGroup>
                </div>
                <div className="col-md-6">
                  <FormGroup>
                    <Label htmlFor="birth">Fecha de nacimiento</Label>
                    <Flatpickr
                      id="birthdate"
                      name=" birthdate"
                      options={{
                        altInput: "true",
                        altFormat: "d-m-y",
                        dateFormat: "Y-m-d",
                        locale: "es",
                        maxDate: initialDate
                      }}
                      onChange={birthdate => {
                        setDate({ birthdate: birthdate });
                      }}
                      value={formData.birth_of_date}
                      className={"form-control"}
                    />
                    <InvalidFeedback
                      error={error}
                      loading={loading}
                      name="birthdate"
                    />
                  </FormGroup>
                </div>
                <div className="col-md-6">
                  <FormGroup>
                    <Label htmlFor="document">RUT (sin puntos y con guion)</Label>
                    <Input
                      id="document"
                      name="document"
                      onChange={handleInputChange}
                      required={requireds}
                      type="text"
                      value={formData.document || values.document}
                    />
                    <InvalidFeedback
                      error={error}
                      loading={loading}
                      name="document"
                    />
                  </FormGroup>
                </div>
              </div>


              {discounts &&
                discounts.map(d => (
                  <FormGroup key={d.id}>
                    <Label htmlFor={d.dsc_id}>{d.name}</Label>
                    <Input
                      disabled={discounts.find(
                        disc =>
                          !["", undefined].includes(values[disc.dsc_id]) &&
                          disc.id != d.id
                      )}
                      id={d.id}
                      maxLength={5}
                      name={d.dsc_id}
                      onChange={handleDiscountChange}
                      type="text"
                      style={
                        values.discount_id == d.id
                          ? { backgroundColor: "rgb(206, 249, 206)" }
                          : {}
                      }
                      value={values[d.dsc_id] || ""}
                      readOnly={blockDiscountFields}
                    />
                    <div style={{ float: "right", paddingTop: "10px" }}>
                      <Loading
                        size="20"
                        color="white"
                        loadingState={
                          values.discount_id == d.id && blockDiscountFields
                        }
                      />
                    </div>
                  </FormGroup>
                ))}


            </div>
            <div className="col-md-12  complete" >
              Completa los detalles de tu casa
               </div>
            <div className="col-md-12" style={{ padding: 0 }}>
              <div className="row">

                {/* Address */}
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
          </div>

        </div>

      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <div className="text-center">
            <Button
              color="secondary"
              type="submit"
              disabled={loading}
              loading={loading}
              style={{ marginLeft: "20px" ,marginBottom: "20px"}}
            >
              Salvar
              </Button>
          </div>
        </div>
      </div>

      <style jsx global={true}>{`

        ${releasedPackages.data==false?'.active{pointer-events: none;opacity: 0.4;}':''}

      .complete {
            background: var(--primary);
            color: white;
            padding: 6px;
            margin-bottom: 22px;
        }
      

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
    </form >
  );
};

export default withAuth(PersonalDataForm, true);
