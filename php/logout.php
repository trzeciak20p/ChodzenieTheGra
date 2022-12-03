<?php
session_start();

if( !empty($_SESSION["username"]) ){
    unset($_SESSION["username"]);
    echo "Logged out!";
}else{
    echo "You are already logged out";
}

