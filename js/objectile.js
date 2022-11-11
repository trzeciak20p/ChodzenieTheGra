class Objectile{

    static feed = []        //nadciągający przeciwnicy 0 - brak, 1 - góra-atak, 2 - góra-unik, 3 - dół-atak, 4 - dół-unik

    constructor(property){
        console.log("ae")
        this.pos_y;
        this.pos_x = Game.window_w;
        this.property = property;       //nadciągający przeciwnicy 0 - brak, 1 - góra-atak, 2 - góra-unik, 3 - dół-atak, 4 - dół-unik,
        this.speed = (canvas.width - Player.pos_x + 200) * (Game.bpm / 3600);
        this.size = 100;
        this.image;

        this.blue_box = new Image();
        this.blue_box.src = "graphics/objects/blue_box.png";
        this.pink_box = new Image();
        this.pink_box.src = "graphics/objects/pink_box.png";
        this.blue_bomb = new Image();
        this.blue_bomb.src = "graphics/objects/blue_bomb.png";
        this.pink_bomb = new Image();
        this.pink_bomb.src = "graphics/objects/pink_bomb.png";
        this.graphic = [
            this.blue_box,
            this.pink_bomb,
            this.pink_box,
            this.blue_bomb,
        ];

        if(this.property == 1 || this.property == 2) {
            this.pos_y = Math.round(Game.window_h / 4 - this.size);     //góra
        }else{
            this.pos_y = Math.round((Game.window_h / 3) * 2 - this.size);       //dół
        }
        Objectile.feed.push(this)
  }

    UpdatePosition(){
        this.pos_x -= this.speed;
        this.DeathCheck();
        this.DrawObjectile();
        if(this.pos_x < 0){
            Objectile.feed.shift()
            Game.ScoreUpdate(1)
        }
    }

    DeathCheck(){
        if(this.pos_x < Player.pos_x + 200 - this.size ){
            if(this.property == 1 || this.property == 3){
                Game.game_state = false;
            }else if(this.property == 4 && Player.state != "jump"){
                Game.game_state = false
            }else{
                Objectile.feed.shift()
                Game.ScoreUpdate(1)
            }
        }
    }

    DrawObjectile(){
        ctx.drawImage(this.graphic[this.property - 1], this.pos_x, this.pos_y, this.size, this.size); 

    // ctx.fillStyle = "rgb(220,12,12)"
    // ctx.beginPath()
    // ctx.fillRect(this.pos_x, this.pos_y, this.size, this.size)
    }
}
