const body = document.getElementsByTagName("body")
const nav = document.querySelectorAll("nav div")
const popup_display = document.getElementById("popup")
const popup = document.querySelector("#popup > div")

nav[0].addEventListener("click", () => {Popup("account")})  //Przypisywanie guzikom pokazywania pop-up'a  
nav[1].addEventListener("click", () => {Popup("customize")})
nav[4].addEventListener("click", () => {Popup("leaderboard")})
nav[5].addEventListener("click", () => {Popup("settings")})



popup_display.addEventListener("click", () => { 
    let rect = popup.getBoundingClientRect()
    let x = GetMousePos()[0]
    let y = GetMousePos()[1]
    if(x >= rect.x - 1 && x <= rect.x + rect.width &&  y >= rect.y && y <= rect.y + rect.height){       //sprawdzanie czy myszka jest w obrębie popu-pa
    }else{
        popup_display.style.display = "none"        //jak nie to zamknięcie popupa
        clearInterval(Time.clockInterval)       //usuwanie interwału z zegara
    }
    
})

const canvas = document.getElementById("main_canvas")       //canvas stuff
const ctx = canvas.getContext("2d")
let c_rect = canvas.getBoundingClientRect()
ctx.filter = 'blur(0px)'
ctx.imageSmoothingEnabled = false
ctx.fillStyle = "#e0a13c"
ctx.font = "100px ArcadeClassic"
ctx.textAlign = "center"

function Popup(button){
    popup_display.style.display = "flex"        //pokazuje popupa
    popup.innerHTML = '<div class="header"><span>' + button + '</span><input id="popup_close" type="button" value="X"></div>'       //dodaje guziczek
    document.getElementById("popup_close").addEventListener("click", () => {
        popup_display.style.display = "none"        //Zamykanie pop-up'a
        clearInterval(Time.clockInterval)       //usuwanie interwału z zegara
    })   
       
    switch (button) {
        case "account":     
            new Form(popup)
            break;

        case "customize": 
            Button.ClassReset()
            new Button(popup, 0, 0)     //dodawanie guzików
            new Button(popup, 0, 1)
            new Button(popup, 0, 2)
            new Button(popup, 1, 0)
            new Button(popup, 1, 1)
            new Button(popup, 1, 3)
            new Button(popup, 2, 0)
            new Button(popup, 2, 1)
            new Button(popup, 2, 2)
            new Button(popup, 3, 0)
            new Button(popup, 3, 1)
            new Button(popup, 3, 2)       
            break;

        case "leaderboard":     
            new Leaderboard(popup, 50, true)
            break;

        case "settings":     
            new Slider(popup, "music volume")   //dodanie sliderów
            new Slider(popup, "effects volume")
            Theme.ThemeSelector(popup)
            Keybinds.CreateKeybindsAdjustments(popup)
            Time.CreateClock(popup)
            break;

        default:
            let text = document.createElement("SPAN")       //jeśli popup sie jakimś cudem wywali
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
                Sound.UpdateMusicVolume(x)
                break;
            case "effects volume":
                Slider.effects_volume = x
                AudioEffects.UpdateVolume(x)
                Sound.UpdateEffectsVolume(x)
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
    static section_urls = ["graphics/world/characters/char", "graphics/world/bg/bg", "graphics/world/ground/ground", "graphics/world/music/song"]
    static sections = new Array(4)
    static section_check = [false, false, false, false]        //0 - characters, 1 - bg, 2 - ground, 3 - music

    constructor(where, functn, number){
        this.SectionCheck(where, functn)

        this.btn = document.createElement("DIV")
        this.btn.style.backgroundImage = "url( " + Button.section_urls[functn] + number +  ".png )"
        this.btn.appendChild(document.createElement("DIV"))     //div do podświetlania buttona przy najechaniu
        this.btn.addEventListener("click", () => {
            if(functn == 0){
                Player.character = number       //zmiana postaci
            }else{
                Game.world[functn] = number     //zmiana tego co trzeba na to co trzeba
            }
            this.MakeSelected(functn)
        })

        Button.sections[functn].appendChild(this.btn)

        if(Game.world[functn] == number){       //pokazuje zaznaczone guziki zaraz po otwarciu okienka
            this.MakeSelected(functn)
        }
    }

    SectionCheck(where, functn){    

        if(Button.section_check[functn]){      //Sprawdza czy dana sekcja istnieje, a jak nie to ją tworzy
            return;
        }       
        Button.section_check[functn] = true     //odznacza sekcje jako zrobioną

        let section = document.createElement("DIV") 
        section.setAttribute("class", "customize_section")
        let section_header = document.createElement("SPAN")     //tytuł sekcji
        section_header.innerText = Button.section_names[functn]
        section.appendChild(section_header)
        where.appendChild(section)
        let display = document.createElement("DIV")
        section.appendChild(display)

        Button.sections[functn] = display
    }

    MakeSelected(functn){        //podświetla guzik po wybraniu

        Button.sections[functn].querySelectorAll("div").forEach(element => {
            element.setAttribute("class", "")
        });
        this.btn.setAttribute("class", "selected")

    }

    static ClassReset(){
        Button.sections = new Array(4)
        Button.section_check = [false, false, false, false]
    }    

}

class Leaderboard{

    place = 0;

    constructor(where, limit, best){

        // if(best){
        //     this.DisplayBestScore(where)
        // }

        this.limit = limit
        this.lb = document.createElement("TABLE")       //tworzenie tabeli z wynikami
        this.lb.setAttribute("class", "lb")
          
        // this.AddHeader(["#", "name", "score"])  
        // this.DisplayScores()
        
        this.CreateLeaderboard()

        where.appendChild(this.lb)
    }

    DisplayScores(){

        
        let scores = [1,"Ola",727]        //dablica dwuwymiarowa tutaj wynik [(miejsce da sie z i+1)[nazwa][score]]
        

        for(;this.place < this.limit; this.place++){

            this.tr = document.createElement("TR")
            
            scores.forEach(element => {
                let td =  document.createElement("TD")
                td.innerText = element
                this.tr.appendChild(td)
            });         
            this.lb.appendChild(this.tr)
            scores = [2,1,37]        //do wywalenia
        }

    }

    DisplayBestScore(where){      //pokazuje najlepszy wynik gracza

        let score = 727     //zmienić na pobieranie z bazy danych
        this.best_score = document.createElement("SPAN")
        this.best_score.setAttribute("class", "best_score")
        this.best_score.innerHTML = "your best: " + score
        where.appendChild(this.best_score)
    }

    AddHeader(names){       //po każdym elemencie z tablicy tworzy inny td 

        this.th = document.createElement("TH")
        names.forEach(element => {
            let td =  document.createElement("TD")
            td.innerText = element
            this.th.appendChild(td)
        });
        this.lb.appendChild(this.th)
        
    }

    CreateLeaderboard(){

        let ae = this.lb
        this.req = new XMLHttpRequest();
        this.req.open("GET", `php/lb.php?limit=${this.limit}`);
        this.req.onload = function(){
            ae.innerHTML = this.responseText;
        }
        this.req.send();

    }


}


function GetMousePos(){       
    let e = window.event
    return [e.clientX, e.clientY];
}
