export default class Enemy
{
    constructor(game)
    {
        console.log(`${this.constructor.name} .ctor @ ${new Date().toLocaleString()}`);

        this.game = game;
        this.width = 50;
        this.height = 50;
        this.x = 0;
        this.y = 0;
        this.speed_x = 0;
        this.speed_y = Math.random() * 4 + 1;
        this.lives = 0;
        this.free = true;
    }

    draw()
    {
        if (this.free === false)
        {
            this.game.context.strokeRect(this.x, this.y, this.width, this.height);
            this.game.context.fillText(this.lives, this.x + this.width * 0.5, this.y + this.height * 0.5);
        }
    }

    update()
    {
        if (this.free === false)
        {
            if (this.y < 0)
            {// float in until in view
                this.y += 5;
            }

            if (this.x > this.game.width - this.width)
            {// make sure always visible
                this.x = this.game.width - this.width;
            }
            this.x += this.speed_x;
            this.y += this.speed_y;

            if (this.game.isCollision(this, this.game.mouse) &&
            this.game.mouse.pressed === true &&
            this.game.mouse.fired === false)
            {
                --this.lives;
                this.game.mouse.fired = true;
            }

            if (this.isAlive() === false)
            {
                ++this.game.score;

                this.sleep();
            }
            
            if (this.y > this.game.height)
            {
                --this.game.lives;

                this.sleep();
            }
        }
    }

    sleep()
    {
        this.free = true;
    }

    wake()
    {
        this.free = false;
        this.lives = 2;
        this.x = Math.random() * this.game.width;
        this.y = -this.height;
        //this.speed_x = 0.5;
        this.speed_y = 1.5;
    }

    isAlive()
    {
        return this.lives >= 1;
    }
}