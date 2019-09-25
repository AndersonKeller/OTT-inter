import Head from 'next/head'
import ONLINE from '../constants/constants'
import Header from './header'
import Footer from './layout/Footer'

const Layout = props => {
  var paddingTop
  if (props.header === 'closed')
    paddingTop = false
  else if (props.paddingTop !== undefined)
    paddingTop = props.paddingTop
  else
    paddingTop = true
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, shrink-to-fit=no, width=device-width" />
        {/* { ONLINE ? (
          <link rel="stylesheet" href="//stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap-grid.min.css" />
          ) : (
          <link rel="stylesheet" href="/static/styles/bootstrap-grid.min.css" />
        )} */}
        { ONLINE ? (
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
          />
          ) : (
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
          />
        )}
        <link rel="stylesheet" href="/static/fonts/helvetica/stylesheet.css" />
        <link rel="stylesheet" href="/static/fonts/helvetica-ce/stylesheet.css" />
        <link rel="stylesheet" href="/static/fonts/bebas-neue/stylesheet.css" />
        <link rel="stylesheet" type="text/css" charSet="utf-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        <script src="https://player.vimeo.com/api/player.js"></script>
      </Head>
      <Header closed={props.header === 'closed'} />
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
          --white:        #fff;
          --light-gray:   #c4c4c4;
          --gray:         #b2b2b2;
          --gray2:        #808080;
          --gray3:        #333;
          --gray3-rgb:    51, 51, 51;
          --gray3-darken: #282828;
          --mid-gray:     #4d4d4d;
          --dark-gray3:   #1a1a1a;
          --black:        #000;
          --black-rgb:    0, 0, 0;
          --red:          #ff0000;
          --dark-red:     #e50000;

          /* fonts */
          --sans-serif: 'Helvetica', sans-serif;
          --sans-serif-condensed: 'Helvetica CE', 'Helvetica', sans-serif;

          /* font-sizes */
          --font-size: 20px;

          /* others */
          --padding-top: 110px;
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
          color: #fff;
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
      `}</style>
    </>
  );
}
export default Layout
