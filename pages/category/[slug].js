import Head from 'next/head'

import Layout from '../../components/layout/Layout'
import { CONFIG } from '../../config'
import api from '../../services/api'
import MediaList from '../../components/MediaList/MediaList'

const Category = ({ category, errorCode, layoutProps, medias }) => {

  // const router = useRouter()

  return (
    <Layout errorCode={errorCode} {...layoutProps}>
      <Head>
        <title>{category.name} &lt; {CONFIG.appName}</title>
      </Head>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10 offset-md-1">

            <header>
              <h1 className="h2">{category.name}</h1>
            </header>
            { medias.length ? (
              <MediaList {...{category, medias}} />
            ) : (
              <div>
                <p>No se encontraron registros.</p>
              </div>
            )}

          </div>
        </div>
      </div>
      <style jsx>{`
        header {
          padding-top: 15px;
        }
        .h2 {
          margin-bottom: 30px;
        }
        @media (min-width: 768px) {
          header {
            padding-top: 30px;
          }
        }
      `}</style>
    </Layout>
  );
}

Category.getInitialProps = async ctx => {
  const { slug } = ctx.query;
  let category, medias = [], errorCode = false
  try {
    const response = await api(ctx).get(`/category/${slug}`)
    category = response.data
    medias = category.movies
  } catch (error) {
    errorCode = 404
  }
  return { category, errorCode, medias }
}

export default Category
