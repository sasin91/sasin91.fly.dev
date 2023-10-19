import {BoxGeometry, Color, CylinderGeometry, Mesh, Scene, Vector3} from "three";
import {useLoadMaterial} from "../loaders/textureLoader";
import {CSM} from "three/addons/csm/CSM.js";

export const level1 = (maxAnisotrophy: number, csm: CSM, scene: Scene) => {
    const loadMaterial = useLoadMaterial(maxAnisotrophy);

    const checkerboard = loadMaterial('whitesquare.png')
    const vintageTile = loadMaterial(
        'vintage-tile1_albedo.png',
        'vintage-tile1_normal.png',
        'vintage-tile1_roughness.png',
        'vintage-tile1_metallic.png'
    )
    const hexagonPavers = loadMaterial(
        'hexagon-pavers1_albedo.png',
        'hexagon-pavers1_normal.png',
        'hexagon-pavers1_roughness.png',
        'hexagon-pavers1_metallic.png'
    )
    const dampDungeon = loadMaterial(
        'damp-dungeon-floor_albedo.png',
        'damp-dungeon-floor_normal.png',
        'damp-dungeon-floor_roughness.png',
        'damp-dungeon-floor_metallic.png'
    )
    const rockSliced = loadMaterial(
        'rock_sliced_albedo.png',
        'rock_sliced_normal.png',
        'rock_sliced_roughness.png',
        'rock_sliced_metallic.png'
    )
    const filthySpacePanels = loadMaterial(
        'filthy-space-panels_albedo.png',
        'filthy-space-panels_normal.png',
        'filthy-space-panels_roughness.png',
        'filthy-space-panels_metallic.png'
    )
    const paintedWornAsphalt = loadMaterial(
        'painted-worn-asphalt_albedo.png',
        'painted-worn-asphalt_normal.png',
        'painted-worn-asphalt_roughness.png',
        'painted-worn-asphalt_metallic.png'
    )
    const brokenDownConcrete2 = loadMaterial(
        'broken_down_concrete2_albedo.png',
        'broken_down_concrete2_normal.png',
        'broken_down_concrete2_roughness.png',
        'broken_down_concrete2_metallic.png'
    )
    const stucco1 = loadMaterial(
        'stucco1_albedo.png',
        'stucco1_normal.png',
        'stucco1_roughness.png',
        'stucco1_metallic.png'
    )

    csm.setupMaterial(checkerboard);
    csm.setupMaterial(vintageTile);
    csm.setupMaterial(hexagonPavers);
    csm.setupMaterial(dampDungeon);
    csm.setupMaterial(rockSliced);
    csm.setupMaterial(filthySpacePanels);
    csm.setupMaterial(paintedWornAsphalt);
    csm.setupMaterial(brokenDownConcrete2);
    csm.setupMaterial(stucco1);

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

    const column = new Mesh(
        new CylinderGeometry(0.5, 0.5, 1, 8, 1),
        hexagonPavers
    );
    column.castShadow = true;
    column.receiveShadow = true;

    // VIDEO HACK
    // const models = [
    //     ['anubis', 10, [-1, -1]],
    //     ['robot', 1, [-1, 1]],
    //     ['buddha', 10, [1, -1]],
    //     ['skull', 10, [1, 1]]
    // ];
    //
    // const anubis =
    //
    // for (let i = 0; i < models.length; ++i) {
    //     const pos = new Vector3(models[i][2][0] * 50, 0, models[i][2][1] * 50);
    //     {
    //         const e = new entity.Entity();
    //         e.AddComponent(new render_component.RenderComponent({
    //             scene: this.params_.scene,
    //             resourcePath: 'built-in.',
    //             resourceName: 'box',
    //             scale: new Vector3(20, 30, 20),
    //             emissive: new Color(0x000000),
    //             color: new Color(0x808080),
    //         }));
    //         e.AddComponent(new basic_rigid_body.BasicRigidBody({
    //             // scene: this.params_.scene,
    //             box: new Vector3(20, 30, 20),
    //         }));
    //
    //         this.Manager.Add(e);
    //         e.SetPosition(pos);
    //         e.SetActive(false);
    //     }
    //
    //     const e = new entity.Entity();
    //     e.AddComponent(new render_component.RenderComponent({
    //         scene: this.params_.scene,
    //         resourcePath: './resources/models/' + models[i][0] + '/',
    //         resourceName: 'scene.glb',
    //         scale: new Vector3(models[i][1], models[i][1], models[i][1]),
    //         emissive: new Color(0x000000),
    //         color: new Color(0xFFFFFF),
    //     }));
    //
    //     this.Manager.Add(e);
    //     e.SetPosition(new Vector3(pos.x, pos.y + 15, pos.z));
    //     e.SetActive(false);
    // }
    //
    // for (let x = -2; x <= 2; ++x) {
    //     for (let y = -2; y <= 2; ++y) {
    //         const e = new entity.Entity();
    //         e.AddComponent(new render_component.RenderComponent({
    //             scene: this.params_.scene,
    //             resourcePath: 'built-in.',
    //             resourceName: 'ground',
    //             scale: new Vector3(50, 20, 50),
    //             emissive: new Color(0x000000),
    //             color: new Color(0xFFFFFF),
    //         }));
    //         e.AddComponent(new basic_rigid_body.BasicRigidBody({
    //             // scene: this.params_.scene,
    //             box: new Vector3(50, 20, 50)
    //         }));
    //
    //         this.Manager.Add(e);
    //         e.SetPosition(new Vector3(x * 50, math.rand_range(-30.0, -10.0), y * 50));
    //         e.SetActive(false);
    //     }
    // }
    // for (let i = -3; i <= 3; ++i) {
    //     for (let j = -3; j <= 3; ++j) {
    //         if (i == 0 && j == 0) {
    //             continue;
    //         }
    //         const e = new entity.Entity();
    //         e.AddComponent(new render_component.RenderComponent({
    //             scene: this.params_.scene,
    //             resourcePath: 'built-in.',
    //             resourceName: 'box',
    //             scale: new Vector3(8, 10, 8),
    //             emissive: new Color(0x000000),
    //             color: new Color(0xFFFFFF),
    //         }));
    //         e.AddComponent(new basic_rigid_body.BasicRigidBody({
    //             // scene: this.params_.scene,
    //             box: new Vector3(8, 10, 8),
    //         }));
    //
    //         this.Manager.Add(e, 'box.' + i + '.' + j);
    //         e.SetPosition(new Vector3(i * 20, 1, j * 20));
    //         e.SetActive(false);
    //     }
    // }
    //
    // this.FindEntity('spawners').GetComponent('TargetSpawner').Spawn({
    //     scene: this.params_.scene,
    //     position: new Vector3(0, 2, 5)
    // });
}
