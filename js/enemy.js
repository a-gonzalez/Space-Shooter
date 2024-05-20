class Enemy
{
    constructor(game)
    {
        console.log(`${this.constructor.name} .ctor @ ${new Date().toLocaleString()}`);

        this.game = game;
        this.width = 50;
        this.height = 50;
        this.x = 0;
        this.y = 0;
        this.frame_x = 0;
        this.frame_y = 0;
        this.frame_max = 0;
        this.min = 0;
        this.max = 0;
        this.speed_x = 0;
        this.speed_y = 0;
        this.lives = 0;
        this.free = true;
        this.scale = 1; //Math.random() * 0.4 + 0.8;

        this.image = new Image();
    }

    draw()
    {
        if (this.free === false)
        {
            this.game.context.drawImage(this.image, this.width * this.frame_x, this.height * this.frame_y, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
            
            if (this.game.debug === true)
            {
                this.game.context.strokeRect(this.x, this.y, this.width, this.height);
                this.game.context.save();
                this.game.context.fillStyle = "#ffffff";
                this.game.context.font = "30px comic sans ms";
                this.game.context.fillText(this.lives, this.x + this.width * 0.5, this.y + this.height * 0.5);
                this.game.context.restore();
            }
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
            
            if (this.y > this.game.height && this.game.game_over === false)
            {
                --this.game.lives;

                this.sleep();
            }

            if (this.isAlive() === false)
            {
                if (this.game.animation_update === true)
                {
                    ++this.frame_x;

                    if (this.frame_x > this.frame_max)
                    {
                        this.sleep();

                        if (this.game.game_over === false)
                        {
                            ++this.game.score;
                        }
                    }
                }
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
        this.x = Math.random() * this.game.width * 0.9;
        this.y = -this.height;
        this.frame_y = Math.floor(Math.random() * 4);
        this.frame_x = 0;
        this.speed_x = 0;
        this.speed_y = 0.9; //Math.random() * 4 + 1;
    }

    isAlive()
    {
        return this.lives >= 1;
    }

    hit()
    {
        if (this.game.isCollision(this, this.game.mouse) &&
            this.game.mouse.pressed === true &&
            this.game.mouse.fired === false &&
            this.game.game_over === false)
        {
            --this.lives;
            this.game.mouse.fired = true;
        }
    }
}

export class Beetlemorph extends Enemy
{
    constructor(game)
    {
        super(game);

        this.width = 100;
        this.height = 100;
        this.frame_max = 3;

        this.image.src = "img/beetlemorph100x100.png";
    }

    update()
    {
        super.update();

        if (this.free === false)
        {
            if (this.isAlive() === true)
            {
                this.hit();
            }
        }
    }

    wake()
    {
        super.wake();

        this.speed_y = Math.random() * 2 + 0.2;
        this.lives = 1;
    }
}

export class Lobstamorph extends Enemy
{
    constructor(game)
    {
        super(game);

        this.width = 100;
        this.height = 100;
        this.frame_max = 14;

        this.image.src = "img/lobstamorph100x100.png";
    }

    update()
    {
        super.update();

        if (this.free === false)
        {
            if (this.lives >= 3)
            {
                this.max = 0;
            }
            else if (this.lives === 2)
            {
                this.max = 3;
            }
            else if (this.lives === 1)
            {
                this.max = 7;
            }

            if (this.isAlive() === true)
            {
                this.hit();

                if (this.frame_x < this.max && this.game.animation_update === true)
                {
                    ++this.frame_x;
                }
            }
        }
    }

    wake()
    {
        super.wake();

        this.speed_y = Math.random() * 0.5 + 0.2;
        this.lives = 3;
    }
}

export class Phantommorph extends Enemy
{
    constructor(game)
    {
        super(game);

        this.width = 100;
        this.height = 100;
        this.frame_max = 14;

        this.image.src = "img/phantommorph100x100.png";
    }

    update()
    {
        super.update();

        if (this.free === false)
        {
            if (this.x <= 0 || this.x >= this.game.width - this.width)
            {// bounce left or left
                this.speed_x *= -1;
            }

            if (this.isAlive() === true)
            {
                this.hit();

                if (this.game.animation_update === true)
                {
                    if (this.frame_x < this.max)
                    {
                        ++this.frame_x;
                    }
                    else
                    {
                        this.frame_x = this.min;
                    }
                }
            }
        }
    }

    wake()
    {
        super.wake();

        this.speed_x = Math.random() * 2 - 1;
        this.speed_y = Math.random() * 0.5 + 0.2;
        this.lives = 1;
        this.min = 0;
        this.max = 2;
    }
}