import React from 'react';

import { eyeStyle } from './Common/style.js';
let BMapGL = window.BMapGL;
let BMAP_EARTH_MAP = window.BMAP_EARTH_MAP;//设置地球模式
let BMAP_NORMAL_MAP = window.BMAP_NORMAL_MAP;//设置普通模式
export default class BMap3DViewAnimation extends React.Component {
    constructor() {
        super();
        this.state = {
            animation: null
        }
    }
    mapv = React.createRef();
    componentDidMount() {
        let { animation } = this.state;
        var map = new BMapGL.Map(this.mapv.current, {
            // restrictCenter: false,
            // style: { styleJson: eyeStyle }
        });    // 创建Map实例
        map.centerAndZoom(new BMapGL.Point(119.44102526969331, 29.83739122685262), 4);  // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        // map.setHeading(64.5);//地图的倾斜角度
        // map.setTilt(73);//地图的倾斜角度
        //开启鼠标滚轮缩放
        map.setMapType(BMAP_EARTH_MAP);

        // map.setDisplayOptions({
        //     indoor: false,
        //     poi: false,
        //     skyColors: [
        //         'rgba(17, 54, 73, 0.01)',
        //         'rgba(17, 54, 73, 0.7)'
        //     ]
        // });


        var keyFrames = [
            {
                center: new BMapGL.Point(-119.44102526969331, -29.83739122685262),
                zoom: 4,
                tilt: 0,
                heading: 0,
                percentage: 0
            },
            {
                center: new BMapGL.Point(0, 0),
                zoom: 4,
                tilt: 0,
                heading: 0,
                percentage: 0.5
            },
            {
                center: new BMapGL.Point(119.44102526969331, 29.83739122685262),
                zoom: 14,
                tilt: 0,
                heading: 0,
                percentage: 1
            },
        ];


        animation && map.cancelViewAnimation(animation);
        // 声明动画对象
        animation = new BMapGL.ViewAnimation(keyFrames, {
            duration: 5000,
            // delay: 5000,
            // interation: 'INFINITE'
        });
        // 监听事件
        animation.addEventListener('animationstart', (e) => { console.log('start') });
        animation.addEventListener('animationiterations', (e) => { console.log('onanimationiterations') });
        animation.addEventListener('animationend', (e) => { console.log('end') });
        this.setState({ animation })
        setTimeout(() => map.startViewAnimation(animation), 1000);

    }
    render() {
        return <div ref={this.mapv} style={{ width: '100%', height: '100%' }}></div>
    }
}