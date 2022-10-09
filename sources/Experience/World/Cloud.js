import * as THREE from 'three';
import Experience from '../Experience';
import { colors } from '../Utils/colors';

export default class Cloud {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    // create a cube geometry;
    // this shape will be duplicated to create the cloud
    this.geom = new THREE.BoxGeometry(20, 20, 20);
  }

  setMaterial() {
    // create a material; a simple white material will do the trick
    this.mat = new THREE.MeshPhongMaterial({
      color: colors.white,
    });
  }

  setMesh() {
    // Create an empty container that will hold the different parts of the cloud
    this.group = new THREE.Group();

    // duplicate the geometry a random number of times
    const nBlocs = 3 + Math.floor(Math.random() * 3);
    for (var i = 0; i < nBlocs; i++) {
      // create the mesh by cloning the geometry
      const mesh = new THREE.Mesh(this.geom, this.mat);

      // set the position and the rotation of each cube randomly
      mesh.position.x = i * 15;
      mesh.position.y = Math.random() * 10;
      mesh.position.z = Math.random() * 10;
      mesh.rotation.z = Math.random() * Math.PI * 2;
      mesh.rotation.y = Math.random() * Math.PI * 2;

      // set the size of the cube randomly
      const size = 0.1 + Math.random() * 0.9;
      mesh.scale.set(size, size, size);

      // allow each cube to cast and to receive shadows
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      // add the cube to the container we first created
      this.group.add(mesh);
    }
  }
}
