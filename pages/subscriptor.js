import Layout from '../components/layout'
import Head from 'next/head'
import H2 from '../components/h2'

export default function Subscriptor() {
  return (
    <Layout header="closed">
      <Head>
        <title>Subscriptor</title>
      </Head>
      <div className="subscriptor">

        {/* section 1 */}
        <div className="section1 container-fluid">
          <div className="row">
            <div className="col-6">
              <div className="section1-content">
                <img className="section1-logo" src="/static/river-logo.svg" width="170" height="212" alt="River Logo" />
                <H2 className="text-uppercase section1-title">¡Bienvenidos!</H2>
                <p className="text-uppercase">Club Atlético River Plate te da la bienvenida a la plataforma de contenidos del más grande</p>
                <p>Todo por $ 199 pesos mensuales.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    <style jsx>{`
      .section1 {
        display: flex;
        align-items: center;
        height: 740px;
        line-height: 1.5;
        overflow: hidden;
        position: relative;
        z-index: 1;
      }
      .section1 > .row {
        width: 100%;
      }
      @keyframes sliding {
        0% {
          transform: translateX(0)
        }
        100% {
          transform: translateX(-50%);
        }
      }
      .section1::before {
        animation: sliding 200s linear infinite normal;
        background-image: url(/static/subscriptor/featured-background.png);
        background-position: 50% 0;
        background-size: 1310px 100%;
        content: '';
        display: block;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 13100px;
        z-index: -2;
      }
      .section1::after {
        background-image: url(/static/subscriptor/featured-gradient.png);
        background-position: 50% 0;
        background-size: cover;
        bottom: 0;
        content: '';
        display: block;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        z-index: -1;
      }
      .section1-content {
        padding-right: 21%;
        padding-left: 21%;
      }
      .section1-logo {
        margin-bottom: 50px;
        margin-left: 35px;
      }
      .section1-content :global(.section1-title) {
        margin-bottom: 10px;
      }
      .section1-content p {
        margin-bottom: 5px;
      }
    `}</style>
    </Layout>
  );
}
