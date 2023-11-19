import { Collider, ballCount, gameChannel } from "@/Pages/Projects/Game";
import useKeyboard from "@/hooks/useKeyboard";
import { Gltf } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { suspend } from "suspend-react";
import { Camera, Vector3 } from "three";
import { Octree } from "three/examples/jsm/Addons.js";
import { Capsule } from "three/examples/jsm/math/Capsule.js";

const GRAVITY = 30;
const STEPS_PER_FRAME = 5;

// @ts-expect-error
const suzi = import("@pmndrs/assets/models/suzi.glb").then(
    (module) => module.default
);

export const CharacterModel = () => (
    <Gltf src={suspend(suzi) as string} receiveShadow castShadow />
);

function getForwardVector(camera: Camera, characterDirection: Vector3) {
    camera.getWorldDirection(characterDirection);
    characterDirection.y = 0;
    characterDirection.normalize();
    return characterDirection;
}

function getSideVector(camera: Camera, characterDirection: Vector3) {
    camera.getWorldDirection(characterDirection);
    characterDirection.y = 0;
    characterDirection.normalize();
    characterDirection.cross(camera.up);
    return characterDirection;
}

function controls(
    id: number,
    keyboard: ReturnType<typeof useKeyboard>,
    camera: Camera,
    delta: number,
    characterVelocity: Vector3,
    characterOnFloor: boolean,
    characterDirection: Vector3
) {
    const speedDelta = delta * (characterOnFloor ? 25 : 8);
    keyboard["KeyA"] &&
        characterVelocity.add(
            getSideVector(camera, characterDirection).multiplyScalar(-speedDelta)
        );
    keyboard["KeyD"] &&
        characterVelocity.add(
            getSideVector(camera, characterDirection).multiplyScalar(speedDelta)
        );
    keyboard["KeyW"] &&
        characterVelocity.add(
            getForwardVector(camera, characterDirection).multiplyScalar(speedDelta)
        );
    keyboard["KeyS"] &&
        characterVelocity.add(
            getForwardVector(camera, characterDirection).multiplyScalar(
                -speedDelta
            )
        );
    if (characterOnFloor) {
        if (keyboard["Space"]) {
            characterVelocity.y = 15;
        }
    }

    if (keyboard["KeyW"] || keyboard["KeyA"] || keyboard["KeyS"] || keyboard["KeyD"]) {
        gameChannel.whisper('move', {
            characterId: id,
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z
        });
    }
}

function updateCharacter(
    camera: Camera,
    delta: number,
    octree: Octree,
    capsule: Capsule,
    characterVelocity: Vector3,
    characterOnFloor: boolean
) {
    let damping = Math.exp(-4 * delta) - 1;
    if (!characterOnFloor) {
        characterVelocity.y -= GRAVITY * delta;
        damping *= 0.1; // small air resistance
    }
    characterVelocity.addScaledVector(characterVelocity, damping);
    const deltaPosition = characterVelocity.clone().multiplyScalar(delta);
    capsule.translate(deltaPosition);
    characterOnFloor = characterCollisions(capsule, octree, characterVelocity);
    camera.position.copy(capsule.end);
    return characterOnFloor;
}

function throwBall(
    camera: Camera,
    capsule: Capsule,
    colliders: Collider[],
    characterDirection: Vector3,
    characterVelocity: Vector3,
    count: number,
    mouseTime: number
) {
    // throw the ball with more force if we hold the button longer, and if we move forward
    const impulse =
        15 + 30 * (1 - Math.exp((mouseTime - performance.now()) * 0.001));

    const collider = colliders[count % ballCount];

    if (!collider) {
        console.error(`Missing collider ${count % ballCount}`);
        return;
    }

    camera.getWorldDirection(characterDirection);

    collider
        .sphere!.center.copy(capsule.end)
        .addScaledVector(characterDirection, capsule.radius * 1.5);

    collider.velocity.copy(characterDirection).multiplyScalar(impulse);
    collider.velocity.addScaledVector(characterVelocity, 2);
}

function characterCollisions(
    capsule: Capsule,
    octree: Octree,
    characterVelocity: Vector3
) {
    const result = octree.capsuleIntersect(capsule);
    let characterOnFloor = false;
    if (result) {
        characterOnFloor = result.normal.y > 0;
        if (!characterOnFloor) {
            characterVelocity.addScaledVector(
                result.normal,
                -result.normal.dot(characterVelocity)
            );
        }
        capsule.translate(result.normal.multiplyScalar(result.depth));
    }
    return characterOnFloor;
}

function teleportCharacterIfOob(
    camera: Camera,
    capsule: Capsule,
    characterVelocity: Vector3
) {
    if (camera.position.y <= -100) {
        characterVelocity.set(0, 0, 0);
        capsule.start.set(0, 10, 0);
        capsule.end.set(0, 11, 0);
        camera.position.copy(capsule.end);
        camera.rotation.set(0, 0, 0);
    }
}

export default function Character({
    id,
    octree,
    ballColliders: colliders,
}: {
    id: number;
    octree: Octree;
    ballColliders: Collider[];
}) {
    console.log({ id });
    const characterOnFloor = useRef(false);
    const characterVelocity = useMemo(() => new Vector3(), []);
    const characterDirection = useMemo(() => new Vector3(), []);
    const capsule = useMemo(
        () => new Capsule(new Vector3(0, 10, 0), new Vector3(0, 11, 0), 0.5),
        []
    );
    const keyboard = useKeyboard();
    const { camera } = useThree();
    let clicked = 0;
    let mouseTime = 0;

    const onMouseDown = () => {
        document.body.requestPointerLock();

        mouseTime = performance.now();
    };

    const onMouseUp = () => {
        if (document.pointerLockElement !== null) {
            throwBall(
                camera,
                capsule,
                colliders,
                characterDirection,
                characterVelocity,
                clicked++,
                mouseTime
            );
        }
    };
    useEffect(() => {
        document.addEventListener("pointerdown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);
        return () => {
            document.removeEventListener("pointerdown", onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);
        };
    });

    useEffect(() => {
        //console.log('adding reference to this capsule collider')
        colliders[ballCount] = { capsule: capsule, velocity: characterVelocity };
    }, [colliders, ballCount, capsule, characterVelocity]);

    useFrame(({ camera }, delta) => {
        controls(
            id,
            keyboard,
            camera,
            delta,
            characterVelocity,
            characterOnFloor.current,
            characterDirection
        );
        const deltaSteps = Math.min(0.05, delta) / STEPS_PER_FRAME;
        for (let i = 0; i < STEPS_PER_FRAME; i++) {
            characterOnFloor.current = updateCharacter(
                camera,
                deltaSteps,
                octree,
                capsule,
                characterVelocity,
                characterOnFloor.current
            );
        }
        teleportCharacterIfOob(camera, capsule, characterVelocity);
    });

    return <CharacterModel />;
}
