import { GamePageProps } from "@/Pages/Projects/Game";
import { usePage } from "@inertiajs/react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { Group, Object3D, Object3DEventMap } from "three";
import { SkeletonUtils } from "three-stdlib";
import { GLTF } from "three/examples/jsm/Addons.js";

const MOVEMENT_SPEED = 1;

type BodyType = Object3D<Object3DEventMap> & {
    geometry: any;
    skeleton: any;
};

export function AnimatedWoman({
    hairColor = "green",
    topColor = "pink",
    bottomColor = "brown",
    ...rest
}) {
    const { props } = usePage<GamePageProps>();

    const position = useMemo(() => rest.position, []);

    const group = useRef<Group<Object3DEventMap>>(null);
    const { scene, materials, animations } = useGLTF(
        `${props.assets.root}/models/AnimatedWoman.glb`
    ) as GLTF & { materials: any };
    // Skinned meshes cannot be re-used in threejs without cloning them
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    // useGraph creates two flat object collections for nodes and materials
    const { nodes } = useGraph(clone);

    const { actions } = useAnimations(animations, group);
    const [animation, setAnimation] = useState("CharacterArmature|Idle");

    useEffect(() => {
        actions[animation]?.reset().fadeIn(0.32).play();
        return () => {
            actions[animation]?.fadeOut(0.32);
        };
    }, [animation]);

    useFrame(() => {
        if (
            group.current &&
            group.current.position.distanceTo(rest.position) > 0.1
        ) {
            const direction = group.current.position
                .clone()
                .sub(rest.position)
                .normalize()
                .multiplyScalar(MOVEMENT_SPEED);
            group.current.position.sub(direction);
            group.current.lookAt(rest.position);
            setAnimation("CharacterArmature|Run");
        } else {
            setAnimation("CharacterArmature|Idle");
        }
    });

    return (
        <group ref={group} {...rest} position={position} dispose={null}>
            <group name="Root_Scene">
                <group name="RootNode">
                    <group
                        name="CharacterArmature"
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    >
                        <primitive object={nodes.Root} />
                    </group>
                    <group
                        name="Casual_Body"
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    >
                        <skinnedMesh
                            name="Casual_Body_1"
                            geometry={
                                (nodes.Casual_Body_1 as BodyType).geometry
                            }
                            material={materials.White}
                            skeleton={
                                (nodes.Casual_Body_1 as BodyType).skeleton
                            }
                        >
                            <meshStandardMaterial color={topColor} />
                        </skinnedMesh>
                        <skinnedMesh
                            name="Casual_Body_2"
                            geometry={
                                (nodes.Casual_Body_2 as BodyType).geometry
                            }
                            material={materials.Skin}
                            skeleton={
                                (nodes.Casual_Body_2 as BodyType).skeleton
                            }
                        />
                    </group>
                    <group
                        name="Casual_Feet"
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    >
                        <skinnedMesh
                            name="Casual_Feet_1"
                            geometry={
                                (nodes.Casual_Feet_1 as BodyType).geometry
                            }
                            material={materials.Skin}
                            skeleton={
                                (nodes.Casual_Feet_1 as BodyType).skeleton
                            }
                        />
                        <skinnedMesh
                            name="Casual_Feet_2"
                            geometry={
                                (nodes.Casual_Feet_2 as BodyType).geometry
                            }
                            material={materials.Grey}
                            skeleton={
                                (nodes.Casual_Feet_2 as BodyType).skeleton
                            }
                        />
                    </group>
                    <group
                        name="Casual_Head"
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    >
                        <skinnedMesh
                            name="Casual_Head_1"
                            geometry={
                                (nodes.Casual_Head_1 as BodyType).geometry
                            }
                            material={materials.Skin}
                            skeleton={
                                (nodes.Casual_Head_1 as BodyType).skeleton
                            }
                        />
                        <skinnedMesh
                            name="Casual_Head_2"
                            geometry={
                                (nodes.Casual_Head_2 as BodyType).geometry
                            }
                            material={materials.Hair_Blond}
                            skeleton={
                                (nodes.Casual_Head_2 as BodyType).skeleton
                            }
                        >
                            <meshStandardMaterial color={hairColor} />
                        </skinnedMesh>
                        <skinnedMesh
                            name="Casual_Head_3"
                            geometry={
                                (nodes.Casual_Head_3 as BodyType).geometry
                            }
                            material={materials.Hair_Brown}
                            skeleton={
                                (nodes.Casual_Head_3 as BodyType).skeleton
                            }
                        />
                        <skinnedMesh
                            name="Casual_Head_4"
                            geometry={
                                (nodes.Casual_Head_4 as BodyType).geometry
                            }
                            material={materials.Brown}
                            skeleton={
                                (nodes.Casual_Head_4 as BodyType).skeleton
                            }
                        />
                    </group>
                    <skinnedMesh
                        name="Casual_Legs"
                        geometry={(nodes.Casual_Legs as BodyType).geometry}
                        material={materials.Orange}
                        skeleton={(nodes.Casual_Legs as BodyType).skeleton}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    >
                        <meshStandardMaterial color={bottomColor} />
                    </skinnedMesh>
                </group>
            </group>
        </group>
    );
}

// useGLTF.preload("/models/AnimatedWoman.glb");
