exports.ids = [47];
exports.modules = {

/***/ "PTA2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("HJQg");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var shaka_player_dist_shaka_player_ui_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("RBzW");
/* harmony import */ var shaka_player_dist_shaka_player_ui_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(shaka_player_dist_shaka_player_ui_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("rxnA");

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;

 // no SSR support



class ShakaPlayer extends react__WEBPACK_IMPORTED_MODULE_1___default.a.PureComponent {
  constructor(props) {
    super(props);
    this.autoPlay = this.props.autoPlay || true;
    this.videoComponent = react__WEBPACK_IMPORTED_MODULE_1___default.a.createRef();
    this.videoContainer = react__WEBPACK_IMPORTED_MODULE_1___default.a.createRef();
    this.onErrorEvent = this.onErrorEvent.bind(this);
    this.onError = this.onError.bind(this);
    this.media = this.props.media;
    this.poster = this.props.poster ? this.props.poster : null;
    this.height = this.props.height ? this.props.height : 400;
    this.width = this.props.width ? this.props.width : 600;
  }

  onErrorEvent(event) {
    this.onError(event.detail);
  }

  onError(error) {
    console.error('Error code', error.code, 'object', error);
  }

  componentDidMount() {
    // Install built-in polyfills to patch browser incompatibilities.
    shaka_player_dist_shaka_player_ui_js__WEBPACK_IMPORTED_MODULE_2___default.a.polyfill.installAll(); // Check to see if the browser supports the basic APIs Shaka needs.

    if (shaka_player_dist_shaka_player_ui_js__WEBPACK_IMPORTED_MODULE_2___default.a.Player.isBrowserSupported()) {
      // Everything looks good!
      this.initPlayer();
    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error('Browser not supported!');
    }
  }

  async initPlayer() {
    // Create a Player instance.
    const video = this.videoComponent.current;
    const videoContainer = this.videoContainer.current;
    var player = new shaka_player_dist_shaka_player_ui_js__WEBPACK_IMPORTED_MODULE_2___default.a.Player(video); // player language configurations

    player.configure('preferredTextLanguage', 'es');
    player.configure('preferredAudioLanguage', 'es');
    const minutes = 10;
    const bufferingGoal = 60 * minutes;
    player.configure('streaming.bufferingGoal', bufferingGoal); //Setting up shaka player UI

    const ui = new shaka_player_dist_shaka_player_ui_js__WEBPACK_IMPORTED_MODULE_2___default.a.ui.Overlay(player, videoContainer, video);
    ui.getControls();
    const uiConfig = {
      addBigPlayButton: false,
      controlPanelElements: ['play_pause', 'time_and_duration', 'spacer', 'mute', 'volume', 'fullscreen', 'overflow_menu'],
      overflowMenuButtons: ['cast', 'quality', 'picture_in_picture']
    };
    ui.configure(uiConfig); // Listen for error events.

    player.addEventListener('error', this.onErrorEvent); // Determine if it must load mpd or hls

    const hls_type_id = 1;
    const mpd_type_id = 2;
    const hls_link = this.media ? this.media.movie_links.find(element => {
      return element.movie_link_type_id === hls_type_id;
    }) : null;
    const mpd_link = this.media ? this.media.movie_links.find(element => {
      return element.movie_link_type_id === mpd_type_id;
    }) : null;
    const support = await shaka_player_dist_shaka_player_ui_js__WEBPACK_IMPORTED_MODULE_2___default.a.Player.probeSupport();
    const manifestUri = support.manifest.mpd && mpd_link ? mpd_link.url : hls_link ? hls_link.url : null;
    /* esse funciona: */
    // const manifestUri = 'https://s3-us-west-1.amazonaws.com/videos.in/dale/dash/la+copa+eterna.mpd'

    /* esses non: */
    // const manifestUri = 'https://story-video-out.s3-us-west-1.amazonaws.com/teste/DASHIndex.mpd'
    // const manifestUri = 'https://story-video-out.s3-us-west-1.amazonaws.com/teste/HLSIndex.m3u8'

    console.log('Suporta ' + (support.manifest.mpd ? 'mpd' : 'hls'), manifestUri); // Try to load a manifest.
    // This is an asynchronous process.

    player.load(manifestUri).then(function () {
      // This runs if the asynchronous load is successful.
      console.log('The video has now been loaded!');
    }).catch(this.onError); // onError is executed if the asynchronous load fails.
  }

  render() {
    return __jsx("div", {
      ref: this.videoContainer,
      className: "jsx-2162939282" + " " + "video-container"
    }, __jsx("video", {
      autoPlay: this.autoPlay,
      height: this.height,
      muted: !_constants_constants__WEBPACK_IMPORTED_MODULE_3__[/* IS_PRODUCTION */ "d"],
      poster: this.poster,
      ref: this.videoComponent,
      style: {
        outline: 0
      },
      width: this.width,
      className: "jsx-2162939282" + " " + 'video-player'
    }), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
      id: "2162939282"
    }, [".video-container.jsx-2162939282 .shaka-bottom-controls{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}", ".video-container.jsx-2162939282 .shaka-bottom-controls .shaka-controls-button-panel{-webkit-order:2;-ms-flex-order:2;order:2;width:100%;}", ".video-container.jsx-2162939282 .shaka-bottom-controls .shaka-seek-bar-container{-webkit-order:1;-ms-flex-order:1;order:1;width:100%;}"]));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ShakaPlayer);

/***/ })

};;
//# sourceMappingURL=47.2c098eb91ec8d291ae77.js.map