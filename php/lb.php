<?php

error_reporting(0);
ob_start();
session_start();

$conn = mysqli_connect("localhost", "", "");     //łaczenie z bazą danych

if(!$conn){      //jak sie nie połączy
    die("Couldn't connect to database");
}



if( isset($_SESSION["login"]) ){
    $query = "select best_score from Users where username = " $_SESSION["login"];
    $result = mysqli_query($conn, $query);
    echo "<span> your best: ".  mysqli_fetch_assoc($result)["best_score"] ." </span>";
}else{
    echo "<span>LOGIN IN to set your score</span>";
}

$query = "select username, best_score from Users order by best_scores descending limit " . $_GET["limit"];
$result = mysqli_query($conn, $query);
if(mysqli_num_rows($result) > 0){
    $i = 1;

    echo "<table class='lb'>";
    echo "<th>";
    echo "<td> # </td>";
    echo "<td> username </td>";
    echo "<td> score </td>";
    echo "</th>";

    while($row = mysqli_fetch_assoc($result)){
        echo "<tr>";        //wyświetlanie tabeli
        echo "<td>". $i ."</td>";   //miejsce
        echo "<td>". $row["username"] ."</td>";     //nazwa użytkownika
        echo "<td>". $row["best_score"] ."</td>";       //wynik
        echo "</tr>";
        $i++;
    }

    echo "</table>";
        
}else{
    echo "No scores so far! <br> Be the first one to get it!";
}

$conn -> close(); 
