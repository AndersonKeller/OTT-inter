import Head from 'next/head';
import Header from './Header';

const layoutStyle = {
  margin: 20,
  padding: 20,
};

const Layout = props => (
  <div style={layoutStyle}>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <style jsx global>{`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
      body { 
        background: #000;
        color: #fff;
        font-family: sans-serif;
      }
      a {
        color: #fff;
      }
    `}</style>
    <Header />
    {props.children}
  </div>
);

export default Layout;
