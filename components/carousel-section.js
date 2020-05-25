import Carousel from '../components/carousel'
import H2 from '../components/h2'
import MediaCard from './MediaCard/MediaCard'
import { CONFIG } from '~/config'

const CarouselSection = ({ category, color = 'background', uppercase = true }) => {
  const { lang } = CONFIG
  const emptyMessage = ['es', 'es-CL'].includes(lang) ? 'No hay medios agregados a esta categoría.'
  : 'No media added to this category'
  const { movies: medias, name: title } = category
  return (
    <div className="carousel-section">
      <div className="container-fluid">
        <H2 className={`carousel-section-title ${uppercase ? 'text-uppercase' : ''}`}>
          {title}
        </H2>
      </div>
      { medias && medias.length ? (
        <Carousel color={color}>
          { medias.map((media, key) => (
            <MediaCard category={category} key={key} media={media} />
          )) }
        </Carousel>
      ) : (
        <div className="error-message">{emptyMessage}</div>
      ) }
      <style jsx global>{`
        .carousel-section :global(.carousel-section-title),
        .carousel-section .error-message {
          margin-left: 9%;
        }
      `}</style>
    </div>
  )
}

export default CarouselSection
