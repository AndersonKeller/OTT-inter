
import Head from 'next/head'
import Layout from '../../../components/layout/Layout'
import { CONFIG } from '../../../config'
import { useEffect } from 'react'
import { IS_PRODUCTION } from '../../../constants/constants'

const Page = ({ errorCode, layoutProps }) => {
  let POS
  function onSubmit(event) {
    event.preventDefault();
    const additionalData = {
      holder_name: document.getElementById('cardholder-name').value,
      custom_data: document.getElementById('custom').value,
    }
    POS.createToken(additionalData, function(result) {
      const json = JSON.parse(result)
      if (json.token) {
        // sample response:
        /* {
          "token":"3c82255a-7986-405b-9721-11be1d3ab6ed",
          "created":"1575914964507",
          "pass_luhn_validation":true,
          "encrypted_cvv":"NjI0MzdmN2UtOGUwYS00MWVmLWFkZTItOGYyMDRhNjQ4YWRiY3Z2X2RlbGltaXRlcnZhdWx0OnYxOnIzd1g0aGowbXZ5NS9nQ2lPb2ZlR29tR2FDcnZHYVJEalUrTzJreTVxQ2VaSVNLSVpxNnRCSlNJQi9mVmV6am5zdzI1a3lLbFpwR2hSQjRLRExOZzVqWFBZYWtmdC9iVTE5MVZvU01y",
          "token_type":"credit_card",
          "type":"tokenized",
          "state":"created",
          "bin_number":"550209",
          "vendor":"MASTERCARD",
          "card_type":"CREDIT",
          "issuer":"NU PAGAMENTOS SA",
          "level":"GOLD",
          "country_code":"BRA",
          "holder_name":"Giovanni",
          "expiration_date":"08/2027",
          "last_4_digits":"3362"
        } */
      } else {
        const possibleErrors = [
          {
            category: "client_validation_error",
            description: "Invalid PAN",
            more_info: "Card number did not pass luhn validation"
          },
          {
            category: "client_validation_error",
            description: "Invalid expiration date",
            more_info: "expiration date have passed"
          },
          {
            category: "client_validation_error",
            description: "Missing required parameters",
            more_info: "holder_name field is mandatory"
          },
        ]
      }
    });
  }
  function scriptLoaded() {
    const payUEnv = 'test'
    const businessUnitPublicKey = '88985036-6530-4b5a-a7ec-c4e07ec07f6c'
    POS = window.POS
    if ( ! POS) {
      return console.log('POS not defined')
    }
    POS.setPublicKey(businessUnitPublicKey)
    POS.setEnvironment(payUEnv)
    POS.initSecureFields('card-secure-fields');
  }
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paymentsos.com/v2/latest/secure-fields.min.js";
    script.async = true;
    script.onload = () => scriptLoaded();
    document.body.appendChild(script);
  })
  return (
    <Layout color="white" errorCode={errorCode} {...layoutProps}>
      <Head>
        <title>Payments Sample &lt; {CONFIG.appName}</title>
      </Head>
        Payments
        <form id="payment-form" method="post" onSubmit={onSubmit}>

          {/* custom additional data */}
          <input type="text" id="custom" placeholder="Custom Additional Data" />

          {/* mandatory data */}
          <input id="cardholder-name" placeholder="John Doe" required type="text" />

          <div id="card-secure-fields">
            <p>The payment form will be displayed here</p>
          </div>
          <button type="submit">Pay</button>
        </form>
    </Layout>
  )
}

Page.getInitialProps = _ => {
  if (IS_PRODUCTION) {
    const errorCode = 404
    return { errorCode }
  }
}

export default Page
