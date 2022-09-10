const body = document.getElementsByTagName("body")
const nav = document.querySelectorAll("nav div")
const popup_display  = document.getElementById("popup")
const popup = document.querySelector("#popup > div")

nav[0].addEventListener("click", () => {Popup(0)})  //Przypisywanie guzikom pokazywania pop-up'a  
nav[1].addEventListener("click", () => {Popup(1)})
nav[4].addEventListener("click", () => {Popup(2)})
nav[5].addEventListener("click", () => {Popup(3)})

document.getElementById("popup_close").addEventListener("click", () => {popup.style.display = "none"})  //Zamykanie pop-up'a

popup_display .addEventListener("click", () => { 
    let x = GetMousePos()[0]
    let y = GetMousePos()[1]
    if(x >= window.innerWidth * 0.3 && x <= window.innerWidth * 0.7 && y >= window.innerWidth * 0.2 && y <= window.innerHeight * 0.8){
    }else{
        popup_display .style.display = "none"
        
    }
    
})

const canvas = document.getElementById("main_canvas")

const ctx = canvas.getContext("2d")
CanvasResize()
window.addEventListener("resize", CanvasResize)





function CanvasResize(){
    console.log()
    canvas.setAttribute("height", window.innerHeight - 94)        
    canvas.setAttribute("width", window.innerWidth)
}

function Popup(button){
    popup_display.style.display = "flex"        //pokazuje popupa
    popup.innerHTML = '<input id="popup_close" type="button" value="X">'       //dodaje guziczek
    switch (button) {
        case 0:
            
            break;
        case 1:
            
            break;
        case 2:
            
            break;
        case 3:
            new Slider(popup, "music volume")
            new Slider(popup, "effects volume")

            break;
        default:
            let text = document.createElement("SPAN")
            text.innerText = "COŚ POSZEDŁO NIE TAK :c"
            popup.appendChild(text)
            console.log("ae")
            break;
    }
    
}

class Slider{

    static music_volume = 50
    static effects_volume = 50 

    constructor(where, functn){     //gdzie umieścić, funkcja slidera
        this.slider = document.createElement("DIV")      //tworzenie wyglądu slidera
        this.slider.setAttribute("class", "slider")
        this.slider_text = document.createElement("SPAN")
        this.slider_text.innerText = functn + ": 50"
        this.slider.appendChild(this.slider_text)
        this.slider_slide = document.createElement("DIV")
        this.slider_slide.setAttribute("class", "slider_slide")
        this.slider.appendChild(this.slider_slide)
        this.slider_circle = document.createElement("DIV")
        this.slider_circle.setAttribute("class", "slider_circle")
        this.slider.appendChild(this.slider_circle)
        where.appendChild(this.slider)       //wyświetlanie slidera w określonym miejscu
        this.slider.addEventListener("mousedown", () => {this.SliderValueChange(functn)})

    }

    SliderValueChange(functn) {
        this.rect = this.slider.getBoundingClientRect()
        this.GetSliderMousePos()

        let x = Math.round(this.mouse_x / this.rect.width * 100)        //patrzy na stosunek myszki do slidera aby mieć przedział 0-100
        if(x < 0){      //ogranicza wyjeżdżanie slidera
            x = 0   
        }else if(x > 100){
            x = 100
        }else{
            this.slider_circle.style.left = this.mouse_x - 10 + "px"   //zmiana pozycji kółka slidera
        }

        switch (functn){
            case "music volume":        //zmiana poziomu głośności
                    Slider.music_volume = x
                break;
            case "effects volume":
                    Slider.effects_volume = x
                break;
            default:

                break;
        }
        this.slider_text.innerText = functn + ": " + x      //zmiana tekstu slidera

    }

    GetSliderMousePos(){
        let e = window.event
        this.mouse_x = e.clientX - Math.round(this.rect.x)     //zczytywanie x z slidera
    }

}



function GetMousePos(){       
    let e = window.event
    return [e.clientX, e.clientY];
}