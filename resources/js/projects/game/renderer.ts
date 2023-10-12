import {ACESFilmicToneMapping, VSMShadowMap, WebGLRenderer} from "three";

export const useWebGLRenderer = () => {
    const renderer = new WebGLRenderer({antialias: true});

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = VSMShadowMap;
    renderer.toneMapping = ACESFilmicToneMapping;

    return renderer;
}
