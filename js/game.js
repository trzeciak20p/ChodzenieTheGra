
// import * as Tone from 'tone'

let GameSingleton = (function(){
    let instance        // tu zapisujemy instancje klasy

    class GameClass {

        window_w = window.innerWidth
        window_h = window.innerHeight
        world_urls = ["", "graphics/world/bg/bg", "graphics/world/groud/ground", "sound/music/song",]
        world =  [0, 0, 0, 0] //character, ground, song    (inaczej sie nie da, assocjacyjna zawiodła :c )
        bpm = 50
        score = 0
        refresh = 60
        feed //nadciągający przeciwnicy 0 - brak,  1 - dół-unik, 2 - dół-atak, 3 - góra-unik, 4 - góra-atak
        game_state = false
        counter = 5000

        StartNewGame() {
            this.bpm = 50; // ustawia startowe zmienne
            this.score = 0;
            this.feed = new Array(0)
            this.game_state = true;
            this.MainLoop()
        }

        RenderBG(){
            //Rysuje obecnie wybrany bg
            let url = this.world_urls[1] + this.world[0] + ".png";
            let image = new Image()
            image.src = url;
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

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
            console.log("feeed")
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


            this.RenderBG()     //wyświetlanie tła
            this.feed.forEach(elem => {
                elem.UpdatePosition()       //wyświetlanie przeszkód
            });

            this.counter--      //chwilowy system wyłącznia gry
            if(this.counter == 0){
                this.game_state = false
            }
            if(this.counter % 1000 == 1){
                this.FeedUpdate()
            }
            if(this.game_state){        //zapętlanie
                requestAnimationFrame(this.MainLoop)
                setInterval(() => {this.MainLoop()}, this.refresh);
            }
        }


    }


    function CreateInstance(){
        let object = new GameClass()   
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

let Game = GameSingleton.getInstance()

function RandomNumber(min, max){
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

Game.RenderBG();
Game.CanvasResize(); //dopasowywuje canvas przy uruchomieniu str
Game.StartNewGame();
window.addEventListener("resize", () => { Game.CanvasResize(); Game.RenderBG() });
  
Game.FeedUpdate()
Game.FeedUpdate()
Game.FeedUpdate()
// Game.FeedUpdate()
// Game.FeedUpdate()
// Game.FeedUpdate()

console.log(Game.feed)