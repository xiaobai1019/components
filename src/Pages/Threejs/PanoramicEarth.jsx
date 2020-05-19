import React from 'react';
let THREE = window.THREE;

export default class PanoramicEarth extends React.Component {
    componentDidMount() {
        this.creatScene();
        this.initRender();
        this.addObjects();
        this.renderObj();
    }
    // 创建场景
    creatScene() {
        let scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        let fov = 45; // 摄像机视锥体垂直视野角度
        let aspect = window.innerWidth / window.innerHeight; // 摄像机视锥体长宽比
        let near = 1; //摄像机视锥体近端面
        let far = 1000; //摄像机视锥体远端面
        let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(0, 0, 20);
        camera.lookAt(0, 0, 0);

        scene.add(camera);

        this.scene = scene;
        this.camera = camera;

        var axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);
    }
    // 创建渲染器
    initRender() {
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
    addObjects() {
        let scene = this.scene;
        //初始化物体
        let geometry = new THREE.SphereBufferGeometry(5, 32, 32);
        var texture = new THREE.TextureLoader().load(require("./img/1.jpg"));
        let Material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: texture,
            side: THREE.DoubleSide
        });
        let mesh = new THREE.Mesh(geometry, Material);
        mesh.name = "全景球";
        scene.add(mesh);
        this.geometry = geometry;
        this.mesh = mesh;
    }

    //渲染
    renderObj() {
        this.renderer.clear();
        var axis = new THREE.Vector3(0, 1, 0);//向量axis
        this.mesh.rotateOnAxis(axis, Math.PI / 360);//绕axis轴旋转π/8
        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(() => this.renderObj());
    }


    render() {
        return <div id="id" style={{ width: '100%', height: '100%' }}></div>
    }
}