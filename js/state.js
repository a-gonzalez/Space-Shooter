class State
{
    constructor(game)
    {
        console.log(`${this.constructor.name} .ctor @ ${new Date().toLocaleString()}`);

        this.game = game;
        this.width = 360;
        this.height = 360;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height * 0.5 - this.height * 0.5;
        this.frame_x = 0;
        this.frame_y = 0;
        this.frame_max = 38;
        this.timer = 0;
        this.interval = 3000;
        this.color = "#000000";

        this.image = new Image();
        this.image.src = "img/locustmorph.png";
    }

    draw(context)
    {
        context.drawImage(this.image, this.frame_x * this.width, this.frame_y * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    update(delta_time)
    {
        ++this.frame_x;

        if (this.frame_x > this.frame_max)
        {
            this.frame_x = 0;
        }
    }
}

export class Idle extends State
{
    constructor(game)
    {
        super(game);
    }

    setState()
    {
        this.frame_y = 0;
    }

    update(delta_time)
    {
        super.update(delta_time);

        if (this.game.keys.has("2"))
        {
            this.game.setState(STATES.Charge)
        }
        else if (this.game.keys.has("3"))
        {
            this.game.setState(STATES.Swarm);
        }
    }
}

export class Charge extends State
{
    constructor(game)
    {
        super(game);
    }

    setState()
    {
        this.frame_y = 1;
        this.timer = 0;
    }

    update(delta_time)
    {
        super.update(delta_time);

        this.timer += delta_time;

        if (this.timer > this.interval)
        {
            this.game.setState(STATES.Swarm);
        }

        if (this.game.keys.has("3"))
        {// swarm
            this.game.setState(STATES.Swarm);
        }
    }
}

export class Swarm extends State
{
    constructor(game)
    {
        super(game);
    }

    setState()
    {
        this.frame_y = 2;
        this.timer = 0;
        this.interval = 5000;
    }

    draw(context)
    {
        super.draw(context);
    }

    update(delta_time)
    {
        super.update(delta_time);

        this.timer += delta_time;

        if (this.timer > this.interval)
        {
            this.game.setState(STATES.Idle);
        }

        if (this.game.keys.has("1"))
        { // idle
            this.game.setState(STATES.Idle)
        }
        else if (this.game.keys.has("2"))
        { // charge
            this.game.setState(STATES.Charge);
        }
    }
}

export const STATES = {
    Idle : 0,
    Charge : 1,
    Swarm : 2
};

