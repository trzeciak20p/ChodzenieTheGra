<?php
session_start();

if(!empty($_SESSION["username"]) && !empty($_GET["score"]) ){

    $con = new mysqli("localhost", "root", "", "chodzeniethegra");
    
    $result = $con -> query("select id, username, best_score from users where username = ". $_SESSION["username"]); 
    $row = $result->fetch_assoc();

    if( $row["best_score"] < $_GET["score"] || $row["best_score"] == null){
        echo "update users set best_score = ". $_GET['score'] ." where id = ". $row['id'];

        $con -> query("update users set best_score = ". $_GET['score'] ." where id = ". $row['id']); 
    }else{
        echo "ae";
    }        

}


if(empty($_GET["score"])){
    echo "no score";
}
if(empty($_SESSION["username"])){
    echo "aaae";
}
