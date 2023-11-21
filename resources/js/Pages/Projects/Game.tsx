import { Character as CharacterType, PageProps } from "@/types";
import {
    PerformanceMonitor,
    PointerLockControls,
    Preload,
    Stats,
    Text,
    useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Fragment, Suspense, useEffect, useRef, useState } from "react";
import { Sphere, Vector3 } from "three";

import Ball from "@/Components/game/Ball";
import Character, { CharacterModel } from "@/Components/game/Character";
import CustomEnvironment from "@/Components/game/CustomEnvironment";
import { NightSky } from "@/Components/game/NightSky";
import SphereCollider from "@/Components/game/SphereCollider";
import FormField from "@/Components/ui/FormField";
import PrimaryButton from "@/Components/ui/PrimaryButton";
import useOctree from "@/hooks/useOctree";
import { useTranslation } from "@/i18n/client";
import { Dialog, Transition } from "@headlessui/react";
import { router } from "@inertiajs/react";
import { useForm } from "laravel-precognition-react-inertia";
import { Loader } from "lucide-react";
import type { Capsule } from "three/examples/jsm/Addons.js";
import { lerp } from "three/src/math/MathUtils.js";
import { atom, useAtom } from "jotai";
import { AnimatedWoman } from "@/Components/game/CharactersModels/AnimatedWoman";

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

export const gameChannel = window.Echo.join(`game`);
export const charactersAtom = atom<Record<CharacterType["id"], CharacterType>>(
    {}
);
export type Collider = {
    sphere?: Sphere;
    velocity: Vector3;
    capsule?: Capsule;
};

export type GamePageProps = PageProps<{ assets: Record<string, string> }>;

function CreateCharacter() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(true);

    const form = useForm("post", route("character.store"), {
        name: "",
    });

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-full p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    {t("character.create")}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <form
                                        onSubmit={() => {
                                            return form.submit({
                                                onSuccess() {
                                                    router.reload();
                                                },
                                            });
                                        }}
                                    >
                                        <FormField
                                            form={form}
                                            attribute="name"
                                            label={t("character.form.name")}
                                        />

                                        <PrimaryButton
                                            className="mt-4"
                                            type="submit"
                                            disabled={form.processing}
                                        >
                                            {form.processing && <Loader />}
                                            {t("character.form.submit")}
                                        </PrimaryButton>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default function GamePage(props: GamePageProps) {
    useGLTF.preload(props.assets.map);

    if (!props.auth.user.character) {
        return <CreateCharacter />;
    }

    const [dpr, setDpr] = useState(0.5);
    const { scene } = useGLTF(props.assets.map);

    const octree = useOctree(scene);

    const ballColliders = useRef<Collider[]>([]);
    const characterColliders = useRef<Collider[]>([]);

    const [characters, setCharacters] = useAtom(charactersAtom);

    useEffect(() => {
        gameChannel
            .here((cs: CharacterType[]) => {
                const here = cs.filter(
                    (c) => c.id !== props.auth.user.character!.id
                );

                setCharacters(here);

                console.log("here", here);
            })
            .joining((character: CharacterType) => {
                console.log("joining", character.name);

                characters[character.id] = character;
                setCharacters(characters);

                console.log(characters);
            })
            .leaving((character: CharacterType) => {
                console.log("leaving", character.name);

                delete characters[character.id];
                setCharacters(characters);
            })
            .listenForWhisper(
                "move",
                ({
                    characterId,
                    x,
                    y,
                    z,
                }: {
                    characterId: number;
                    x: number;
                    y: number;
                    z: number;
                }) => {
                    if (!characters[characterId]) {
                        characters[characterId] = {
                            id: characterId,
                            name: "Johny nobody",
                            health: 0,
                            mana: 0,
                            position: {
                                x,
                                y,
                                z,
                            },
                            rotation: {
                                x: 0,
                                y: 0,
                                z: 0,
                            },
                        };
                    }

                    characters[characterId].position.x = lerp(
                        characters[characterId].position.x,
                        x,
                        0.3
                    );
                    characters[characterId].position.y = lerp(
                        characters[characterId].position.y,
                        y,
                        0.3
                    );
                    characters[characterId].position.z = lerp(
                        characters[characterId].position.z,
                        z,
                        0.3
                    );

                    setCharacters(characters);
                }
            );

        return () => {
            window.Echo.leave(`game`);
        };
    }, []);

    return (
        <main className="absolute w-full h-full p-0 m-0 bg-black isolate overscroll-none">
            <Canvas shadows dpr={dpr}>
                <Suspense
                    fallback={
                        <Text
                            color="rgba(79, 70, 229, 1)"
                            fillOpacity={100}
                            strokeOpacity={80}
                        >
                            Loading...
                        </Text>
                    }
                >
                    <PerformanceMonitor
                        onIncline={() => setDpr(1)}
                        onDecline={() => setDpr(0.25)}
                    >
                        <Preload all scene={scene} />
                        <Stats />
                        <NightSky />

                        <ambientLight />
                        <pointLight position={[10, 10, 10]} />
                        <hemisphereLight
                            color={0x8dc1de}
                            groundColor={0x00668d}
                            intensity={1.5}
                            position={[2, 1, 1]}
                        />
                        <directionalLight
                            color={0xffffff}
                            intensity={2.5}
                            castShadow={true}
                            shadow-bias={-0.00006}
                            shadow-radius={4}
                            position={[-5, 25, -1]}
                            shadow-mapSize={[1024, 1024]}
                        >
                            <orthographicCamera
                                attach="shadow-camera"
                                args={[-30, 30, 30, -30, 0.01, 500]}
                            />
                        </directionalLight>

                        {balls.map(({ position }, i) => (
                            <SphereCollider
                                key={i}
                                id={i}
                                radius={radius}
                                octree={octree}
                                position={position}
                                colliders={ballColliders.current}
                            >
                                <Ball radius={radius} />
                            </SphereCollider>
                        ))}
                        <Character
                            id={props.auth.user.character!.id}
                            octree={octree}
                            ballColliders={ballColliders.current}
                        />

                        {Object.values(characters).map((character, i) => {
                            console.log("spawning", character, i);
                            return (
                                <SphereCollider
                                    key={`character-${character.id}`}
                                    id={i}
                                    radius={radius}
                                    octree={octree}
                                    position={[
                                        character.position.x,
                                        character.position.y,
                                        character.position.z,
                                    ]}
                                    colliders={characterColliders.current}
                                >
                                    <mesh castShadow receiveShadow scale={1}>
                                        <Text
                                            position={[1, 1, 1]}
                                            color="hotpink"
                                            anchorX="center"
                                            anchorY="middle"
                                        >
                                            {character.name}
                                        </Text>
                                        <AnimatedWoman
                                            position={[
                                                character.position.x,
                                                character.position.y,
                                                character.position.z,
                                            ]}
                                        />
                                    </mesh>
                                </SphereCollider>
                            );
                        })}
                        <CustomEnvironment scene={scene} />
                        <PointerLockControls />
                    </PerformanceMonitor>
                </Suspense>
            </Canvas>
        </main>
    );
}
