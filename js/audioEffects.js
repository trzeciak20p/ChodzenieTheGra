
class AudioEffects{         // Used to store and play audio effects

    static volume = 50


    constructor(){

        if(AudioEffects.exists){
            return AudioEffects.instance;
        }

        

    }

    static UpdateVolume(value){
        if(value <= 0 && !AudioEffects.volume_control[0].mute){      //mutes if effects weren't already muted
            AudioEffects.volume_control.forEach(player => {
                player.mute = true
                
            });
            return;
        }else if(value > 0 && AudioEffects.volume_control[0].mute){      //unmutes if effecst weren't already unmuted 
            AudioEffects.volume_control.forEach(player => {
                player.mute = false
                
            });
        }
        AudioEffects.muted = false
        AudioEffects.volume = value
        AudioEffects.volume_control.forEach(player => {
            console.log(player.volume.value = (AudioEffects.volume/4) - 12.5 )
            
        });
    }

    static death_bomb = new Tone.Player({
        url: "https://chodzeniethegra.zsti.me/sound/deltarune_explosion.mp3",
        autostart: false,
        mute: false,
    }).toDestination()
    
    static death_box = new Tone.Player({
        url: "https://chodzeniethegra.zsti.me/sound/lego_breaking.mp3",
        autostart: false,
        mute: false,
    }).toDestination()

    
    static volume_control = [AudioEffects.death_bomb, AudioEffects.death_box]

}
