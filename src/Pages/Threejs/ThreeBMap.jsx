import React, { Fragment } from 'react';
import Styles from './ThreeBMap.module.less';
import { eyeStyle } from './Common/style.js';
let THREE = window.THREE;
let BMapGL = window.BMapGL;

export default class ThreeBMap extends React.Component {
    constructor() {
        super();
        this.state = {
            cameraPositionZ: 15,
            zoom: false,
            opacity: 1,
            requestAnimation: null
        }
    }
    componentDidMount() {
        this.creatScene();
        this.initRender();
        this.addObjects();
        this.renderObj();
        setTimeout(() => {
            this.setState({ zoom: true }, () => this.renderObj())
        }, 3000);

        this.initBMap()
    }
    bmap = React.createRef();
    // 创建场景
    creatScene = () => {
        let { cameraPositionZ } = this.state;
        let scene = new THREE.Scene();
        var texture = new THREE.TextureLoader().load(require('./img/2.jpg'));
        // 纹理对象Texture赋值给场景对象的背景属性.background
        // scene.background = new THREE.Color(0x000000);
        scene.background = texture;
        let fov = 45; // 摄像机视锥体垂直视野角度
        let aspect = window.innerWidth / window.innerHeight; // 摄像机视锥体长宽比
        let near = 1; //摄像机视锥体近端面
        let far = 1000; //摄像机视锥体远端面
        let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(0, 0, cameraPositionZ);
        camera.lookAt(0, 0, 0);

        scene.add(camera);

        this.scene = scene;
        this.camera = camera;

        // var axesHelper = new THREE.AxesHelper(5);
        // scene.add(axesHelper);
    }
    // 创建渲染器
    initRender = () => {
        let renderer = new THREE.WebGLRenderer({
            //抗锯齿
            antialias: true
        });
        let id = document.getElementById('id');

        let w = id.offsetWidth;
        let h = id.offsetHeight;
        renderer.setSize(w, h);
        id.appendChild(renderer.domElement);
        this.renderer = renderer;
    }
    // 添加物体
    addObjects = () => {
        let scene = this.scene;
        //初始化物体
        let geometry1 = new THREE.SphereBufferGeometry(5, 32, 32);
        var texture1 = new THREE.TextureLoader().load(require("./img/1.jpg"));
        let Material1 = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: texture1,
            side: THREE.DoubleSide
        });
        let mesh1 = new THREE.Mesh(geometry1, Material1);
        scene.add(mesh1);
        mesh1.name = "全景球";

        // var group = new THREE.Group();
        // group.add(points);
        // group.add(mesh1);
        // scene.add(group);

        this.geometry = geometry1;
        this.mesh = mesh1;
    }

    //渲染
    renderObj = () => {
        this.renderer.clear();
        let { zoom } = this.state;
        if (zoom) {
            let camera = this.camera;
            let { cameraPositionZ } = this.state;
            if (cameraPositionZ > 5) {
                cameraPositionZ--;
                camera.position.set(0, 0, cameraPositionZ);
                this.setState({ cameraPositionZ });
                this.renderer.render(this.scene, this.camera);
                window.requestAnimationFrame(() => this.renderObj());
            } else {
                let scene = this.scene;
                if (scene.children.length > 0) {
                    for (let i = 0; i < scene.children.length; i++) {
                        scene.remove(scene.children[i])
                    }
                }

                this.renderer.render(this.scene, this.camera);
                this.setState({ opacity: 0 })
            }
        } else {
            var axis = new THREE.Vector3(0, 1, 0);//向量axis
            this.mesh.rotateOnAxis(axis, Math.PI / 360);//绕axis轴旋转π/8
            this.renderer.render(this.scene, this.camera);
            window.requestAnimationFrame(() => this.renderObj());
        }
    }


    initBMap = () => {
        var map = new BMapGL.Map(this.bmap.current, {
            restrictCenter: false,
            style: { styleJson: eyeStyle }
        });    // 创建Map实例
        map.centerAndZoom(new BMapGL.Point(106.560734, 29.566986), 18);  // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        // map.setHeading(64.5);//地图的倾斜角度
        map.setTilt(73);//地图的倾斜角度

        map.setDisplayOptions({
            indoor: false,
            poi: false,
            skyColors: [
                'rgba(17, 54, 73, 0.01)',
                'rgba(17, 54, 73, 0.7)'
            ]
        });
    }

    render() {
        let { opacity } = this.state;
        return <Fragment>
            <div className={Styles.three} id="id" style={{ opacity: opacity }}></div>
            <div ref={this.bmap} style={{ width: '100%', height: '100%' }}></div>
        </Fragment >
    }
}