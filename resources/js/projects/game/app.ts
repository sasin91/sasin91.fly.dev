import {
    AmbientLight,
    AudioListener,
    BackSide,
    Clock,
    Color,
    DirectionalLight,
    FloatType,
    FogExp2,
    HemisphereLight,
    IcosahedronGeometry,
    IUniform,
    Mesh,
    MeshLambertMaterial,
    NearestFilter,
    OrthographicCamera,
    PCFSoftShadowMap,
    PerspectiveCamera,
    RGBAFormat,
    Scene,
    ShaderChunk,
    ShaderMaterial,
    Sphere,
    SphereGeometry,
    Texture,
    Vector2,
    Vector3,
    WebGLRenderer,
    WebGLRenderTarget
} from "three";
import {CSM} from "three/addons/csm/CSM.js";
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {ShaderPass} from "three/addons/postprocessing/ShaderPass.js";
import {RenderPass} from "three/addons/postprocessing/RenderPass.js";
import {UnrealBloomPass} from "three/addons/postprocessing/UnrealBloomPass.js";
import {LuminosityHighPassShader} from "three/addons/shaders/LuminosityHighPassShader.js";
import {FXAAShader} from "three/addons/shaders/FXAAShader.js";
import {GammaCorrectionShader} from "three/addons/shaders/GammaCorrectionShader.js";
import {useShaders} from "./shaders";
import Buffers from "./buffers";
import {level1} from "./levels/level1";
import Entity from "./entity";
import {Octree} from 'three/addons/math/Octree.js';
import {updateCollisions} from "./collision";

