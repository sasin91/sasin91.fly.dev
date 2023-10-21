import {BoxGeometry, Color, Mesh, Scene, Vector3} from "three";
import {useLoadMaterial} from "../loaders/textureLoader";

export const level1 = (maxAnisotropy: number, scene: Scene) => {
    const loadMaterial = useLoadMaterial(maxAnisotropy);

    const checkerboard = loadMaterial('textures/whitesquare.png')

    const hexagonPavers = loadMaterial(
        'textures/hexagon-pavers1_albedo.png',
        'textures/hexagon-pavers1_normal.png',
        'textures/hexagon-pavers1_roughness.png',
        'textures/hexagon-pavers1_metallic.png'
    );

    const ground = new Mesh(
        new BoxGeometry(1, 1, 1, 10, 10, 10),
        checkerboard
    );
    ground.castShadow = true;
    ground.receiveShadow = true;
    ground.scale.set(100, 20, 100);
    ground.material.emissive = new Color(0x000000);
    ground.material.color = new Color(0xFFFFFF);
    ground.position.copy(new Vector3(0, -12, 0));

    scene.add(ground);

    const box = new Mesh(
        new BoxGeometry(1, 1, 1, 10, 10, 10),
        checkerboard
    );
    box.castShadow = true;
    box.receiveShadow = true;
    box.scale.set(20, 30, 20);
    box.material.emissive = new Color(0x000000);
    box.material.color = new Color(0x808080);

    scene.add(box);

    const anubis = new Mesh(
        new BoxGeometry(1, 1, 1, 10, 10, 10),
        loadMaterial('models/anubis/scene.glb')
    );
    anubis.position.set(-50, 15, -50);
    anubis.scale.set(20, 30, 20);

    scene.add(anubis);

    const robot = new Mesh(
        new BoxGeometry(1, 1, 1, 10, 10, 10),
        loadMaterial('models/robot/scene.glb')
    );
    robot.position.set(-50, 15, 50);
    robot.scale.set(20, 30, 20);

    scene.add(robot);

    const buddha = new Mesh(
        new BoxGeometry(1, 1, 1, 10, 10, 10),
        loadMaterial('models/buddha/scene.glb')
    );
    buddha.position.set(50, 15, -50);
    buddha.scale.set(20, 30, 20);

    scene.add(buddha);

    const skull = new Mesh(
        new BoxGeometry(1, 1, 1, 10, 10, 10),
        loadMaterial('models/skull/scene.glb')
    );
    skull.position.set(50, 0, 50);
    skull.scale.set(20, 30, 20);

    scene.add(skull);
}
