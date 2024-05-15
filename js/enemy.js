export default class Enemy
{
    constructor(game)
    {
        console.log(`${this.constructor.name} .ctor @ ${new Date().toLocaleString()}`);

        this.game = game;
        this.width = 50;
        this.height = 50;
        this.x = 10; //this.game.width * 0.5 - this.width * 0.5;
        this.y = 10;
        this.speed_x = 0.05;
        this.speed_y = 0.05;
        this.free = true;
    }

    draw()
    {
        this.game.context.fillStyle = "#ff0000";
        this.game.context.fillRect(this.x, this.y, this.width, this.height);
    }

    update()
    {
        this.x += this.speed_x;
        this.y += this.speed_y;

    }

    sleep()
    {
        this.free = true;
    }

    wake(x, y)
    {
        this.free = false;
        this.x = x;
        this.y = y;
        this.speed_x = 0.04;
        this.speed_y = 0.04;
    }
}