import {
    Collider,
    Gravity,
    frameSteps,
    v1,
    v2,
    v3,
} from "@/Pages/Projects/Game";
import { useFrame } from "@react-three/fiber";
import { PropsWithChildren, useEffect, useMemo, useRef } from "react";
import { Group, Object3DEventMap, Sphere, Vector3 } from "three";
import { Octree } from "three/examples/jsm/Addons.js";

export default function SphereCollider({
    id,
    radius,
    octree,
    position,
    colliders,
    children,
}: PropsWithChildren<{
    id: number;
    radius: number;
    octree: Octree;
    position: number[];
    colliders: Collider[];
}>) {
    const ref = useRef<Group<Object3DEventMap>>(null);

    const sphere = useMemo(
        () => new Sphere(new Vector3(...position), radius),
        [position, radius]
    );
    const velocity = useMemo(() => new Vector3(), []);

    useEffect(() => {
        console.log("adding reference to this sphere collider");
        colliders[id] = { sphere: sphere, velocity: velocity };
    }, [colliders, id, sphere, velocity]);

    function checkSphereCollisions(sphere: Sphere, velocity: Vector3) {
        for (const c of colliders) {
            if (c.sphere) {
                const d2 = sphere.center.distanceToSquared(c.sphere.center);
                const r = sphere.radius + c.sphere.radius;
                const r2 = r * r;

                if (d2 < r2) {
                    const normal = v1
                        .subVectors(sphere.center, c.sphere.center)
                        .normalize();
                    const impact1 = v2
                        .copy(normal)
                        .multiplyScalar(normal.dot(velocity));
                    const impact2 = v3
                        .copy(normal)
                        .multiplyScalar(normal.dot(c.velocity));
                    velocity.add(impact2).sub(impact1);
                    c.velocity.add(impact1).sub(impact2);
                    const d = (r - Math.sqrt(d2)) / 2;
                    sphere.center.addScaledVector(normal, d);
                    c.sphere.center.addScaledVector(normal, -d);
                }
            } else if (c.capsule) {
                const center = v1
                    .addVectors(c.capsule.start, c.capsule.end)
                    .multiplyScalar(0.5);
                const r = sphere.radius + c.capsule.radius;
                const r2 = r * r;
                for (const point of [c.capsule.start, c.capsule.end, center]) {
                    const d2 = point.distanceToSquared(sphere.center);
                    if (d2 < r2) {
                        const normal = v1
                            .subVectors(point, sphere.center)
                            .normalize();
                        const impact1 = v2
                            .copy(normal)
                            .multiplyScalar(normal.dot(c.velocity));
                        const impact2 = v3
                            .copy(normal)
                            .multiplyScalar(normal.dot(velocity));
                        c.velocity.add(impact2).sub(impact1);
                        velocity.add(impact1).sub(impact2);
                        const d = (r - Math.sqrt(d2)) / 2;
                        sphere.center.addScaledVector(normal, -d);
                    }
                }
            }
        }
    }

    function updateSphere(
        delta: number,
        octree: Octree,
        sphere: Sphere,
        velocity: Vector3
    ) {
        sphere.center.addScaledVector(velocity, delta);

        const result = octree.sphereIntersect(sphere);

        if (result) {
            const factor = -result.normal.dot(velocity);
            velocity.addScaledVector(result.normal, factor * 1.5);

            sphere.center.add(result.normal.multiplyScalar(result.depth));
        } else {
            velocity.y -= Gravity * delta;
        }

        const damping = Math.exp(-1.5 * delta) - 1;
        velocity.addScaledVector(velocity, damping);

        checkSphereCollisions(sphere, velocity);

        ref.current!.position.copy(sphere.center);
    }

    useFrame((_, delta) => {
        const deltaSteps = Math.min(0.05, delta) / frameSteps;
        for (let i = 0; i < frameSteps; i++) {
            updateSphere(deltaSteps, octree, sphere, velocity);
        }
    });

    return <group ref={ref}>{children}</group>;
}
