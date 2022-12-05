class Objectile{

    static feed = []        //nadciągający przeciwnicy 0 - brak, 1 - góra-atak, 2 - góra-unik, 3 - dół-atak, 4 - dół-unik

    constructor(property){
        this.pos_y;
        this.pos_x = Game.window_w;
        this.property = property;       //nadciągający przeciwnicy 0 - brak, 1 - góra-atak, 2 - góra-unik, 3 - dół-atak, 4 - dół-unik,
        this.speed = (canvas.width + Player.pos_x - 200) * (Sound.bpm / 3600);
        this.time =  "+" + (Sound.bpm / 60)
        this.time2 = new TimeClass()

        this.size = 100;
        this.image;

        this.blue_box = new Image();
        this.blue_box.src = "graphics/objects/blue_box.png";
        this.pink_box = new Image();
        this.pink_box.src = "graphics/objects/pink_box.png";
        this.bomb = new Image();
        this.bomb.src = "graphics/objects/bomb.png";
        this.graphic = [
            this.blue_box,
            this.bomb,
            this.pink_box,
            this.bomb,
        ];

        if(this.property == 1 || this.property == 2) {
            this.pos_y = Math.round(Game.window_h / 4 - this.size);     //góra
        }else{
            this.pos_y = Math.round((Game.window_h / 4) * 3 - this.size);       //dół
        }
        Objectile.feed.push(this)

        // Tone.Transport.schedule((time) => {
        //     Tone.Draw.schedule(() => {
                
        //         kick.start()
        
        //     }, time);
        
        // }, this.time);
        // console.log(this.time)

        Tone.Transport.start();
  }

    UpdatePosition(){
        this.pos_x -= this.speed;
        this.DeathCheck();
        this.DrawObjectile();
        // if(this.pos_x + this.size < 0){
            // Objectile.feed.shift()
            // Game.ScoreUpdate(1)
            // console.log(this.pos_x)
        // }
    }

    DeathCheck(){
        if(this.pos_x < Player.pos_x + 200 - this.size ){
            if(this.property == 1 || this.property == 3){
                Game.UploadScore();
                Game.game_state = false;
                Tone.Transport.stop();
                AudioEffects.death_box.start();
            }else if(this.property == 4 && Player.state != "jump"){
                Game.UploadScore();
                Game.game_state = false;
                Tone.Transport.stop();
                AudioEffects.death_box.start();
            }else{
                Objectile.feed.shift()
                Game.ScoreUpdate(1)
            }
            this.time2.UpdateElapsed()
            // console.log(this.speed, this.time2.elapsed / 1000)
        }
    }

    DrawObjectile(){
        ctx.drawImage(this.graphic[this.property - 1], this.pos_x, this.pos_y, this.size, this.size); 

    // ctx.fillStyle = "rgb(220,12,12)"
    // ctx.beginPath()
    // ctx.fillRect(this.pos_x, this.pos_y, this.size, this.size)
    }
}
