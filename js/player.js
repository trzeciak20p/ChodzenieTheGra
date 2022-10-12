
document.addEventListener("keydown", function (event) {              
    if (event.code == "KeyW" || event.code == "ArrowUp") {   //wykrywanie w, s, strzałek, spacji i przypisanie im skoku, kucnięcia          
        event.preventDefault()
        if(Game.game_state){
            Player.Jump()
        }
    }else if(event.code == "KeyS" || event.code == "ArrowDown"){
        event.preventDefault()
        if(Game.game_state){
            Player.Duck()
        }
    }else if(event.code == "Space"){
        event.preventDefault()
        if(Game.game_state == false){
            Game.StartNewGame()
        }
    }
})


class PlayerClass{

    constructor(){
        this.character_url = "graphics/world/characters/char"
        this.character = 0

        this.pos_x = 40
        this.pos_y = canvas.height
        this.walk_frame_size = [20, 12]     //rozmiar klatki w przypadku chodzenia
        this.frame = new Image()
        this.frame_counter = 1
        this.state = "walking"
    }
    


    Jump(){
        console.log("jump")
    }
    
    Duck(){
        console.log("duck")
    
    }
    
    DrawChar(fps){
        this.fps = fps
        switch (this.state) {
            case "walking":
                this.DrawCharWalking()
                break;
        
            default:
                break;
        }


    }

    DrawCharWalking(){

        if(Time.elapsed > 1000 / this.fps ){
        this.frame.src = "graphics/animations/walking.png"      //zmiana klatek na chodzeniowe
        ctx.drawImage(this.frame, this.walk_frame_size[0] * Math.floor(this.frame_counter / 2), 0, this.walk_frame_size[0], this.walk_frame_size[1]  , this.pos_x, canvas.height / 3 * 2, this.walk_frame_size[0] * 5, this.walk_frame_size[1] * 5)         
        //Math.floor (frame / 2) zmniejsza prędkość renderu 2krotnie

        this.frame_counter++
        if(this.frame_counter >= 14){     //zmiana klatek animacji
            this.frame_counter = 0
        }
        }
    }

}


let Player = new PlayerClass()
