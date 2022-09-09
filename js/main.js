const options = document.getElementById("options")
const body = document.getElementsByTagName("body")

const canvas = document.createElement("canvas")
document.getElementsByTagName("main")


document.addEventListener("resize", WidnowResize)





function WidnowResize(){
    canvas.height = body.height - 90     // wywalamy h nava   
    canvas.width = body.width
}


