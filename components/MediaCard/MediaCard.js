import MediaLink from '../MediaLink/MediaLink'
import React, { useContext } from 'react'
import WishlistBtn from "../../components/wishlist-btn"
import { ThemeContext } from 'styled-components'
import { Chip } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import UserContext from '~/contexts/UserContext'

const MediaCard = ({
  category = null,
  className,
  media,
  wishlist
}) => {
  if (!media.thumbnail_url) {
    // media.thumbnail_url = '//placehold.jp/180x256.png'
  }
  const { user } = useContext(UserContext)
  const theme = useContext(ThemeContext)
  const lightColor = theme.colors.texts
  const whiteColor = theme.colors.white
  const { is_paid: isPaid } = media

  function statusChip() {
    if (isPaid) {
      return <Chip label={"Premium"} color={"primary"} />
    } else {
      return <Chip label={"Gratis"} />
    }
  }
  let watch = false;
  if (category && category.slug == 'live-streaming') {
    watch = true;
  }


  return (
    <div {...{ className }}>

      <MediaLink {...{ category, media, watch }}>

        <a className="media-card text-center">
          {
            user &&
            <div className="wish">
              <WishlistBtn movieId={media.id} inside={true} />
            </div>
          }
          <img className="img-fluid"
            src={category ? (category.is_horizontal ? media.thumbnail2_url : media.thumbnail_url) : media.thumbnail_url} />
          {/*<div className="media-card-label">*/}
          {/*  <FontAwesomeIcon icon={faPlayCircle} />*/}
          {/*  <div className={"text"}>*/}
          {/*    {media.title}*/}
          {/*  </div>*/}
          {/*</div>*/}

          <span className="media-chip">

            {statusChip()}

          </span>

        </a>
      </MediaLink>
      <style jsx>{`

          .media-card {
            color: ${ lightColor};
          }
          .media-card:focus,
          .media-card:hover {
            color: ${ whiteColor};
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
