import React, { Component } from 'react'
import Slider from 'react-slick'
import css from 'styled-jsx/css'
import Chevron from './icons/chevron'

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
        <Chevron inline dir={ className.search('slick-prev') !== -1 ? 'left' : 'right' } width="47" height="27" />
      </div>
      <style jsx>{arrowsStyles}</style>
    </div>
  );
}

export default class Carousel extends Component {
  render() {
    const settings = {
      dots: false,
      draggable: false,
      infinite: false,
      mobileFirst: true, /* seems to not be working (?) */
      nextArrow: <Arrow />,
      prevArrow: <Arrow />,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            slidesToScroll: 3,
            slidesToShow: 3,
          },
        },
      ],
      slidesToScroll: 6,
      slidesToShow: 6,
      speed: 500,
    };
    return (
      <div className={`cards cards--${this.props.color}`}>
        <div className="cards-container">
          <Slider {...settings}>
            { React.Children.map(this.props.children, (card, index) => {
              return (
                <div className="slide" key={index}>
                  {card}
                </div>
              )
            }) }
          </Slider>
          <style jsx global>{`
            .slick-list {
              overflow: visible;
            }
            .slick-track {
              margin-left: 0;
            }
            .cards {
              /* margin-bottom: 55px; */
              overflow: hidden;
              position: relative;
            }
            .cards::before,
            .cards::after {
              content: '';
              height: 100%;
              position: absolute;
              top: 0;
              width: 9%;
              z-index: 2;
            }
            .cards::after {
              right: 0;
            }
            .cards.cards--black::before {
              background-image: linear-gradient(to right, var(--black), rgba(0, 0, 0, 0));
            }
            .cards.cards--black::after {
              background-image: linear-gradient(to left, var(--black), rgba(0, 0, 0, 0));
            }
            .cards.cards--gray::before {
              background-image: linear-gradient(to right, var(--dark-gray3), rgba(26, 26, 26, 0));
            }
            .cards.cards--gray::after {
              background-image: linear-gradient(to left, var(--dark-gray3), rgba(26, 26, 26, 0));
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
              width: 200px;
            }
            @media (min-width: 768px) {
            .slide {
                padding: 10px;
              }
            }
          `}</style>
        </div>
      </div>
    );
  }
}
