import Head from 'next/head'
import Header from './header'

const Layout = props => (
  <div>
    
    <Head>
      <meta charset="utf-8" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <link rel="stylesheet" href="//stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap-grid.min.css" />
      <link rel="stylesheet" href="/static/fonts/helvetica/stylesheet.css" />
      <link rel="stylesheet" href="/static/fonts/helvetica-ce/stylesheet.css" />
      <link rel="stylesheet" href="/static/fonts/bebas-neue/stylesheet.css" />
      <link rel="stylesheet" type="text/css" charset="utf-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
    </Head>
    
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
        
        /* fonts */
        --sans-serif: 'Helvetica', sans-serif;
        --sans-serif-condensed: 'Helvetica CE', 'Helvetica', sans-serif;
      }
      body { 
        background-color: var(--black);
        color: #fff;
        font-family: sans-serif;
        margin: 0;
      }
      a {
        color: inherit;
      }
      input[type="search"]::-webkit-search-cancel-button {
        display: none;
      }
      .img-fluid {
        max-width: 100%;
        height: auto;
      }
      .w-100 {
        width: 100%;
      }
    `}</style>

    <Header />

    <main>
      {props.children}
    </main>
    
  </div>
);

export default Layout;
