import {Octree} from 'three/addons/math/Octree.js';

export const updateCollisions = (spheres: any[], deltaTime: number, worldOctree: Octree, gravity: number) => {
    for (const sphere of spheres) {
        sphere.collider.center.addScaledVector(sphere.velocity, deltaTime);

        const result = worldOctree.sphereIntersect(sphere.collider);

        if (result) {

            sphere.velocity.addScaledVector(result.normal, -result.normal.dot(sphere.velocity) * 1.5);
            sphere.collider.center.add(result.normal.multiplyScalar(result.depth));

        } else {

            sphere.velocity.y -= gravity * deltaTime;

        }

        const damping = Math.exp(-1.5 * deltaTime) - 1;
        sphere.velocity.addScaledVector(sphere.velocity, damping);
    }
}
