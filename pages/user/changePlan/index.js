// next
import Head from 'next/head'

// env
import { CONFIG } from '~/config'
import { HAS_WINDOW } from '~/constants/constants'

// react
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useScript, { ScriptStatus } from '@charlietango/use-script'
import nookies from 'nookies'

// components
import Layout from '~/components/layout/Layout'
import { PackageRadio } from '~/components/Packages'
import ChangePlanForm from './form'
import withAuth from '~/components/withAuth'


const ChangePlanPage = ({ api, layoutProps, packages, user }) => {

  const [ready, status] = useScript('https://js.paymentsos.com/v2/latest/secure-fields.min.js')
  const [isPayUReady, setIsPayUReady] = useState(false)
  const [plan, setPlan] = useState()


  const businessUnitPublicKey = '88985036-6530-4b5a-a7ec-c4e07ec07f6c'
  const POS = ready && HAS_WINDOW ? window.POS : null
  const payUEnv = 'test'

  const POSStyle = {
    base: {
      borderRadius: '.15rem',
      backgroundColor: 'white',
      height: 'calc(1.5em + .75rem + 2px)',
      fontSize: '12px',
      padding: '0px 3px',
      marginLeft: '5px',
      cardImage: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        margin: 0,
      },
      pan: {
        width: '160px',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        marginLeft: 0,
      },
      expirationDate: { width: '47px' },
      secureFields: { left: '40px' },
      cvv: { width: '35px' }
    }
  }

  if (status === ScriptStatus.ERROR) {
    console.log('Failed to load POS API')
  }

  useEffect(_ => {
    if (POS) {
      POS.setPublicKey(businessUnitPublicKey)
      POS.setEnvironment(payUEnv)
      POS.setStyle(POSStyle)
      POS.setCardNumberPlaceholder('Tarjeta de crédito')
      POS.setExpirationDatePlaceholder('MM/AA')
      setIsPayUReady(true)
    }
  }, [POS])

  useEffect(_ => {
    // //filter
    let package_id = user.package_id;
    // const { datafilter: { package_id, ...datafilter } } = await api.get('subscription')

    if (package_id) {
      setPlan(packages.items.find(item => item.id == package_id))

    } else {
      setPlan(packages.items.find(item => item.amount == 0))
    }

  }, [])

  return (
    <Layout {...layoutProps}>
      <Head>
        <title>Cambiar &lt; Plan &lt; {CONFIG.appName}</title>
      </Head>
      <div className="rgpage container-fluid">
        <div className="row">
          <div className="col-xl-8 offset-xl-2">

            <h1 className="h2">Tú Plan Actual</h1>
            <div className="col col-md-4 text-left vertical-align" style={{ fontSize: '16px', lineHeight: 1 }}>
              {plan && (<PackageRadio
                readOnly
                plan={{ id: plan.id, name: plan.name, amount: plan.amount, currency: plan.currency }}
                package_id={plan.id}
              />)}
            </div>
            <h1 className="h2">Nuevo Plan</h1>
            <ChangePlanForm {...{ api, isPayUReady, packages, POS }} />

          </div>
        </div>
      </div>
      <style jsx>{`
        .rgpage {
          padding-top: 40px;
          padding-bottom: 120px;
        }
        .h2 {
          margin-bottom: 10px;
        }
      `}</style>
    </Layout>
  )
}

// getInitialProps
ChangePlanPage.getInitialProps = async ctx => {

  const { api } = ctx

  // get packages
  let packages
  try {
    const { data } = await api.get('packages')
    packages = { items: data }
  } catch (error) {
    packages = { error }
  }

  return { packages }
}

export default withAuth(ChangePlanPage)
