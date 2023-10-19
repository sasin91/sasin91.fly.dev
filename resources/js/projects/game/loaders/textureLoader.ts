import {MeshStandardMaterial, RepeatWrapping, TextureLoader} from "three";

const textureLoader = new TextureLoader();
textureLoader.setPath('/storage/projects/game/textures/');

export const loadManyTextures = (filenames: readonly string[], maxAnisotrophy: number) => {
    const files = [];

    for (const filename of filenames)
    {
        files.push(
            loadTexture(filename, maxAnisotrophy)
        );
    }

    return files;
}

export const loadTexture = (filename: string, maxAnisotrophy: number) => {
    const texture = textureLoader.load(filename);
    texture.anisotropy = maxAnisotrophy;
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;

    return texture;
};

export const useLoadMaterial = (maxAnisotrophy: number) => (albedoName?: string, normalName?: string, roughnessName?: string, metalnessName?: string) => {
    const load = (filename?: string) => filename ? loadTexture(filename, maxAnisotrophy) : null;

    const albedo = load(albedoName);
    const metalness = load(metalnessName);
    const normal = load(normalName);
    const roughness = load(roughnessName);

    const material = new MeshStandardMaterial({
        map: albedo,
        color: 0x303030,
        metalnessMap: metalness,
        normalMap: normal,
        roughnessMap: roughness,
    });

//    material.customProgramCacheKey = () => {
//        return albedoName;
//    };

    return material;
}

export default textureLoader;
