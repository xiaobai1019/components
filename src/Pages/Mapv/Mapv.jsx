//<script src="//api.map.baidu.com/api?v=3.0&type=webgl&ak=iuCDaDwUqbV1WlDKDY5gNiS0Dty50mVY"></script>
//<script src="https://unpkg.com/mapvgl/dist/mapvgl.min.js"></script>
//<script src="https://code.bdstatic.com/npm/mapvgl@1.0.0-beta.53/dist/mapvgl.min.js"></script>
//<script src="https://unpkg.com/mapvgl/dist/mapvgl.threelayers.min.js"></script>
import React from 'react';
import { eyeStyle } from './style.js'
let BMapGL = window.BMapGL;
let mapvgl = window.mapvgl;
export default class Mapv extends React.Component {
    mapv = React.createRef();
    componentDidMount() {
        // 1. 创建地图实例

        var map = new BMapGL.Map(this.mapv.current, {
            restrictCenter: false,
            style: { styleJson: eyeStyle }
        });    // 创建Map实例
        map.centerAndZoom(new BMapGL.Point(106.560734, 29.566986), 19);  // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        map.setHeading(64.5);
        map.setTilt(73);

        map.setDisplayOptions({
            indoor: false,
            poi: false,
            skyColors: [
                'rgba(17, 54, 73, 0.01)',
                'rgba(17, 54, 73, 0.7)'
            ]
        });

        var view = new mapvgl.View({
            map: map
        });
        var point = new BMapGL.Point(106.560734, 29.566986);

        // 制造数据
        var sparkData1 = [];
        var sparkData2 = [];
        var sparkData3 = [];
        var randomNum = 40;
        // 随机生成点的偏移尺度，勿修改变量名
        var RANDOM_SIZE = 0.01;
        for (let i = 0; i < randomNum; i++) {
            let coord = [
                point.lng + RANDOM_SIZE * Math.random() - RANDOM_SIZE / 2,
                point.lat + RANDOM_SIZE * Math.random() - RANDOM_SIZE / 2
            ];
            sparkData1.push({
                geometry: {
                    type: 'Point',
                    coordinates: coord
                },
                properties: {
                    height: parseInt(200 * Math.random(), 10)
                }
            });
        }
        for (let i = 0; i < randomNum; i++) {
            let coord = [
                point.lng + RANDOM_SIZE * Math.random() - RANDOM_SIZE / 2,
                point.lat + RANDOM_SIZE * Math.random() - RANDOM_SIZE / 2
            ];
            sparkData2.push({
                geometry: {
                    type: 'Point',
                    coordinates: coord
                },
                properties: {
                    height: parseInt(200 * Math.random(), 10)
                }
            });
        }
        for (let i = 0; i < randomNum; i++) {
            let coord = [
                point.lng + RANDOM_SIZE * Math.random() - RANDOM_SIZE / 2,
                point.lat + RANDOM_SIZE * Math.random() - RANDOM_SIZE / 2
            ];
            sparkData3.push({
                geometry: {
                    type: 'Point',
                    coordinates: coord
                },
                properties: {
                    height: parseInt(200 * Math.random(), 10)
                }
            });
        }

        var sparkLayer1 = new mapvgl.SparkLayer({
            height: function (data) {
                return data.properties.height;
            },
            step: 0.1,
            startTime: 1,
            endTime: 12,
            color: 'rgb(255, 153, 51)'
        });
        view.addLayer(sparkLayer1);

        var sparkLayer2 = new mapvgl.SparkLayer({
            height: function (data) {
                return data.properties.height;
            },
            color: 'rgb(255, 0, 255)'
        });
        view.addLayer(sparkLayer2);

        var sparkLayer3 = new mapvgl.SparkLayer({
            height: function (data) {
                return data.properties.height;
            },
            step: 0.1,
            startTime: 2,
            endTime: 10,
            color: 'rgb(0, 204, 255)'
        });
        view.addLayer(sparkLayer3);

        sparkLayer1.setData(sparkData1);
        sparkLayer2.setData(sparkData2);
        sparkLayer3.setData(sparkData3);

    }
    render() {
        return <div ref={this.mapv} style={{ width: '100%', height: '100%' }}></div>
    }
}