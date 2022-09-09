const options = document.getElementById("options")
const body = document.getElementsByTagName("body")

const c = document.createElement("canvas")
document.getElementsByTagName("main")


document.addEventListener("resize", ZmianaRozmiaru)

function ZmianaRozmiaru(){
    c.height = body.height * 0.88     // wywalamy h nava   
    c.width = body.width
}
