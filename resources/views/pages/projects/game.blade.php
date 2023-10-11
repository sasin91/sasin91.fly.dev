<x-projects-layout>
    <article id="game-container" class="h-screen w-full">
        <canvas id="game"></canvas>
    </article>

    <script defer type="application/javascript">
        /**
         * @type {HTMLCanvasElement}
         */
        const canvas = document.getElementById('game');
        const context = canvas.getContext('2d');
        const devicePixelRatio = window.devicePixelRatio || 1;
        const gameContainer = document.getElementById('game-container');

        const gridMultiplier = 16;
        let fps = ((canvas.clientWidth * canvas.clientHeight) / gridMultiplier);
        let canvasMultiplier = 3;
        const canvasOffset = {
            x: 0,
            y: 0
        };

        const player = {
            imgSrc: '{{ Storage::url('game/sprites/characters/player.png') }}',
            x: (canvasMultiplier * 10),
            y: (canvasMultiplier * 24)
        };
        const playerImage = new Image();
        playerImage.src = player.imgSrc;

        const grassSprite = new Image();
        grassSprite.src = '{{ Storage::url('game/sprites/tilesets/grass.png') }}';

        let lastRenderTime = Date.now();
        let fpsInterval = (1000 / fps);

        function scaleCanvas() {
            canvas.width = gameContainer.clientWidth * devicePixelRatio;
            canvas.height = gameContainer.clientHeight * devicePixelRatio;

            canvas.style.width = `${gameContainer.clientWidth}px`;
            canvas.style.height = `${gameContainer.clientHeight}px`;

            context.imageSmoothingEnabled = false;

            switch (true) {
                case gameContainer.clientWidth < 754:
                    canvasMultiplier = 4;
                    canvasOffset.x = 9;
                    canvasOffset.y = 6;
                    break;

                case gameContainer.clientWidth < 960:
                    canvasMultiplier = 3;
                    canvasOffset.x = 9;
                    canvasOffset.y = 6;
                    break;
                case gameContainer.clientWidth < 1054:
                    canvasOffset.x = 11;
                    canvasOffset.y = 6;
                    canvasMultiplier = 3;
                    break;
            }

            context.scale(
                devicePixelRatio * canvasMultiplier,
                devicePixelRatio * canvasMultiplier
            );
        }

        function draw(cb) {
            // cb: 3757
            // fps: 2812.5
            // fps/100: 28.125
            // fps/10: 281.25
            // fpsInterval: 0.35555555555555557
            // console.log(cb, fps, fps/100, fpsInterval);
            const now = Date.now();

            if ((now - lastRenderTime) >= fpsInterval) {
                const tiles = (gridMultiplier * canvasMultiplier);
                const x = ((canvasMultiplier * canvasOffset.x));
                const y = ((canvasMultiplier * canvasOffset.y));

                for (let i = 0; i < tiles; i++) {
                    context.drawImage(
                        grassSprite,
                        x ,
                        y ,
                        tiles * i,
                        tiles * i
                    );
                }

                context.drawImage(
                    playerImage,
                    player.x,
                    player.y
                );

                lastRenderTime = now;
            }

            requestAnimationFrame(draw);
        }

        window.addEventListener('resize', scaleCanvas);

        document.addEventListener('DOMContentLoaded', function () {
            scaleCanvas();

            draw();
        });
    </script>
</x-projects-layout>
