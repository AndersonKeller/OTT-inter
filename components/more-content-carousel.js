import Link from 'next/link'
import Button from '../components/button'
import Card from '../components/card'
import CarouselSection from '../components/carousel-section'

export default function MoreContentCarousel(props) {
  const variantName = props.variant === 'interview' ? 'Entrevistas' : 'Videos'
  const variantLink = props.variant === 'interview' ? 'entrevistas' : 'videos'
  return (
    <aside className="carousel-section">
      <CarouselSection color="gray" title={props.title} uppercase={props.uppercase}>
        { props.content.map((src, i) => (
          <Card key={i} src={src} />
        ))}
      </CarouselSection>
      <div className="text-center">
        <Link href={variantLink}>
          <Button className="text-uppercase" color="secondary">{`Más ${variantName}`}</Button>
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
