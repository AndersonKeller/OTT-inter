import withApi from "~/components/withApi";
import Packages from "~/components/Packages";
import React, { useCallback, useContext, useState, useEffect } from "react";
import Button from "~/components/button";
import { ThemeContext } from "styled-components";
import Color from "color";
import NameProject from "~/components/NameProject/index";

const PackagesDetails = ({
  packages,
  layoutProps,
  selectPackage,
  handleSubmit,
  handleFormState,
  formData,
  setFormData
}) => {

  useEffect(
    _ => {
      console.log(`\n\n packages.js first useEffect (componentDidMount)`)
      console.log(`\n\n formData ${JSON.stringify(formData)} \n\n`)
    }
  );

  // const [values, setValues] = useState({
  //   package_id: ""
  // });

  const theme = useContext(ThemeContext);
  const primaryColor = Color(theme.colors.primary)
    .hsl()
    .string();

  const [blockDiscountFields, setBlockDiscountFields] = useState(false);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const { id: free_package_id } =
    packages.items.find(item => item.amount == 0) || {};

  const submit = async e => {
    e.preventDefault();

    try {
      setLoading(true);
      selectPackage(formData.package_id);

      if (formData.package_id === free_package_id) {
        handleSubmit(4, null);
      } else {
        handleSubmit(3);
      }

      setLoading(false);
    } catch (e) {
      console.error(e);
    }

    // handleSubmit(2);
  };

  const onPackageChange = useCallback(e => {
    const package_id = parseInt(e.target.value, 10);
    setFormData({
      ...formData,
      package_id,
      payment_method_id: package_id === free_package_id
        ? null
        : formData.payment_method_id
    });
    // setValues(oldValues => ({
    //   ...oldValues,
    //   package_id,
    //   payment_method_id:
    //     package_id === free_package_id ? null : values.payment_method_id
    // }));
  }, []);

  return (
    <div className="col-md-12">
      <form method="post" onSubmit={submit}>
        <div className="register-confirm container text-center">
          <h2 className="card-title text-center">
            <span className={"text-primary"}>¡</span>Únete a{" "}
            {<NameProject />}
            <span className={"text-primary"}>!</span>
          </h2>
          <div className="card-subtitle d-inline-block">Elige tu plan</div><br></br>
          <div className="card-subtitle d-inline-block">{formData.is_miembro ? 'Es miembro del club' : ''}</div>


          <Packages
            {...{
              error: packages.error ? packages.error : null,
              items: packages.items ? packages.items : null,
              onChange: onPackageChange,
              package_id: formData.package_id,
              validationError: !loading
                && error
                && error.errors
                && error.errors.package_id,
              discount_id: formData.discount_id,
              setBlockDiscountFields
            }}
          />

          <div className="row mt-3">
            <div className="col-md-12">
              <div className="text-center">
                <Button onClick={() => handleFormState(2)} color="primary">
                  Volver
                </Button>

                <Button
                  color="secondary"
                  disabled={loading}
                  loading={loading}
                  type="submit"
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
            padding-top: 50px;
            padding-bottom: 50px;
            color: #666666;
          }
        `}</style>
      </form>
    </div>
  );
};

PackagesDetails.getInitialProps = async ctx => {
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

export default withApi(PackagesDetails, true);
