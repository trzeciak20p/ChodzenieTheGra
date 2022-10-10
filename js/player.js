
document.addEventListener("keydown", function (event) {              
    if (event.code == "KeyW" || event.code == "ArrowUp") {   //wykrywanie w, s, strzałek, spacji i przypisanie im skoku, kucnięcia          
        event.preventDefault()
        Player.Jump()
    }else if(event.code == "KeyS" || event.code == "ArrowDown"){
        event.preventDefault()
        Player.Duck()
    }else if(event.code == "Space"){
        event.preventDefault()
        if(Game.game_state == false){
            Game.StartNewGame()
        }

    }
})


class PlayerClass{

    constructor(){
        this.character_url = ""
        this.character = 0
    }
    


    Jump(){
        console.log("jump")
    
    }
    
    Duck(){
        console.log("duck")
    
    
    }
    
}


let Player = new PlayerClass()
