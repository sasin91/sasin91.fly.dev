import {IcosahedronGeometry, Mesh, MeshLambertMaterial, Sphere, Vector3} from "three";

export type MeshSphere = {
    mesh: Mesh<IcosahedronGeometry, MeshLambertMaterial>,
    collider: Sphere,
    velocity: Vector3
}
