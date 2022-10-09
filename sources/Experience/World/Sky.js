import * as THREE from 'three';
import Experience from '../Experience';
import Cloud from './Cloud';

export default class Sky {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setGroup();
  }

  setGroup() {
    // Create an empty container

    this.group = new THREE.Group();

    // choose a number of clouds to be scattered in the sky
    this.nClouds = 20;

    // To distribute the clouds consistently,
    // we need to place them according to a uniform angle
    const stepAngle = (Math.PI * 2) / this.nClouds;

    // create the clouds
    for (let i = 0; i < this.nClouds; i++) {
      const cloud = new Cloud();

      // set the rotation and the position of each cloud;
      // for that we use a bit of trigonometry
      const finalAngle = stepAngle * i; // this is the final angle of the cloud
      const distance = 750 + Math.random() * 200; // this is the distance between the center of the axis and the cloud itself

      // Trigonometry!!! I hope you remember what you've learned in Math :)
      // in case you don't:
      // we are simply converting polar coordinates (angle, distance) into Cartesian coordinates (x, y)
      cloud.group.position.y = Math.sin(finalAngle) * distance;
      cloud.group.position.x = Math.cos(finalAngle) * distance;

      // rotate the cloud according to its position
      cloud.group.rotation.z = finalAngle + Math.PI / 2;

      // for a better result, we position the clouds
      // at random depths inside of the scene
      cloud.group.position.z = -400 - Math.random() * 400;

      // we also set a random scale for each cloud
      const scale = 1 + Math.random() * 2;
      cloud.group.scale.set(scale, scale, scale);

      // do not forget to add the mesh of each cloud in the scene
      this.group.add(cloud.group);
    }

    this.group.position.y = -600;
    this.scene.add(this.group);
  }

  update() {
    this.group.rotation.z += 0.01;
  }
}
