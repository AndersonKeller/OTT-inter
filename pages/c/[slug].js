import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import shuffle from 'shuffle-array'

import Layout from '../../components/layout/Layout'

const Category = props => {
  const router = useRouter()
  return (
    <Layout>
      <Head>
        <title>{props.title} &lt; Dale Campeón</title>
      </Head>
      <div className="container-fluid">
        <div className="row">
          <div className="col-10 offset-1">
            <header>
              <h1 className="h2">{props.title}</h1>
            </header>
            <div className="interview-cards row gutter-15">
              { props.medias.map((media, index) => (
                <div className="col-2" key={index}>
                  <Link href="/entrevistas-interna1">
                    <a className="interview-card text-center">
                      <img className="img-fluid" src={`/static/cards/interviews/${media.id}.jpg`} />
                      <div className="interview-card-label">{media.label}</div>
                    </a>
                  </Link>
                </div>
              )) }
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        header {
          padding-top: 60px;
        }
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
          margin-bottom: 30px;
          text-decoration: none;
        }
        .interview-card:focus,
        .interview-card:hover {
          color: var(--white);
        }
        .interview-card img {
          margin-bottom: 10px;
          transition: opacity .2s;
        }
        .interview-card-label {
          opacity: .4;
          padding-right: 5%;
          padding-left: 5%;
          transition: opacity .2s;
        }
        .interview-card:focus .interview-card-label,
        .interview-card:hover .interview-card-label {
          opacity: .5;
        }
        .interview-card:focus img,
        .interview-card:hover img {
          opacity: .75;
        }
      `}</style>
    </Layout>
  );
}

Category.getInitialProps = async (context) => {
  // const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  // const data = await res.json()
  // console.log(`Show data fetched. Count: ${data.length}`)
  // const show = data.map(entry => entry.show)

  const ids = shuffle([1,2,3,4,5,6,7])
  let medias = [
    {id: ids[0], label: 'Lorem ipsum dolor sit amet'},
    {id: ids[1], label: 'Consectetur adipiscing elit'},
    {id: ids[2], label: 'Sed maximus quam elementum'},
    {id: ids[3], label: 'Ullamcorper purus in'},
    {id: ids[4], label: 'Gravida quam'},
    {id: ids[5], label: 'Quisque scelerisque suscipit'},
    {id: ids[6], label: 'Nec aliquet sem gravida at'},
  ]
  medias = shuffle(medias)
  for (let i = 0; i < 3; i++) medias = [...medias, ...medias];
  const titles = {
    'fotos': 'Fotos',
    'sorteos': 'Sorteos',
  }
  const { slug } = context.query;
  const title = titles[slug]

  return { medias, title }
}

export default Category
