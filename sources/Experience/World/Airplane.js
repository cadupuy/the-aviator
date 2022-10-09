import * as THREE from 'three';
import Experience from '../Experience.js';
import { colors } from '../Utils/colors.js';
import { normalize } from '../Utils/normalize.js';

export default class AirPlane {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setMesh();
  }

  setMesh() {
    this.mesh = new THREE.Object3D();

    // Cockpit

    const geomCockpit = new THREE.BoxGeometry(80, 50, 50, 1, 1, 1);
    const matCockpit = new THREE.MeshPhongMaterial({
      color: colors.red,
      flatShading: true,
    });

    // we can access a specific vertex of a shape through
    // the vertices array, and then move its x, y and z property:
    //Update code here
    // geomCockpit.vertices[4].y -= 10;
    // geomCockpit.vertices[4].z += 20;
    // geomCockpit.vertices[5].y -= 10;
    // geomCockpit.vertices[5].z -= 20;
    // geomCockpit.vertices[6].y += 30;
    // geomCockpit.vertices[6].z += 20;
    // geomCockpit.vertices[7].y += 30;
    // geomCockpit.vertices[7].z -= 20;

    const cockpit = new THREE.Mesh(geomCockpit, matCockpit);
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.mesh.add(cockpit);

    // Create the engine
    const geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
    const matEngine = new THREE.MeshPhongMaterial({
      color: colors.white,
      flatShading: true,
    });
    const engine = new THREE.Mesh(geomEngine, matEngine);
    engine.position.x = 40;
    engine.castShadow = true;
    engine.receiveShadow = true;
    this.mesh.add(engine);

    // Create the tail
    const geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
    const matTailPlane = new THREE.MeshPhongMaterial({
      color: colors.red,
      flatShading: true,
    });
    const tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
    tailPlane.position.set(-35, 25, 0);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    this.mesh.add(tailPlane);

    // Create the wing
    const geomSideWing = new THREE.BoxGeometry(40, 8, 150, 1, 1, 1);
    const matSideWing = new THREE.MeshPhongMaterial({
      color: colors.red,
      flatShading: true,
    });
    const sideWing = new THREE.Mesh(geomSideWing, matSideWing);
    sideWing.castShadow = true;
    sideWing.receiveShadow = true;
    this.mesh.add(sideWing);

    // propeller
    const geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
    const matPropeller = new THREE.MeshPhongMaterial({
      color: colors.brown,
      flatShading: true,
    });
    this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;

    // blades
    const geomBlade = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1);
    const matBlade = new THREE.MeshPhongMaterial({
      color: colors.brownDark,
      flatShading: true,
    });

    const blade = new THREE.Mesh(geomBlade, matBlade);
    blade.position.set(8, 0, 0);
    blade.castShadow = true;
    blade.receiveShadow = true;
    this.propeller.add(blade);
    this.propeller.position.set(50, 0, 0);
    this.mesh.add(this.propeller);
  }

  update(mousePos) {
    // let's move the airplane between -100 and 100 on the horizontal axis,
    // and between 25 and 175 on the vertical axis,
    // depending on the mouse position which ranges between -1 and 1 on both axes;
    // to achieve that we use a normalize function (see below)

    const targetY = normalize(mousePos.y, -0.75, 0.75, 25, 175);
    const targetX = normalize(mousePos.x, -0.75, 0.75, -100, 100);

    // Move the plane at each frame by adding a fraction of the remaining distance
    this.mesh.position.y += (targetY - this.mesh.position.y) * 0.1;

    // Rotate the plane proportionally to the remaining distance
    this.mesh.rotation.z = (targetY - this.mesh.position.y) * 0.0128;
    this.mesh.rotation.x = (this.mesh.position.y - targetY) * 0.0064;

    this.propeller.rotation.x += 0.3;
  }
}
