
document.addEventListener("keydown", function (event) {              
    if (event.code == "KeyW" || event.code == "Space" || event.code == "ArrowUp") {   //wykrywanie w, s, strzałek, spacji i przypisanie im skoku, kucnięcia          
        event.preventDefault()
        Player.Jump()
    }else if(event.code == "KeyS" || event.code == "ArrowDown"){
        // event.preventDefault()
        Player.Duck()
    }
})


let PlayerSingleton = (function(){
    let instance        // tu zapisujemy instancje klasy

    class Person{       //dając klase do środka nie można jej stworzyć operatorem new   

        character_url = ""
        character = 0
    
    
        Jump(){
            console.log("jump")
        
        }
        
        Duck(){
            console.log("duck")
        
        
        }
    }

    function CreateInstance(){
        let object = new Person()   
        return object;  
    }

    return{
        getInstance: function(){
            if(!instance){      //Jeśli nie ma instancji to ją tworzy
                instance = CreateInstance()
            }else{
                console.log("jeden już istnieje")
            }
            return instance;        // W przeciwnym przypadku zwaraca już istniejącą

        }   
    }
})()

let Player = PlayerSingleton.getInstance()
