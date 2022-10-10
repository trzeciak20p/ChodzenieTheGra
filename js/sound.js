
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

try{
let kicks = new Tone.Player({
    url: "https://github.com/trzeciak20p/ChodzenieTheGra/tree/main/sound/kick.mp3",
    autostart: true,
}).toDestination()
}catch{}

class SoundClass{


    constructor(){}

    GameStart(){
        // kicks.start()
        clock.start();

    }


}

let Sound = new SoundClass()



