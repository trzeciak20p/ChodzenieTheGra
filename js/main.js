const body = document.getElementsByTagName("body")
const nav = document.querySelectorAll("nav div")
const popup_display = document.getElementById("popup")
const popup = document.querySelector("#popup > div")

nav[0].addEventListener("click", () => {Popup("login")})  //Przypisywanie guzikom pokazywania pop-up'a  
nav[1].addEventListener("click", () => {Popup("customize")})
nav[4].addEventListener("click", () => {Popup("leaderboard")})
nav[5].addEventListener("click", () => {Popup("opcje")})



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


function Popup(button){
    popup_display.style.display = "flex"        //pokazuje popupa
    popup.innerHTML = '<div class="header"><span>' + button + '</span><input id="popup_close" type="button" value="X"></div>'       //dodaje guziczek
    document.getElementById("popup_close").addEventListener("click", () => {popup_display.style.display = "none"})      //Zamykanie pop-up'a
    switch (button) {
        case "login":     
            
            break;

        case "customize": 
            popup
        
            new Button(popup, 0, 1, "url.here")

            
            break;

        case "leaderboard":     
            
            break;

        case "opcje":     
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

class Button{

    static section_names = ["characters", "background", "ground", "music"]
    static sections = new Array(4)
    static section_check = [false, false, false, false]        //0 - characters, 1 - bg, 2 - ground, 3 - music

    constructor(where, functn, number, thumbnail){
        this.SectionCheck(where, functn)

        this.btn = document.createElement("DIV")
        this.btn.style.backgroundImage = "url(" + thumbnail + ")"

        where.appendChild(this.btn)

    }

    SectionCheck(where, functn){    

        if(Button.section_check[functn]){      //Sprawdza czy dana sekcja istnieje
            return;
        }
        let section = document.createElement("DIV")
        section.setAttribute("class", "customize_section")
        let section_header = document.createElement("SPAN")
        section_header.innerText = Button.section_names[functn]
        section.appendChild(section_header)
        where.appendChild(section)
        
        Button.sections[functn] = section


    }


}


function GetMousePos(){       
    let e = window.event
    return [e.clientX, e.clientY];
}