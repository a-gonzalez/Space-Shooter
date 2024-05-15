import Enemy from "./enemy.js";
import Mouse from "./mouse.js";

export default class Game
{
    constructor(screen, context)
    {
        console.log(`${this.constructor.name} .ctor @ ${new Date().toLocaleString()}`);

        this.screen = screen;
        this.context = context;
        this.width = this.screen.width;
        this.height = this.screen.height;
        this.game_over = false;
        this.debug = false;
        this.enemies = [];
        this.enemy_count = 25;
        this.enemy_timer = 0;
        this.enemy_interval = 1000;

        this.mouse = new Mouse(undefined, undefined);

        this.setEnemyPool();
        this.start();

        window.addEventListener("resize", (event) =>
        {
            this.resize(event.target.innerWidth, event.target.innerHeight);
        });

        window.addEventListener("mousedown", (event) =>
        {
            this.mouse.x = event.x;
            this.mouse.y = event.y;
            this.mouse.pressed = true;
            this.mouse.fired = false;
        });

        window.addEventListener("mouseup", (event) =>
        {
            this.mouse.x = event.x;
            this.mouse.y = event.y;
            this.mouse.pressed = false;
        });
    }

    draw()
    {
        this.enemies.forEach((enemy) =>
        {
            enemy.draw();
        });
    }

    update(delta_time)
    {
        this.enemies.forEach((enemy) =>
        {
            enemy.update();
        });

        this.enemy_timer += delta_time;

        if (this.enemy_timer > this.enemy_interval)
        {
            this.enemy_timer = 0;

            const enemy = this.getEnemyFromPool();

            if (enemy)
            {
                enemy.wake();
            }
        }
    }

    start()
    {
        this.resize(innerWidth, innerHeight);
    }

    resize(width, height)
    {
        this.screen.width = width;
        this.screen.height = height;
        this.width = width;
        this.height = height;

        this.context.fillStyle = "#ffffff";
        this.context.strokeStyle = "#ffffff";
        this.context.font = "40px bangers";
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
    }

    setState(state)
    {
        
    }

    /*setGameText(context)
    {
        context.fillText(`Score  ${this.score}`, 10, 30);
        context.fillText("Lives", 10, 65);

        for (let index = 0; index < this.lives_max; index++)
        {
            context.strokeRect(90 + 15 * index, 50, 10, 15);
        }

        for (let index = 0; index < this.lives; index++)
        {
            context.fillRect(90 + 15 * index, 50, 10, 15);
        }

        if (this.game_over === true)
        {
            context.save();
            context.shadowOffsetX = 3;
            context.shadowOffsetY = 3;
            context.shadowColor = "#000000";
            context.textAlign = "center";
            context.font = "80px space shards";
            context.fillStyle = "#ff0000";
            context.fillText("Game Over!", this.width * 0.5, 250);
            
            if (this.score >= this.score_win)
            {
                context.fillStyle = "#ffd700";
                context.font = "35px space shards";
                context.fillText("You Win!", 160, this.height * 0.5);
                context.fillText(`Score ${this.score}`, 600, this.height * 0.5);
            }
            else
            {
                context.font = "35px space shards";
                context.fillText("You Lose!", 160, this.height * 0.5);
                context.fillText("Try Again.", 600, this.height * 0.5);
            }
            //context.fillText("Press R To Restart.", this.width * 0.5, 500);
            context.restore();
        }
    }*/

    setEnemyPool()
    {
        for (let index = 0; index < this.enemy_count; index++)
        {
            this.enemies.push(new Enemy(this));
        }
    }

    getEnemyFromPool()
    {
        for (let index = 0; index < this.enemies.length; index++)
        {
            if (this.enemies[index].free === true)
            {
                return this.enemies[index];
            }
        }
    }

    isCollision(a, b)
    {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.width > b.y
        );
    }
}