export const useApp = (width: number, height: number) => {
    const events: KeyboardEvent | MouseEvent[] = [];

    const fov = 60;
    const aspect = width / height;
    const near = 0.1;
    const far = 1000.0;

    const clock = new Clock();

    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(20, 5, 15);

    const scene = new Scene();
    scene.add(camera);

    const decalCamera = new PerspectiveCamera(fov, aspect, near, far);
    decalCamera.position.set(20, 5, 15);

    const sceneDecals = new Scene();
    sceneDecals.add(decalCamera);

    const audioListener = new AudioListener();
    camera.add(audioListener);

    const uiCamera = new OrthographicCamera(
        -1, 1, 1, -1, 1, 1000);
    const uiScene = new Scene();

    scene.fog = new FogExp2(0xDFE9F3, 0.00005);
    sceneDecals.fog = new FogExp2(0xDFE9F3, 0.00005);

    const upColour = 0xFFFF80;
    const downColour = 0x808080;
    const hemisphere = new HemisphereLight(upColour, downColour, 0.75);
    hemisphere.color.setHSL(0.6, 1, 0.6);
    hemisphere.groundColor.setHSL(0.095, 1, 0.75);
    hemisphere.position.set(0, 4, 0);
    scene.add(hemisphere);

    const sun = new DirectionalLight(0xf3ebbe, 0.75);
    sun.position.set(-20, 100, 20);
    sun.target.position.set(0, 0, 0);
    sun.intensity = 2.4;
    const sunDirection = sun.position.clone();
    sunDirection.normalize();
    sunDirection.multiplyScalar(-1);
    const sunColor = new Color(0xf3ebbe);

    const ambiance = new AmbientLight(0xFFFFFF, 0.01);
    scene.add(ambiance);

    const csm = new CSM({
        maxFar: camera.far,
        cascades: 4,
        mode: 'logarithmic',
        parent: scene,
        shadowMapSize: 4096,
        lightDirection: sunDirection,
        camera: camera,
        lightNear: 1.0,
        lightFar: 1000.0,
    });
    csm.fade = true;
    for (let i = 0; i < csm.lights.length; ++i) {
        csm.lights[i].color = sunColor;
        csm.lights[i].intensity = 1.5;
    }


    const parameters = {
        minFilter: NearestFilter,
        magFilter: NearestFilter,
        format: RGBAFormat,
        type: FloatType,
    };

    const renderTarget = new WebGLRenderTarget(
        width,
        height,
        parameters
    );

    const buffers = new Buffers(renderTarget);

    ShaderChunk.emissivemap_fragment += '\ndiffuseColor.a = 0.0;';

    const renderer = new WebGLRenderer({
        antialias: false
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const composer = new EffectComposer(renderer);
    composer.setPixelRatio(window.devicePixelRatio);
    composer.setSize(width, height);

    const fxaaPass = new ShaderPass(FXAAShader);

    const uiPass = new RenderPass(uiScene, uiCamera);
    uiPass.clear = false;

    // const motionBlurPass = new MotionBlurPass(scene, camera);
    // motionBlurPass.samples = 32;
    // motionBlurPass.smearIntensity = 0.02;
    // motionBlurPass.interpolateGeometry = true;
    //
    // const gtaoPass = new GTAOPass(scene, camera);

    const bloomPass = new UnrealBloomPass(
        new Vector2(width, height), 1.5, 0.4, 0.85);
    bloomPass.radius = 0.0;

    const uniforms = bloomPass.highPassUniforms as Record<string, IUniform<string>>
    bloomPass.materialHighPassFilter = new ShaderMaterial({
        uniforms,
        vertexShader: LuminosityHighPassShader.vertexShader,
        fragmentShader: LuminosityHighPassShader.fragmentShader,
        defines: {}
    });

    // const radialBlur = new ShaderPass(
    //     new ShaderMaterial({
    //         uniforms: RadialBlurShader.uniforms,
    //         vertexShader: RadialBlurShader.vertexShader,
    //         fragmentShader: RadialBlurShader.fragmentShader
    //     })
    // );

    const opaquePass = new RenderPass(scene, camera);
    opaquePass.clearColor = new Color(0x000000);
    opaquePass.clearAlpha = 0.0;
    const decalPass = new RenderPass(sceneDecals, decalCamera);
    const gammaPass = new ShaderPass(GammaCorrectionShader);
    gammaPass.renderToScreen = true;

    composer.addPass(opaquePass);
    composer.addPass(decalPass);
    // composer_.addPass(motionBlurPass);
    // composer.addPass(gtaoPass);
    composer.addPass(bloomPass);
    composer.addPass(uiPass);
    composer.addPass(gammaPass);
    composer.addPass(fxaaPass);

    const player = new Entity(camera);

    const GRAVITY = 30;

    const NUM_SPHERES = 100;
    const SPHERE_RADIUS = 0.2;

    const STEPS_PER_FRAME = 5;

    const worldOctree = new Octree();
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

    let deltaTime = 0;
    let mouseTime = 0;

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
        composer.setSize(width, height);

        csm.updateFrustums();

        const pixelRatio = renderer.getPixelRatio();
        fxaaPass.material.uniforms['resolution'].value.x = 1 / (width * pixelRatio);
        fxaaPass.material.uniforms['resolution'].value.y = 1 / (height * pixelRatio);
    };

    const render = () => {
        csm.update();

        opaquePass.render(renderer, buffers.write, buffers.read, deltaTime, false);
        bloomPass.render(renderer, buffers.write, buffers.read, deltaTime, false);
        uiPass.render(renderer, buffers.write, buffers.read, deltaTime, false);
        // radialBlur.render(renderer, buffers.write, buffers.read, deltaTime, false);

        // The buffers are intentionally swapped
        // motionBlurPass.render(renderer, buffers.read, buffers.write, deltaTime, false);
        fxaaPass.render(renderer, buffers.read, buffers.write, deltaTime, false);
        gammaPass.render(renderer, buffers.write, buffers.read, deltaTime, false);

        sun.position.copy(camera.position);
        sun.target.position.copy(camera.position);
        sun.position.add(new Vector3(-20, 100, 20));
        sun.updateMatrixWorld();
        sun.target.updateMatrixWorld();


        level1(deltaTime, csm, scene);

        renderer.render(scene, camera);

        requestAnimationFrame(() => {
            deltaTime = Math.min(0.05, clock.getDelta()) / STEPS_PER_FRAME;

            // we look for collisions in substeps to mitigate the risk of
            // an object traversing another too quickly for detection.

            for (let i = 0; i < STEPS_PER_FRAME; i++) {
                // queue events up and run on player here?
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
            }
            render();
        });
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

    const onMouseUp = (locked: boolean) => {
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
