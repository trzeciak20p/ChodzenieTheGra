const body = document.getElementsByTagName("body")
const nav = document.querySelectorAll("nav div")
const popup_display = document.getElementById("popup")
const popup = document.querySelector("#popup > div")

nav[0].addEventListener("click", () => {Popup(0)})  //Przypisywanie guzikom pokazywania pop-up'a  
nav[1].addEventListener("click", () => {Popup(1)})
nav[4].addEventListener("click", () => {Popup(2)})
nav[5].addEventListener("click", () => {Popup(3)})



popup_display.addEventListener("click", () => { 
    let rect = popup.getBoundingClientRect()
    let x = GetMousePos()[0]
    let y = GetMousePos()[1]
    if(x >= rect.x && x <= rect.x + rect.width &&  y >= rect.y && y <= rect.y + rect.height){       //sprawdzanie czy myszka jest w obrębie popu-pa
    }else{
        popup_display.style.display = "none"        //jak nie to zamknięcie popupa
        
    }
    
})

const canvas = document.getElementById("main_canvas")

const ctx = canvas.getContext("2d")
CanvasResize()
window.addEventListener("resize", CanvasResize)





function CanvasResize(){        //dopasowywuje rozmiar canvasa do okna
    console.log()
    canvas.setAttribute("height", window.innerHeight - 94)        
    canvas.setAttribute("width", window.innerWidth)
}

function Popup(button){
    popup_display.style.display = "flex"        //pokazuje popupa
    popup.innerHTML = '<input id="popup_close" type="button" value="X">'       //dodaje guziczek
    document.getElementById("popup_close").addEventListener("click", () => {popup_display.style.display = "none"})      //Zamykanie pop-up'a
    switch (button) {
        case 0:     //login
            
            break;
        case 1:     //customizacja
            
            break;
        case 2:     //leaderboard
            
            break;
        case 3:     //opcje
            new Slider(popup, "music volume")   //dodanie sliderów
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

popup.addEventListener("mouseup", () => { Slider.mouse_down = 0 })      //jest tutaj żeby nie dołączać przy każym otwarciu popupa
class Slider{

    static music_volume = 50        //startowe poziomy głośności
    static effects_volume = 50 
    static mouse_down = 0       //czy myszka kliknięta


    constructor(where, functn){     //gdzie umieścić, funkcja slidera
        this.slider = document.createElement("DIV")      //tworzenie wyglądu slidera
        this.slider.setAttribute("class", "slider")
        this.slider_text = document.createElement("SPAN")     
        this.slider.appendChild(this.slider_text)
        this.slider_slide = document.createElement("DIV")
        this.slider_slide.setAttribute("class", "slider_slide")
        this.slider.appendChild(this.slider_slide)
        this.slider_circle = document.createElement("DIV")
        this.slider_circle.setAttribute("class", "slider_circle")
        this.slider.appendChild(this.slider_circle)
        where.appendChild(this.slider)       //wyświetlanie slidera w określonym miejscu

        this.rect = this.slider.getBoundingClientRect() 
        switch (functn){
            case "music volume":        
                this.slider_text.innerText = functn + ": " + Slider.music_volume    //wyświetlanie poziomu głośności już przy stworzeniu
                this.slider_circle.style.left = Slider.music_volume * this.rect.width / 100 - 10 + "px"        //zmiana położenia kółka slidera już przy stworzeniu
                break;
            case "effects volume":
                this.slider_text.innerText = functn + ": " + Slider.effects_volume
                this.slider_circle.style.left = Slider.effects_volume * this.rect.width / 100 - 10 +  "px"        
                break;
            default:

                break;
        }

        this.slider.addEventListener("mousedown", () => { Slider.mouse_down = 1 })    // na sprawdzanie czy myszka kliknięta
        this.slider.addEventListener("mousemove", () => { this.SliderValueChange(functn) })
    }

    SliderValueChange(functn) {
        if(Slider.mouse_down == 0){       //jeśli myszka jest przytrzymana zmiana pozycji itp. jak nie to nie
            return;
        }
        
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

let GameObejct = {


    
}


function GetMousePos(){       
    let e = window.event
    return [e.clientX, e.clientY];
}