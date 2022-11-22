
class KeybindsClass{

    
    constructor(){

        if (KeybindsClass.exists) {
            return KeybindsClass.instance;
        }

        this.forbidden = ["backspace", "tab", "enter", "shift", "crtl", "alt", "escape"]
        this.binds_jump = ["KeyW", "ArrowUp"]
        this.binds_duck = ["KeyS", "ArrowDown"]

    }


    DeleteInput(tab, input){
        let index = tab.indexOf(input)
        if(index == -1){
            return;
        }
        tab.splice(index, 1)
        if(this.binds_duck == tab){
            console.log("ae")
        }

    }

    AddInput(tab, input){
        if(tab.indexOf(input) != -1 && !this.forbidden.includes(input) ){
            return;
        }
        tab.push(input)
        console.log(window.removeEventListener("keydown", Event))
        this.selector.innerHTML = ""
        this.CreateKeybindsAdjustments(this.where)
    }

    WaitForInput(tab){
        window.addEventListener("keydown", (event) => this.AddInput(tab, event.code))

    }

    CreateKeybindsAdjustments(where){
        this.where = where
        this.selector = document.createElement("DIV")
        this.selector.setAttribute("class", "keybinds_selector")
        let header = document.createElement("SPAN")
        header.innerText = "keybinds"
        this.selector.appendChild(header)

        this.selector.appendChild(this.CreateTable(this.binds_jump, "jump"))
        this.selector.appendChild(this.CreateTable(this.binds_duck, "duck"))

        where.appendChild(this.selector)
    }

    CreateTable(tab, name){

        let column = document.createElement("DIV")
        column.setAttribute("class", "column")
        column.setAttribute("find", name)
        let header = document.createElement("DIV")
        header.setAttribute("class", "row")
        header.innerText = name
        column.appendChild(header)

        for(let i in tab){
            column.appendChild(this.CreateRow(tab[i].split("Key"), name))

        }
        this.add_input = document.createElement("div")
        this.add_input.setAttribute("class", "row")
        this.add_input.addEventListener("click", () => {this.WaitForInput(tab)})
        this.add_input.innerText = "add input"

        column.appendChild(this.add_input)

        return column;   
    }

    CreateRow(value, name){       //tworzy row z inputem
        let row = document.createElement("DIV")
        row.setAttribute("find", value)
        row.setAttribute("class", "row")
        row.innerText = value
        row.addEventListener("click", () => this.DeleteRow(value, name))   //usuwanie po kliknięciu

        return row;
    }

    DeleteRow(value, name){       //usuwa dany row

        console.log(name, value,  "div[find='"+ name +"'] div[find='"+ value +"']")
        document.querySelector("#popup .keybinds_selector div[find='"+ name +"'] div[find='"+ value +"']").remove()

        this.DeleteInput(value)
        return;
    }

}

let Keybinds = new KeybindsClass()
