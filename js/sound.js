
document.addEventListener("keydown", function (event) {     //chwilowy input do testowania bo Tone.js kinda weird           
    if (event.code == "Space") {   
        Tone.start()
    }
})

function Hitsound(){




}


const clock = new Tone.Clock(time => {
	console.log(time);
}, 1);

clock.start();

