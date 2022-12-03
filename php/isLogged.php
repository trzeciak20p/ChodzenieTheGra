<?php

session_start();

if( !empty($_SESSION["username"]) ){
    echo "Logged in as: ". $_SESSION["username"];
}
