import * as THREE from 'three';
import Experience from '../Experience.js';
import { colors } from '../Utils/colors.js';

export default class Sea {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
    this.geom.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
  }

  setMaterial() {
    // create the material
    this.mat = new THREE.MeshPhongMaterial({
      color: colors.blue,
      transparent: true,
      opacity: 0.6,
      flatShading: true,
    });
  }

  setMesh() {
    // To create an object in Three.js, we have to create a mesh
    // which is a combination of a geometry and some material
    this.mesh = new THREE.Mesh(this.geom, this.mat);

    // Allow the sea to receive shadows
    this.mesh.receiveShadow = true;
    this.mesh.position.y = -600;
    this.scene.add(this.mesh);
  }

  update() {
    this.mesh.rotation.z += 0.005;
  }
}
