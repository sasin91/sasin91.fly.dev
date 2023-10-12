import type {MeshSphere} from './types';
import Stats from 'three/addons/libs/stats.module.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {Octree} from 'three/addons/math/Octree.js';
import {OctreeHelper} from 'three/addons/helpers/OctreeHelper.js';
import {Capsule} from 'three/addons/math/Capsule.js';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';
import {useWebGLRenderer} from "./renderer";
import {
    Clock,
    Color,
    CubeCamera,
    DirectionalLight,
    Fog,
    HemisphereLight,
    IcosahedronGeometry,
    Mesh,
    MeshBasicMaterial,
    MeshLambertMaterial,
    Object3D,
    PerspectiveCamera,
    Scene,
    Sphere,
    Vector3,
    WebGLCubeRenderTarget
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {CCDIKHelper, CCDIKSolver} from "three/examples/jsm/animation/CCDIKSolver";
import {TransformControls} from "three/examples/jsm/controls/TransformControls";
import * as draco3d from 'draco3d';

const clock = new Clock();

const scene = new Scene();
scene.background = new Color(0x88ccee);
scene.fog = new Fog(0x88ccee, 0, 50);

const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.rotation.order = 'YXZ';

const fillLight1 = new HemisphereLight(0x8dc1de, 0x00668d, 1.5);
fillLight1.position.set(2, 1, 1);
scene.add(fillLight1);

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

const container = document.getElementById('container');

const renderer = useWebGLRenderer();
container!.appendChild(renderer.domElement);

const stats = new Stats();
stats.dom.style.position = 'absolute';
stats.dom.style.top = '0px';
container!.appendChild(stats.dom);

const orbitControls = new OrbitControls( camera, renderer.domElement );
orbitControls.minDistance = 0.2;
orbitControls.maxDistance = 1.5;
orbitControls.enableDamping = true;

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/storage/projects/game/draco/');
const loader = new GLTFLoader();
loader.setPath('/storage/projects/game/models/gltf/');
loader.setDRACOLoader( dracoLoader );

const OOI = {
    head: new Object3D(),
    lowerarm_l: new Object3D(),
    Upperarm_l: new Object3D(),
    hand_l: new Object3D(),
    target_hand_l: new Object3D(),
    sphere: new Object3D(),
    kira: new Object3D()
};

const iks = [
    {
        target: 22, // "target_hand_l"
        effector: 6, // "hand_l"
        links: [
            {
                index: 5, // "lowerarm_l"
                rotationMin: new Vector3( 1.2, - 1.8, - .4 ),
                rotationMax: new Vector3( 1.7, - 1.1, .3 )
            },
            {
                index: 4, // "Upperarm_l"
                rotationMin: new Vector3( 0.1, - 0.7, - 1.8 ),
                rotationMax: new Vector3( 1.1, 0, - 1.4 )
            },
        ],
    }
];

const gui = new GUI();
const conf = {
    followSphere: false,
    turnHead: true,
    ik_solver: true,
};
gui.add( conf, 'followSphere' ).name( 'follow sphere' );
gui.add( conf, 'turnHead' ).name( 'turn head' );
gui.add( conf, 'ik_solver' ).name( 'IK auto update' );
gui.open();

let IKSolver;

const kira = await loader.loadAsync('kira.glb');

orbitControls.target.copy( OOI.sphere.position ); // orbit controls lookAt the sphere
OOI.hand_l.attach( OOI.sphere );
const cubeRenderTarget = new WebGLCubeRenderTarget( 1024 );
const mirrorSphereCamera = new CubeCamera( 0.05, 50, cubeRenderTarget );
scene.add( mirrorSphereCamera );
const mirrorSphereMaterial = new MeshBasicMaterial( { envMap: cubeRenderTarget.texture } );
OOI.sphere.material = mirrorSphereMaterial;

const transformControls = new TransformControls( camera, renderer.domElement );
transformControls.size = 0.75;
transformControls.showX = false;
transformControls.space = 'world';
transformControls.attach( OOI.target_hand_l );
scene.add( transformControls );

transformControls.addEventListener( 'mouseDown', () => orbitControls.enabled = false );
transformControls.addEventListener( 'mouseUp', () => orbitControls.enabled = true );

const GRAVITY = 30;

const NUM_SPHERES = 100;
const SPHERE_RADIUS = 0.2;

const STEPS_PER_FRAME = 5;

const sphereGeometry = new IcosahedronGeometry(SPHERE_RADIUS, 5);
const sphereMaterial = new MeshLambertMaterial({color: 0xdede8d});

const spheres: MeshSphere[] = [];
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

const worldOctree = new Octree();

const playerCollider = new Capsule(new Vector3(0, 0.35, 0), new Vector3(0, 1, 0), 0.35);

const v0 = new Vector3();
const playerVelocity = new Vector3();
const playerDirection = new Vector3();

let playerOnFloor = false;
let mouseTime = 0;

const keyStates: Record<string, boolean> = {};

const vector1 = new Vector3();
const vector2 = new Vector3();
const vector3 = new Vector3();

document.addEventListener('keydown', (event) => {

    keyStates[event.code] = true;

});

document.addEventListener('keyup', (event) => {

    keyStates[event.code] = false;

});

container!.addEventListener('mousedown', () => {

    document.body.requestPointerLock();

    mouseTime = performance.now();

});

document.addEventListener('mouseup', () => {

    if (document.pointerLockElement !== null) throwBall();

});

document.body.addEventListener('mousemove', (event) => {

    if (document.pointerLockElement === document.body) {

        camera.rotation.y -= event.movementX / 500;
        camera.rotation.x -= event.movementY / 500;

    }

});

window.addEventListener('resize', onWindowResize);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function throwBall() {

    const sphere = spheres[sphereIdx];

    camera.getWorldDirection(playerDirection);

    sphere.collider.center.copy(playerCollider.end).addScaledVector(playerDirection, playerCollider.radius * 1.5);

    // throw the ball with more force if we hold the button longer, and if we move forward

    const impulse = 15 + 30 * (1 - Math.exp((mouseTime - performance.now()) * 0.001));

    sphere.velocity.copy(playerDirection).multiplyScalar(impulse);
    sphere.velocity.addScaledVector(playerVelocity, 2);

    sphereIdx = (sphereIdx + 1) % spheres.length;

}

function playerCollisions() {

    const result = worldOctree.capsuleIntersect(playerCollider);

    playerOnFloor = false;

    if (result) {

        playerOnFloor = result.normal.y > 0;

        if (!playerOnFloor) {

            playerVelocity.addScaledVector(result.normal, -result.normal.dot(playerVelocity));

        }

        playerCollider.translate(result.normal.multiplyScalar(result.depth));

    }

}

function updatePlayer(deltaTime: number) {

    let damping = Math.exp(-4 * deltaTime) - 1;

    if (!playerOnFloor) {

        playerVelocity.y -= GRAVITY * deltaTime;

        // small air resistance
        damping *= 0.1;

    }

    playerVelocity.addScaledVector(playerVelocity, damping);

    const deltaPosition = playerVelocity.clone().multiplyScalar(deltaTime);
    playerCollider.translate(deltaPosition);

    playerCollisions();

    camera.position.copy(playerCollider.end);

}

function playerSphereCollision(sphere: typeof spheres[number]) {

    const center = vector1.addVectors(playerCollider.start, playerCollider.end).multiplyScalar(0.5);

    const sphere_center = sphere.collider.center;

    const r = playerCollider.radius + sphere.collider.radius;
    const r2 = r * r;

    // approximation: player = 3 spheres

    for (const point of [playerCollider.start, playerCollider.end, center]) {

        const d2 = point.distanceToSquared(sphere_center);

        if (d2 < r2) {

            const normal = vector1.subVectors(point, sphere_center).normalize();
            const v1 = vector2.copy(normal).multiplyScalar(normal.dot(playerVelocity));
            const v2 = vector3.copy(normal).multiplyScalar(normal.dot(sphere.velocity));

            playerVelocity.add(v2).sub(v1);
            sphere.velocity.add(v1).sub(v2);

            const d = (r - Math.sqrt(d2)) / 2;
            sphere_center.addScaledVector(normal, -d);

        }

    }

}

function spheresCollisions() {

    for (let i = 0, length = spheres.length; i < length; i++) {

        const s1 = spheres[i];

        for (let j = i + 1; j < length; j++) {

            const s2 = spheres[j];

            const d2 = s1.collider.center.distanceToSquared(s2.collider.center);
            const r = s1.collider.radius + s2.collider.radius;
            const r2 = r * r;

            if (d2 < r2) {

                const normal = vector1.subVectors(s1.collider.center, s2.collider.center).normalize();
                const v1 = vector2.copy(normal).multiplyScalar(normal.dot(s1.velocity));
                const v2 = vector3.copy(normal).multiplyScalar(normal.dot(s2.velocity));

                s1.velocity.add(v2).sub(v1);
                s2.velocity.add(v1).sub(v2);

                const d = (r - Math.sqrt(d2)) / 2;

                s1.collider.center.addScaledVector(normal, d);
                s2.collider.center.addScaledVector(normal, -d);

            }

        }

    }

}

function updateSpheres(deltaTime: number) {

    spheres.forEach(sphere => {

        sphere.collider.center.addScaledVector(sphere.velocity, deltaTime);

        const result = worldOctree.sphereIntersect(sphere.collider);

        if (result) {

            sphere.velocity.addScaledVector(result.normal, -result.normal.dot(sphere.velocity) * 1.5);
            sphere.collider.center.add(result.normal.multiplyScalar(result.depth));

        } else {

            sphere.velocity.y -= GRAVITY * deltaTime;

        }

        const damping = Math.exp(-1.5 * deltaTime) - 1;
        sphere.velocity.addScaledVector(sphere.velocity, damping);

        playerSphereCollision(sphere);

    });

    spheresCollisions();

    for (const sphere of spheres) {

        sphere.mesh.position.copy(sphere.collider.center);

    }

}

function getForwardVector() {

    camera.getWorldDirection(playerDirection);
    playerDirection.y = 0;
    playerDirection.normalize();

    return playerDirection;

}

function getSideVector() {

    camera.getWorldDirection(playerDirection);
    playerDirection.y = 0;
    playerDirection.normalize();
    playerDirection.cross(camera.up);

    return playerDirection;

}

function controls(deltaTime: number) {

    // gives a bit of air control
    const speedDelta = deltaTime * (playerOnFloor ? 25 : 8);

    if (keyStates['KeyW']) {

        playerVelocity.add(getForwardVector().multiplyScalar(speedDelta));

    }

    if (keyStates['KeyS']) {

        playerVelocity.add(getForwardVector().multiplyScalar(-speedDelta));

    }

    if (keyStates['KeyA']) {

        playerVelocity.add(getSideVector().multiplyScalar(-speedDelta));

    }

    if (keyStates['KeyD']) {

        playerVelocity.add(getSideVector().multiplyScalar(speedDelta));

    }

    if (playerOnFloor) {

        if (keyStates['Space']) {

            playerVelocity.y = 15;

        }

    }

}

loader.load('collision-world.glb', (gltf) => {

    scene.add(gltf.scene);

    worldOctree.fromGraphNode(gltf.scene);

    gltf.scene.traverse(object3d => {
        if (object3d.isMesh) {
            object3d.castShadow = true;
            object3d.receiveShadow = true;

            if (object3d.material.map) {
                object3d.material.map.anisotropy = 4;
            }
        }

        switch (object3d.name) {
            case 'Kira_Shirt_left':
                OOI['kira'] = object3d;
                OOI.kira.add( OOI.kira.skeleton.bones[ 0 ] );
                IKSolver = new CCDIKSolver( OOI.kira, iks );
                const ccdikhelper = new CCDIKHelper( OOI.kira, iks, 0.01 );
                scene.add( ccdikhelper );
                break;

            case 'boule':
                OOI['sphere'] = object3d;
                break;

            default:
                OOI[object3d.name] = object3d;
        }
    });

    const helper = new OctreeHelper(worldOctree);
    helper.visible = false;
    scene.add(helper);

    gui.add({debug: false}, 'debug')
        .onChange(function (value) {
            helper.visible = value;
        });

    animate();

});

function teleportPlayerIfOob() {

    if (camera.position.y <= -25) {

        playerCollider.start.set(0, 0.35, 0);
        playerCollider.end.set(0, 1, 0);
        playerCollider.radius = 0.35;
        camera.position.copy(playerCollider.end);
        camera.rotation.set(0, 0, 0);

    }

}


function animate() {

    const deltaTime = Math.min(0.05, clock.getDelta()) / STEPS_PER_FRAME;

    // we look for collisions in substeps to mitigate the risk of
    // an object traversing another too quickly for detection.

    for (let i = 0; i < STEPS_PER_FRAME; i++) {

        controls(deltaTime);

        updatePlayer(deltaTime);

        updateSpheres(deltaTime);

        teleportPlayerIfOob();

    }

    if ( OOI.sphere && mirrorSphereCamera ) {

        OOI.sphere.visible = false;
        OOI.sphere.getWorldPosition( mirrorSphereCamera.position );
        mirrorSphereCamera.update( renderer, scene );
        OOI.sphere.visible = true;

    }

    if ( OOI.sphere && conf.followSphere ) {

        // orbitControls follows the sphere
        OOI.sphere.getWorldPosition( v0 );
        orbitControls.target.lerp( v0, 0.1 );

    }

    if ( OOI.head && OOI.sphere && conf.turnHead ) {

        // turn head
        OOI.sphere.getWorldPosition( v0 );
        OOI.head.lookAt( v0 );
        OOI.head.rotation.set( OOI.head.rotation.x, OOI.head.rotation.y + Math.PI, OOI.head.rotation.z );

    }

    IKSolver.update();

    scene.traverse( function ( object ) {
        if ( object.isSkinnedMesh ) object.computeBoundingSphere();
    } );

    orbitControls.update();
    renderer.render( scene, camera );

    renderer.render(scene, camera);

    stats.update();

    requestAnimationFrame(animate);

}
