import { PointMaterial, Points } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { random } from "maath";
import { useRef, useState } from "react";
import type { Points as PointsType } from "three";

export default function Stars() {
    const ref = useRef<PointsType>(null);
    const [sphere] = useState(
        () =>
            random.inSphere(new Float32Array(5000), {
                radius: 1.5,
            }) as Float32Array
    );
    useFrame((state, delta) => {
        if (ref && ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });
    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points
                ref={ref}
                positions={sphere}
                stride={3}
                frustumCulled={false}
            >
                <PointMaterial
                    transparent
                    color="#ffa0e0"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}
