import Link from 'next/link'
import Button from '../components/button'
import Card from '../components/card'
import CarouselSection from '../components/carousel-section'

export default function MoreContentCarousel({category, uppercase}) {
  return (
    <aside className="carousel-section">
      {category && category.name && (
        <CarouselSection color="gray" title={category.name} {...{uppercase}}>
          {category.movies.length &&
            category.movies.map((item, key) => (
              <Card
                as={`/m/${item.id}` + (category ? `?category=${category.slug}` : '')}
                href={{
                  pathname: "/m/[id]",
                  query: {
                    category: (category ? category.slug : null),
                    id: item.id,
                  },
                }}
                {...{key}}
                src={item.thumbnail_url}
              />
            ))
          }
        </CarouselSection>
      )}
      <div className="text-center">
        <Link as={`/c/${category.slug}`} href={'/c/[slug]'} passHref>
          <Button className="text-uppercase" color="secondary">{`Más ${category.name}`}</Button>
        </Link>
      </div>
      <style jsx>{`
        .carousel-section {
          background-color: var(--dark-gray3);
          margin-bottom: 30px;
          padding-top: 30px;
          padding-bottom: 45px;
        }
        @media (min-width: 768px) {
          .carousel-section {
            margin-bottom: 60px;
          }
        }
      `}</style>
    </aside>
  )
}
