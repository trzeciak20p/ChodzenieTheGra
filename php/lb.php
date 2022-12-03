<?php

session_start();

$con = new mysqli("localhost", "root", "", "chodzeniethegra");

if(!$con){ 
    die("Couldn't connect to database");
}

if( isset($_SESSION["username"]) ){

    $result = $con->query("select best_score from users where username = '" . $_SESSION['username'] ."'");
    $row = $result -> fetch_assoc();
    if($result -> num_rows != 1) {
        echo "<span>Error occured when trying to get your best score :c</span>";
    }else if($row["best_score"] == null){
        echo "<span>You have no score yet<br/>Go change it!</span>";
    }else{
        echo "<span> your best: ".  $row["best_score"]." </span>";
    }
    
}else{
    echo "<span>LOGIN IN to set your score</span>";     //dodać otwieranie logowania
}

if(isset( $_GET["limit"])){    //sets limit to displayed rows 
    $result = $con->query("select username, best_score from users order by users.best_score desc limit " . $_GET["limit"]);
}else{      //default display limit
    $result = $con->query("select username, best_score from users order by users.best_score desc limit 50 ");
}

if($result->num_rows > 0){
    $place = 1;  

    echo "<table class='lb'>";
    echo "<tr>";
    echo "<th> # </th>";
    echo "<th> username </th>";
    echo "<th> score </th>";
    echo "</tr>";

    while($row = $result->fetch_assoc()){
        if($row["best_score"] != null){     //checking if player had set score
            echo "<tr>";        
            echo "<td>". $place ."</td>";
            echo "<td>". $row["username"] ."</td>";
            echo "<td>". $row["best_score"] ."</td>"; 
            echo "</tr>";
            $place++;
        }     
    }
    echo "</table>";

}else{
    echo "No scores so far! <br> Be the first one to get it!";
}

$con -> close();
