import withApi from "~/components/withApi";
import Packages from "~/components/Packages";
import { useCallback, useState } from 'react'
import Button from "~/components/button";

const PackagesDetails = ({ packages, layoutProps, selectPackage, handleSubmit }) => {

  const [values, setValues] = useState({
    package_id: '',
  })

  const [blockDiscountFields, setBlockDiscountFields] = useState(false)
  const [loading, setLoading] = useState()
  const [error, setError] = useState()

  const { id: free_package_id } = packages.items.find(item => item.amount == 0) || {}

  const submit = async e => {
    e.preventDefault();

    try {
      setLoading(true);
      selectPackage(values.package_id);
      handleSubmit(2);
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

  return (


    <div className="col-md-8 offset-2">

      <h1>Selecciona tu plan</h1>
      <form method="post" onSubmit={ submit }>

        <Packages { ...{
          error: packages.error ? packages.error : null,
          items: packages.items ? packages.items : null,
          onChange: onPackageChange,
          package_id: values.package_id,
          validationError: !loading && error && error.errors && error.errors.package_id,
          discount_id: values.discount_id,
          setBlockDiscountFields,
        } } />

        <div className="text-right">
          <Button block color="secondary" disabled={ loading } loading={ loading } type="submit">Próximo</Button>
        </div>
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
