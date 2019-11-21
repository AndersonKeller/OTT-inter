import MediaCard from '../MediaCard/MediaCard'

export default ({ category = null, medias }) => {
  return (
    <div className="media-cards row gutter-15">
      { medias.map((media, key) => (
        <div className="col-4 col-md-2" {...{key}}>
          <MediaCard {...{category, media}} />
        </div>
      )) }
      <style jsx>{`
        @media (min-width: 768px) {
          .media-cards {
            margin-bottom: 45px;
          }
        }
      `}</style>
    </div>
  )
}
