let Game = {

    window_w: window.innerWidth,
    window_h: window.innerHeight,
    //urls w liście possibly
    world_urls: ["", "graphics/world/bg/bg", "graphics/world/groud/ground", "sound/music/song"],
    world: [0, 0, 0, 0],     //bg, ground, day_time, song    (inaczej sie nie da, assocjacyjna zawiodła :c )
    bpm: 50,
    score: 0,
    feed: [0,0,0],      //nadciągający przeciwnicy 0 - brak,  1 - dół, 2 - góra
    game_state: 0,      //stan gry 0 - nierozpoczęta, 1 - w trakcie


    

    StartNewGame(){     //zaczyna nową gre
        this.bpm = 50       // ustawia startowe zmienne
        this.score = 0
        this.feed = [0,0,0,0]
        this.game_state = 1

    },

    RenderBG(){     //Rysuje obecnie wybrany bg
        let url = this.world_urls[1] + this.world[0] + ".png"
        image = new Image()
        image.src = url
        image.onload = () => {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
        }
    },

    BpmUpdate(){        //wyświetla obecny bpm
        nav[2].innerText = Game.bpm
    },

    ScoreUpdate(){      //wyświetla obecną ilość punktów
        nav[3].innerText = Game.score
    },
    
    CanvasResize(){        //dopasowywuje rozmiar canvasa do okna
        this.window_w = window.innerWidth
        this.window_h = window.innerHeight
        canvas.setAttribute("height", this.window_h - 94)        
        canvas.setAttribute("width", this.window_w)
        //this.RenderBG()     //zamienić na render ogólnie, abo potem wgl wywalić
    }

}

Game.RenderBG()
Game.CanvasResize()     //dopasowywuje canvas przy uruchomieniu str
window.addEventListener("resize", Game.CanvasResize)

