import MediaLink from "../MediaLink/MediaLink"

const MediaCard = ({
  category = null,
  media,
}) => {
  if (!media.thumbnail_url) {
    media.thumbnail_url = '//placehold.jp/180x256.png'
  }
  return (
    <div>
      <MediaLink {...{category, media}}>
        <a className="media-card text-center">
          <img className="img-fluid" src={media.thumbnail_url} />
          <div className="media-card-label">{media.title}</div>
        </a>
      </MediaLink>
      <style jsx>{`
        .media-card {
          display: block;
          font-size: 16px;
          line-height: 1;
          margin-bottom: 30px;
          text-decoration: none;
        }
        .media-card:focus,
        .media-card:hover {
          color: var(--white);
        }
        .media-card img {
          margin-bottom: 10px;
          transition: opacity .2s;
          will-change: opacity;
        }
        .media-card-label {
          opacity: .4;
          padding-right: 5%;
          padding-left: 5%;
          transition: opacity .2s;
        }
        .media-card:focus .media-card-label,
        .media-card:hover .media-card-label {
          opacity: 1;
        }
        .media-card:focus img,
        .media-card:hover img {
          opacity: .75;
        }
      `}</style>
    </div>
  )
}

export default MediaCard
