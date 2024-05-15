export default class Sound
{
    constructor(path)
    {
        console.log(`Sound .ctor ${new Date().toLocaleString()}`);

        this.path = path
        this.audio = new Audio(path);
        this.audio.autoplay = false;
    }

    play()
    {
        this.audio.currentTime = 0;
        this.audio.play();
    }

    pause()
    {
        this.audio.pause();
    }
}