
class TimeClass{


    constructor(){
        this.date = new Date() 
        this.elapsed = 0
        this.then = Date.now()
        console.log(this.date,this.elapsed,this.then)
    }
    
    UpdateElapsed(){
        this.elapsed = Date.now() - this.then
    }

    UpdateThen(){
        this.then = Date.now() - (this.elapsed % 1000/ Game.fps )
    }


}

let Time = new TimeClass()