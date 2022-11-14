
let kick = new Tone.Player({
  url: "https://chodzeniethegra.zsti.me/sound/kick.mp3",
  autostart: false,
}).toDestination();

Tone.Transport.bpm.ppq = 10

class SoundClass{

    constructor(){

        this.music_volume = 50  
        this.effects_volume = 50
        this.bpm = 60
        this.beat_counter = 0
        this.tick_couter = 0

        // this.clock = new Tone.Clock((time) => {
        //     if(Game.game_state == true) {
        //         if(this.tick_couter == 0){
        //             new Objectile(RandomNumber(1, 4))
        //             this.BeatUpdate()
                   
        //         }
            
        //         this.TicksUpdate()
        //     }


        // }, 60);

        Tone.Transport.bpm.rampTo(this.bpm * 2, 0.1)

        Tone.Transport.scheduleRepeat(time => {
            // osc.start(time).stop(time + 0.1);
            if(this.tick_couter == 0){
                new Objectile(RandomNumber(1, 4))
                this.BeatUpdate()
               
            }


        }, "1n");
    
    }

    StartNewGame() {
        this.bpm = 60
        this.beat_counter = 0
        this.tick_couter = 0

        this.BpmUpdate()


        Tone.Transport.bpm.rampTo(this.bpm * 2, 0.1)
        Tone.Transport.start();
        
    }

    TicksUpdate(){
        this.tick_couter++
        if(this.tick_couter > this.bpm){
            this.tick_couter = 0
        }
    }

    UpdateMusicVolume(x){
        this.music_volume = x
    }

    UpdateEffectsVolume(x){
        this.effects_volume = x
    }

    BeatUpdate(){       //zwiększa bpm
        this.beat_counter += 1
        if(this.beat_counter > 20){     //ilość bitów które muszą przejść
            this.BpmUpdate(5)
            this.beat_counter = 0
            
        }
        Tone.Transport.bpm.rampTo(this.bpm * 2, 0.1)

    }

    BpmUpdate(add){
        if(typeof add !== "undefined"){
            this.bpm += add
        }
        nav[2].innerText = this.bpm;
    }

}

let Sound = new SoundClass();
