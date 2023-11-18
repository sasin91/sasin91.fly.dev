import ProjectsLayout from "@/Layouts/ProjectLayout";
import { useTranslation } from "@/i18n/client";
import { PageProps } from "@/types";
import cld from "@/utils/cloudinary";
import {
    AdvancedImage,
    lazyload,
    placeholder,
    responsive,
} from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { Link } from "@inertiajs/react";
import { PointMaterial, Points, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { random } from "maath";
import { PropsWithChildren, useRef, useState } from "react";
import type { Points as PointsType } from "three";

function Stars() {
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

function AnimatedHeadline({ children }: PropsWithChildren) {
    return (
        <Canvas camera={{ position: [0, 0, 1] }}>
            <Stars />
            <Text
                color="rgba(79, 70, 229, 1)"
                fillOpacity={100}
                strokeOpacity={80}
            >
                {children}
            </Text>
        </Canvas>
    );
}

export default function ProjectsPage(props: PageProps) {
    const { t } = useTranslation(props?.app?.locale || "da");

    const moonImage = cld.image("jvn6l3zu4hiwzorlcrho");
    moonImage.resize(fill().width(400).height(400));
    moonImage.roundCorners(byRadius(25));

    return (
        <ProjectsLayout>
            <main className="px-6 pt-24 mx-auto max-w-7xl lg:px-8">
                <article className="container mx-auto">
                    <AnimatedHeadline>{t("projects.title")}</AnimatedHeadline>

                    <ul className="grid max-w-2xl grid-cols-1 mx-auto gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        <li>
                            <Link href={route("projects.game")}>
                                <AdvancedImage
                                    className="relative z-10 aspect-[3/2] w-full rounded-2xl object-cover"
                                    cldImg={moonImage}
                                    width={400}
                                    height={400}
                                    alt="random image"
                                    plugins={[
                                        responsive(),
                                        placeholder(),
                                        lazyload(),
                                    ]}
                                />
                                <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                                    {t("projects.game.title")}
                                </h3>
                                <picture className="text-base leading-7 text-gray-600">
                                    ✨
                                </picture>
                            </Link>
                        </li>
                    </ul>
                </article>
            </main>
        </ProjectsLayout>
    );
}
