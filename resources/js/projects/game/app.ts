import {
    ACESFilmicToneMapping,
    AmbientLight,
    BackSide,
    Clock,
    DirectionalLight,
    FogExp2,
    HemisphereLight,
    IcosahedronGeometry,
    Mesh,
    MeshLambertMaterial,
    PerspectiveCamera,
    Scene,
    ShaderMaterial,
    Sphere,
    SphereGeometry,
    Texture,
    Vector3,
    VSMShadowMap,
    WebGLRenderer
} from "three";
import {useShaders} from "./shaders";
import Entity from "./entity";
import {Octree} from 'three/addons/math/Octree.js';
import {OctreeHelper} from 'three/addons/helpers/OctreeHelper.js';
import GLTFLoader from "./loaders/GLTFLoader";
import {updateCollisions} from "./collision";

export type Emit = (event: { name: string, payload: any }) => void;

export const useApp = (width: number, height: number, emit: Emit) => {
    const scene = new Scene();

    const fov = 60;
    const aspect = width / height;
    const near = 0.1;
    const far = 1000.0;

    let deltaTime = 0;
    let mouseTime = 0;

    const clock = new Clock();

    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(20, 5, 15);
    scene.add(camera);

    const player = new Entity(camera, emit);

    const GRAVITY = 30;

    const NUM_SPHERES = 100;
    const SPHERE_RADIUS = 0.2;

    const STEPS_PER_FRAME = 1;

    const worldOctree = new Octree();

    GLTFLoader.load('maps/collision-world.glb', (gltf) => {
        scene.add(gltf.scene);

        worldOctree.fromGraphNode(gltf.scene);

        gltf.scene.traverse(child => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                if (child.material.map) {
                    child.material.map.anisotropy = 4;
                }
            }
        });

        const helper = new OctreeHelper(worldOctree);
        helper.visible = false;
        scene.add(helper);

        // level1(
        //     renderer.capabilities.getMaxAnisotropy(),
        //     scene
        // );
    });

    const sphereGeometry = new IcosahedronGeometry(SPHERE_RADIUS, 5);
    const sphereMaterial = new MeshLambertMaterial({color: 0xdede8d});

    const spheres = [];
    let sphereIdx = 0;

    for (let i = 0; i < NUM_SPHERES; i++) {

        const sphere = new Mesh(sphereGeometry, sphereMaterial);
        sphere.castShadow = true;
        sphere.receiveShadow = true;

        scene.add(sphere);

        spheres.push({
            mesh: sphere,
            collider: new Sphere(new Vector3(0, -100, 0), SPHERE_RADIUS),
            velocity: new Vector3()
        });

    }

    scene.fog = new FogExp2(0xDFE9F3, 0.00005);

    const hemisphere = new HemisphereLight(0x8dc1de, 0x00668d, 1.5);
    hemisphere.position.set(2, 1, 1);
    scene.add(hemisphere);

    const directionalLight = new DirectionalLight(0xffffff, 2.5);
    directionalLight.position.set(-5, 25, -1);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = 0.01;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.right = 30;
    directionalLight.shadow.camera.left = -30;
    directionalLight.shadow.camera.top = 30;
    directionalLight.shadow.camera.bottom = -30;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.radius = 4;
    directionalLight.shadow.bias = -0.00006;
    scene.add(directionalLight);

    const ambiance = new AmbientLight(0xFFFFFF, 0.01);
    scene.add(ambiance);


    const renderer = new WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = VSMShadowMap;
    renderer.toneMapping = ACESFilmicToneMapping;

    const drawBackgroundTextures = async ({background, stars}: { background: Texture, stars: Texture }) => {
        const {skyVertexShader, skyFragmentShader} = await useShaders();

        const skyGeo = new SphereGeometry(1000, 32, 15);
        const skyMat = new ShaderMaterial({
            uniforms: {
                background: {value: background},
                stars: {value: stars},
            },
            vertexShader: skyVertexShader,
            fragmentShader: skyFragmentShader,
            side: BackSide
        });

        const sky = new Mesh(skyGeo, skyMat);
        scene.add(sky);
    };

    const onWindowResize = () => {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    };

    const render = () => {
        deltaTime = Math.min(0.05, clock.getDelta()) / STEPS_PER_FRAME;

        player.update(
            deltaTime,
            GRAVITY,
            worldOctree
        );

        updateCollisions(
            spheres,
            deltaTime,
            worldOctree,
            GRAVITY
        );

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    };

    const mount = (domElement: HTMLElement) => {
        const canvas = renderer.domElement;

        const gl = canvas.getContext("webgl2")!;

        // enable necessary extensions
        gl.getExtension("EXT_color_buffer_float");
        gl.getExtension("EXT_float_blend");

        domElement.appendChild(canvas);

        render();
    };

    const onKeyboardEvent = (evt: KeyboardEvent) => {
        player.controls(evt.code, deltaTime);
    }

    const onMouseMove = (evt: MouseEvent) => {
        player.onMouseMove(evt);
    }

    const onMouseDown = (time: number) => {
        mouseTime = time;
    }

    const onMouseUp = () => {
        const sphere = spheres[sphereIdx];

        player.onMouseUp(
            sphere,
            mouseTime
        );

        sphereIdx = (sphereIdx + 1) % spheres.length;
    }

    return {
        renderer,
        drawBackgroundTextures,
        onWindowResize,
        mount,
        onKeyboardEvent,
        onMouseMove,
        onMouseDown,
        onMouseUp
    };
}
