import withAuth from "~/components/withAuth";
import Layout from "~/components/layout/Layout";
import PersonalData from "./personal-data/index";
import Signature from "./signature/index";
import SubscriptionSuccess from "./subscription-success";
import React, { useContext, useEffect, useState } from "react";
import { IS_PRODUCTION, TENANT } from "~/constants/constants";
import Header from "~/components/layout/HeaderCad";
import MultiStepIndicator from "~/components/MultiStepIndicator";
import LogoApp from "~/components/LogoApp";
import { ThemeContext } from "styled-components";
import Color from "color";


const CompleteTest = ({ api, layoutProps, packages, user }) => {
  const handleSubmit = (index, userData) => {
    setWizardIndex(index);
    setUserData(userData);
  };

  const [formData, setFormData] = useState({});

  const handleFormState = (index) => {
    if (index > 0) {
      setWizardIndex(index - 1);
    }
  }


  const requireds = IS_PRODUCTION;
  const [userData, setUserData] = useState();
  const [packs, setPacks] = useState();

  const [values, setValues] = useState({
    package_id: "",
    payment_method_id: null,
    payment_os: null,
    cash_payment_method_id: null,
    terms: null,
    discount_id: null
  });

  const [wizardIndex, setWizardIndex] = useState(0);

  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [releasedPackages, setReleasedPackages] = useState({ data: true, packages: false, submit: false });
  const [loadingSubmit, setLoadingSubmit] = useState(false);


  const theme = useContext(ThemeContext);
  const backgroundColor = Color(theme.colors.background)
    .hsl()
    .string();


  useEffect(_ => {

    (async () => {

      let p;
      try {
        const { data } = await api.get("packages");
        p = { items: data };
        setPacks(p);
      } catch (error) {
        p = { error };
        setPacks(p);
      }
    })();
  }, [wizardIndex]);

  const changeIndex = idx => {
    setWizardIndex(idx);
  };

  const selectPackage = packageId => {
    setValues({
      package_id: packageId
    });
  };

  function renderComponents() {

    switch (wizardIndex) {
      case 0:
        return (
          <>
            <PersonalData
              api={ api }
              layoutProps={ layoutProps }
              handleSubmit={ handleSubmit }
              handleFormState={ handleFormState }
              formData={ formData }
              setFormData={ setFormData }
              setReleasedPackages={ setReleasedPackages }
              releasedPackages={ releasedPackages }
              setLoadingSubmit={ setLoadingSubmit }
              loadingSubmit={ loadingSubmit }
            />

            <Signature
              api={ api }
              layoutProps={ layoutProps }
              handleSubmit={ handleSubmit }
              handleFormState={ handleFormState }
              formData={ formData }
              setFormData={ setFormData }
              releasedPackages={ releasedPackages }
              setReleasedPackages={ setReleasedPackages }
              setLoadingSubmit={ setLoadingSubmit }
              loadingSubmit={ loadingSubmit }

            />
          </>

        );

      case 1:
        return (
          <Signature
            api={ api }
            layoutProps={ layoutProps }
            handleSubmit={ handleSubmit }
            handleFormState={ handleFormState }
            formData={ formData }
            setFormData={ setFormData }
          />

        );

      case 4:
        return (
          <SubscriptionSuccess
            handleFormState={ handleFormState }
            formData={ formData }
            { ...{
              api
            } }
          />
        );
    }

  }

  return (
    <Layout
      header={ "hidden" }
      footer={ "show" }
      customClass={ "subscription-screen" }
    >
      <Header/>

      <MultiStepIndicator index={ wizardIndex } onClick={ handleSubmit }/>
      <div
        className="card-wrapper d-flex align-items-center justify-content-center h-100 responsive"
        style={ {
          backgroundImage: `url('/static/${ TENANT }/subs/background.jpeg')`
        } }
      >
        <div className="card">
          <div
            className={ "card-header text-center" }
            style={ {
              backgroundColor: backgroundColor,
              padding: "25px 15px",
              border: "none",
              borderRadius: "0",
              justifyContent: "center",
              display: "flex",
              width: "100%"
            } }
          >
            <div className="img-logoApp-card img">
              { " " }
              <LogoApp/>
            </div>
          </div>
          <div className="card-body">{ renderComponents() }</div>

        </div>


      </div>

      <style sjx>
        { `

        .signup-screen .card-wrapper .card .card-header
        .img-logoApp-card img,
        .subscription-screen .card-wrapper .card .card-header .img-logoApp-card img {
          width: 100%!important;
        }

        .signup-screen .card-wrapper .card .card-body, .subscription-screen .card-wrapper .card .card-body {
          height:100%!important;
        }

        .img-logoApp-card{
          max-width: 200px;
        }

      @media(max-width: 765px) {

        .responsive {
          display: flex;
          flex-wrap: wrap;
          height:100%!important;
        }

          }
        .card{
          background-color: rgba(255,255,255,0.85);
        }

        .card-body {
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
      }

      ` }
      </style>
    </Layout>
  );
};

CompleteTest.getInitialProps = async ctx => {
  const { api, res, user } = ctx;

  // get packages
  let packages;
  try {
    const { data } = await api.get("packages");
    packages = { items: data };
  } catch (error) {
    packages = { error };
  }

  // return
  return { packages, user };
};

export default withAuth(CompleteTest, true);
