import {useApp} from "./app";
import {useBackgroundTextures} from "./background";

const container = document.getElementById('container');

const app = useApp(
    window.innerWidth,
    window.innerHeight
);

app.drawBackgroundTextures(useBackgroundTextures()).then(r => console.log(r, 'backgrounds loaded.'));

document.addEventListener('DOMContentLoaded', () => {
    app.mount(container!);
});

window.addEventListener('resize', app.onWindowResize, false);
document.addEventListener('keydown', app.onKeyboardEvent);

container!.addEventListener('mousedown', () => {
    document.body.requestPointerLock();

    app.onMouseDown(
        performance.now()
    );
});

document.addEventListener('mouseup', () => {
    app.onMouseUp(
        document.pointerLockElement === null
    );
});

document.body.addEventListener('mousemove', (event) => {
    app.onMouseMove(event);
});
