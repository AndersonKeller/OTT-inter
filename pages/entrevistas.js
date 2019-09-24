import Head from 'next/head'
import Link from 'next/link'
import shuffle from 'shuffle-array'

import Layout from '../components/layout'

export default function Entrevistas() {
  let interviews = [
    'Lorem ipsum dolor sit amet',
    'Consectetur adipiscing elit',
    'Sed maximus quam elementum',
    'Ullamcorper purus in',
    'Gravida quam',
    'Quisque scelerisque suscipit',
    'Nec aliquet sem gravida at',
  ]
  for (let i = 0; i < 3; i++) interviews = [...interviews, ...interviews];
  interviews = shuffle(interviews)
  return (
    <Layout>
      <Head>
        <title>Entrevistas &lt; Dale Campeón</title>
      </Head>
      <div className="container-fluid">
        <div className="row">
          <div className="col-10 offset-1">
            <h1 className="h2">Entrevistas</h1>
            <div className="interview-cards row">
              { interviews.map((text, index) => (
                <div className="col-2" key={index}>
                  <Link href="/entrevistas-interna1">
                    <a className="interview-card text-center">
                      <img className="img-fluid" src={`/static/cards/interviews/${index % 7 + 1}.jpg`} />
                      <div className="interview-card-label">{text}</div>
                    </a>
                  </Link>
                </div>
              )) }
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .h2 {
          margin-bottom: 30px;
        }
        .interview-cards {
          margin-bottom: 100px;
        }
        .interview-card {
          display: block;
          font-size: 16px;
          line-height: 1;
          margin-bottom: 15px;
          text-decoration: none;
        }
        .interview-card:focus,
        .interview-card:hover {
          color: var(--white);
        }
        .interview-card img {
          margin-bottom: 10px;
        }
        .interview-card-label {
          opacity: .66;
          padding-right: 5%;
          padding-left: 5%;
          transition: opacity .2s;
        }
        .interview-card:focus .interview-card-label,
        .interview-card:hover .interview-card-label {
          opacity: 1;
        }
      `}</style>
    </Layout>
  );
}
