import {useApp} from "./app";
import {useBackgroundTextures} from "./background";

const container = document.getElementById('container');

document.addEventListener('livewire:initialized', () => {
    Livewire.on('player:forward', (payload) => console.log(payload));

    const app = useApp(
        window.innerWidth,
        window.innerHeight,
        ({name, payload}) => Livewire.dispatch(name, payload)
    );

    app.mount(container!);

    app.drawBackgroundTextures(useBackgroundTextures()).then(r => console.log(r, 'backgrounds loaded.'));

    window.addEventListener('resize', app.onWindowResize, false);
    document.addEventListener('keydown', app.onKeyboardEvent);

    container!.addEventListener('mousedown', () => {
        document.body.requestPointerLock();

        app.onMouseDown(
            performance.now()
        );
    });

    document.addEventListener('mouseup', () => {
        app.onMouseUp();
    });

    document.body.addEventListener('mousemove', (event) => {
        if (document.pointerLockElement === null) {
            return;
        }

        app.onMouseMove(event);
    });
});
