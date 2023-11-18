import { Character as CharacterType, PageProps } from "@/types";
import {
    PerformanceMonitor,
    PointerLockControls,
    Stats,
    Text,
    useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Fragment, Suspense, useEffect, useRef, useState } from "react";
import { Euler, Sphere, Vector3 } from "three";

import Ball from "@/Components/game/Ball";
import { NightSky } from "@/Components/game/NightSky";
import Character from "@/Components/game/Character";
import SphereCollider from "@/Components/game/SphereCollider";
import useOctree from "@/hooks/useOctree";
import { BoxGeometry, MeshNormalMaterial } from "three";
import type { Capsule } from "three/examples/jsm/Addons.js";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "@/i18n/client";
import { useForm } from "laravel-precognition-react-inertia";
import { router } from "@inertiajs/react";
import FormField from "@/Components/ui/FormField";
import PrimaryButton from "@/Components/ui/PrimaryButton";
import { Loader } from "lucide-react";

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

    function openModal() {
        setIsOpen(true);
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
    if (!props.auth.user.character) {
        return <CreateCharacter />;
    }

    const [dpr, setDpr] = useState(0.5);
    const { nodes, scene } = useGLTF(props.assets.map);
    const octree = useOctree(scene);

    const colliders = useRef<Collider[]>([]);
    const [characters, setCharacters] = useState<CharacterType[]>([]);

    useEffect(() => {
        window.Echo.join(`game`)
            .here((p: CharacterType[]) => {
                setCharacters(p);
            })
            .joining((character: CharacterType) => {
                console.log(character.name);

                characters.push(character);
                setCharacters(characters);
            })
            .leaving((character: CharacterType) => {
                console.log(character.name);

                setCharacters(characters.filter((p) => p.id !== character.id));
            });

        return () => {
            window.Echo.leave(`game`);
        };
    }, []);

    return (
        <main className="absolute w-full h-full p-0 m-0 bg-black isolate overscroll-none">
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
                            >
                                {balls.map(({ position }, i) => (
                                    <SphereCollider
                                        key={i}
                                        id={i}
                                        radius={radius}
                                        octree={octree}
                                        position={position}
                                        colliders={colliders.current}
                                    >
                                        <Ball radius={radius} />
                                    </SphereCollider>
                                ))}
                            </mesh>
                        </group>
                        <Character
                            octree={octree}
                            colliders={colliders.current}
                        />

                        {characters.map((character) => (
                            <mesh
                                key={`character-${character.id}`}
                                position={new Vector3(character.position[0], character.position[1], character.position[2])}
                                rotation={new Euler(character.rotation[0], character.rotation[1], character.rotation[2])}
                                geometry={new BoxGeometry()}
                                material={new MeshNormalMaterial()}
                            >
                                <Text
                                    position={[0, 1.0, 0]}
                                    color="black"
                                    anchorX="center"
                                    anchorY="middle"
                                >
                                    {character.name}
                                </Text>
                            </mesh>
                        ))}
                        <PointerLockControls />
                    </PerformanceMonitor>
                </Canvas>
            </Suspense>
        </main>
    );
}
