import Link from 'next/link'
import Button from '../components/button'
import MediaCard from '../components/MediaCard/MediaCard'
import CarouselSection from '../components/carousel-section'

export default function MoreContentCarousel({category, uppercase}) {
  return (
    <aside className="more-content">
      <div className="carousel-section">
        {category && category.name && (
          <CarouselSection color="gray" title={category.name} {...{uppercase}}>
            {category.movies.length &&
              category.movies.map((item, key) => (
                <MediaCard {...{category, key, media: item}} />
              ))
            }
          </CarouselSection>
        )}
      </div>
      <div className="text-center">
        <Link as={`/category/${category.slug}`} href={'/category/[slug]'} passHref>
          <Button className="text-uppercase" color="secondary">{`Más ${category.name}`}</Button>
        </Link>
      </div>
      <style jsx>{`
        .more-content {
          background-color: var(--dark-gray3);
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
