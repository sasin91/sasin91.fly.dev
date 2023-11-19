import { useThree } from "@react-three/fiber";
import {
    ACESFilmicToneMapping,
    Color,
    Fog,
    Group,
    Object3DEventMap,
    VSMShadowMap,
} from "three";

export default function CustomEnvironment({
    scene,
}: {
    scene: Group<Object3DEventMap>;
}) {
    const threeScene = useThree((state) => state.scene);
    threeScene.background = new Color(0x88ccee);
    threeScene.fog = new Fog(0x88ccee, 0, 50);

    const renderer = useThree((state) => state.gl);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = VSMShadowMap;
    renderer.toneMapping = ACESFilmicToneMapping;

    return <primitive object={scene} />;
}
