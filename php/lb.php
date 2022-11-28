<?php

ob_start();
session_start();

$con = new mysqli("localhost", "root", "", "chodzeniethegra");     //łaczenie z bazą danych

if(!$con){      //jak sie nie połączy
    die("Couldn't connect to database");
}

if( isset($_SESSION["login"]) ){
    $query = "select best_score from users where username = " . $_SESSION["login"];
    $result = $con->query($query);
    echo "<span> your best: ".  mysqli_fetch_assoc($result)["best_score"] ." </span>";
}else{
    echo "<span>LOGIN IN to set your score</span>";
}

if(isset( $_GET["limit"])){
    $result = $con->query("select username, best_score from users descending order by best_score limit " . $_GET["limit"]);
}else{
    $result = $con->query("select username, best_score from users descending order by best_score limit 50 ");
}

if($result->num_rows > 0){
    $i = 1;

    echo "<table class='lb'>";
    echo "<tr>";
    echo "<th> # </th>";
    echo "<th> username </th>";
    echo "<th> score </th>";
    echo "</tr>";

    while($row = $result->fetch_assoc()){
        if($row["best_score"] != null){
            echo "<tr>";        //wyświetlanie tabeli
            echo "<td>". $i ."</td>";   //miejsce
            echo "<td>". $row["username"] ."</td>";     //nazwa użytkownika
            echo "<td>". $row["best_score"] ."</td>";       //wynik
            echo "</tr>";
            $i++;
        }     
    }
    echo "</table>";
        
    }else{
        echo "No scores so far! <br> Be the first one to get it!";
    }

$con -> close();
