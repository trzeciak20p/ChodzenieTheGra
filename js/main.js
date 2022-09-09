const body = document.getElementsByTagName("body")
const nav = document.querySelectorAll("nav div")
const popup = document.getElementById("popup")

nav[0].addEventListener("click", () => {Popup(0)})  //Przypisywanie guzikom pokazywania pop-up'a  
nav[1].addEventListener("click", () => {Popup(1)})
nav[4].addEventListener("click", () => {Popup(2)})
nav[5].addEventListener("click", () => {Popup(3)})

document.getElementById("popup_close").addEventListener("click", () => {popup.style.display = "none"})  //Zamykanie pop-up'a

popup.addEventListener("click", () => { 
    let x = GetMousePos()[0]
    let y = GetMousePos()[1]
    if(x >= window.innerWidth * 0.3 && x <= window.innerWidth * 0.7 && y >= window.innerWidth * 0.2 && y <= window.innerHeight * 0.8){
    }else{
        popup.style.display = "none"
        
    }
    
})

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
    return [e.clientX, e.clientY];
}