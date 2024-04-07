import Stars from "@/Components/three/Stars";
import { BackgroundBeams } from "@/Components/ui/BackgroundBeams";
import Headline from "@/Components/ui/Headline";
import AppLayout from "@/Layouts/AppLayout";
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
import { Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { PropsWithChildren } from "react";

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
        <AppLayout>
            <main className="px-6 pt-24 mx-auto max-w-7xl lg:px-8">
                <article className="container mx-auto">
                    <AnimatedHeadline>{t("projects.title")}</AnimatedHeadline>

                    <ul className="grid max-w-2xl grid-cols-1 mx-auto gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        <li>
                            <Link href={route("projects.game")} className="mb-2">
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
                                <Headline>
                                    {t("projects.game.title")}
                                </Headline>
                            </Link>
                        </li>
                    </ul>
                </article>

                <BackgroundBeams />
            </main>
        </AppLayout>
    );
}
