import {FileLoader} from "three";
import {loadShaderAsync} from "./loaders/fileLoader";

export const useShaders = async () => {
    const skyVertexShader = await loadShaderAsync('sky.vert');
    const skyFragmentShader = await loadShaderAsync('sky.frag');

    return { skyVertexShader, skyFragmentShader }
}
