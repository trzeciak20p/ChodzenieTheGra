<?php

if(!empty($_SESSION["username"]) && !empty($_GET["score"])){

    $result = $con -> query("select id, username, best_score from users"); 
    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            if($_SESSION["username"] == $row["username"] && $row["best_score"] < $_GET["score"]){
                $con -> query("update users set best_score = $_GET['score'] where id = $row['id']"); 
            }        
        }



}



