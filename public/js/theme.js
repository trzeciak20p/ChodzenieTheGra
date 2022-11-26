
class ThemeClass{

    constructor(){

        if (ThemeClass.exists) {
            return ThemeClass.instance;
        }

        this.theme = 1
        this.dictionary = {}
        this.data
        this.bg_color
        this.nav_1st 
        this.nav_2nd
        this.font

        this.ChangeTheme(1)
    }

    ThemeSelector(where){       //Tworzy selector z dostępnymi motywami

        this.selector = document.createElement("select")
        
        this.data = JSON.parse(theme_data)

        for(let i in this.data){
            this.dictionary[this.data[String(i)]["name"]] = i       //słownik do wczytywania numerka motywu po nazwie
            this.option = document.createElement("option")
            this.option.innerText = this.data[String(i)]["name"]

            this.selector.addEventListener("input", () => { this.ChangeTheme(this.dictionary[this.selector.value]) })       //zmiana motywu przy wybraniu
            this.selector.appendChild(this.option)
        }
        let label = document.createElement("label")
        label.setAttribute("class", "theme_selector")
        label.innerText = "theme"
        label.append(this.selector)
        where.append(label)
    }

    ChangeTheme(theme){     //zmiana tła
        this.theme = theme
        this.GetTheme()
        
        document.documentElement.style.setProperty('--bg_color', this.bg_color);        //ogólne wartości
        document.documentElement.style.setProperty('--nav_1st', this.nav_1st);
        document.documentElement.style.setProperty('--nav_2nd', this.nav_2nd);
        document.documentElement.style.setProperty('--font', this.font);
        document.documentElement.style.setProperty('--popup_bg', this.popup_bg);
        //NAV
        document.documentElement.style.setProperty('--login_img', this.data["login_img"])
        document.documentElement.style.setProperty('--login_img_hover', this.data["login_img_hover"])
        document.documentElement.style.setProperty('--lb_img', this.data["lb_img"])
        document.documentElement.style.setProperty('--lb_img_hover', this.data["lb_img_hover"])
        document.documentElement.style.setProperty('--settings_img', this.data["settings_img"])
        document.documentElement.style.setProperty('--settings_img_hover', this.data["settings_img_hover"])
        
    }

    GetTheme(){     

        this.data = JSON.parse(theme_data)[String(this.theme)]      //pobieranie danych z json'a

        this.bg_color = this.data["bg_color"]       //przypisywanie danych
        this.nav_1st = this.data["nav_1st"]
        this.nav_2nd = this.data["nav_2nd"]
        this.font = this.data["font"]
        this.popup_bg = this.data["popup_bg"]
    }



}

let Theme = new ThemeClass()