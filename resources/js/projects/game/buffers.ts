import type {WebGLRenderTarget} from "three";

export default class Buffers
{
    write;
    read;

    constructor(renderTarget: WebGLRenderTarget) {
        this.write = renderTarget;
        this.read = renderTarget.clone();
    }
}
