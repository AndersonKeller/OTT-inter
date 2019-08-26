import Carousel from '../components/carousel'

const CarouselSection = (props) => (
  <div className="cards-container">
    <div className="container-fluid">
      <h2 className="h2">{props.title}</h2>
    </div>
    <Carousel list={props.list}>
      {props.children}
    </Carousel>
    <style jsx>{`
      .h2 {
        font-family: var(--sans-serif);
        font-size: 31px;
        font-weight: bold;
        line-height: 1;
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 9%;
        text-transform: uppercase;
      }
    `}</style>
  </div>
)
export default CarouselSection
