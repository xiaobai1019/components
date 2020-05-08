import React from 'react';
import { line } from './line';
import Lushu from '../../Components/Lushu/Lushu';

export default class LushuPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,//百度地图实例
            bmapMarkers: [],//记录地图上现在的marker覆盖物
            lushu: null,
            path: []
        }
    }
    Map = React.createRef();

    componentDidMount() {
        let { path } = this.state;
        let points = line.points;

        for (let i = 0; i < points.length; i++) {
            path.push([points[i].longitude, points[i].latitude])
        }
        this.setState({ path })
    }

    // 控制小车


    render() {
        let { path } = this.state;
        return <Lushu
            center={[119.691246, 29.791328]}
            zoom={15}
            path={path}
        ></Lushu>
    }
}
