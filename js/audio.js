import Sound from "./sound.js";

export class Audio
{
    constructor()
    {
        this.sounds = [];

        this.load();
    }

    load()
    {
        this.sounds.push(new Sound("aud/newgame.mp3"));
        this.sounds.push(new Sound("aud/boom1.mp3"));
        this.sounds.push(new Sound("aud/boom2.mp3"));
        this.sounds.push(new Sound("aud/boom3.mp3"));
        this.sounds.push(new Sound("aud/boom4.mp3"));
        this.sounds.push(new Sound("aud/win.mp3"));
        this.sounds.push(new Sound("aud/lose.mp3"));
        this.sounds.push(new Sound("aud/slide.mp3"));
        this.sounds.push(new Sound("aud/scream.mp3"));
    }

    play(audio)
    {
        this.sounds[audio].play();
    }
}

export const SOUNDS = {
    New : 0,
    Boom1 : 1,
    Boom2 : 2,
    Boom3 : 3,
    Boom4 : 4,
    Win : 5,
    Lose : 6,
    Slide : 7,
    Scream : 8
};

