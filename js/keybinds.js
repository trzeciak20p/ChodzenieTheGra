
class KeybindsClass{
  
    constructor(){

        if(KeybindsClass.exists){
            return KeybindsClass.instance;
        }
        //default set
        this.forbidden = ["Backspace", "Tab", "Enter", "ShiftLeft", "ShiftRight", "ControlLeft", "AltRight", "AltLeft", "Escape"]
        this.binds_jump = ["KeyW", "ArrowUp"]
        this.binds_duck = ["KeyS", "ArrowDown"]

        if(localStorage.getItem("binds_jump") == null){     //checking if binds were saved before
            localStorage.setItem("binds_jump", this.binds_jump)     //if no uploading default ones
        }else{
            this.binds_jump = localStorage.getItem("binds_jump").split(",")    //getting previously saved binds and reconverting it to array
        }
        if(localStorage.getItem("binds_duck") == null){     //same thing but for duck
            localStorage.setItem("binds_duck", this.binds_duck)
        }else{
            this.binds_duck = localStorage.getItem("binds_duck").split(",")
        }
        
    }

    DeleteJumpInput(input){
        input.length == 1 ? input = "Key" + input : true        //adding "Key" prefix for letters so it's interpreted correctly
        let index = this.binds_jump.indexOf(input) + 1
        if(index == -1){
            console.log(this.binds_jump, input, "not in array");
            return;
        }
        this.binds_jump = this.binds_jump.splice(index, 1)          //deleting bind
        localStorage.getItem("binds_jump") = this.binds_jump        //updating local storage
    }

    DeleteDuckInput(input){
        input.length == 1 ? input = "Key" + input : true
        let index = this.binds_duck.indexOf(input) + 1
        if(index == -1){

            return;
        }
        this.binds_duck = this.binds_duck.splice(index, 1)
        localStorage.getItem("binds_duck") = this.binds_duck 
    }

    AddJumpInput(input){
        if( this.binds_jump.indexOf(input) != -1 || this.forbidden.includes(input) || this.binds_duck.indexOf(input) != -1 ){
            return;
        }
        this.binds_jump.push(input)
        window.removeEventListener("keydown", Event)
        this.selector.innerHTML = ""
        this.CreateKeybindsAdjustments(this.where)
        localStorage.getItem("binds_jump") = this.binds_jump        //updating local storage
    }

    AddDuckInput(input){
        if( this.binds_duck.indexOf(input) != -1 || this.forbidden.includes(input) || this.binds_jump.indexOf(input) != -1 ){
            return;
        }
        this.binds_duck.push(input)
        window.removeEventListener("keydown", Event)
        this.selector.innerHTML = ""
        this.CreateKeybindsAdjustments(this.where)
        localStorage.getItem("binds_duck") = this.binds_duck 
    }

    WaitForInput(name){     //waits for player input and then bind it
        if(name == "jump"){
            window.addEventListener("keydown", (event) => this.AddJumpInput(event.code))
        }else{
            window.addEventListener("keydown", (event) => this.AddDuckInput(event.code))
        }
    }

    CreateKeybindsAdjustments(where){       //creates section wich shows and allows player to customize their binds
        this.where = where
        this.selector = document.createElement("DIV")
        this.selector.setAttribute("class", "keybinds_selector")
        let header = document.createElement("SPAN")
        header.innerText = "keybinds"
        this.selector.appendChild(header)

        this.selector.appendChild(this.CreateTable("jump"))
        this.selector.appendChild(this.CreateTable("duck"))

        where.appendChild(this.selector)
    }

    CreateTable(name){
        let column = document.createElement("DIV")
        column.setAttribute("class", "column")
        column.setAttribute("find", name)
        let header = document.createElement("DIV")
        header.setAttribute("class", "row")
        header.innerText = name
        column.appendChild(header)
        // displaying every input
        if(name == "jump"){     
            for(let i in this.binds_jump){      
                let value = this.binds_jump[i].split("Key")
                value.length > 1 ? value.shift() : true
                column.appendChild(this.CreateRow(value, name))               
            }                   
        }else{
            for(let i in this.binds_duck){
                let value = this.binds_duck[i].split("Key")
                value.length > 1 ? value.shift() : true
                column.appendChild(this.CreateRow(value, name))                
            }   
        }

        this.add_input = document.createElement("div")
        this.add_input.setAttribute("class", "row")
        this.add_input.addEventListener("click", () => {this.WaitForInput(name)})
        this.add_input.innerText = "add input"

        column.appendChild(this.add_input)

        return column;   
    }

    CreateRow(value, name){       //creates row with binding
        let row = document.createElement("DIV")
        row.setAttribute("find", value)
        row.setAttribute("class", "row")
        row.innerText = value
        row.addEventListener("click", () => this.DeleteRow(value, name))   //usuwanie po kliknięciu

        return row;
    }

    DeleteRow(value, name){       //deletes clicked row

        // console.log(name, value,  "div[find='"+ name +"'] div[find='"+ value +"']")
        document.querySelector("#popup .keybinds_selector div[find='"+ name +"'] div[find='"+ value +"']").remove()     //removing displaying div

        if(name == "jump"){     //removing binding
            this.DeleteJumpInput(String(value))
        }else{
            this.DeleteDuckInput(String(value))
        }
        return;
    }

}

let Keybinds = new KeybindsClass()
