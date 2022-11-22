
class KeybindsClass{

    constructor(){

        if (KeybindsClass.exists) {
            return KeybindsClass.instance;
        }

        this.binds_jump = ["KeyW", "ArrowUp"]
        this.binds_duck = ["KeyS", "ArrowDown"]


    }

    DeleteInput(tab, input){
        let index = tab.indexOf(input)
        if(index == -1){
            return;
        }
        tab.splice(index, 1)
    }

    AddInput(tab, input){
        if(tab.indexOf(input) != -1){
            return;
        }
        tab.push(input)
    }

    CreateKeybindsAdjustments(where){

        this.selector = document.createElement("DIV")
        this.selector.setAttribute("class", "keybinds_selector")
        this.CreateSelector(this.binds_duck)

        where.appendChild(this.selector)

    }

    CreateSelector(tab){

        let selector = document.createElement("select")

        for(let i in tab){
            // this.dictionary[this.data[String(i)]["name"]] = i       //słownik do wczytywania numerka motywu po nazwie
            // this.option = document.createElement("option")
            // this.option.innerText = i.key
            key =  new KeyboardEvent("keydown", , tab[i])

            console.log(tab[i],key.description)
            // selector.addEventListener("input", () => { this.ChangeTheme(this.dictionary[this.selector.value]) })       //zmiana motywu przy wybraniu
            // selector.appendChild(this.option)
        }

        return selector;
    }

}

let Keybinds = new KeybindsClass()
