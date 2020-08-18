
import react, { useState, useContext, useEffect } from "react";
// import ReactDom from "ReactDom";
import Item from "./Item"
import Carousel from '../carousel';
// import { Player } from 'video-react';
// import Carousel from "react-elastic-carousel"

import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton
} from 'video-react';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
]


export default ({ medias }) => {

  const [play, setPlay] = useState();

  const [pause, setPause] = useState();


  function handleMouseMove(e) {
    // e.preventDefault();
    console.log('O link foi clicado.');
    setPlay(true);
  }
  function handleMouseMovePa(e) {
    // e.preventDefault();
    console.log('O link foi clicado.');
    setPause(true);
    setPlay(false);

  }
  return (


    < Carousel breakPoints={breakPoints} >
      {
        medias.map((media, key) => (
          <div >
            <Item>
              <Player
                poster={media.thumbnail_url}
                // src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                src={`/media/${media.slug}`}
              >
              </Player>


            </Item>
            <style jsx>{`
           width: 365px;
.slick-initialized >slick-slide {
    display: block;
    width: 383px!important;
}


      `}</style>
          </div>
        ))
      }
    </Carousel >


  )
}
