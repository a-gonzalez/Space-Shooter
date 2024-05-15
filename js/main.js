import Game from "./game.js";

addEventListener("load", () =>
{
    console.log(`Main @ ${new Date().toLocaleString()}`);

    const screen = document.getElementById("screen");
    screen.width = innerWidth;
    screen.height = innerHeight;

    const context = screen.getContext("2d");
    //context.fillStyle = "#ffffff";
    //context.strokeStyle = "#ffffff";
    context.lineWidth = 2;
    context.font = "25px comic sans ms";

    const game = new Game(screen, context);
    
    let previous_stamp = 0;

    const animate = (time_stamp) =>
    {// delta-time is the time it takes this device to serve one animation frame
        const delta_time = time_stamp - previous_stamp;
        previous_stamp = time_stamp; // approximately 60 fps

        context.clearRect(0, 0, screen.width, screen.height);

        //console.log(delta_time); // 1000 / 60.6 ~ 16.5

        game.update();
        game.draw();

        //if (game.game_over === false)
        //{
            requestAnimationFrame(animate);
        //}
    };

    animate(0);
});