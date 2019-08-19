import Head from 'next/head';
import Header from './Header';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #333'
};

const Layout = props => (
  <div style={layoutStyle}>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <style jsx global>{`
      body { 
        background: #000;
        color: #fff;
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
