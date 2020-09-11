import MediaLink from '../MediaLink/MediaLink'
import React, { useContext } from 'react'
import WishlistBtn from "../../components/wishlist-btn"
import { ThemeContext } from 'styled-components'
import { Chip } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'




const MediaCard = ({
                     category = null,
                     className,
                     media,
                     wishlist
                   }) => {
  if (!media.thumbnail_url) {
    media.thumbnail_url = '//placehold.jp/180x256.png'
  }
  const theme = useContext(ThemeContext)
  const lightColor = theme.colors.texts
  const whiteColor = theme.colors.white
  console.log(media);
  const { is_paid: isPaid } = media

  return (
    <div { ...{ className } }>
      <MediaLink { ...{ category, media } }>
        <a className="media-card text-center">
          {
            wishlist &&
            <div className="wish">
              <WishlistBtn movieId={ media.id } inside={ true }/>
            </div>
          }
          <img className="img-fluid" src={ category ? (category.horizontal ? media.thumbnail2_url : media.thumbnail_url) :  media.thumbnail_url}/>
          <div className="media-card-label">
            <FontAwesomeIcon icon={faPlayCircle} />
            <div className={"text"}>
              { media.title }
            </div>
          </div>

          <span className="media-chip">

            {
              isPaid &&
              <>
                <Chip label={ "Premium" } color={ "primary" }/>
              </>

            }

            {
              !isPaid &&
              <>
                <Chip label={ "Gratis" }/>
              </>
            }

          </span>

        </a>
      </MediaLink>
      <style jsx>{ `
    
          .media-card {
            color: ${ lightColor };
          }     
          .media-card:focus,
          .media-card:hover {
            color: ${ whiteColor };
          }

      ` }</style>
    </div>
  )
}

MediaCard.defaultProps = {
  category: null,
  className: null,
  media: null,
}

export default MediaCard
