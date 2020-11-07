import Link from 'next/link'
import Button from '../components/button'
import CarouselSection from '../components/carousel-section'
import { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import Color from 'color'

export default function MoreContentCarousel({ category, uppercase }) {
  const theme = useContext(ThemeContext)
  const backgroundColor = Color(theme.colors.background).hsl().string()
  return (
    <aside className="more-content">
      <div className="carousel-section">
        <CarouselSection category={category} color="contrast" uppercase={uppercase} />
      </div>
      <div className="text-center">
        <Link as={`/category/${category.slug}`} href={'/category/[slug]'} passHref>
          <Button className="text-uppercase" color="secondary">{`Más ${category.name}`}</Button>
        </Link>
      </div>
      <style jsx>{`
        
        .carousel-section {
          overflow: hidden;
        }
        
        .more-content {
          background-color: ${backgroundColor};
          margin-bottom: 30px;
          padding-top: 30px;
          padding-bottom: 45px;
        }
        @media (min-width: 768px) {
          .more-content {
            margin-bottom: 60px;
          }
        }
        .carousel-section {
          margin-bottom: 15px;
        }
      `}</style>
    </aside>
  )
}
