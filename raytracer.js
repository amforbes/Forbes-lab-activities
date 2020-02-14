import {degreesToRadians} from "./genmath.js";
import * as Vec from "./vecmath.js";



/* Scene representation */
export function Scene(surface) {
  this.image = document.getElementById("viewport"); // HTML5 canvas element serving as render buffer
  this.surface = surface; // a Surface object (must have a valid intersect method)
  this.backgroundColor = [0.5, 0.5, 0.5]; // default background color when no intersection is found
  this.camera = { // simple definition for a linear-perspective viewer
    aspect: this.image.width / this.image.height,
    fov: degreesToRadians(60)/2,
    // eye/camera position
    e: [ 0, 0, 0 ],
    // basis vector for camera coordinate frame
    u: [ 1, 0, 0 ],
    v: [ 0, 1, 0 ],
    w: [ 0, 0, 1 ],
    // distance to the image/view plane
    d: 1
    
    
    
    
  };
}

/* Generate viewing ray through the pixel with given coordinates */
Scene.prototype.project = function(i, j) {
  // TODO compute u and v
  const top = this.camera.d * (Math.tan(this.camera.fov));
  const right = top * this.camera.aspect;
  const bottom = -this.camera.d * (Math.tan(this.camera.fov));
  const left = (-1) * (top * this.camera.aspect);
  const u = left + (right - left) * (i + 0.5)/ this.image.width;
  const v = bottom + (top - bottom) * (j + 0.5)/ this.image.height;

  return {
    // TODO use u and v to compute the ray direction
    direction: Vec.add(Vec.add(Vec.mult(-this.camera.d, this.camera.w),  Vec.mult(u, this.camera.u)), Vec.mult(v, this.camera.v)),
      
    // TODO ray origin for perspective viewing is just the eye position
    origin: this.camera.e
  };
};



/* Compute the shaded color for the given object intersection. (For now, this is just a solid color.) */
Scene.prototype.shade = function(hit) {
  // TODO In the event of a hit return the color of the intersecting object.
  //  Otherwise return the background color.
  //light source
   
    
  if (hit)
      lightcolor: [1, 1, 1];
      lightorigin: [10, 15, 20];
      l: 
      p: Vec.add(hit.ray.origin, Vec.mult(this.hit.t, hit.ray.direction))
      return hit.object.color;  
  else
      return this.backgroundColor;
};

/* Basic ray tracing algorithm. */
Scene.prototype.trace = function() {
  for (let j = 0; j < this.image.height; j++)
    for (let i = 0; i < this.image.width; i++) {
      // TODO Use the appropriate methods to implement the algorithm.
      const ray   = this.project(i,j);
      const hit   = this.surface.intersect(ray);
      // Set the pixel color in the render buffer
      this.image.getContext("2d").fillStyle = arrayToColor(this.shade(hit));
      this.image.getContext("2d").fillRect(i, j, 1, 1);
    }
};

/* Helper function to convert an number array to a CSS color value */
function arrayToColor(rgb) {
  return "rgb(" + 255*rgb[0] + "," + 255*rgb[1] + "," + 255*rgb[2] + ")";
}