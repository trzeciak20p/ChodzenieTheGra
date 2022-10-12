
class Objectile{

    constructor(property, speed = 8){
        this.pos_y
        this.pos_x = Game.window_w
        this.property = property        //nadciągający przeciwnicy 0 - brak, 1 - góra-atak, 2 - góra-unik, 3 - dół-atak, 4 - dół-unik,
        this.speed = speed
        this.size = 100       //do wywalenia
        this.image

        this.blue_box = new Image()
        this.blue_box.src = "graphics/objects/blue_box.png";
        this.pink_box = new Image()
        this.pink_box.src = "graphics/objects/pink_box.png";
        this.blue_bomb = new Image()
        this.blue_bomb.src = "graphics/objects/blue_bomb.png";
        this.pink_bomb = new Image()
        this.pink_bomb.src = "graphics/objects/pink_bomb.png";
        this.graphic = [this.blue_box, this.pink_bomb, this.pink_box, this.blue_bomb]

        if(this.property == 1 || this.property == 2){
            this.pos_y = Math.round(Game.window_h / 4 - this.size)      //góra
        }else{
            this.pos_y = Math.round(Game.window_h / 3 * 2 - this.size)  //dół
        }
    }

    UpdatePosition(){
        this.pos_x -= this.speed       
        this.DrawObjectile()
    }

    DrawObjectile(){
        ctx.drawImage(this.graphic[this.property-1], this.pos_x, this.pos_y, this.size, this.size)      // może dodać responsywność


        // ctx.fillStyle = "rgb(220,12,12)"
        // ctx.beginPath()
        // ctx.fillRect(this.pos_x, this.pos_y, this.size, this.size)        
    }

}






