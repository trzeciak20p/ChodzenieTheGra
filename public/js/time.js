
class TimeClass{


    constructor(){
        this.date = new Date() 
        this.elapsed = 0
        this.then = Date.now()
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
            this.div = document.createElement("DIV")       //tworzenie elementów HTML
            this.div.setAttribute("class", "clock")
            this.clock = document.createElement("DIV")
            this.CreateData()
            this.div.appendChild(this.clock)
        }
        
        where.appendChild(this.div)
        
        this.ClockUpdate()      //wyświetla zegar zaraz od razu (nie po 1 jak przy interwale)
        this.clockInterval = setInterval(this.ClockUpdate.bind(this), 1000)        //interwał na zegar
    }

    CreateData(){
        this.date = new Date()
        this.d = this.date.getDate()
        this.month = this.date.getMonth()
        this.y = this.date.getFullYear()
        if(this.month < 10){this.month = "0" + this.month}

        this.data = document.createElement("DIV")
        this.data.innerText = this.d + "-" + this.month + "-" + this.y
        this.div.appendChild(this.data)
        
    }

}

let Time = new TimeClass()
let HitWindows = new TimeClass()