import withApi from "~/components/withApi";
import Packages from "~/components/Packages";
import React, { useCallback, useContext, useState } from 'react'
import Button from "~/components/button";
import { ThemeContext } from "styled-components";
import Color from "color";
import { CONFIG } from "~/config";

const PackagesDetails = ({ packages, layoutProps, selectPackage, handleSubmit, handleFormState }) => {

  const [values, setValues] = useState({
    package_id: '',
  })

  const theme = useContext(ThemeContext)
  const primaryColor = Color(theme.colors.primary).hsl().string()

  const [blockDiscountFields, setBlockDiscountFields] = useState(false)
  const [loading, setLoading] = useState()
  const [error, setError] = useState()

  const { id: free_package_id } = packages.items.find(item => item.amount == 0) || {}

  const submit = async e => {
    e.preventDefault();

    try {
      setLoading(true);
      selectPackage(values.package_id);
      handleSubmit(3);

      setLoading(false);
    } catch (e) {
      console.error(e)
    }

    // handleSubmit(2);
  }

  const onPackageChange = useCallback(e => {
    const package_id = parseInt(e.target.value, 10)
    setValues(oldValues => ({
      ...oldValues,
      package_id,
      payment_method_id: package_id === free_package_id ? null : values.payment_method_id,
    }))
  }, [])

  function appName() {
    if (CONFIG.projectName) {
      return <div style={ { display: 'inline-block' } }>
        <strong className="text-primary">{ CONFIG.projectName.split(' ')[0] }</strong>{ CONFIG.projectName.split(' ')[1] }
      </div>
    } else if (CONFIG.appName) {
      return <div style={ { display: 'inline-block' } }>
        <strong className="text-primary">{ CONFIG.appName.split(' ')[0] }</strong>{ CONFIG.appName.split(' ')[1] }
      </div>
    }
    return <div style={ { display: 'inline-block' } }>
      <strong className="text-primary">Project</strong>Name!
    </div>
  }

  return (


    <div className="col-md-12">
      <form method="post" onSubmit={ submit }>
        <div className="register-confirm container text-center">

          <h2 className="card-title text-center"><span className={ "text-primary" }>¡</span>Sé parte de { appName() }
            <span className={ "text-primary" }>!</span></h2>
          <div className="card-subtitle d-inline-block">
            ¡Elige tu plan!
          </div>

          <Packages { ...{
            error: packages.error ? packages.error : null,
            items: packages.items ? packages.items : null,
            onChange: onPackageChange,
            package_id: values.package_id,
            validationError: !loading && error && error.errors && error.errors.package_id,
            discount_id: values.discount_id,
            setBlockDiscountFields,
          } } />

          <div className="row mt-3">
            <div className="col-md-12">
              <div className="text-center">
                <Button
                  onClick={() => handleFormState(2)}
                  color="primary"
                >
                Volver
                </Button>

                <Button color="secondary" disabled={ loading } loading={ loading } type="submit">Siguiente</Button>
              </div>
            </div>
          </div>
        </div>

        <style jsx global={true}>{ `

         .text-primary {
           color: ${ primaryColor} !important;
        }

        strong.text-primary {
           color: ${ primaryColor } !important;
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
           color: ${ primaryColor } !important;
        }
        .register-confirm {
          padding-top: 50px;
          padding-bottom: 50px;
          color: #666666;
        }

      ` }</style>
      </form>

    </div>


  )

}

PackagesDetails.getInitialProps = async ctx => {

  const { api, res, user } = ctx


  // get packages
  let packages
  try {
    const { data } = await api.get('packages')
    packages = { items: data }
  } catch (error) {
    packages = { error }
  }

  // return
  return { packages, user }
}


export default withApi(PackagesDetails, true);
