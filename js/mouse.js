export default class Mouse
{
    constructor(x, y)
    {
        console.log(`${this.constructor.name} .ctor @ ${new Date().toLocaleString()}`);

        this.width = 1;
        this.height = 1;
        this.x = x;
        this.y = y;
        this.pressed = false;
        this.fired = false;
    }
}