import Document, { Html, Head, Main, NextScript } from 'next/document'
import { IS_PRODUCTION } from '~/constants/constants'

class MyDocument extends Document {

  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1, shrink-to-fit=no, width=device-width" />
          {/* styles */}
          { IS_PRODUCTION ? <>
            {/* bootstrap */}
            <link
              crossOrigin="anonymous"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
              rel="stylesheet"
              />
            {/* slick */}
            <link
              charSet="utf-8"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
              rel="stylesheet"
              type="text/css"
            />
            {/* slick theme */}
            <link
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
              rel="stylesheet"
              type="text/css"
            />
            {/* roboto & roboto condensed */}
            <link
              href="https://fonts.googleapis.com/css?family=Roboto:400,700|Roboto+Condensed:700&amp;display=swap"
              rel="stylesheet"
            />
          </> : <>
            {/* slick theme */}
            <link href="/static/slick-theme.css" rel="stylesheet" />
            {/* roboto & roboto condensed */}
            <link href="/static/fonts/roboto/stylesheet.css" rel="stylesheet" />
          </> }
          {/* bebas */}
          {/* <link rel="stylesheet" href="/static/fonts/bebas-neue/stylesheet.css" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }

}

export default MyDocument
