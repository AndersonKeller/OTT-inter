import React from 'react'
import Slider from 'react-slick'
import css from 'styled-jsx/css'
import Chevron from './icons/chevron'
import styled from 'styled-components'
import Color from 'color'

const arrowsStyles = css`
  .slick-prev,
  .slick-next {
    z-index: 3;
    width: 47px;
    height: 27px;
    transition: opacity .2s;
  }
  .slick-prev::before,
  .slick-next::before {
    display: none;
  }

  .slick-prev {
    left: -8%;
  }
  .slick-next {
    right: -8%;
  }
  .slick-disabled {
    opacity: 0;
    cursor: default;
  }
`;

function Arrow(props) {
  const { className, style, onClick } = props;
  return (
    <div>
      <div className={className} onClick={onClick} style={style}>
        <Chevron inline dir={className.search('slick-prev') !== -1 ? 'left' : 'right'} width="47" height="27" />
      </div>
      <style jsx>{arrowsStyles}</style>
    </div>
  );
}

const Cards = styled.div`
  //overflow: hidden;
  position: relative;
  &::before,
  &::after {
    content: '';
    height: 100%;
    position: absolute;
    top: 0;
    width: 9%;
    z-index: 2;
  }
  &::after {
    right: 0;
  }
  &::before {
    background-image: ${props => props.color === 'contrast' ?
    `linear-gradient(to right, ${props.theme.colors.backgroundContrast}, ${Color(props.theme.colors.backgroundContrast).fade(1).string()})` :
    `linear-gradient(to right, ${props.theme.colors.background}, ${Color(props.theme.colors.background).fade(1).string()})`};
  }
  &::after {
    background-image: ${props => props.color === 'contrast' ?
    `linear-gradient(to left, ${props.theme.colors.backgroundContrast}, ${Color(props.theme.colors.backgroundContrast).fade(1).string()})` :
    `linear-gradient(to left, ${props.theme.colors.background}, ${Color(props.theme.colors.background).fade(1).string()})`};
  }
`;

export default function Carousel({ children, color, additional }) {

  const settings = {
    dots: false,
    draggable: false,
    infinite: false,
    mobileFirst: true, /* seems to not be working (?) */
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    adaptiveHeight: true,
    adaptivewidth: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToScroll: 2,
          slidesToShow: 2,
        },
      },
    ],
    slidesToScroll: 6,
    slidesToShow: additional.horizontal ? 5 : 6,
    speed: 700,
  }
  return (
    <Cards color={color}>
      <div className="cards-container">
        <Slider {...settings}>
          {React.Children.map(children, (card, index) => {
            return (
              <div className="slide" key={index}>
                {card}
              </div>
            )
          })}
        </Slider>
      </div>
      <style jsx global>{`
        .slick-list {
          overflow: visible;
        }
        .slick-track {
          margin-left: 0;

        }
        .cards-container {
          font-size: 0;
          margin-right: calc(9% - 10px);
          margin-left: calc(9% - 10px);
          white-space: nowrap;
        }
        .slide {
          display: inline-block;
          font-size: 1rem;
          padding: 5px;
          white-space: normal;


          // height: 131px!important;

        }
        .slick-list {
        height: auto !important;

        }
        .slick-slide {
          transform: translateX(-25%);
          transition-duration: 500ms;
          transition-delay: 0ms;


      }


        .slick-slide:hover {
          transform: scale(1.5) !important;
      }
        .slick-slide:hover ~ .slick-slide{
          transform: translateX(25%);
     }
        @media (min-width: 768px) {
          .slide {
          padding: 10px;
      }
    }



}
      `}</style>
    </Cards>
  )
}
