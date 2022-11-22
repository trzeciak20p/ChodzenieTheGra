
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




}

let Keybinds = new KeybindsClass()
