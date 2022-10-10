

//zamiecić potem na realną grafike

let blue_box = new Image()
blue_box.src = "graphics/objects/blue_box.png";



class Objectile{

    constructor(property, speed = 8){
        this.pos_y
        this.pos_x = Game.window_w
        this.property        //nadciągający przeciwnicy 0 - brak,  1 - dół-unik, 2 - dół-atak, 3 - góra-unik, 4 - góra-atak
        this.speed = speed
        this.size = 100       //do wywalenia
        this.image

        if(property <= 2){
            this.pos_y = Math.round(Game.window_h / 3 * 2)
        }else{
            this.pos_y = Math.round(Game.window_h / 3)
        }
    }

    UpdatePosition(){
        this.pos_x -= this.speed       
        this.DrawObjectile()
    }

    DrawObjectile(){
        ctx.drawImage(blue_box, this.pos_x, this.pos_y, this.size, this.size) 


        // ctx.fillStyle = "rgb(220,12,12)"
        // ctx.beginPath()
        // ctx.fillRect(this.pos_x, this.pos_y, this.size, this.size)        
    }

}






