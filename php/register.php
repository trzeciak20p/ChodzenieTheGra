<?php
session_start();

if(!empty($_GET["login"] && $_GET["password"] && $_GET["password2"])){

    // echo "login: " . $_GET["login"] . " hasło: " . $_GET["password"] . $_GET["password2"] . "  ";

    if(strlen($_GET["login"]) < 5){
        echo "za krótki login";
    }else if(strlen($_GET["password"]) < 5){
        echo "za krótke hasło";
    }else if($_GET["password"] != $_GET["password2"]){      
        echo "hasła sie różnią";    
    }else{
         
        $con = new mysqli("localhost", "root", "");
        $con -> query("use chodzeniethegra");

        $req = "INSERT INTO users(username, password) values(" .$_GET['login']. ", " .$_GET['password'].  " )";
        echo $req ;
        $con -> query($req); 
        $con -> close();

        $_SESSION["username"] = $_GET['login'];
        $_SESSION["password"] = $_GET['password'];
        
        echo "łatwo";
    }


}else{
    echo "nie git";

}
