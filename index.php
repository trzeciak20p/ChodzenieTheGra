<!DOCTYPE html>
<html lang="pl">

<head>

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Marek Trzeciak">
    <meta name="keywords" content="game rythm">
    <meta name="description" content="Some arcade rythm game similar to Muse Dash.">
    <meta name="robots" content="all">
    <title>Chodzenie the gra</title>
    <link rel="icon" href="graphics/icon.png">
    <link rel="stylesheet" href="css/style.css">

    
    <script src="JSON/theme.js"></script>
    <script src="js/Tone.js"></script>
    <script src="js/audioEffects.js"></script>
    <script src="js/sound.js" defer></script>
    <script src="js/form.js" defer></script>
    <script src="js/keybinds.js"></script>
    <script src="js/main.js" defer></script>
    <script src="js/theme.js" defer></script>
    <script src="js/objectile.js" defer></script>
    <script src="js/player.js" defer></script>
    <script src="js/time.js" defer></script>
    <script src="js/game.js" defer></script>
    

</head>

<body>

    <div id="popup">
        <div>
            <input id="popup_close" type="button" value="X"> 
        </div>
    </div>


    <nav>

        <div id="login"></div>
        <div id="customize">:3</div>
        <div id="bpm">50</div>
        <div id="score">0</div>
        <div id="lb"></div>
        <div id="options"></div>

    </nav>

    <main id="main">

        <canvas id="main_canvas" width="100vw"></canvas>

    </main>

</body>

</html>
