<x-projects-layout>
    <article class="container mx-auto">
        <div class="mx-auto max-w-2xl lg:mx-0">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ __('My projects') }}</h2>
            <p class="mt-6 text-lg leading-8 text-gray-600">{{ __('Sometimes a interesting & usually wacky idea crosses my mind, i may make a project out of it') }}</p>
        </div>

        <div id="game-container">
            <canvas id="game"></canvas>
        </div>
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
        let canvasMultiplier = 3;
        let canvasOffset = {
            x: 0,
            y: 0
        };

        const player = {
            imgSrc: '{{ Storage::url('game/sprites/characters/player.png') }}',
            x: (canvasMultiplier * 10),
            y: (canvasMultiplier * 24)
        };

        window.addEventListener('resize', function () {
            canvas.width = gameContainer.clientWidth * devicePixelRatio;
            canvas.height = gameContainer.clientHeight * devicePixelRatio;

            canvas.style.width = `${gameContainer.clientWidth}px`;
            canvas.style.height = `${gameContainer.clientHeight}px`;

            context.imageSmoothingEnabled = false;

            switch(true)
            {
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
        });

        document.addEventListener('DOMContentLoaded', function () {
           const grassSprite = new Image();
           grassSprite.src = '{{ Storage::url('game/sprites/grass.png') }}';

           const gameLoop = () => {
               context.clearRect(0, 0, canvas.width, canvas.height);

               for (let i = 0; i < (gridMultiplier * canvasMultiplier); i++) {
                   context.drawImage(
                       grassSprite,
                       (canvasMultiplier * canvasOffset.x) - player.x,
                       (canvasMultiplier * canvasOffset.y) - player.y
                   );
               }
           }
        });
    </script>
</x-projects-layout>
