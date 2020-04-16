
import Head from 'next/head'
import Layout from '../../../components/layout/Layout'
import { CONFIG } from '../../../config'
import { useEffect } from 'react'
import { IS_PRODUCTION } from '../../../constants/constants'

const Page = ({ errorCode, layoutProps }) => {

  let POS

  function onSubmit(event) {
    event.preventDefault();
    const data = {
      token_type: "card_cvv_code",
      credit_card_cvv: document.getElementById('credit_card_cvv').value,
      payment_method_token: document.getElementById('payment_method_token').value,
    }
    POS.tokenize(data, onToken)
  }

  function onToken(result) {
    const json = JSON.parse(result)
    console.log (json);
    if (json.token) {
      // sample response:
      /* {
        created: 1575921556971
        token: "NTE0ZjMyMmYtMmE0Ny00MWYyLThlN2YtOGJmNWY5NjAzNjAyY3Z2X2RlbGltaXRlcnZhdWx0OnYxOnM5UUdDL00rNitVVXAxZWdNQVJuUVg1WGdUUzR0Z2YxWEJsZjJMQzE1dGY0ZTFTOXQwMTlHVGo4Ym9CUVJlekJINy93SkpMK2srUDdrWGkxUGpFdjRBdjkxS3lnd296TUxCT0JQY1lT"
        token_type: "card_cvv_code"
        type: "tokenized"
      } */
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
    script.src = jsApi
    script.async = true
    script.onload = () => scriptLoaded()
    document.body.appendChild(script)
  })

  return (
    <Layout color="white" errorCode={errorCode} {...layoutProps}>
      <Head>
        <title>Payments Sample &lt; {CONFIG.appName}</title>
      </Head>
        Payments
        <p>Reusing card's information</p>
        <form id="payment-form" method="post" onSubmit={onSubmit}>

          {/* mandatory data */}
          <div>
            <input
              id="credit_card_cvv"
              placeholder="CVV"
              type="text"
            />
          </div>
          <div>
            <input
              id="payment_method_token"
              placeholder="Payment Method Token"
              required
              type="text"
            />
            <p style={{lineHeight: 1}}><small>Something similar to<br />
              47e8dfbe-5cad-4c9f-29df-90b8bb54b6b1</small></p>
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
