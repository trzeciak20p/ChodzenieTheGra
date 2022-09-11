
let Game = {

    window_w: window.innerWidth,
    window_h: window.innerHeight,
    //urls w liście possibly
    world: [0, 0, 0, 0],     //day, ground, day_time, song    (inaczej sie nie da, assocjacyjna zawiodła :c )
    bpm: 50,
    score: 0,
    feed: [0,0,0],      //nadciągający przeciwnicy 0 - brak,  1 - dół, 2 - góra
    game_state: 0,      //stan gry 0 - nierozpoczęta, 1 - w trakcie


    CanvasResize(){        //dopasowywuje rozmiar canvasa do okna
        this.window_w = window.innerWidth
        this.window_h = window.innerHeight
        canvas.setAttribute("height", this.window_h - 94)        
        canvas.setAttribute("width", this.window_w)
    },

    StartNewGame(){
        this.bpm = 50
        this.score = 0
        this.feed = [0,0,0,0]
        this.game_state = 1

    },


    RenderBG(){
        ctx.drawImage(bg)
    },
    
    BpmUpdate(){
        nav[2].innerText = Game.bpm
    },

    ScoreUpdate(){
        nav[3].innerText = Game.score
    }
    

}

console.log(Game.world[1])

Game.CanvasResize()     //dopasowywuje canvas przy uruchomieniu str
window.addEventListener("resize", Game.CanvasResize)