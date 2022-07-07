import './index.styl';
import React from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
export default class Earth extends React.Component {

  state = {
    backgroundColor: '#164CCA',
    renderGlithPass: !(window.navigator.userAgent.toLowerCase().indexOf('mobile') > 0)
  }

  componentDidMount() {
    this.initThree()
  }

  initThree = () => {
    const nearDist = 0.1, farDist = 10000;
    const canvas = document.getElementById('canvas');
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearAlpha(0);
    canvas.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xeeeeee, 0, 100);
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, nearDist, farDist);
    camera.position.set(-2 * farDist, 0, 780);

    // 后期
    const composer = new EffectComposer(renderer);
    composer.addPass( new RenderPass(scene, camera));
    const glitchPass = new GlitchPass();
    composer.addPass(glitchPass);

    // 页面缩放
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    }, false);

    // 双击全屏
    window.addEventListener('dblclick', () => {
      const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
      if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
          canvas.requestFullscreen();
        } else if (canvas.webkitRequestFullscreen) {
          canvas.webkitRequestFullscreen();
        }
        scene.background = new THREE.Color(this.state.backgroundColor)
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
        scene.background = '';
        composer.render();
      }
    });

    // 字体
    const textMesh = new THREE.Mesh();
    const loader = new FontLoader();
    loader.load('./fonts/helvetiker_regular.typeface.json', font => {
      textMesh.geometry = new TextGeometry('IMart', {
        font: font,
        size: 100,
        height: 40,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 30,
        bevelSize: 8,
        bevelOffset: 1,
        bevelSegments: 12
      });
      textMesh.material = material;
      textMesh.position.x = 120 * -2;
      textMesh.position.z = 120 * -1;
      scene.add(textMesh);
    });

    let mouseX = 0, mouseY = 0;
    const mouseFX = {
      windowHalfX: window.innerWidth / 2,
      windowHalfY: window.innerHeight / 2,
      coordinates: (coordX, coordY) => {
        mouseX = (coordX - mouseFX.windowHalfX) * 5;
        mouseY = (coordY - mouseFX.windowHalfY) * 5;
      },
      onMouseMove: e => {
        mouseFX.coordinates(e.clientX, e.clientY)
      },
      onTouchMove: e => {
        mouseFX.coordinates(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
      }
    };
    document.addEventListener('mousemove', mouseFX.onMouseMove, false);
    document.addEventListener('touchmove', mouseFX.onTouchMove, false);

    // 创建装饰几何体
    const generateRandomMesh = (geometry, material, count) => {
      for (let i = 0; i < count; i++) {
        let mesh = new THREE.Mesh(geometry, material);
        let dist = farDist / 3;
        let distDouble = dist * 2;
        mesh.position.x = Math.random() * distDouble - dist;
        mesh.position.y = Math.random() * distDouble - dist;
        mesh.position.z = Math.random() * distDouble - dist;
        mesh.rotation.x = Math.random() * 2 * Math.PI;
        mesh.rotation.y = Math.random() * 2 * Math.PI;
        mesh.rotation.z = Math.random() * 2 * Math.PI;
        // 手动控制何时重新计算3D变换以获得更好的性能
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
        group.add(mesh);
      }
    }

    const group = new THREE.Group();
    const octahedronGeometry = new THREE.OctahedronBufferGeometry(80);
    const material = new THREE.MeshNormalMaterial();
    generateRandomMesh(octahedronGeometry, material, 100);
    const torusGeometry = new THREE.TorusBufferGeometry(40, 25, 16, 40);
    generateRandomMesh(torusGeometry, material, 200);
    const coneGeometry = new THREE.ConeBufferGeometry(40, 80, 80);
    generateRandomMesh(coneGeometry, material, 100);
    scene.add(group);

    // 动画
    const animate = () => {
      requestAnimationFrame(animate);
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (mouseY * -1 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      const t = Date.now() * 0.001;
      const rx = Math.sin(t * 0.7) * 0.5;
      const ry = Math.sin(t * 0.3) * 0.5;
      const rz = Math.sin(t * 0.2) * 0.5;
      group.rotation.x = rx;
      group.rotation.y = ry;
      group.rotation.z = rz;
      textMesh.rotation.x = rx;
      textMesh.rotation.y = ry;
      textMesh.rotation.z = rx;
      renderer.render(scene, camera);
      this.state.renderGlithPass && composer.render();
    }
    animate();
  }

  handleInputChange = e => {
    this.setState({
      backgroundColor: e.target.value
    })
  }

  handleRenderChange = () => {
    this.setState({
      renderGlithPass: !this.state.renderGlithPass
    })
  }

  render () {
    return (
      <div className='floating_page' style={{ backgroundColor: this.state.backgroundColor }}>
        <div id='canvas'></div>
        <input className='color_pick' type='color' onChange={this.handleInputChange} value={this.state.backgroundColor} />
        <button className='pass_button' onClick={this.handleRenderChange}>特效<span className='highlight'>{this.state.renderGlithPass ? '开' : '关'}</span></button>
      </div>
    )
  }
}
