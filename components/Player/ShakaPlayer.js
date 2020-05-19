import React from 'react'
import shaka from 'shaka-player/dist/shaka-player.ui.js' // no SSR support
import { IS_PRODUCTION } from '~/constants/constants'

class ShakaPlayer extends React.PureComponent
{
  constructor(props) {
    super(props)
    this.autoPlay = this.props.autoPlay || true
    this.videoComponent = React.createRef()
    this.videoContainer = React.createRef()
    this.onErrorEvent = this.onErrorEvent.bind(this)
    this.onError = this.onError.bind(this)
    this.media = this.props.media
    this.poster = this.props.poster ? this.props.poster : null
    this.height = this.props.height ? this.props.height : 400
    this.width = this.props.width ? this.props.width : 600
  }

  onErrorEvent(event) {
    this.onError(event.detail)
  }

  onError(error) {
    console.error('Error code', error.code, 'object', error)
  }

  componentDidMount(){
    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll()

    // Check to see if the browser supports the basic APIs Shaka needs.
    if (shaka.Player.isBrowserSupported()) {
      // Everything looks good!
      this.initPlayer()
    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error('Browser not supported!')
    }
  }

  async initPlayer() {
    // Create a Player instance.
    const video = this.videoComponent.current
    const videoContainer = this.videoContainer.current
    var player = new shaka.Player(video)

    // player language configurations
    player.configure('preferredTextLanguage', 'es')
    player.configure('preferredAudioLanguage', 'es')
    const minutes = 10
    const bufferingGoal = 60 * minutes
    player.configure('streaming.bufferingGoal', bufferingGoal)

		//Setting up shaka player UI
    const ui = new shaka.ui.Overlay(player, videoContainer, video)
    ui.getControls()
    const uiConfig = {
      addBigPlayButton: false,
      controlPanelElements: [
        'play_pause', 'time_and_duration', 'spacer', 'mute', 'volume', 'fullscreen', 'overflow_menu',
      ],
      overflowMenuButtons: ['cast', 'quality', 'picture_in_picture'],
    }
    ui.configure(uiConfig)

    // Listen for error events.
    player.addEventListener('error', this.onErrorEvent)

    // Determine if it must load mpd or hls
    const hls_type_id = 1
    const mpd_type_id = 2
    const hls_link = this.media ? this.media.movie_links.find(element => {
      return element.movie_link_type_id === hls_type_id
    }) : null
    const mpd_link = this.media ? this.media.movie_links.find(element => {
      return element.movie_link_type_id === mpd_type_id
    }) : null
    const support = await shaka.Player.probeSupport();
    const manifestUri = support.manifest.mpd && mpd_link ? mpd_link.url :
      hls_link ? hls_link.url : null

    /* esse funciona: */
    // const manifestUri = 'https://s3-us-west-1.amazonaws.com/videos.in/dale/dash/la+copa+eterna.mpd'

    /* esses non: */
    // const manifestUri = 'https://story-video-out.s3-us-west-1.amazonaws.com/teste/DASHIndex.mpd'
    // const manifestUri = 'https://story-video-out.s3-us-west-1.amazonaws.com/teste/HLSIndex.m3u8'

    console.log('Suporta ' + (support.manifest.mpd ? 'mpd' : 'hls'), manifestUri)

    // Try to load a manifest.
    // This is an asynchronous process.
    player.load(manifestUri).then(function() {
      // This runs if the asynchronous load is successful.
      console.log('The video has now been loaded!')
    }).catch(this.onError)  // onError is executed if the asynchronous load fails.
  }

  render() {
    return (
      <div className="video-container" ref={this.videoContainer}>
        <video
          autoPlay={this.autoPlay}
          className='video-player'
          height={this.height}
          muted={!IS_PRODUCTION}
          poster={this.poster}
          ref={this.videoComponent}
          style={{ outline: 0 }}
          width={this.width}
        />
        <style jsx>{`
          .video-container :global(.shaka-bottom-controls) {
            display: flex;
            flex-direction: column;
          }
          .video-container :global(.shaka-bottom-controls .shaka-controls-button-panel) {
            order: 2;
            width: 100%;
          }
          .video-container :global(.shaka-bottom-controls .shaka-seek-bar-container) {
            order: 1;
            width: 100%;
          }
        `}</style>
      </div>
    )
  }
}

export default ShakaPlayer
