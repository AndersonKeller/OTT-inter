// react imports
import { useEffect } from 'react'

// next imports
import Head from 'next/head'

// other imports
import Color from 'color'
import nookies from 'nookies'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

// app imports
import { BLACK, GRAY3 } from '../../constants/colors'
import { IS_PRODUCTION } from '../../constants/constants'
import Header from './Header'
import Footer from './Footer'
import { CONFIG } from '../../config'
import loadMenus from '../../lib/load-menus'
import { WHITE } from '../../constants/colors'
import AuthModal from './AuthModal/AuthModal'
import CustomError from '../../pages/_error'

// layout
const Layout = ({
  children,
  color: layoutColor = 'black',
  errorCode,
  header,
  menus,
  menusError,
  paddingTop = true,
}) => {

  if (errorCode) {
    return <CustomError statusCode={errorCode} />
  }

  if (header === 'closed') {
    paddingTop = false
  }

  if ( ! IS_PRODUCTION) {
    import('bootstrap/dist/css/bootstrap.min.css')
    import('slick-carousel/slick/slick.css')
  }

  const { flash_message } = nookies.get({}, 'flash_message')
  useEffect(_ => {
    if (flash_message) {
      toast.info(flash_message, {
        delay: 1000,
        onClose: _ => nookies.destroy({}, 'flash_message', { path: '/' }),
      })
      nookies.destroy({}, 'flash_message', { path: '/' })
    }
  }, [flash_message])

  return (
    <>
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
            href="https://fonts.googleapis.com/css?family=Roboto:400,700||Roboto+Condensed:700&amp;display=swap"
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

        {/* vimeo */}
        <script src="https://player.vimeo.com/api/player.js"></script>

      </Head>

      <ToastContainer newestOnTop />

      <Header {...{
        closed: header === 'closed',
        layoutColor,
        menus: menusError ? null : menus,
      }} />

      <main className={ ! paddingTop ? 'no-padding' : ''}>
        {children}
      </main>

      <Footer {...{layoutColor}}/>

      <AuthModal />

      <style jsx global>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
        :root {
          /* colors */
          --white:         ${WHITE};
          --light-gray:    #c4c4c4;
          --gray:          #b2b2b2;
          --gray2:         #808080;
          --gray2-rgb:     128, 128, 128;
          --gray3:         ${GRAY3};
          --gray3-rgb:     51, 51, 51;
          --gray3-darken:  #282828;
          --mid-gray:      #4d4d4d;
          --dark-gray3:    ${Color(GRAY3).darken(.5)};
          --black:         #000;
          --black-rgb:     0, 0, 0;
          --primary:       ${CONFIG.color};
          --primary-hover: ${Color(CONFIG.color).darken(.2)};
          --gray4:         #666; /* 656565 */

          /* colors by job */
          --background: var(--${layoutColor === 'white' ? 'white' : 'black'});
          --color: var(--${layoutColor === 'white' ? 'black' : 'white'});
          --descriptions-color: var(--gray);

          /* fonts */
          --sans-serif: 'Roboto', sans-serif;
          --sans-serif-condensed: 'Roboto Condensed', 'Roboto', sans-serif;

          /* font-sizes */
          --font-size: 20px;

          /* others */
          --padding-top: 75px;
        }
        @media (min-width: 768px) {
          :root {
            --padding-top: 80px;
          }
        }
        @media (min-width: 992px) {
          :root {
            --font-size: 20px;
          }
        }
        html {
          height: 100%;
        }
        body {
          background-color: var(--background);
          color: var(--color);
          font-family: var(--sans-serif);
          font-size: var(--font-size);
          height: 100%;
          margin: 0;
        }
        strong {
          font-weight: bold;
        }
        #__next {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        #nprogress .bar {
          background: var(--primary);
        }
        #nprogress .peg {
          box-shadow: 0 0 10px var(--primary), 0 0 5px var(--primary);
        }
        #nprogress .spinner-icon {
          border-top-color: var(--primary);
          border-left-color: var(--primary);
        }
        main {
          margin-bottom: auto;
          padding-top: var(--padding-top);
        }
        main.no-padding {
          padding-top: 0;
        }
        a {
          color: inherit;
        }
        input[type="search"]::-webkit-search-cancel-button {
          display: none;
        }
        p {
          margin-top: 0;
          margin-bottom: 10px;
        }
        /* toasts */
        .Toastify__toast-container--top-right {
          top: 3.75em;
        }
        .Toastify__toast--info {
          background-color: ${Color(WHITE).fade(.1)};
          color: ${BLACK};
          min-height: 45px;
          padding: 15px;
        }
        .Toastify__progress-bar {
          background-color: var(--primary);
        }
        .Toastify__close-button {
          color: ${BLACK};
        }
        /* gutters */
        .no-gutters {
          margin-right: 0;
          margin-left: 0;
        }
        .no-gutters > .col,
        .no-gutters > [class*="col-"] {
          padding-right: 0;
          padding-left: 0;
        }
        .gutter-10 {
          margin-right: -5px;
          margin-left: -5px;
        }
        .gutter-10 > .col,
        .gutter-10 > [class*="col-"] {
          padding-right: 5px;
          padding-left: 5px;
        }
        .gutter-15 {
          margin-right: -7.5px;
          margin-left: -7.5px;
        }
        .gutter-15 > .col,
        .gutter-15 > [class*="col-"] {
          padding-right: 7.5px;
          padding-left: 7.5px;
        }
        /* headings */
        .h2 {
          font-family: var(--sans-serif);
          font-size: 31px;
          font-weight: bold;
          line-height: 1;
          margin-top: 0;
          margin-bottom: 0;
        }
        /* helpers */
        .img-fluid {
          display: block;
          height: auto;
          max-width: 100%;
          width: 100%;
        }
        .w-100 {
          width: 100%;
        }
        .text-uppercase {
          text-transform: uppercase;
        }
        .text-right {
          text-align: right;
        }
        .text-center {
          text-align: center;
        }
        @media (min-width: 768px) {
          .text-md-left {
            text-align: left;
          }
          .text-md-right {
            text-align: right;
          }
        }
        .text-decoration-none {
          text-decoration: none;
        }
        .bold {
          font-weight: bold;
        }
        .invalid-feedback,
        .valid-feedback {
          display: block;
          font-size: 14px;
        }
      `}</style>
    </>
  );
}

Layout.getInitialProps = async ctx => {
  try {
    const menus = await loadMenus(ctx)
    return { menus }
  } catch (error) {
    if (error.response) {
      console.log(`The request was made and the server responded with a status code
      that falls out of the range of 2xx`, error.response.status)
      // console.log(error.response.headers)
      // console.log(error.response.data)
    } else if (error.request) {
      console.log('The request was made but no response was received')
      // console.log(error.request)
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }
    return { errorCode: 503 }
  }
}

export default Layout
