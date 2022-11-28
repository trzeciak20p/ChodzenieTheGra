<?php

if(!empty($_GET["login"] && $_GET["password"])){

    $con = new mysqli("localhost", "root", "", "chodzeniethegra");

    $result = $con -> query("select username, password from users"); 
    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()) {
            $qol = true;
            if($_GET["login"] == $row["username"]){
                if($_GET["password"] == $row["password"]){
                    echo "Logged in!";
                    $_SESSION["username"] = $_GET['login'];
                    $_SESSION["password"] = $_GET['password'];
                    $qol = false;
                    break;
                }else{
                    echo "Wrong password!";
                }
                $qol = false;
            }        
        }

        if($qol){
            echo "This loggin does not exist!";
        }

    }else{
        echo "!err no results";
    }
    
    $con -> close();

}else{
    echo "Ale weź wprowadź dane :|";

}
