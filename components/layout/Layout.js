import Color from 'color'
import Head from 'next/head'
import { GRAY3, IS_PRODUCTION } from '../../constants/constants'
import Header from './Header'
import Footer from './Footer'
import { CONFIG } from '../../config'

const Layout = ({ header, paddingTop, ...props }) => {

  if (header === 'closed') {
    paddingTop = false
  } else if (paddingTop !== undefined) {
    paddingTop = paddingTop
  } else {
    paddingTop = true
  }

  if ( ! IS_PRODUCTION) {
    import('bootstrap/dist/css/bootstrap.min.css')
    import('slick-carousel/slick/slick.css')
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, shrink-to-fit=no, width=device-width" />
        { IS_PRODUCTION && (
          <>
            <link
              crossOrigin="anonymous"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
              rel="stylesheet"
              />
            <link
              charSet="utf-8"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
              rel="stylesheet"
              type="text/css"
            />
          </>
        ) }
        { IS_PRODUCTION ? (
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            rel="stylesheet"
            type="text/css"
          />
        ) : (
          <link href="/static/slick-theme.min.css" rel="stylesheet" />
        ) }
        <link rel="stylesheet" href="/static/fonts/helvetica/stylesheet.css" />
        <link rel="stylesheet" href="/static/fonts/helvetica-ce/stylesheet.css" />
        <link rel="stylesheet" href="/static/fonts/bebas-neue/stylesheet.css" />
        <script src="https://player.vimeo.com/api/player.js"></script>
      </Head>
      <Header closed={header === 'closed'} />
      <main className={ ! paddingTop ? 'no-padding' : ''}>
        {props.children}
      </main>
      <Footer />
      <style jsx global>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
        :root {
          /* colors */
          --white:         #fff;
          --light-gray:    #c4c4c4;
          --gray:          #b2b2b2;
          --gray2:         #808080;
          --gray2-rgb:     128, 128, 128;
          --gray3:         ${GRAY3};
          --gray3-rgb:     51, 51, 51;
          --gray3-darken:  #282828;
          --mid-gray:      #4d4d4d;
          --dark-gray3:    #1a1a1a;
          --black:         #000;
          --black-rgb:     0, 0, 0;
          --primary:       ${CONFIG.color};
          --primary-hover: ${Color(CONFIG.color).darken(.2)};
          --gray4:         #666;

          /* fonts */
          --sans-serif: 'Helvetica', sans-serif;
          --sans-serif-condensed: 'Helvetica CE', 'Helvetica', sans-serif;

          /* font-sizes */
          --font-size: 20px;

          /* others */
          --padding-top: 90px;
        }
        @media (min-width: 768px) {
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
          background-color: var(--black);
          color: var(--white);
          font-family: var(--sans-serif);
          font-size: var(--font-size);
          height: 100%;
          margin: 0;
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
      `}</style>
    </>
  );
}

export default Layout
