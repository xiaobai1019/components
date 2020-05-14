import React from 'react';

let BMapGL = window.BMapGL;
let mapvgl = window.mapvgl;
export default class BlankMap extends React.Component {
    mapv = React.createRef();
    componentDidMount() {
        var map = new BMapGL.Map(this.mapv.current, {
            restrictCenter: false,
        });    // 创建Map实例
        map.centerAndZoom(new BMapGL.Point(106.560734, 29.566986), 19);  // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        map.setHeading(64.5);
        map.setTilt(73);

        // map.setDisplayOptions({
        //     indoor: false,
        //     poi: false,
        //     skyColors: [
        //         'rgba(17, 54, 73, 0.01)',
        //         'rgba(17, 54, 73, 0.7)'
        //     ]
        // });
        var view = new mapvgl.View({
            map: map,
            mapType: 'blank',
        });

    }
    render() {
        return <div ref={this.mapv} style={{ width: '100%', height: '100%' }}></div>
    }
}