import React from 'react';
let mapboxgl = window.mapboxgl;
// pk.eyJ1IjoiemhlbnlhbiIsImEiOiJjam5icWY3azAwM3JhM2xxbGFsd3lrNTVoIn0.maOhcGdNxjaSRG_HKnknRA
export default class OpenStreetMap extends React.Component {
    componentDidMount() {
        mapboxgl.accessToken = 'pk.eyJ1IjoiemhlbnlhbiIsImEiOiJjam5icWY3azAwM3JhM2xxbGFsd3lrNTVoIn0.maOhcGdNxjaSRG_HKnknRA';
        var map = new mapboxgl.Map({
            style: 'mapbox://styles/zhenyan/cka814pv122ai1irvp4hl4hxg',//3d主题
            center: [121.496132, 31.241550],
            zoom: 15,
            pitch: 45,
            bearing: -17.6,
            container: 'map'
        });
    }
    render() {
        return <div id="map" style={{ width: '100%', height: '100%' }}></div>
    }
}