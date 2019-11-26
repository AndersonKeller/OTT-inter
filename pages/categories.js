// other imports
import Color from 'color'
import Head from 'next/head'
import { useEffect, useState } from 'react'

// app imports
import Layout from '../components/layout/Layout'
import Loading from '../components/Loading/Loading'
import { CONFIG } from '../config'
import api from '../services/api'
import CategoryLink from '../components/CategoryLink/CategoryLink'
import { BLACK } from '../constants/colors'

function CategoriesPage({ layoutProps }) {

  const [loading,setLoading] = useState()
  const [categories,setCategories] = useState()
  const [error,setError] = useState()

  useEffect(_ => {
    async function fetchData() {
      setLoading(true)
      try {
        const {data} = await api.get('/categories')
        setCategories(data)
      } catch(e) {
        setError(true)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <Layout {...layoutProps}>
      <Head>
        <title>Categorías &lt; {CONFIG.appName}</title>
      </Head>
      <div className="container-fluid">
        { ! loading && (
          <div className="text-center">
            <Loading className="tenxt-center" loadingState={loading} />
          </div>
        )}
        {categories && (
          <div className="cards row gutter-15">
            {categories.map((category, key) => (
              <div className="col-6 col-lg-4 col-xl-3" {...{key}}>
                <CategoryCard {...{category}} />
              </div>
            ))}
          </div>
        )}
        {error && (
          <p>Incapaz de cargar categorías</p>
        )}
      </div>
      <style jsx>{`
      `}</style>
    </Layout>
  )
}

/* CategoriesPage.getInitialProps = async _ => {
  return { }
} */

export default CategoriesPage

const CategoryCard = ({category}) => {
  return (
    <div>
      <CategoryLink {...{category}}>
        <a className="category-card">
          <span className="inner">
            {category.name}
          </span>
        </a>
      </CategoryLink>
      <style jsx>{`
        .category-card {
          background-color: var(--gray2);
          background-image: url(${category.image_url});
          background-position: 50% 50%;
          background-repeat: no-repeat;
          background-size: cover;
          color: var(--white);
          display: block;
          font-size: 14px;
          margin-bottom: 15px;
          position: relative;
        }
        .category-card::before {
          content: '';
          display: block;
          padding-top: 50%;
        }
        .inner {
          align-items: center;
          background-color: ${Color(BLACK).fade(.15)};
          bottom: 0;
          display: flex;
          left: 0;
          justify-content: center;
          outline: 0;
          overflow: hidden;
          position: absolute;
          right: 0;
          top: 0;
          transition: background-color .2s;
          z-index: 2;
        }
        .category-card:focus .inner,
        .category-card:hover .inner {
          background-color: ${Color(BLACK).fade(.4)};
        }
        @media (min-width: 768px) {
          .category-card {
            font-size: 22px;
          }
        }
      `}</style>
    </div>
  )
}
