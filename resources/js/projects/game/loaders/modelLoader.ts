import {RepeatWrapping, TextureLoader} from "three";

const modelLoader = new TextureLoader();
modelLoader.setPath('/storage/projects/game/models/');

export const loadModel = (filename: string, maxAnisotropy: number, repeat: boolean) => {
    const model = modelLoader.load(filename);
    model.anisotropy = maxAnisotropy;
    if (repeat) {
        model.wrapS = RepeatWrapping;
        model.wrapT = RepeatWrapping;
    }

    return model;
};
