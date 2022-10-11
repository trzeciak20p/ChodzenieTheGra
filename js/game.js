
class GameClass {

    constructor(){
        this.window_w = window.innerWidth
        this.window_h = window.innerHeight
        this.world_urls = ["", "graphics/world/bg/bg", "graphics/world/groud/ground", "sound/music/song",]
        this.world =  [0, 0, 0, 0]       //character, bg, ground, song (inaczej sie nie da, assocjacyjna zawiodła :c )
        this.bg_image = new Image()

        this.bpm = 50
        this.score = 0
        this.feed = []       //nadciągający przeciwnicy 0 - brak, 1 - góra-atak, 2 - góra-unik, 3 - dół-atak, 4 - dół-unik,
        this.fps = 60
        this.game_state = false
    }

    StartNewGame() {
        this.bpm = 50; // ustawia startowe zmienne
        this.score = 0;
        this.feed = new Array(0)
        this.game_state = true;
        
        Tone.start()
        Time.UpdateThen()   

        console.log("New game started")
        this.MainLoop()
    }

    RenderBG(){
        //Rysuje obecnie wybrany bg
        
        this.bg_image.src = this.world_urls[1] + this.world[1] + ".png";
        ctx.drawImage(this.bg_image, 0, 0, canvas.width, canvas.height);
    }
    
    BpmUpdate() {    //wyświetla obecny bpm
        nav[2].innerText = this.bpm;
    }

    ScoreUpdate() {   //wyświetla obecną ilość punktów
        nav[3].innerText = this.score;
    }

    FeedUpdate(){
        if(this.feed.length >= 5){      //podzielić na tworzenie czasowe i usuwanie przy uderzeniu
            this.feed.shift()    
        }
        this.feed.push(new Objectile(RandomNumber(1, 4)))      //do wywalenia
        // console.log("feeed")
    }

    CanvasResize() {
        //dopasowywuje rozmiar canvasa do okna
        this.window_w = window.innerWidth;
        this.window_h = window.innerHeight;
        this.line_up = this.window_h / 3
        this.line_down = this.window_h / 3 * 2
        canvas.setAttribute("height", this.window_h - 94);
        canvas.setAttribute("width", this.window_w);
        this.RenderBG()
    }



    MainLoop(){    

        Time.UpdateElapsed()
        
        if(Time.elapsed > 1000 / this.fps){
            this.RenderBG()     //wyświetlanie tła
            this.feed.forEach(elem => {
                elem.UpdatePosition()       //wyświetlanie przeszkód
            });

            Time.UpdateThen()
        }
        if(Time.elapsed > 1000 / this.fps * 2){        //to zmienić żeby było na zegarze
            this.FeedUpdate()
        }
        
        if(this.game_state){        //zapętlanie
            requestAnimationFrame(this.MainLoop.bind(this))
        }

    }

}

let Game = new GameClass()

function RandomNumber(min, max){
    return Math.floor(Math.random() * (max + 1 - min) + min);
}


window.addEventListener("resize", () => { Game.CanvasResize(); Game.RenderBG() });


Game.RenderBG();
Game.CanvasResize(); //dopasowywuje canvas przy uruchomieniu str
// window.onload = () => {Game.StartNewGame()}
// Game.StartNewGame()

Game.FeedUpdate()



console.log(Game.feed)