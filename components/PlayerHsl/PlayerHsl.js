

import React, { Children } from 'react'
import ReactHlsPlayer from "react-hls-player"

export default function playerHls({ children, media, url, autoplay, controls, width, height, }) {

  return (
    <ReactHlsPlayer
      url={url}
      autoplay={true}
      controls={true}
      width="1200"
      height="auto"
      hlsConfig={{
        autoStartLoad: true,
        startPosition: -1,
        debug: false,
        // ...
      }}
    />
  )

}



