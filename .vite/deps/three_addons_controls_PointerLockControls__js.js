import {
  Controls,
  Euler,
  Vector3
} from "./chunk-ISCQGZSO.js";

// node_modules/three/examples/jsm/controls/PointerLockControls.js
var _euler = new Euler(0, 0, 0, "YXZ");
var _vector = new Vector3();
var _changeEvent = { type: "change" };
var _lockEvent = { type: "lock" };
var _unlockEvent = { type: "unlock" };
var _PI_2 = Math.PI / 2;
var PointerLockControls = class extends Controls {
  constructor(camera, domElement = null) {
    super(camera, domElement);
    this.isLocked = false;
    this.minPolarAngle = 0;
    this.maxPolarAngle = Math.PI;
    this.pointerSpeed = 1;
    this._onMouseMove = onMouseMove.bind(this);
    this._onPointerlockChange = onPointerlockChange.bind(this);
    this._onPointerlockError = onPointerlockError.bind(this);
    if (this.domElement !== null) {
      this.connect();
    }
  }
  connect() {
    this.domElement.ownerDocument.addEventListener("mousemove", this._onMouseMove);
    this.domElement.ownerDocument.addEventListener("pointerlockchange", this._onPointerlockChange);
    this.domElement.ownerDocument.addEventListener("pointerlockerror", this._onPointerlockError);
  }
  disconnect() {
    this.domElement.ownerDocument.removeEventListener("mousemove", this._onMouseMove);
    this.domElement.ownerDocument.removeEventListener("pointerlockchange", this._onPointerlockChange);
    this.domElement.ownerDocument.removeEventListener("pointerlockerror", this._onPointerlockError);
  }
  dispose() {
    this.disconnect();
  }
  getObject() {
    console.warn("THREE.PointerLockControls: getObject() has been deprecated. Use controls.object instead.");
    return this.object;
  }
  getDirection(v) {
    return v.set(0, 0, -1).applyQuaternion(this.object.quaternion);
  }
  moveForward(distance) {
    if (this.enabled === false) return;
    const camera = this.object;
    _vector.setFromMatrixColumn(camera.matrix, 0);
    _vector.crossVectors(camera.up, _vector);
    camera.position.addScaledVector(_vector, distance);
  }
  moveRight(distance) {
    if (this.enabled === false) return;
    const camera = this.object;
    _vector.setFromMatrixColumn(camera.matrix, 0);
    camera.position.addScaledVector(_vector, distance);
  }
  lock() {
    this.domElement.requestPointerLock();
  }
  unlock() {
    this.domElement.ownerDocument.exitPointerLock();
  }
};
function onMouseMove(event) {
  if (this.enabled === false || this.isLocked === false) return;
  const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
  const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
  const camera = this.object;
  _euler.setFromQuaternion(camera.quaternion);
  _euler.y -= movementX * 2e-3 * this.pointerSpeed;
  _euler.x -= movementY * 2e-3 * this.pointerSpeed;
  _euler.x = Math.max(_PI_2 - this.maxPolarAngle, Math.min(_PI_2 - this.minPolarAngle, _euler.x));
  camera.quaternion.setFromEuler(_euler);
  this.dispatchEvent(_changeEvent);
}
function onPointerlockChange() {
  if (this.domElement.ownerDocument.pointerLockElement === this.domElement) {
    this.dispatchEvent(_lockEvent);
    this.isLocked = true;
  } else {
    this.dispatchEvent(_unlockEvent);
    this.isLocked = false;
  }
}
function onPointerlockError() {
  console.error("THREE.PointerLockControls: Unable to use Pointer Lock API");
}
export {
  PointerLockControls
};
//# sourceMappingURL=three_addons_controls_PointerLockControls__js.js.map
