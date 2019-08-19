import Head from 'next/head'
import Header from './header'

const Layout = props => (
  <div>
    
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <link rel="stylesheet" href="//stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap-grid.min.css" />
    </Head>
    
    <style jsx global>{`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
      body { 
        background-color: #000;
        color: #fff;
        font-family: sans-serif;
        margin: 0;
      }
      a {
        color: #fff;
      }
    `}</style>

    <Header />

    <main>
      {props.children}
    </main>
    
  </div>
);

export default Layout;
