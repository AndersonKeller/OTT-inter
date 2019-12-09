
import Head from 'next/head'
import Layout from '../../../components/layout/Layout'
import { CONFIG } from '../../../config'
import { useEffect } from 'react'

const Page = ({ layoutProps }) => {

  let POS

  function onSubmit(event) {
    event.preventDefault();
    const data = {
      token_type: document.getElementById('token_type').value,
      holder_name: document.getElementById('holder_name').value,
      expiration_date: document.getElementById('expiration_date').value,
      card_number: document.getElementById('card_number').value,
      credit_card_cvv: document.getElementById('credit_card_cvv').value,
      custom_data: document.getElementById('custom').value,
    }
    POS.tokenize(data, onToken)
  }

  function onToken(result) {
    const json = JSON.parse(result)
    console.log (json);
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
  }

  const latestJSApi = 'https://js.paymentsos.com/v2/latest/token.min.js'
  const specifiedJSApi = 'https://js.paymentsos.com/v2/0.0.1/token.min.js'
  const jsApi = latestJSApi || specifiedJSApi

  useEffect(() => {
    const script = document.createElement("script")
    script.src = latestJSApi
    script.async = true
    script.onload = () => scriptLoaded()
    document.body.appendChild(script)
  })

  return (
    <Layout {...layoutProps} color="white" payments>
      <Head>
        <title>Payments Sample &lt; {CONFIG.appName}</title>
      </Head>
        Payments
        <form id="payment-form" method="post" onSubmit={onSubmit}>

          {/* custom additional data */}
          <input type="text" id="custom" placeholder="Custom Additional Data" />

          {/* mandatory data */}
          <div>
            <input
              id="holder_name"
              placeholder="John
              Doe"
              required
              type="text"
              defaultValue="John Doe"
            />
          </div>
          <div>
            <input
              id="token_type"
              placeholder="Holder Type"
              required
              type="text"
              defaultValue="credit_card"
            />
          </div>
          <div>
            <input
              id="expiration_date"
              placeholder="Exp. Date"
              required
              type="text"
              defaultValue="09-2019"
            />
          </div>
          <div>
            <input
              id="card_number"
              placeholder="Card Number"
              required
              type="text"
              defaultValue="4111111111111111"
            />
          </div>
          <div>
            <input
              id="credit_card_cvv"
              placeholder="CVV"
              type="text"
              defaultValue="123"
            />
          </div>

          <button type="submit">Pay</button>
        </form>
    </Layout>
  )
}

export default Page
