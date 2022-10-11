
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

    ClockUpdate(){
        this.date = new Date()      //Pobieranie godziny
        this.h = this.date.getHours()
        this.m = this.date.getMinutes()
        this.s = this.date.getSeconds()
        if(this.m < 10){this.m = "0" + this.m}
        if(this.s < 10){this.s = "0" + this.s}

        this.clock.innerText = this.h + ":" + this.m + ":" + this.s     //Update zegara
    }

    CreateClock(where){     
        if(typeof this.clock == "undefined"){         //sprawdza czy zegar już istnieje, aby stworzyć go tylko raz
            this.clockDiv = document.createElement("DIV")       //tworzenie elementów HTML
            this.clockDiv.setAttribute("class", "clock")
            this.clock = document.createElement("DIV")
            this.clockDiv.appendChild(this.clock)
        }
        
        where.appendChild(this.clockDiv)
        
        this.ClockUpdate()      //wyświetla zegar zaraz od razu (nie po 1 jak przy interwale)
        this.clockInterval = setInterval(this.ClockUpdate.bind(this), 1000)        //interwał na zegar
    }


}

let Time = new TimeClass()