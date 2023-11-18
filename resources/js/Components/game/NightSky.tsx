import { GamePageProps } from "@/Pages/Projects/Game";
import { usePage } from "@inertiajs/react";
import { useCubeTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { BackSide, FileLoader, ShaderMaterial, SphereGeometry } from "three";

export function NightSky() {
    const { props } = usePage<GamePageProps>();

    const skyVertexShader = useLoader(
        FileLoader,
        `${props.assets.root}/shaders/sky.vert`
    ) as string;
    const skyFragmentShader = useLoader(
        FileLoader,
        `${props.assets.root}/shaders/sky.frag`
    ) as string;

    const background = useCubeTexture(
        [
            "Cold_Sunset__Cam_2_LeftX.png",
            "Cold_Sunset__Cam_3_Right-X.png",
            "Cold_Sunset__Cam_4_UpY.png",
            "Cold_Sunset__Cam_5_Down-Y.png",
            "Cold_Sunset__Cam_0_FrontZ.png",
            "Cold_Sunset__Cam_1_Back-Z.png",
        ],
        { path: `${props.assets.root}/sky/` }
    );

    const stars = useCubeTexture(
        [
            "space-posx.jpg",
            "space-negx.jpg",
            "space-posy.jpg",
            "space-negy.jpg",
            "space-posz.jpg",
            "space-negz.jpg",
        ],
        { path: `${props.assets.root}/sky/` }
    );

    const skyGeo = new SphereGeometry(1000, 32, 15);
    const skyMat = new ShaderMaterial({
        uniforms: {
            background: {
                value: background,
            },
            stars: {
                value: stars,
            },
        },
        vertexShader: skyVertexShader,
        fragmentShader: skyFragmentShader,
        side: BackSide,
    });

    return <mesh args={[skyGeo, skyMat]} />;
}
