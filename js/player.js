
document.addEventListener("keydown", function (event) {              
    if (event.code == "KeyW" || event.code == "ArrowUp") {   //wykrywanie w, s, strzałek, spacji i przypisanie im skoku, kucnięcia          
        event.preventDefault()
        if(Game.game_state && Player.state != "jump"){
            Player.state = "jump"
            Player.frame_counter = 1
            Player.Hit(true)
        }
    }else if(event.code == "KeyS" || event.code == "ArrowDown"){
        event.preventDefault()
        if(Game.game_state && Player.state != "duck"){
            Player.state = "duck"
            Player.frame_counter = 1
            Player.Hit(false)
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
        this.jump_frame_size = [20, 12]
        this.duck_frame_size = [20, 12]
        this.frame = new Image()
        this.frame_counter = 1
        this.state = "walking"
        this.prev_state = ""
    }
    
    DrawChar(fps){
        this.fps = fps
        switch (this.state) {
            case "walking":
                this.DrawCharWalking()
                break;

            case "jump":           
                this.Jump()
                break;

            case "duck":
                this.Duck()
                break;

            default:
                break;
        }


    }


    Jump(){
        
        if(Time.elapsed > 1000 / this.fps ){
            this.frame.src = "graphics/animations/walking"+ this.character +".png"  //zmiana klatek na chodzeniowe
            
            if(this.frame_counter <= 3){     //podskok
                this.pos_y = 100 +  (canvas.height / 3 * 2 - canvas.height / 4 ) / this.frame_counter 
            }else if(this.frame_counter >= 15){     //opadanie
                this.pos_y = canvas.height / 4 + (canvas.height / 3 * 2 - canvas.height / 4 ) / (21 - this.frame_counter)
            
            }else{      //mid lot
                this.pos_y = canvas.height / 4 - 20
        
            }
            this.pos_y -= 20
            // console.log(this.frame_counter, this.pos_y)
            
    
            
            ctx.drawImage(this.frame, this.jump_frame_size[0] , 0, this.jump_frame_size[0], this.jump_frame_size[1]  , this.pos_x, this.pos_y, this.jump_frame_size[0] * 5, this.jump_frame_size[1] * 5)         


            if(this.prev_state != "jump"){
                this.prev_state = "jump"
            }

            this.frame_counter++
            if(this.frame_counter > 20){     //zmiana klatek animacji
                this.frame_counter = 0
                this.state = "walking"
            }
        }

        



    }
    
    Duck(){

        if(Time.elapsed > 1000 / this.fps ){
            this.frame.src = "graphics/animations/duck"+ this.character +".png"  //zmiana klatek na kucanie
            this.pos_y = canvas.height / 3 * 2
            console.log('ae')
            ctx.drawImage(this.frame, this.duck_frame_size[0] * this.frame_counter, 0, this.duck_frame_size[0], this.duck_frame_size[1]  , this.pos_x, this.pos_y, this.duck_frame_size[0] * 5, this.duck_frame_size[1] * 5)         

            if(this.prev_state != "duck"){
                this.prev_state = "duck"
            }

            this.frame_counter++
                if(this.frame_counter >= 7){     //zmiana klatek animacji
                    this.frame_counter = 0
                    this.state = "walking"
            }
        }
    }
    


    DrawCharWalking(){


        if(Time.elapsed > 1000 / this.fps ){
            this.frame.src = "graphics/animations/walking"+ this.character +".png"      //zmiana klatek na chodzeniowe
            ctx.drawImage(this.frame, this.walk_frame_size[0] * Math.floor(this.frame_counter / 2), 0, this.walk_frame_size[0], this.walk_frame_size[1]  , this.pos_x, canvas.height / 3 * 2, this.walk_frame_size[0] * 5, this.walk_frame_size[1] * 5)         
            //Math.floor (frame / 2) zmniejsza prędkość renderu 2krotnie


            if(this.prev_state != "walking"){
                this.prev_state = "walking"
            }

            this.frame_counter++
            if(this.frame_counter >= 14){     //zmiana klatek animacji
                this.frame_counter = 0
            }
        }
    }

    Hit(up){
        if(Objectile.feed[0].pos_x < this.pos_x + 400 + Objectile.feed[0].size){
            if(up && Objectile.feed[0].property == 1){
                Objectile.feed.shift()
                Game.ScoreUpdate(1)
            }else if(up && Objectile.feed[0].property == 2){
                Game.game_state = false

            }else if(!up && Objectile.feed[0].property == 3){
                Objectile.feed.shift()
                Game.ScoreUpdate(1)

            }else if(!up && Objectile.feed[0].property == 4){
                Game.game_state = false

            }

            
        }


    }

}


let Player = new PlayerClass()
