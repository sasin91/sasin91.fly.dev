import {useApp} from "./app";
import {useBackgroundTextures} from "./background";

const app = useApp(
    window.innerWidth,
    window.innerHeight
);

app.drawBackgroundTextures(useBackgroundTextures()).then(r => console.log(r, 'backgrounds loaded.'));

document.addEventListener('DOMContentLoaded', () => app.mount(
    document.getElementById('container')!
));
window.addEventListener('resize', app.onWindowResize, false);
