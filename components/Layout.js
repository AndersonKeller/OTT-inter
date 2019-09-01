import Head from 'next/head'
import Header from './header'
import ONLINE from '../constants/constants'

const Layout = props => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1, shrink-to-fit=no, width=device-width" />
      { ONLINE ? (
        <link rel="stylesheet" href="//stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap-grid.min.css" />
        ) : (
        <link rel="stylesheet" href="/static/styles/bootstrap-grid.min.css" />
      )}
      <link rel="stylesheet" href="/static/fonts/helvetica/stylesheet.css" />
      <link rel="stylesheet" href="/static/fonts/helvetica-ce/stylesheet.css" />
      <link rel="stylesheet" href="/static/fonts/bebas-neue/stylesheet.css" />
      <link rel="stylesheet" type="text/css" charSet="utf-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
    </Head>
    <Header closed={props.header === 'closed'} />
    <main>
      {props.children}
    </main>
    <style jsx global>{`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
      :root {
        /* colors */
        --white: #fff;
        --black: #000;
        --gray: #b2b2b2;
        --red: #ff0000;
        --dark-gray3: #1a1a1a;
        
        /* fonts */
        --sans-serif: 'Helvetica', sans-serif;
        --sans-serif-condensed: 'Helvetica CE', 'Helvetica', sans-serif;

        /* font-sizes */
        --font-size: 20px;
      }
      @media (min-width: 768px) {
      }
      @media (min-width: 992px) {
        :root {
          --font-size: 20px;
        }
      }
      body { 
        background-color: var(--black);
        color: #fff;
        font-family: var(--sans-serif);
        font-size: var(--font-size);
        margin: 0;
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
      .img-fluid {
        max-width: 100%;
        height: auto;
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
    `}</style>
  </>
);
export default Layout
