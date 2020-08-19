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

  medias.map((el) => {
    el.image = el.thumbnail2_url
    el.imageHighRes = el.thumbnail2_url

  })

  function SliderContainer(props) {
    return <div className='slider-container-title'>{ props.videoModel.title }</div>;
  }

  function SliderTemplate(props) {
    console.log(props)
    return (
      <div className='slider-container-wrapper'>
        <Link
          as={ `/media/${ props.videoModel.slug }` }
          href={ {
            pathname: '/media/[slug]',
            query: {
              category: (category ? category.slug : null),
              slug: props.videoModel.slug,
            },
          } }
        >
          <SliderContainer videoModel={ props.videoModel } model={ props.model }/>
        </Link>
      </div>
    );
  }

  function ree() {
    // alert(key)
    if ((idx % 2) === 1) {
      return <NetSlider
        className='netslider_title_card'
        data={ medias }
        slideTemplate={ props => <SliderTemplate { ...props } /> }
      />
    } else {
      return <Carousel color={ color }>
        { medias.map((media, key) => (
          <MediaCard category={ category } key={ key } media={ media }/>
        )) }
      </Carousel>
    }
  }

  return (
    <div className="carousel-section">
      <div className="container-fluid">
        <H2 className={ `carousel-section-title ${ uppercase ? 'text-uppercase' : '' }` }>
          { title }
        </H2>
      </div>


     {ree()}
      <style jsx global>{ `
        .carousel-section :global(.carousel-section-title),
        .carousel-section .error-message {
          margin-left: 9%;
        }
      ` }</style>
    </div>
  )
}

export default CarouselSection
