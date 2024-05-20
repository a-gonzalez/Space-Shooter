class State
{
    constructor(game)
    {
        console.log(`${this.constructor.name} .ctor @ ${new Date().toLocaleString()}`);

        
    }

    draw(context)
    {
        
    }

    update(delta_time)
    {
        
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
        
    }

    update(delta_time)
    {
        super.update(delta_time);

        
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
        
    }

    update(delta_time)
    {
        super.update(delta_time);

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
        
    }

    draw(context)
    {
        super.draw(context);
    }

    update(delta_time)
    {
        super.update(delta_time);
    }
}

export const STATES = {
    Idle : 0,
    Charge : 1,
    Swarm : 2
};

