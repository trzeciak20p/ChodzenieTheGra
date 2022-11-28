
class Form{

    constructor(where){
        this.form = document.createElement("div")
        this.form.setAttribute("class", "form")
        this.CreateLoginForm()
        
        this.popup = document.createElement("div")
        this.popup.setAttribute("class", "popup")
        this.close_popup = document.createElement("div")
        this.close_popup.setAttribute("class", "close_popup")
        this.close_popup.addEventListener("click", this.HidePopup.bind(this))
        this.close_popup.innerText = "okay"
        where.appendChild(this.popup)
        this.popup.appendChild(this.close_popup)


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
        let temp_ShowPopup = this.ShowPopup.bind(this)
        if(this.purpose == "login"){
            
            this.req = new XMLHttpRequest();
	        this.req.open("GET", `php/login.php?login=${this.login.value}&password=${this.password.value}`);
            this.req.onload = function(){
		        console.log(this.responseText);
                temp_ShowPopup(this.responseText)
	        }
	        this.req.send();

        }else{
            
            this.req = new XMLHttpRequest();
	        this.req.open("GET", `php/register.php?login=${this.login.value}&password=${this.password.value}&password2=${this.password2.value}`);
            this.req.onload = function(){
		        console.log(this.responseText);
                temp_ShowPopup(this.responseText)
	        }
	        this.req.send();
        }

    }

    ShowPopup(text){
        this.popup.setAttribute("style", "display: flex;")
        this.popup.innerText = text
        this.popup.appendChild(this.close_popup)
    }

    HidePopup(){
        this.popup.setAttribute("style", "display: none;")
        console.log("ae")
    }

}
