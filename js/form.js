
class Form{

    constructor(where){
        this.form = document.createElement("div")
        this.form.setAttribute("class", "form")
        this.CreateLoginForm()
        // this.CreateRegisterForm()
        where.appendChild(this.form)
    }

    CreateLoginForm(){
        this.form.innerHTML = ""

        this.purpose = "login"
        this.CreateLogin()
        this.CreatePassword()
        
        this.CreateSubmitButton()
        this.CreateSwapText()
    }

    CreateRegisterForm(){
        this.form.innerHTML = ""

        this.purpose = "register"
        this.CreateLogin()
        this.CreatePassword()
        this.CreateSubmitButton()
        this.CreateSwapText()
    }

    CreateLogin(){          //tworzy pole na login
        this.login = document.createElement("INPUT")
        this.login.setAttribute("type", "text")
        let label = document.createElement("LABEL")
        if(this.purpose == "login"){
            label.innerText = "login"
        }else{
            label.innerText = "register"
        }
        label.appendChild(this.login)
        this.form.appendChild(label)

    }

    CreatePassword(){       //tworzy pole na hasłem
        this.password = document.createElement("INPUT")
        this.password.setAttribute("type", "text")
        let label = document.createElement("LABEL")
        label.innerText = "password"
        label.appendChild(this.password)
        console.log(this.password)
        this.form.appendChild(label)

        if(this.purpose == "register"){         //jeśli rejestracje to drugie pole na hasło do sprawdzenia poprawności
            this.password2 = document.createElement("INPUT")
            this.password2.setAttribute("type", "text")
            let label2 = document.createElement("LABEL")
            label2.innerText = "password"
            label2.appendChild(this.password2)
            this.form.appendChild(label2)
        }
    }

    CreateSubmitButton(){       //tworzy guzik do wysłania formularza
        this.submit_button = document.createElement("INPUT")
        this.submit_button.setAttribute("type", "button")
        this.submit_button.setAttribute("value", "submit")
        this.submit_button.addEventListener("click", this.Submit.bind(this))
        this.form.appendChild(this.submit_button)
    }

    CreateSwapText(){
        this.swap = document.createElement("DIV")
        this.swap.setAttribute("class", "swap")
        
        if(this.purpose == "login"){
            this.swap.innerText = "You have an account? Log in here!"
            this.swap.addEventListener("click", this.CreateRegisterForm.bind(this))
        }else{
            this.swap.innerText = "Don't have an account? Register now!"
            this.swap.addEventListener("click", this.CreateLoginForm.bind(this))
        }
        
        this.form.appendChild(this.swap)
    }

    Submit(){

        if(this.purpose = "login"){
            
            this.req = new XMLHttpRequest();
	        this.req.open("GET", `php/login.php?login=${this.password.value}&password=${this.password.value}`);
            this.req.onload = function(){
		        console.log(this.responseText);
	        }
	        this.req.send();


        }

        

    }

}
