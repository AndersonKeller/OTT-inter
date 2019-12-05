import MediaCard from '../MediaCard/MediaCard'

export default ({ wishlist, category = null, medias }) => {
  return (
    <div className="media-list row gutter-15">
      { medias.map((media, key) => (
        <div className="col-4 col-md-2" {...{key}}>
          <MediaCard {...{category, className: 'media-list__card', media, wishlist}} />
        </div>
      )) }
      <style jsx>{`
        @media (min-width: 768px) {
          .media-list {
            margin-bottom: 45px;
          }
          .media-list :global(.media-list__card) {
            margin-bottom: 30px;
          }
        }
      `}</style>
    </div>
  )
}
