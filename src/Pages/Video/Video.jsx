import React from 'react';
// https://api.hkws.fixbug.net//uploads/hik_video/218.108.69.10_20200507134509_4000.mp4
export default class Video extends React.Component {
    vi = React.createRef();
    componentDidMount() {

    }
    render() {
        return (<embed
            type="application/x-shockwave-flash"
            src="https://api.hkws.fixbug.net//uploads/hik_video/218.108.69.10_20200507134509_4000.mp4"
            id="f4Player"
            width="480"
            height="270"
            flashvars="skin=[SKIN_FILE]&video=[VIDEO_FILE]"
            allowscriptaccess="always"
            allowFullScreen={true}
            bgcolor="#000000"
        />
        )
    }
}