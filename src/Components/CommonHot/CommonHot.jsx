// <script src="//api.map.baidu.com/api?v=3.0&ak=iuCDaDwUqbV1WlDKDY5gNiS0Dty50mVY"></script>
//<script src="%PUBLIC_URL%/Common/Heatmap.js"></script>

import React from 'react';

let BMap = window.BMap;
let BMapLib = window.BMapLib;
export default class CommonHot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,//百度地图实例
            bmapHots: [],
            heatmapOverlay: null
        }
    }
    Map = React.createRef();

    componentDidMount() {
        let { center, zoom } = this.props;
        let bmap = new BMap.Map(this.Map.current);
        let point = new BMap.Point(center[0], center[1]);//地图中心点
        bmap.centerAndZoom(point, zoom);
        bmap.enableScrollWheelZoom(true);//添加鼠标滚轮缩放
        // 地图加载完毕后进行一些操作

        bmap.addEventListener('tilesloaded', () => {
            this.addHot(this.props)
        }, false);

        this.setState({ map: bmap, });//记录百度地图实例
    }

    // 添加热力图
    addHot = (props) => {
        let { map, heatmapOverlay } = this.state;
        if (heatmapOverlay) {
            map.removeOverlay(heatmapOverlay)
        }
        let { hotData, radius, visible, opacity, color } = props;

        let heatmap = new BMapLib.HeatmapOverlay({
            radius: radius || 20,
            visible: visible || true,
            opacity: opacity || 100,
            gradient: color || {
                0: 'rgba(255,53,13,.3)',
                0.3: 'rgba(255,53,13,.5)',
                0.7: 'rgba(255,53,13,.7)',
                1: 'rgba(255,53,13,1)'
            }
        });
        map.addOverlay(heatmap);
        this.setState({ heatmapOverlay: heatmap })
        heatmap.setDataSet({ data: hotData, max: 10000 });
    }


    componentWillReceiveProps(nextProps) {
        this.addHot(nextProps)
    }

    render() {
        return <div ref={this.Map} className={'bmap'} style={{ width: '100%', height: '100%' }}></div>
    }
}
