import React, { Fragment } from 'react';
let Bideo = window.Bideo;
export default class BackgroundVideo extends React.Component {
    background_video = React.createRef();
    wrap = React.createRef();
    componentDidMount() {
        var bv = new Bideo();
        bv.init({
            // Video element
            videoEl: this.background_video.current,
            // Container element
            container: this.wrap.current,
            // isMobile: window.matchMedia('(max-width: 768px)').matches,
            // Resize
            resize: true,
            // autoplay: false,
            // isMobile: window.matchMedia('(max-width: 768px)').matches,
            // playButton: document.querySelector('#play'),
            // pauseButton: document.querySelector('#pause'),
            // Array of objects containing the src and type
            // of different video formats to add
            src: [
                {
                    src: require('./night.mp4'),
                    type: 'video/mp4'
                }
            ],
            onLoad: function () {
                // document.querySelector('#video_cover').style.display = 'none';
            }
        });
    }

    render() {
        return <div ref={this.wrap} style={{ width: '100%', height: '100%' }}>
            <video ref={this.background_video} width="100%" height="100%" loop muted></video>
            {/* <div id="video_cover"></div> */}
        </div>
    }
}