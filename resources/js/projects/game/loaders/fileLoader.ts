import {FileLoader} from "three";

const fileLoader = new FileLoader();
fileLoader.setPath('/storage/projects/game/');
const textDecoder = new TextDecoder();

export const loadShaderAsync = async (filename: string) => {
    const shader = await fileLoader.loadAsync(`shaders/${filename}`);

    return (shader instanceof ArrayBuffer)
        ? textDecoder.decode(shader)
        : shader;
}

export default fileLoader;
