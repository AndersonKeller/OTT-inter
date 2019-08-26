import Carousel from '../components/carousel'
import H2 from '../components/h2'

const CarouselSection = (props) => (
  <div className="carousel-section">
    <div className="container-fluid">
      <H2 className="carousel-section-title">{props.title}</H2>
    </div>
    <Carousel list={props.list}>
      {props.children}
    </Carousel>
    <style jsx global>{`
      .carousel-section :global(.carousel-section-title) {
        margin-left: 9%;
      }
    `}</style>
  </div>
)
export default CarouselSection
