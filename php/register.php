<?php
session_start();

if(!empty($_GET["login"] && $_GET["password"] && $_GET["password2"])){
    // validation
    if(strlen($_GET["login"]) < 5){     
        echo "Too short login (at least 5 chars)";
    }else if(strlen($_GET["password"]) < 5){
        echo "Too short password (at least 5 chars)";
    }else if($_GET["password"] != $_GET["password2"]){    
        echo "The passwords differ";    
    }else{
         
        $con = new mysqli("localhost", "root", "", "chodzeniethegra");

        $result = $con -> query("select username from users"); 
        if($result -> num_rows > 0){
            $exist = false;
            while($row = $result -> fetch_assoc()) {
                if($_GET["login"] == $row["username"]){
                    $exist = true; 
                }        
            }

            if($exist){
                echo "This login is already taken!";
            }else{
                $con -> query("INSERT INTO users(username, password) values('". $_GET['login'] ."', '". $_GET['password'] ."')");
                $_SESSION["username"] = $_GET['login'];
                $_SESSION["password"] = $_GET['password'];
                echo "Registered!";
            }
        }
    
        $con -> close(); 
    }


}else{
    echo "Couldn't register";

}
