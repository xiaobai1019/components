import React from 'react';
import { sliceArr } from '../../Common/utils';

let BMap = window.BMapGL;

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,//百度地图实例
            bmapMarkers: [],//记录地图上现在的marker覆盖物
        }
    }
    Map = React.createRef();

    componentDidMount() {
        let { center, zoom, marker, } = this.props;
        let bmap = new BMap.Map(this.Map.current);
        let point = new BMap.Point(center[0], center[1]);//地图中心点
        bmap.centerAndZoom(point, zoom);
        bmap.enableScrollWheelZoom(true);//添加鼠标滚轮缩放
        this.setState({ map: bmap });//记录百度地图实例
        // 地图加载完毕后进行一些操作
        bmap.addEventListener('tilesloaded', () => {
            // 添加marker
            if (marker) {
                this.addMarker(marker);
            }
        }, false);
    }



    addMarker = (marker) => {
        let { map, bmapMarkers } = this.state;
        // 清除地图上原有的覆盖物
        if (bmapMarkers.length > 0) {
            for (let i = 0; i < bmapMarkers.length; i++) {
                map.removeOverlay(bmapMarkers[i]);
            }
        }
        let markerPoints = marker.point;
        let options = marker.options;
        if (markerPoints.length > 100) {
            markerPoints = sliceArr(markerPoints, 10);
            console.log('markerPoints.length', markerPoints.length)
            let all = []
            for (let i = 0; i < markerPoints.length; i++) {
                all.push(this.convertMarker(markerPoints[i], options, i))
            }
            Promise.all(all).then(res => {
                let bmapPoints = [];
                res.map((item, i) => {
                    item.json().then(d => {
                        if (d.status === 0) {
                            // 添加覆盖物
                            let data = d.result;
                            for (let i = 0; i < data.length; i++) {
                                let markerPoint = new BMap.Point(data[i].x, data[i].y);
                                let BMapMarker = new BMap.Marker(markerPoint, {
                                    icon: new BMap.Icon(options.icon, new BMap.Size(options.size[0], options.size[1])),
                                });
                                bmapMarkers.push(BMapMarker)
                                bmapPoints.push(markerPoint);
                                map.addOverlay(BMapMarker);
                            }
                            if (i === res.length - 1) {
                                console.log('i', i)
                                this.setState({ bmapMarkers })
                            };
                        }

                        if (i === markerPoints.length - 1) map.setViewport(bmapPoints);
                    }, (e) => console.log('e', e))
                })
            }, (e) => console.log('e', e))
        } else {
            this.convertMarker(markerPoints).then(d => d.json()).then(d => {
                if (d.status === 0) {
                    let bmapPoints = [];
                    // 添加覆盖物
                    let data = d.result;
                    for (let i = 0; i < data.length; i++) {
                        let markerPoint = new BMap.Point(data[i].x, data[i].y);
                        let BMapMarker = new BMap.Marker(markerPoint, {
                            icon: new BMap.Icon(options.icon, new BMap.Size(options.size[0], options.size[1])),
                        });
                        bmapMarkers.push(BMapMarker)
                        bmapPoints.push(markerPoint);
                        map.addOverlay(BMapMarker);
                    }
                    this.setState({ bmapMarkers });
                    map.setViewport(bmapPoints);
                    console.log(2)
                }
            })
        }
        //添加完marker后对视野进行调整
    }
    // 添加点
    convertMarker = (markerPoints) => {
        // 转换坐标
        return fetch(`http://api.map.baidu.com/geoconv/v1/?coords=${markerPoints.join(';')}&from=1&to=5&ak=sSuteMAn4h6D7gGC6Lzt8yoPSxjku7d8`)
    }


    componentWillReceiveProps(nextProps) {
        console.log(3)
        this.addMarker(nextProps.marker)
    }


    render() {
        return <div ref={this.Map} style={{ width: '100%', height: '100%' }} className={'bmap'} ></div>
    }
}
