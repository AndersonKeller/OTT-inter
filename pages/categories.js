// other imports
import Head from 'next/head'
import { useEffect, useState } from 'react'

// app imports
import Layout from '../components/layout/Layout'
import Loading from '../components/Loading/Loading'
import { CONFIG } from '../config'
import { api } from '../services/api'

function CategoriesPage({ layoutProps }) {

  const [loading,setLoading] = useState()
  const [categories,setCategories] = useState()

  useEffect(_ => {
    async function fetchData() {
      setLoading(true)
      const {data} = await api.get('/categories')
      setCategories(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <Layout {...layoutProps}>
      <Head>
        <title>Categories &lt; {CONFIG.appName}</title>
      </Head>
      <div className="container-fluid">
        { ! loading && (
          <div className="text-center">
            <Loading className="tenxt-center" loadingState={loading} />
          </div>
        )}
        {categories && (
          <div className="cards row gutter-10">
            {categories.map((category, key) => (
              <div className="col-6" {...{key}}>
                <CategoryCard {...{category}} />
              </div>
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        .cards {
          font-size: 14px;
        }
        @media (min-width: 768px) {
          .cards {
            font-size: 24px;
          }
        }
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
    <div className="category-card">
      <div className="inner">
        {category.name}
      </div>
      <style jsx>{`
        .category-card {
          background-color: var(--dark-gray3);
          margin-bottom: 10px;
          position: relative;
        }
        .category-card::before {
          content: '';
          display: block;
          padding-top: 50%;
        }
        .inner {
          align-items: center;
          bottom: 0;
          display: flex;
          left: 0;
          justify-content: center;
          overflow: hidden;
          position: absolute;
          right: 0;
          top: 0;
        }
        @media (min-width: 768px) {
          .category-card {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  )
}
