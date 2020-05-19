
import TimelinePage from './../Pages/TimelinePage/TimelinePage';
import BackgroundVideo from './../Pages/BackgroundVideo/BackgroundVideo';
import Video from './../Pages/Video/Video';
import MapBox from './../Pages/MapBox/MapBox';
// 百度地图
import MarkerPage from '../Pages/Bmap/MarkerPage';
import HotMapPage from '../Pages/Bmap/HotMapPage';
import CommonHotPage from '../Pages/Bmap/CommonHotPage';
import Lushu from '../Pages/Bmap/Lushu';
import BMap3D from '../Pages/Bmap/BMap3D';
import BMap3DPolyline from '../Pages/Bmap/BMap3DPolyline';
import BMap3DPolygon from '../Pages/Bmap/BMap3DPolygon';
import BMap3DViewAnimation from '../Pages/Bmap/BMap3DViewAnimation';

import PanoramicEarth from './../Pages/Threejs/PanoramicEarth'
import ThreeBMap from './../Pages/Threejs/ThreeBMap'

export default [{
    name: 'TimelinePage',
    path: '/TimelinePage',
    component: TimelinePage
}, {
    name: 'BackgroundVideo',
    path: '/BackgroundVideo',
    component: BackgroundVideo
}, {
    name: 'Video',
    path: '/Video',
    component: Video
}, {
    name: 'MapBox',
    path: '/MapBox',
    component: MapBox
},
{
    name: 'BMap',
    path: '/BMap',
    children: [{
        name: 'CommonHotPage',
        path: '/BMap/CommonHotPage',
        component: CommonHotPage
    }, {
        name: 'Lushu',
        path: '/BMap/Lushu',
        component: Lushu
    }, {
        name: 'MarkerPage',
        path: '/BMap/MarkerPage',
        component: MarkerPage
    },
    {
        name: 'HotMapPage',
        path: '/BMap/HotMapPage',
        component: HotMapPage
    },
    {
        name: 'BMap3D',
        path: '/BMap/BMap3D',
        component: BMap3D
    }, {
        name: 'BMap3DPolyline',
        path: '/BMap/BMap3DPolyline',
        component: BMap3DPolyline
    },
    {
        name: 'BMap3DPolygon',
        path: '/BMap/BMap3DPolygon',
        component: BMap3DPolygon
    },
    {
        name: 'BMap3DViewAnimation',
        path: '/BMap/BMap3DViewAnimation',
        component: BMap3DViewAnimation
    },
    ]
},
{
    name: 'Threejs',
    path: '/Threejs',
    children: [
        {
            name: 'PanoramicEarth',
            path: '/Threejs/PanoramicEarth',
            component: PanoramicEarth
        },
        {
            name: 'ThreeBMap',
            path: '/Threejs/ThreeBMap',
            component: ThreeBMap
        },
    ]
},
]