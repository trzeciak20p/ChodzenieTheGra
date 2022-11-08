

const clock = new Tone.Clock(time => {
    if(Game.game_state == true){
        Game.FeedUpdate()
    }  
}, 1);


let kicks = new Tone.Player({
    url: "https://chodzeniethegra.zsti.me/sound/kick.mp3",
    // autostart: true,
}).toDestination()


class SoundClass{

    constructor(){}

    StartNewGame(){
        // kicks.start()
        clock.start();
    }

}

let Sound = new SoundClass()
