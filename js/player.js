
document.addEventListener("keydown", function (event) {              
    if (event.code == "KeyW" || event.code == "Space" || event.code == "ArrowUp") {   //wykrywanie w, s, strzałek, spacji i przypisanie im skoku, kucnięcia          
        event.preventDefault()
        Player.Jump()
    }else if(event.code == "KeyS" || event.code == "ArrowDown"){
        // event.preventDefault()
        Player.Duck()
    }
})

let Player = {

    character: 0,



    Jump(){
        console.log("jump")
    
    },
    
    Duck(){
        console.log("duck")
    
    
    }
}

