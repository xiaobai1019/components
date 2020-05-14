//// <script src="//api.map.baidu.com/api?v=3.0&ak=iuCDaDwUqbV1WlDKDY5gNiS0Dty50mVY"></script>
// <script src="%PUBLIC_URL%/Common/lushu.js"></script>
import React, { Fragment } from 'react';

let BMap = window.BMap;
let BMapLib = window.BMapLib;
export default class Lushu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,//百度地图实例
            bmapMarkers: [],//记录地图上现在的marker覆盖物
            lushu: null
        }

    }
    Map = React.createRef();

    componentDidMount() {
        let { center, zoom, path } = this.props;
        let bmap = new BMap.Map(this.Map.current);
        let point = new BMap.Point(center[0], center[1]);//地图中心点
        bmap.centerAndZoom(point, zoom);
        bmap.enableScrollWheelZoom(true);//添加鼠标滚轮缩放
        // 地图加载完毕后进行一些操作
        bmap.addEventListener('tilesloaded', () => {
            console.log(1)
            // 轨迹
            let polylinePonit = [];
            for (let i = 0; i < path.length; i++) {
                polylinePonit.push(new BMap.Point(path[i][0], path[i][1]))
            }
            var polyline = new BMap.Polyline(polylinePonit, { strokeColor: "blue", strokeWeight: 10, strokeOpacity: 0.5 });
            bmap.addOverlay(polyline);

            // 小车沿着坐标走
            let lushu = new BMapLib.LuShu(bmap, polylinePonit, {
                // defaultContent: "",//"从天安门到百度大厦"
                autoView: false,//是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
                icon: new BMap.Icon(require('./img/car.png'), new BMap.Size(32, 32)),
                speed: 300,
                enableRotation: true,//是否设置marker随着道路的走向进行旋转
            });
            this.setState({ lushu })
            bmap.addEventListener('zoomstart', () => {
                //地图缩放时删除路书
                lushu.clear()
            })


        }, false);
        this.setState({ map: bmap });//记录百度地图实例
    }

    // 控制小车
    run = (type) => {
        let { lushu } = this.state;
        switch (type) {
            case 1:
                lushu.start();
                break;
            case 2:
                lushu.pause();
                break;
            case 3:
                lushu.stop();
                break
            case 4:
                lushu.clear();
                break
            case 5:
                lushu.next();
                break
            case 6:
                lushu.back();
                break
            default:
                lushu.start();
                break;
        }
    }

    render() {
        return <Fragment>
            <div className={'btns'}>
                <button onClick={() => this.run(1)}>开始</button>
                <button onClick={() => this.run(2)}>暂停</button>
                <button onClick={() => this.run(3)}>停止</button>
                <button onClick={() => this.run(4)}>清除</button>
                <button onClick={() => this.run(5)}>前进</button>
                <button onClick={() => this.run(6)}>后退</button>
            </div>
            <div ref={this.Map} className={'bmap'} style={{ width: '100%', height: '100%' }}></div>
        </Fragment>
    }
}
