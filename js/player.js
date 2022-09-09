

document.addEventListener("keydown", function (event) {              
    if (event.code == "KeyW" || event.code == "Space" || event.code == "ArrowUp") {   //wykrywanie w, s, strzałek, spacji i przypisanie im skoku, kucnięcia          
        event.preventDefault()
        Jump()
    }else if(event.code == "KeyS" || event.code == "ArrowDown"){
        event.preventDefault()
        Duck()
    }
})



function Jump(){
    console.log("jump")

}

function Duck(){
    console.log("duck")


}