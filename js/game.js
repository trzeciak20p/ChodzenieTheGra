let Game = {
    window_w: window.innerWidth,
    window_h: window.innerHeight,
    world_urls: ["", "graphics/world/bg/bg", "graphics/world/groud/ground", "sound/music/song",],
    world: [0, 0, 0, 0], //character, ground, song    (inaczej sie nie da, assocjacyjna zawiodła :c )
    bpm: 50,
    score: 0,
    feed: [0, 0, 0], //nadciągający przeciwnicy 0 - brak,  1 - dół, 2 - góra
    game_state: false,
  
    StartNewGame() {
      this.bpm = 50; // ustawia startowe zmienne
      this.score = 0;
      this.feed = [0, 0, 0, 0];
      this.game_state = true;
    },
  
    RenderBG() {
      //Rysuje obecnie wybrany bg
      let url = this.world_urls[1] + this.world[0] + ".png";
      image = new Image();
      image.src = url;
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
    },
  
    BpmUpdate() {    //wyświetla obecny bpm
      nav[2].innerText = Game.bpm;
    },
  
      
    ScoreUpdate() {   //wyświetla obecną ilość punktów
      nav[3].innerText = Game.score;
    },
  
    CanvasResize() {
      //dopasowywuje rozmiar canvasa do okna
      this.window_w = window.innerWidth;
      this.window_h = window.innerHeight;
      canvas.setAttribute("height", this.window_h - 94);
      canvas.setAttribute("width", this.window_w);
      Game.RenderBG(); //zamienić na render ogólnie, abo potem wgl wywalić
    },
  };
  
  Game.RenderBG();
  Game.CanvasResize(); //dopasowywuje canvas przy uruchomieniu str
  Game.StartNewGame();
  window.addEventListener("resize", Game.CanvasResize);
  