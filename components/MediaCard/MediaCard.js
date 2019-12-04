import MediaLink from '../MediaLink/MediaLink'
import PropTypes from 'prop-types'
import React from 'react'
import Category from '../../types/Category'
import Media from '../../types/Media'

const MediaCard = ({
  category = null,
  className,
  media,
}) => {
  if ( ! media.thumbnail_url) {
    media.thumbnail_url = '//placehold.jp/180x256.png'
  }
  return (
    <div {...{className}}>
      <MediaLink {...{category, media}}>
        <a className="media-card text-center">
          <img className="img-fluid" src={media.thumbnail_url} />
          <div className="media-card-label">{media.title}</div>
        </a>
      </MediaLink>
      <style jsx>{`
        .media-card {
          display: block;
          font-size: 13px;
          line-height: 1;
          outline: 0;
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
        @media (min-width: 768px) {
          .media-card {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  )
}

MediaCard.propTypes = {
  /** Category object containing at least a slug property. */
  category: Category,

  /** classNames that should be inserted on the component. */
  className: PropTypes.string,

  /** Media object containing slug, thumbnail_url and title. */
  media: Media,
}

MediaCard.defaultProps = {
  category: null,
  className: null,
  media: null,
}

export default MediaCard
