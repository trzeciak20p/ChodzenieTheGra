<?php

if(!empty($_GET["login"] && $_GET["password"])){

    // echo "login: " . $_GET["login"] . " hasło: " . $_GET["password"] . "  ";

    if(strlen($_GET["login"]) < 5){
        echo "za krótki login";
    }else if(strlen($_GET["password"]) < 5){
        echo "za krótke hasło";
    }else{      
            

    }


}else{
    echo "nie git";

}


