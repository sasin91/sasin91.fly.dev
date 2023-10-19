import {Camera, Mesh, Vector3} from "three";
import {Capsule} from 'three/addons/math/Capsule.js';
import {Octree} from 'three/addons/math/Octree.js';

function forwardMomentum(direction: Vector3) {
    direction.y = 0;
    direction.normalize();

    return direction;
}

function sideMomentum(direction: Vector3, upwardsDirection: Vector3) {
    direction.y = 0;
    direction.normalize();
    direction.cross(upwardsDirection);

    return direction;

}

class Entity {
    canAirJump = false;
    airJumpVelocity = 10;
    jumpVelocity = 15;

    velocity = new Vector3();
    direction = new Vector3();
    collider = new Capsule(new Vector3(0, 0.35, 0), new Vector3(0, 1, 0), 0.35);
    isOnFloor = false;

    camera: Camera;

    constructor(camera: Camera) {
        this.camera = camera;
    }

    get worldDirection() {
        return this.camera.getWorldDirection(this.direction);
    }

    controls(key: string, deltaTime: number) {

        // gives a bit of air control
        const speedDelta = deltaTime * (this.isOnFloor ? 25 : 8);

        switch (key) {
            case 'KeyW':
                this.velocity.add(forwardMomentum(this.worldDirection).multiplyScalar(speedDelta));
                break;

            case 'KeyA':
                this.velocity.add(sideMomentum(this.worldDirection, this.camera.up).multiplyScalar(-speedDelta));
                break;

            case 'KeyS':
                this.velocity.add(forwardMomentum(this.worldDirection).multiplyScalar(-speedDelta));
                break;

            case 'KeyD':
                this.velocity.add(sideMomentum(this.worldDirection, this.camera.up).multiplyScalar(speedDelta));
                break;

            case 'Space':
                if (this.isOnFloor) {
                    this.velocity.y = this.jumpVelocity;
                } else if (this.canAirJump) {
                    this.velocity.y = this.airJumpVelocity;
                }
                break;
        }
    }

    onMouseUp(sphere: Mesh, mouseTime: number) {
        sphere.collider.center
            .copy(this.collider.end)
            .addScaledVector(
                this.direction,
                this.collider.radius * 1.5
            );

        // throw with more force if we hold the button longer, and if we move forward

        const impulse = 15 + 30 * (1 - Math.exp((mouseTime - performance.now()) * 0.001));

        sphere.velocity
            .copy(this.direction)
            .multiplyScalar(impulse);

        sphere.velocity
            .addScaledVector(
                this.velocity,
                2
            );
    }

    onMouseMove(event: MouseEvent) {
        this.camera.rotation.y -= event.movementX / 500;
        this.camera.rotation.x -= event.movementY / 500;
    }

    update(deltaTime: number, gravity: number, worldOctree: Octree) {
        let damping = Math.exp(-4 * deltaTime) - 1;

        if (!this.isOnFloor) {

            this.velocity.y -= gravity * deltaTime;

            // small air resistance
            damping *= 0.1;

        }

        this.velocity.addScaledVector(this.velocity, damping);

        const deltaPosition = this.velocity.clone().multiplyScalar(deltaTime);
        this.collider.translate(deltaPosition);


        const result = worldOctree.capsuleIntersect(this.collider);

        this.isOnFloor = false;

        if (result) {
            this.isOnFloor = result.normal.y > 0;

            if (!this.isOnFloor) {
                this.velocity.addScaledVector(result.normal, -result.normal.dot(this.velocity));
            }

            this.collider.translate(result.normal.multiplyScalar(result.depth));

        }

        this.camera.position.copy(this.collider.end);

        if (this.camera.position.y <= -25) {
            this.collider.start.set(0, 0.35, 0);
            this.collider.end.set(0, 1, 0);
            this.collider.radius = 0.35;
            this.camera.position.copy(this.collider.end);
            this.camera.rotation.set(0, 0, 0);
        }
    }
}

export default Entity;
