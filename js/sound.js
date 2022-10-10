
document.addEventListener("keydown", function (event) {     //chwilowy input do testowania bo Tone.js kinda weird           
    if (event.code == "Space") {   
        Tone.start()
    }
})


const clock = new Tone.Clock(time => {
    if(Game.game_state == true){
        console.log(time)
    }  
}, 1);

const kicks = new Tone.Player({
    url: "../sound/kick.mp3",
    autostart: true,
});

class SoundClass{


    constructor(){}

    GameStart(){
        kicks.startLoop()
        clock.start();

    }


}

let Sound = new SoundClass()



