import Carousel from '../components/carousel'
import H2 from '../components/h2'

const CarouselSection = ({ children, color = 'background', list, title, uppercase = true }) => {
  return (
    <div className="carousel-section">
      <div className="container-fluid">
        <H2 className={`carousel-section-title ${uppercase ? 'text-uppercase' : ''}`}>{title}</H2>
      </div>
      <Carousel color={color} list={list}>
        {children}
      </Carousel>
      <style jsx global>{`
        .carousel-section :global(.carousel-section-title) {
          margin-left: 9%;
        }
      `}</style>
    </div>
  )
}

export default CarouselSection
