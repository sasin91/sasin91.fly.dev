import { PageProps } from "@/types";
import {
    PerformanceMonitor,
    PointerLockControls,
    Stats,
    useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { Sphere, Vector3 } from "three";

import Ball from "@/Components/game/Ball";
import { NightSky } from "@/Components/game/NightSky";
import Overlay from "@/Components/game/Overlay";
import Player from "@/Components/game/Player";
import SphereCollider from "@/Components/game/SphereCollider";
import useOctree from "@/hooks/useOctree";
import type { Capsule } from "three/examples/jsm/Addons.js";

export const Gravity = 30;
export const ballCount = 10;
export const radius = 0.2;
export const balls = [...Array(ballCount)].map(() => ({
    position: [Math.random() * 50 - 25, 20, Math.random() * 50 - 25],
}));
export const v1 = new Vector3();
export const v2 = new Vector3();
export const v3 = new Vector3();
export const frameSteps = 5;

export type Collider = {
    sphere?: Sphere;
    velocity: Vector3;
    capsule?: Capsule;
};

export type checkSphereCollisionsFn = (
    sphere: Sphere,
    velocity: Vector3
) => void;

export default function GamePage(props: PageProps) {
    const [dpr, setDpr] = useState(0.5);
    const { nodes, scene } = useGLTF("/assets/maps/scene-transformed.glb");
    const octree = useOctree(scene);

    const colliders = useRef<Collider[]>([]);

    function checkSphereCollisions(sphere: Sphere, velocity: Vector3) {
        for (let i = 0, length = colliders.current.length; i < length; i++) {
            const c = colliders.current[i]!;

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

    return (
        <div className="relative w-full h-full" id="container">
            <Overlay user={props.auth.user} />

            <Suspense fallback={<h1>Loading...</h1>}>
                <Canvas shadows dpr={dpr}>
                    <PerformanceMonitor
                        onIncline={() => setDpr(1)}
                        onDecline={() => setDpr(0.25)}
                    >
                        <Stats />
                        <NightSky />
                        <ambientLight />
                        <pointLight position={[10, 10, 10]} />
                        <directionalLight
                            intensity={1}
                            castShadow={true}
                            shadow-bias={-0.00015}
                            shadow-radius={4}
                            shadow-blur={10}
                            shadow-mapSize={[2048, 2048]}
                            position={[85.0, 80.0, 70.0]}
                            shadow-camera-left={-30}
                            shadow-camera-right={30}
                            shadow-camera-top={30}
                            shadow-camera-bottom={-30}
                        />
                        <group dispose={null}>
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Suzanne007.geometry}
                                material={nodes.Suzanne007.material}
                                position={[1.74, 1.04, 24.97]}
                            />
                        </group>
                        {balls.map(({ position }, i) => (
                            <SphereCollider
                                key={i}
                                id={i}
                                radius={radius}
                                octree={octree}
                                position={position}
                                colliders={colliders.current}
                                checkSphereCollisions={checkSphereCollisions}
                            >
                                <Ball radius={radius} />
                            </SphereCollider>
                        ))}
                        <Player octree={octree} colliders={colliders.current} />
                        <PointerLockControls />
                    </PerformanceMonitor>
                </Canvas>
            </Suspense>
        </div>
    );
}
