import Carousel from '../components/carousel'
import H2 from '../components/h2'
import MediaCard from './MediaCard/MediaCard'
import { CONFIG } from '~/config'
import NetSlider from 'netslider';
import Link from "next/link";
import React from "react";


const CarouselSection = ({ category, color = 'background', uppercase = true, idx }) => {
  const { lang } = CONFIG
  const emptyMessage = ['es', 'es-CL'].includes(lang) ? 'No hay medios agregados a esta categoría.'
    : 'No media added to this category'
  const { movies: medias, name: title } = category

  if (medias) {
    medias.map((el) => {
      el.image = el.thumbnail2_url
      el.imageHighRes = el.thumbnail2_url

    })
  }

  function ree() {
     if (medias && medias.length) {
        return <Carousel color={color}
                         additional={category}>
          {medias.map((media, key) => (
            <MediaCard category={category} key={key} media={media} />
          ))}
        </Carousel>
      } else {
        <div className="error-message">{emptyMessage}</div>
      }

  }

  return (
    <div className="carousel-section">
      <div className="container-fluid">
        <H2 className={`carousel-section-title ${uppercase ? 'text-uppercase' : ''}`}>
          {title}
        </H2>
      </div>

      {ree()}

      <style jsx global>{`
        .carousel-section :global(.carousel-section-title),
        .carousel-section .error-message {
          margin-left: 9%;
        }
      ` }</style>
    </div>
  )
}

export default CarouselSection
