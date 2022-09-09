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

const canvas = document.getElementById("main_canvas")

const ctx = canvas.getContext("2d")
CanvasResize()
window.addEventListener("resize", CanvasResize)





function CanvasResize(){
    console.log()
    canvas.setAttribute("height", window.innerHeight - 94)        
    canvas.setAttribute("width", window.innerWidth)
}

function Popup(button){
    popup.style.display = "flex"
    
    


}

function GetMousePos(){       
    let e = window.event
    p.x = e.clientX - Math.round(canvas.getBoundingClientRect().x)
    p.y = e.clientY - Math.round(canvas.getBoundingClientRect().y)
    s_p.x = p.x
    s_p.y = p.y
    // console.log("mouse: ", p.x, p.y)
}