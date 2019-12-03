import React from 'react';
import shaka from 'shaka-player';
class VideoPlayer extends React.PureComponent{

	constructor(props){
		super(props);
		this.videoComponent = React.createRef();
		this.videoContainer = React.createRef();
		this.onErrorEvent = this.onErrorEvent.bind(this);
		this.onError = this.onError.bind(this);
		this.link = (this.props.link)? this.props.link : "null";
		this.poster = (this.props.poster)? this.props.poster : "null";
		this.width = (this.props.height)? this.props.height : "400";
		this.width = (this.props.width)? this.props.width : "600";
	}

	onErrorEvent(event) {
	  this.onError(event.detail);
	}

	onError(error) {
	  console.error('Error code', error.code, 'object', error);
	}

	componentDidMount(){
		var manifestUri = this.link;
		const video = this.videoComponent.current;
		const videoContainer = this.videoContainer.current;
		var player = new shaka.Player(video);

		// player language configurations
		player.configure('preferredTextLanguage', 'es');
		player.configure('preferredAudioLanguage', 'es');

  		player.addEventListener('error', this.onErrorEvent);
	  	player.load(manifestUri).then(function() {
		    console.log('');
		  }).catch(this.onError);  // onError is executed if the asynchronous load fails.
	}

	render(){
		return(
			<div className="video-container" ref={this.videoContainer}>
				<video
					className='video-player' 
					height={this.height}
					width={this.width}
					ref={this.videoComponent}
					poster={this.poster}
					controls autoplay
				/>
			</div>
		);
	}
}

export default VideoPlayer;
