import {CubeTextureLoader} from "three";

export const useBackgroundTextures = () => {
    const loader = new CubeTextureLoader();
    loader.setPath('/storage/projects/game/');

    const background = loader.load([
        'sky/Cold_Sunset__Cam_2_Left+X.png',
        'sky/Cold_Sunset__Cam_3_Right-X.png',
        'sky/Cold_Sunset__Cam_4_Up+Y.png',
        'sky/Cold_Sunset__Cam_5_Down-Y.png',
        'sky/Cold_Sunset__Cam_0_Front+Z.png',
        'sky/Cold_Sunset__Cam_1_Back-Z.png',
    ]);

    const stars = loader.load([
        'sky/space-posx.jpg',
        'sky/space-negx.jpg',
        'sky/space-posy.jpg',
        'sky/space-negy.jpg',
        'sky/space-posz.jpg',
        'sky/space-negz.jpg',
    ]);

    return {
        background,
        stars
    };
}
