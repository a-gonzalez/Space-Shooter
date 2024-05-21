import { SOUNDS } from "./audio.js";

class State
{
    constructor(game, enemy)
    {
        console.log(`${this.constructor.name} .ctor @ ${new Date().toLocaleString()}`);

        this.game = game;
        this.enemy = enemy;
    }

    update(delta_time)
    {

    }
}

export class Flying extends State
{
    setState()
    {
        this.enemy.min = 0;
        this.enemy.max = 2;
        this.enemy.frame_x = this.enemy.min;
    }

    update(delta_time)
    {
        this.enemy.hit();
        this.enemy.handleFrames();
    }
}

export class Phasing extends State
{
    setState()
    {
        this.enemy.min = 3;
        this.enemy.max = 5;
        this.enemy.speed_x = Math.random() * 2 - 1;
        this.enemy.speed_y = Math.random() * 0.5 + 0.2;
        this.enemy.frame_x = this.enemy.min;
    }

    update(delta_time)
    {
        this.enemy.handleFrames();

        if (this.game.isCollision(this.enemy, this.game.mouse) &&
            this.game.mouse.pressed === true)
        {
            this.enemy.y += 30;
            this.enemy.speed_x = 0;
            this.enemy.speed_y = 2;

            this.game.audio.play(SOUNDS.Slide);
        }
    }
}

export class Imploding extends State
{
    setState()
    {
        this.enemy.min = 6;
        this.enemy.max = this.enemy.frame_max + 1;
        this.enemy.frame_x = this.enemy.min;

        this.game.audio.play(Math.floor(Math.random() * 4 + 1));
    }
}

export const STATES = {
    Flying : 0,
    Phasing : 1,
    Imploding : 2
};