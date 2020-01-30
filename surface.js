import * as Vec from "./vecmath.js";

/* Hit record structure */
function Hit(obj, t) {
  this.object = obj;
  this.t = t;
}

/* Representation of a group of surfaces */

export function Group() {
  this.surfaces = [];
}

Group.prototype.intersect = function(ray) {
  // TODO Intersect the ray with all objects in this group
  //  and return the nearest hit (smallest value for t)
  undefined;
};

Group.prototype.addSurface = function(s) {
  this.surfaces.push(s);
}

/* Representation of spherical surface */

export function Sphere(center, radius, color) {
  this.center = center;
  this.radius = radius;
  this.color  = color;
}

Sphere.prototype.intersect = function({origin, direction}) {
  // TODO Compute the quadratic coefficients A, B, and C
  const A  = Vec.dot(distance, distance);//A= d.d
  const ec = Vec.diff(origin, this.center);//e-c
  const B  = Vec.dot(2(distance), ec);//B=2d.e-c
  const C  = Vec.dot(ec, ec);//e-c . e-c
  // TODO Compute the discriminant
  const discriminant = Vec.diff(B^2, 4(A * C));// b^2 - 4ac
  // TODO Check whether intersection exists and return an appropriate Hit object
  if (discriminant >= 0) {
    return new Hit(this, (-B - Math.sqrt(discriminant)) / A);
  }
};

