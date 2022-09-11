
let Game = {

    window_w: window.innerWidth,
    window_h: window.innerHeight,
    bg: "bg1.png",
    ground: "ground1.png",
    day_time: "day",
    bpm: 50,
    score: 0,


    CanvasResize(){        //dopasowywuje rozmiar canvasa do okna
        this.window_w = window.innerWidth
        this.window_h = window.innerHeight
        canvas.setAttribute("height", this.window_h - 94)        
        canvas.setAttribute("width", this.window_w)
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


Game.CanvasResize()     //dopasowywuje canvas przy uruchomieniu str
window.addEventListener("resize", Game.CanvasResize)