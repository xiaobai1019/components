
import React from 'react';

let BMap = window.BMapGL;
let mapvgl = window.mapvgl;

export default class Hot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,//百度地图实例
            bmapHots: [],
            view: null
        }
    }
    Map = React.createRef();

    componentDidMount() {
        let { center, zoom, hotData, colors } = this.props;
        let bmap = new BMap.Map(this.Map.current);
        let point = new BMap.Point(center[0], center[1]);//地图中心点
        bmap.centerAndZoom(point, zoom);
        bmap.enableScrollWheelZoom(true);//添加鼠标滚轮缩放
        // 地图加载完毕后进行一些操作
        bmap.addEventListener('tilesloaded', () => {
            // 添加热力图
            if (hotData) {
                // 热力图
                for (let key in hotData) {
                    this.addHot(hotData[key], colors[key])
                }
            }
        }, false);
        var view = new mapvgl.View({
            map: bmap
        });
        this.setState({ map: bmap, view });//记录百度地图实例
    }

    // 添加热力图
    addHot = (hotData, gradient) => {
        let { bmapHots, view } = this.state;

        var data = [];
        for (let i = 0; i < hotData.length; i++) {
            data.push({
                geometry: {
                    type: 'Point',
                    coordinates: [hotData[i][0], hotData[i][1]]
                },
                properties: {
                    count: Math.random() * 100
                }
            });
        }

        var intensity = new mapvgl.Intensity({
            max: 100,
            min: 0,
            gradient: gradient,
            maxSize: 30,
            minSize: 5
        });
        var pointLayer = new mapvgl.PointLayer({
            size: function (data) {
                return intensity.getSize(data.properties.count);
            },
            color: function (data) {
                return intensity.getColor(data.properties.count);
            }
        });
        view.addLayer(pointLayer);
        pointLayer.setData(data);
        bmapHots.push(pointLayer);
        this.setState({ bmapHots })
    }

    // 清除标记
    clearLayer = () => {
        let { bmapHots, view } = this.state;
        if (bmapHots.length === 0) return;
        for (let i = 0; i < bmapHots.length; i++) {
            view.removeLayer(bmapHots[i]);
        }
        this.setState({ bmapHots: [] })
    }
    componentWillReceiveProps(nextProps) {
        let { hotData, colors } = nextProps;
        if (Object.prototype.toString.call(hotData) === '[object Object]') {
            this.clearLayer();
            for (let key in hotData) {
                this.addHot(hotData[key], colors[key])
            }
        } else {
            console.log('hotData, colors应是对象，并且key值相同')
        }

    }

    render() {
        return <div ref={this.Map} className={'bmap'} style={{ width: '100%', height: '100%' }}></div>
    }
}
