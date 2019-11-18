import MediaLink from './MediaLink/MediaLink'

const Card = ({category, media}) => {
  return (
    <MediaLink {...{category, media}}>
      <a className="d-block carousel-card">
        <img className="img-fluid" height="256" src={media.thumbnail_url} width="180" />
        <style jsx>{`
          .carousel-card {
            display: block;
          }
        `}</style>
      </a>
    </MediaLink>
  )
}

export default Card
