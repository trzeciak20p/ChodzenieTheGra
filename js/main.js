const body = document.getElementsByTagName("body")
const nav = document.querySelectorAll("nav div")
const popup = document.getElementById("popup")

nav[0].addEventListener("click", () => {Popup(0)})  //Przypisywanie guzikom pokazywania pop-up'a  
nav[1].addEventListener("click", () => {Popup(1)})
nav[4].addEventListener("click", () => {Popup(2)})
nav[5].addEventListener("click", () => {Popup(3)})

document.getElementById("popup_close").addEventListener("click", () => {popup.style.display = "none"})  //Zamykanie pop-up'a

// popup.addEventListener("click", () => {      MAke it work somehow
//     if(self.id == "popup"){
//         popup.style.display = "none"
//     }
// })

const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")

document.addEventListener("resize", WidnowResize)





function WidnowResize(){
    canvas.height = body.height - 90     // wywalamy h nava   
    canvas.width = body.width           //nwm czy usefull wgl chyba ta wsm bo zapomniałem że go nawet nie dodaje jeszcze na stronie
}

function Popup(button){
    popup.style.display = "flex"
    
    


}
