import MediaLink from '../MediaLink/MediaLink'
import PropTypes from 'prop-types'
import React from 'react'
import Category from '../../types/Category'
import Media from '../../types/Media'
import WishlistBtn from "../../components/wishlist-btn"
import { useContext } from 'react'
import { ThemeContext } from 'styled-components'

const MediaCard = ({
  category = null,
  className,
  media,
  wishlist
}) => {
  if ( ! media.thumbnail_url) {
    media.thumbnail_url = '//placehold.jp/180x256.png'
  }
  const theme = useContext(ThemeContext)
  const lightColor = theme.colors.texts
  const whiteColor = theme.colors.white
  const { is_paid: isPaid } = media
  return (
    <div {...{className}}>
      <MediaLink {...{category, media}}>
        <a className="media-card text-center">
          {wishlist &&
            <div className="wish">
              <WishlistBtn movieId={media.id} inside={true} />
            </div>}
          <img className="img-fluid" src={media.thumbnail_url} />
          <div className="media-card-label">{media.title}</div>
        </a>
      </MediaLink>
      <style jsx>{`
        .media-card {
          color: ${lightColor};
          display: block;
          font-size: 13px;
          line-height: 1;
          outline: 0;
          text-decoration: none;
          transition: color .2s;
        }
        .media-card:focus,
        .media-card:hover {
          color: ${whiteColor};
        }
        .media-card img {
          margin-bottom: 10px;
          transition: opacity .2s;
          will-change: opacity;
        }
        .media-card-label {
          padding-right: 5%;
          padding-left: 5%;
        }
        .media-card:focus img,
        .media-card:hover img {
          opacity: .75;
        }
        .wish {
          position: absolute;
          z-index: 2;
          opacity: 0;
          text-align: left;
        }
        .media-card:focus .wish,
        .media-card:hover .wish {
          opacity: 1;
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

// MediaCard.propTypes = {
//   /** Category object containing at least a slug property. */
//   category: Category,

//   /** classNames that should be inserted on the component. */
//   className: PropTypes.string,

//   /** Media object containing slug, thumbnail_url and title. */
//   media: Media,
// }

MediaCard.defaultProps = {
  category: null,
  className: null,
  media: null,
}

export default MediaCard
