
class GameClass {

    constructor(){
        this.window_w = window.innerWidth
        this.window_h = window.innerHeight
        this.world_urls = ["", "graphics/world/bg/bg", "graphics/world/groud/ground", "sound/music/song",]
        this.world =  [0, 0, 0, 0]       //character, bg, ground, song (inaczej sie nie da, assocjacyjna zawiodła :c )
        this.bg_image = new Image()

        this.score = 0
        this.fps = 60
        this.game_state = false


        this.CanvasResize()

        this.pause_hint_font = true
        this.pause_hint_font_size = 20
        this.pierwsza_gra = true
        this.PauseScreen(true)
    }

    StartNewGame(){     // ustawia startowe zmienne

        this.score = 0;
        Objectile.feed = new Array(0)
        this.game_state = true;
        
        this.ScoreUpdate()

        Sound.StartNewGame()
        Tone.start()        //do późniejszej zmiany?
        Time.UpdateThen()   

        console.log("New game started")
        this.MainLoop()
    }

    RenderBG(){         //Rysuje obecnie wybrany bg 
        this.bg_image.src = this.world_urls[1] + this.world[1] + ".png";
        ctx.drawImage(this.bg_image, 0, 0, canvas.width, canvas.height);
    }

    PauseScreen(){          //wyświetlanie ekranu pauzy
           
        Time.UpdateElapsed()
        if(Time.elapsed > 1000 / this.fps * 2.5){
            ctx.fillStyle = Theme.bg_color
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = Theme.font
            ctx.font = (this.pause_hint_font_size + 40) + "px ArcadeClassic"
            ctx.textAlign = "center"

            if(!this.pierwsza_gra){       //sprawdzanie czy własnie uruchomiono grze czy użytkownik już przegrałs
                ctx.fillText("Score:", canvas.width / 2 , 100)
                ctx.fillText(this.score, canvas.width / 2 , 170)
            }
            ctx.font = (this.pause_hint_font_size + 10) + "px ArcadeClassic"
            ctx.fillText("Press  space  to  start new  game", canvas.width / 2 , canvas.height - 100)
            
            if(this.pause_hint_font_size <= 20){        //migotanie wiadomości    
                this.pause_hint_font = true
            }else if(this.pause_hint_font_size >= 40){
                this.pause_hint_font = false
            }

            if(this.pause_hint_font){       //zmiana rozmiaru wiadomości
                this.pause_hint_font_size++
            }else{
                this.pause_hint_font_size--
            }

            Time.UpdateThen()
        }

        if(!this.game_state){
            requestAnimationFrame(this.PauseScreen.bind(this))
        }
    }
    
    BpmUpdate(add){    //wyświetla obecny bpm
        if(typeof add !== "undefined"){
            this.bpm += add
            Sound.bpm += 20
        }
        nav[2].innerText = this.bpm;
    }

    ScoreUpdate(add){   //wyświetla obecną ilość punktów z dodawaniem
        if(typeof add !== "undefined"){
            this.score += add
        }
        nav[3].innerText = this.score;
    }

    CanvasResize(){         //dopasowywuje rozmiar canvasa do okna 
        this.window_w = window.innerWidth;
        this.window_h = window.innerHeight;
        this.line_up = this.window_h / 3
        this.line_down = this.window_h / 3 * 2
        canvas.setAttribute("height", this.window_h - 94);
        canvas.setAttribute("width", this.window_w);
    }

    DrawHitLine(){      //rysuje hitlinie
        ctx.fillStyle = "#2d2d2d"
        ctx.fillRect(Player.pos_x + 300, 0, 5, canvas.height)
    }


    MainLoop(){    
        ctx.imageSmoothingEnabled = false
        Time.UpdateElapsed()
        
        if(Time.elapsed > 1000 / this.fps){
            this.RenderBG()     //wyświetlanie tła          
            Player.DrawChar(this.fps)
            this.DrawHitLine()
            Objectile.feed.forEach(elem => {
                elem.UpdatePosition()       //wyświetlanie przeszkód
            });

            Time.UpdateThen()
        }
        
        if(this.game_state){        //zapętlanie
            requestAnimationFrame(this.MainLoop.bind(this))
        }else{
            this.pierwsza_gra = false       //pokazanie ekranu śmierci
            this.PauseScreen()
        }
    }

}


let Game = new GameClass()

function RandomNumber(min, max){
    return Math.floor(Math.random() * (max + 1 - min) + min);
}


window.addEventListener("resize", () => { Game.CanvasResize() });
canvas.addEventListener("click", () => {
    if(Game.game_state){
        if(GetMousePos()[0] >= canvas.width / 2 && Player.state != "jump"){     //kontrolki na telefon
            Player.state = "jump"
            Player.frame_counter = 0
        }else if(GetMousePos()[0] < canvas.width / 2 && Player.state != "duck"){
            Player.state = "duck"
            Player.frame_counter = 0
        }
    }else{      //start gry na telefon
        Game.StartNewGame()
    }

})


console.log(Objectile.feed)
