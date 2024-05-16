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
        this.score = 0;
        this.score_win = 10;
        this.game_over = false;
        this.debug = false;
        this.enemies = [];
        this.enemy_count = 25;
        this.enemy_timer = 0;
        this.enemy_interval = 1000;
        this.lives = 3;
        this.lives_max = 5;
        this.messages = [];

        this.mouse = new Mouse(undefined, undefined);

        this.setEnemyPool();
        this.start();

        addEventListener("keyup", (event) =>
        {
            if (event.key === "R")
            {
                this.start();
            }
            else if (event.key === "F")
            {
                this.toggleFullscreen();
            }
        });

        addEventListener("resize", (event) =>
        {
            this.resize(event.target.innerWidth, event.target.innerHeight);
        });

        addEventListener("mousedown", (event) =>
        {
            this.mouse.x = event.x;
            this.mouse.y = event.y;
            this.mouse.pressed = true;
            this.mouse.fired = false;
        });

        addEventListener("mouseup", (event) =>
        {
            this.mouse.x = event.x;
            this.mouse.y = event.y;
            this.mouse.pressed = false;
        });

        addEventListener("touchstart", (event) =>
        {
            this.mouse.x = event.changedTouches[0].pageX;
            this.mouse.y = event.changedTouches[0].pageY;
            this.mouse.pressed = true;
            this.mouse.fired = false;
        });

        addEventListener("touchend", (event) =>
        {
            this.mouse.x = event.changedTouches[0].pageX;
            this.mouse.y = event.changedTouches[0].pageY;
            this.mouse.pressed = false;
        });

        this.button_reset = document.getElementById("reset");
        this.button_reset.addEventListener("click", (event) =>
        {
            this.start();
        });

        this.button_full = document.getElementById("full_screen");
        this.button_full.addEventListener("click", (event) =>
        {
            this.toggleFullscreen();
        });
    }

    draw()
    {
        this.enemies.forEach((enemy) =>
        {
            enemy.draw();
        });

        this.setGameText();
    }

    update(delta_time)
    {
        this.enemies.forEach((enemy) =>
        {
            enemy.update();
        });

        this.enemy_timer += delta_time;

        if (this.enemy_timer > this.enemy_interval && this.game_over === false)
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
        this.score = 0;
        this.lives = 3;
        this.game_over = false;

        this.messages = [];

        this.resize(innerWidth, innerHeight);

        this.enemies.forEach((enemy) =>
        {
            enemy.sleep();
        });
    }

    resize(width, height)
    {
        this.screen.width = width;
        this.screen.height = height;
        this.width = width;
        this.height = height;

        this.context.fillStyle = "#ffffff";
        this.context.strokeStyle = "#ffffff";
        this.context.font = "30px space shards";
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
    }

    setGameOver()
    {
        if (this.game_over === false)
        {
            this.game_over = true;

            if (this.lives < 1)
            {
                this.messages = ["You failed!", "The crew was eaten."];
            }
            else if (this.score >= this.score_win)
            {
                this.messages = ["Well Done!", "The crew has survived."];
            }
            this.messages.push("Press R To Restart");
        }
    }

    toggleFullscreen()
    {
        if (!document.fullscreenElement)
        {
            document.documentElement.requestFullscreen();
        }
        else if (document.exitFullscreen)
        {
            document.exitFullscreen();
        }
    }

    setState(state)
    {
        
    }

    setGameText(context)
    {
        this.context.save();
        this.context.textAlign = "left";
        this.context.fillText(`Score  ${this.score}`, 10, 30);
        this.context.fillText("Lives", 10, 65);

        for (let index = 0; index < this.lives_max; index++)
        {
            this.context.strokeRect(90 + 15 * index, 55, 10, 15);
        }

        for (let index = 0; index < this.lives; index++)
        {
            this.context.fillRect(90 + 15 * index, 55, 10, 15);
        }

        if (this.lives < 1 || this.score >= this.score_win)
        {
            this.setGameOver();
        }

        if (this.game_over === true)
        {
            this.context.textAlign = "center";
            this.context.shadowOffsetX = 3;
            this.context.shadowOffsetY = 3;
            this.context.shadowColor = "#000000";

            this.context.fillText(this.messages[0], this.width * 0.5, this.height * 0.5 + 40);
            this.context.fillText(this.messages[1], this.width * 0.5, this.height * 0.5 + 70);
            this.context.fillText(this.messages[2], this.width * 0.5, this.height * 0.5 + 130);

            this.context.fillStyle = "#ff0000";
            this.context.font = "60px space shards";

            this.context.fillText("Game Over!", this.width * 0.5, this.height * 0.5 - 40);
        }
        this.context.restore();
    }

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