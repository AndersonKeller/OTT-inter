import withAuth from "~/components/withAuth";
import Layout from "~/components/layout/Layout";
import UserData from "./user-data";
import { useState } from "react";
import { IS_PRODUCTION } from "~/constants/constants";

import Payment from "~/pages/register/wizard/payment";
import Packages from "./packages"
import MultiStepIndicator from "~/components/MultiStepIndicator";

const CompleteTest = ({ api, layoutProps, packages, user }) => {


  const handleSubmit = (index) => {
    setWizardIndex(index);
  }

  const requireds = IS_PRODUCTION

  const [values, setValues] = useState({
    package_id: '',
    payment_method_id: null,
    payment_os: null,
    cash_payment_method_id: null,
    terms: null,
    discount_id: null,
  })

  const [wizardIndex, setWizardIndex] = useState(0);

  const [loading, setLoading] = useState()
  const [error, setError] = useState()


  const changeIndex = (idx) => {
    setWizardIndex(idx);
  }

  const selectPackage = (packageId) => {
    setValues({
      package_id: packageId
    })
  }

  function renderComponents() {

    switch (wizardIndex) {

      case 0:
        return <UserData
          api={ api }
          layoutProps={ layoutProps }
          handleSubmit={ handleSubmit }
        />
      case 1:
        return <Packages packages={ packages } layoutProps={ layoutProps } selectPackage={ selectPackage }
                         handleSubmit={ handleSubmit }/>
      case 2:
        return <Payment
          { ...{
            api,
            error,
            requireds,
          } }
        />

    }
  }

  return (

    <Layout>

      <MultiStepIndicator index={ wizardIndex } onClick={ handleSubmit }/>

      { renderComponents() }

    </Layout>


  )

}

CompleteTest.getInitialProps = async ctx => {

  const { api, res, user } = ctx

  // if user has already completed registry, redirect it
  // if (user.register_completed_at) {
  //   let message = JSON.stringify({ info: "Ya ha completado su registro." })
  //   nookies.set(ctx, 'flash_message', message, { path: '/' })
  //   if (res) {
  //     res.redirect('/')
  //     res.end()
  //     return {}
  //   } else {
  //     Router.back()
  //   }
  // }

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


export default withAuth(CompleteTest, true);
