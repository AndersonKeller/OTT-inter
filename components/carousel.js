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
      draggable: false,
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 6,
      nextArrow: <Arrow />,
      prevArrow: <Arrow />,
    };
    return (
      <div className={`cards cards--${this.props.color}`}>
        <div className="cards-c">
          <Slider {...settings}>
            { this.props.list && this.props.list.map((card, index) => {
              return (
                <div className="slide" key={index}>
                  <a className="carousel-card" href="" onClick={(event) => event.preventDefault()}>
                    <img height="256" src={card} width="180" />
                  </a>
                </div>
              )
            }) }
            { ! this.props.list && React.Children.map(this.props.children, (card, index) => {
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
              margin-bottom: 55px;
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
            .cards-c {
              font-size: 0;
              margin-right: calc(9% - 10px);
              margin-left: calc(9% - 10px);
              white-space: nowrap;
            }
            .slide {
              display: inline-block;
              font-size: 1rem;
              padding: 10px;
              white-space: normal;
              width: 200px;
            }
            .carousel-card {
              display: block;
            }
            .carousel-card img {
              display: block;
              height: auto;
              width: 100%;
            }
          `}</style>
        </div>
      </div>
    );
  }
}
