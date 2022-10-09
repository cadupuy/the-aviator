import * as THREE from 'three';

import Debug from './Utils/Debug.js';
import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import World from './World/World.js';
import Resources from './Utils/Resources.js';
import Stats from './Utils/Stats.js';

import sources from './sources.js';

let instance = null;

export default class Experience {
  constructor(_canvas) {
    // Singleton
    if (instance) {
      return instance;
    }
    instance = this;

    // Global access
    window.experience = this;

    // Options
    this.canvas = _canvas;

    // Setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.setDebug();
    this.setStats();
    this.setScene();
    this.setCamera();
    this.setRenderer();
    this.setResources();
    this.setWorld();

    // Resize event
    this.sizes.on('resize', () => {
      this.resize();
    });

    // Time tick event
    this.time.on('tick', () => {
      this.update();
    });
  }

  setDebug() {
    this.debug = new Debug();
  }

  setStats() {
    this.stats = new Stats();
  }

  setScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
  }

  setCamera() {
    this.camera = new Camera();
  }

  setRenderer() {
    this.renderer = new Renderer();
  }

  setResources() {
    this.resources = new Resources(sources);
  }

  setWorld() {
    this.world = new World();
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    if (this.stats) this.stats.update();

    this.camera.update();

    if (this.world) this.world.update();

    if (this.renderer) this.renderer.update();
  }

  destroy() {
    this.sizes.off('resize');
    this.time.off('tick');

    // Traverse the whole scene
    this.scene.traverse((child) => {
      // Test if it's a mesh
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        // Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key];

          // Test if there is a dispose function
          if (value && typeof value.dispose === 'function') {
            value.dispose();
          }
        }
      }
    });

    this.camera.controls.dispose();
    this.renderer.instance.dispose();

    if (this.debug.active) this.debug.ui.destroy();
  }
}
