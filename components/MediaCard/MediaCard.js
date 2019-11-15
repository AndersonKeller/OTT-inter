import Link from 'next/link'

const MediaCard = ({
  category = null,
  media: {id, thumbnail_url, title}
}) => {
  if (!thumbnail_url)
    thumbnail_url = 'http://placehold.jp/180x256.png'
  return (
    <div>
      <Link
        as={`/m/${id}` + (category ? `?category=${category.slug}` : '')}
        href={{
          pathname: "/m/[id]",
          query: {
            category: (category ? category.slug : null),
            ...{id},
          },
        }}
      >
        <a className="media-card text-center">
          <img className="img-fluid" src={thumbnail_url} />
          <div className="media-card-label">{title}</div>
        </a>
      </Link>
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
        }
        .media-card-label {
          opacity: .4;
          padding-right: 5%;
          padding-left: 5%;
          transition: opacity .2s;
        }
        .media-card:focus .media-card-label,
        .media-card:hover .media-card-label {
          opacity: .5;
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
