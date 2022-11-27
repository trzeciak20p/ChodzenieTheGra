<?php

if(!empty($_GET["login"] && $_GET["password"] && $_GET["password2"])){

    // echo "login: " . $_GET["login"] . " hasło: " . $_GET["password"] . $_GET["password2"] . "  ";

    if(strlen($_GET["login"]) < 5){
        echo "za krótki login";
    }else if(strlen($_GET["password"]) < 5){
        echo "za krótke hasło";
    }else if($_GET["password"] != $_GET["password2"]){      
        echo "hasła sie różnią";    
    }else{
        echo "git";

        session_start();
        $con = new mysqli("localhost", "root", "");


        $req = `INSERT INTO users (" ", {$_GET["login"]}, {$_GET["password"]})`;
        $con -> query($req); 





    }


}else{
    echo "nie git";

}
