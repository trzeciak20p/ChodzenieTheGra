
let kicks = new Tone.Player({
  url: "https://chodzeniethegra.zsti.me/sound/kick.mp3",
  autostart: true,
}).toDestination();

class SoundClass{

    constructor(){

        this.clock = new Tone.Clock((time) => {
            if(Game.game_state == true) {
                new Objectile(RandomNumber(1, 4))
                

            }

            console.log(time)



        }, 1);


    }

    StartNewGame() {
        this.clock.start();
        
    }


}

let Sound = new SoundClass();
