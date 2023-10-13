import {FileLoader} from "three";

export const useShaders = async () => {
    const fileLoader = new FileLoader();
    const textDecoder = new TextDecoder();
    let skyVertexShader = await fileLoader.loadAsync('./shaders/sky.vert');
    let skyFragmentShader = await fileLoader.loadAsync('./shaders/sky.frag');
    if (skyVertexShader instanceof ArrayBuffer) {
        skyVertexShader = textDecoder.decode(skyVertexShader);
    }

    if (skyFragmentShader instanceof ArrayBuffer) {
        skyFragmentShader = textDecoder.decode(skyFragmentShader);
    }

    return { skyVertexShader, skyFragmentShader }
}
