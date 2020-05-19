import React from 'react';

import { eyeStyle } from './Common/style.js';
let BMapGL = window.BMapGL;
export default class BMap3D extends React.Component {
    bmap = React.createRef();
    componentDidMount() {
        var map = new BMapGL.Map(this.bmap.current, {
            restrictCenter: false,
            style: { styleJson: eyeStyle }
        });    // 创建Map实例
        map.centerAndZoom(new BMapGL.Point(106.560734, 29.566986), 18);  // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        // map.setHeading(64.5);//地图的倾斜角度
        map.setTilt(73);//地图的倾斜角度

        map.setDisplayOptions({
            indoor: false,
            poi: false,
            skyColors: [
                'rgba(17, 54, 73, 0.01)',
                'rgba(17, 54, 73, 0.7)'
            ]
        });


    }
    render() {
        return <div ref={this.bmap} style={{ width: '100%', height: '100%' }}></div>
    }
}