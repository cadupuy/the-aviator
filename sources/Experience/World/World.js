import Experience from '../Experience.js';
import Environment from './Environment.js';
import Sea from './Sea.js';
import Sky from './Sky';
import AirPlane from './Airplane.js';
import Pilot from './Pilot';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.mousePos = { x: 0, y: 0 };

    // Wait for resources
    this.resources.on('ready', () => {
      // Setup
      this.sky = new Sky();
      this.environment = new Environment();
      this.sea = new Sea();
      this.airplane = new AirPlane();
      this.pilot = new Pilot();
    });

    //add the listener
    document.addEventListener(
      'mousemove',
      (event) => {
        this.handleMouseMove(event);
      },
      false
    );
  }

  // now handle the mousemove event

  handleMouseMove(event) {
    // here we are converting the mouse position value received
    // to a normalized value varying between -1 and 1;
    // this is the formula for the horizontal axis:

    const tx = -1 + (event.clientX / this.sizes.width) * 2;

    // for the vertical axis, we need to inverse the formula
    // because the 2D y-axis goes the opposite direction of the 3D y-axis

    const ty = 1 - (event.clientY / this.sizes.height) * 2;

    this.mousePos = { x: tx, y: ty };
  }

  update() {
    if (this.pilot) this.pilot.update();
    if (this.airplane) this.airplane.update(this.mousePos);
    if (this.sky) this.sky.update();
    if (this.sea) this.sea.update();
  }
}
