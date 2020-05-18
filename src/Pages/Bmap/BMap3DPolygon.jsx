import React from 'react';

import { eyeStyle } from './Common/style.js';
import hangzhou from './Common/hangzhou.js';
import { getCenter } from './Common/BmapUtils.js'

let BMapGL = window.BMapGL;
export default class BMap3DPolygon extends React.Component {
    constructor() {
        super();
        this.state = {
            colors: ['#c1232b',
                '#27727b',
                '#fcce10',
                '#e87c25',
                '#b5c334',
                '#fe8463',
                '#9bca63',
                '#fad860',
                '#f3a43b',
                '#60c0dd',
                '#d7504b',
                '#c6e579',
                '#f4e001',
                '#f0805a',
                '#26c0c0',]
        }
    }
    mapv = React.createRef();
    componentDidMount() {
        var map = new BMapGL.Map(this.mapv.current, {
            restrictCenter: false,
            style: { styleJson: eyeStyle }
        });    // 创建Map实例
        map.centerAndZoom(new BMapGL.Point(119.44102526969331, 29.83739122685262), 10);  // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        // map.setHeading(64.5);//地图的倾斜角度
        // map.setTilt(73);//地图的倾斜角度

        map.setDisplayOptions({
            indoor: false,
            poi: false,
            skyColors: [
                'rgba(17, 54, 73, 0.01)',
                'rgba(17, 54, 73, 0.7)'
            ]
        });

        let { colors } = this.state;
        for (let i = 0; i < hangzhou.length; i++) {
            let coordinates = hangzhou[i].geometry.coordinates;
            let name = hangzhou[i].properties.name;
            let position = hangzhou[i].properties.center;
            let po = []
            for (let i = 0; i < coordinates.length; i++) {
                po.push(new BMapGL.Point(coordinates[i][0], coordinates[i][1]))
            }
            let Polygon = new BMapGL.Polygon(po, {
                strokeColor: colors[i], //边线颜色
                fillColor: colors[i],//		填充颜色。当参数为空时，折线覆盖物将没有填充效果
                strokeWeight: 10,//	边线的宽度，以像素为单位
                strokeOpacity: 1,//	边线透明度，取值范围0 - 1
                fillOpacity: 1,//	填充的透明度，取值范围0 - 1
                strokeStyle: 'solid',//	边线的样式，solid或dashed
                enableMassClear: true,//是否在调用map.clearOverlays清除此覆盖物，默认为true
                enableEditing: false,//		是否启用线编辑，默认为false
                enableClicking: true,//	是否响应点击事件，默认为true
            });

            map.addOverlay(Polygon);

            let Label = new BMapGL.Label(name, {
                offset: new BMapGL.Size(-10, 0),
                position: new BMapGL.Point(position[0], position[1]),
                enableMassClear: true,//是否在调用map.clearOverlays清除此覆盖物，默认为true
            })
            Label.setStyle({
                color: '#fff',
                backgroundColor: 'transparent',
                border: 'none'
            })
            map.addOverlay(Label);
        }

        // 点击获取当前地图中心点
        getCenter(map)
    }
    render() {
        return <div ref={this.mapv} style={{ width: '100%', height: '100%' }}></div>
    }
}