$(document).ready(function(){
//    Animation rate limiter
    var stop = false;
    var frameCount = 0;
    var $results = $("#results");
    var fps, fpsInterval, startTime, now, then, elapsed;

    // initialize the timer variables and start the animation

    function startAnimating(fps) {
        fpsInterval = 1000 / fps;
        then = Date.now();
        startTime = then;
        animate();
    }
    
    function animate() {

        // request another frame
        
        requestAnimationFrame(animate);
        // calc elapsed time since last loop

        now = Date.now();
        elapsed = now - then;

        // if enough time has elapsed, draw the next frame

        if (elapsed > fpsInterval) {

            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            then = now - (elapsed % fpsInterval);
            // Put your drawing code here
            displayWorld();
            movePlayer();
            if(document.getElementById('player') === null){
                animate = '';
            }
            if(document.getElementById('player').style.left){
                displayPlayer();
            }
        }
    }
    
    
    var maps = [
        [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ] ,
        [  
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,13,14,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,15,16,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,17,18,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,4,5,6,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,7,8,9,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,7,8,9,1,1,1,1,1],
            [1,1,1,1,1,1,2,2,2,1,1,1,7,8,9,1,1,1,1,1],
            [1,1,1,1,1,1,2,2,2,1,1,1,7,8,9,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,7,8,9,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,7,8,9,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,10,11,12,1,1,1,1,1],
            [1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ]   
    ];
    var currentMap = 1;
    var world = maps[currentMap];
    console.log(maps[currentMap][0][0]);
    var displayWorld = function() {
        var worldOutput = '';
        for (var i=0; i<world.length; i++){
            worldOutput += '<div class="row">';
            for (var j=0; j<world[i].length; j++){
                if(world[i][j]==0) worldOutput += '<div class="empty standardTile"></div>';
                if(world[i][j]==1) worldOutput += '<div class="grass standardTile"></div>';
                if(world[i][j]==2) worldOutput += '<div class="tallGrass standardTile"><div class="tallGrassBottom"></div></div>';
                if(world[i][j]==3) worldOutput += '<div class="tree standardTile"></div>';
                if(world[i][j]==4) worldOutput += '<div class="pathTopLeft standardTile"></div>';
                if(world[i][j]==5) worldOutput += '<div class="pathTop standardTile"></div>';
                if(world[i][j]==6) worldOutput += '<div class="pathTopRight standardTile"></div>';
                if(world[i][j]==7) worldOutput += '<div class="pathLeft standardTile"></div>';
                if(world[i][j]==8) worldOutput += '<div class="pathMiddle standardTile"></div>';
                if(world[i][j]==9) worldOutput += '<div class="pathRight standardTile"></div>';
                if(world[i][j]==10) worldOutput += '<div class="pathBottomLeft standardTile"></div>';
                if(world[i][j]==11) worldOutput += '<div class="pathBottom standardTile"></div>';
                if(world[i][j]==12) worldOutput += '<div class="pathBottomRight standardTile"></div>';
                if(world[i][j]==13) worldOutput += '<div class="grass standardTile"><div class="houseTopLeft standardTile"></div></div>';
                if(world[i][j]==14) worldOutput += '<div class="grass standardTile"><div class="houseTopRight standardTile"></div></div>';
                if(world[i][j]==15) worldOutput += '<div class="grass standardTile"><div class="houseLeft standardTile"></div></div>';
                if(world[i][j]==16) worldOutput += '<div class="grass standardTile"><div class="houseRight standardTile"></div></div>';
                if(world[i][j]==17) worldOutput += '<div class="grass standardTile"><div class="houseDoor standardTile"><div class="houseBottomLeft standardTile"></div></div></div>';
                if(world[i][j]==18) worldOutput += '<div class="grass standardTile"><div class="houseBottomRight standardTile"></div></div>';
            }
            worldOutput += '</div>';
        }
        $('div.world').html(worldOutput);
    };
    displayWorld();
    
    var passable = [1,2,4,5,6,7,8,9,10,11,12,13,14,17];
    
    var wherePlayer = {
        movingX: false,
        movingY: false,
        lastDirX: 'right',
        lastDirY: 'down',
        lastDir: 'down',
        x: 0,
        y: 0
    };
    
    var encounterRate = 15;
//    encounterRate out of 100
    
    var playerSurroundings = [[0,0,0],
                              [0,'P',1],
                              [0,1,1]];
    
    var lookLeft = function(){
        for (var i = 0; i < passable.length; i++){
            if (playerSurroundings[1][0] === passable[i]){
                return true;
            }
        }
        return false;
    }
    var lookRight = function(){
        for (var i = 0; i < passable.length; i++){
            if (playerSurroundings[1][2] === passable[i]){
                return true;
            }
        }
        return false;
    }
    var lookUp = function(){
        for (var i = 0; i < passable.length; i++){
            if (playerSurroundings[0][1] === passable[i]){
                return true;
            }
        }
        return false;
    }
    var lookDown = function(){
        for (var i = 0; i < passable.length; i++){
            if (playerSurroundings[2][1] === passable[i]){
                return true;
            }
        }
        return false;
    }
    
//    
//    playerSurroundings  [A][D],[A][E],[A][F]
//                        [B][D],[B][E],[B][F]
//                        [C][D],[C][D],[C][F]
//    
//    posA = pY-1;
//    posB = pY;
//    posC = pY+1;
//    
//    posD = pX-1;
//    posE = pX;
//    posF = pX+1;
    
    var probed = true;
    
    var probeSurroundings = function(posX, posY, callback){
        probed = true;
        var pX = posX/32;
        var pY = posY/32;
        try {
            playerSurroundings[0][0] = maps[currentMap][pY-1][pX-1];
            if (playerSurroundings[0][0] === null){
                playerSurroundings[0][0] = 0;
            }
            if (playerSurroundings[0][0] == undefined){
                playerSurroundings[0][0] = 0;
            }
        }
        catch(err){
            playerSurroundings[0][0] = 0;
        }
        try {
            playerSurroundings[0][1] = maps[currentMap][pY-1][pX];
            if (playerSurroundings[0][1] === null){
                playerSurroundings[0][1] = 0;
            }
            if (playerSurroundings[0][1] == undefined){
                playerSurroundings[0][1] = 0;
            }
        }
        catch(err){
            playerSurroundings[0][1] = 0;
        }
        try {
            playerSurroundings[0][2] = maps[currentMap][pY-1][pX+1];
            if (playerSurroundings[0][2] === null){
                playerSurroundings[0][2] = 0;
            }
            if (playerSurroundings[0][2] == undefined){
                playerSurroundings[0][2] = 0;
            }
        }
        catch(err){
            playerSurroundings[0][2] = 0;
        }
        try {
            playerSurroundings[1][0] = maps[currentMap][pY][pX-1];
            if (playerSurroundings[1][0] === null){
                playerSurroundings[1][0] = 0;
            }
            if (playerSurroundings[1][0] == undefined){
                playerSurroundings[1][0] = 0;
            }
        }
        catch(err){
            playerSurroundings[1][0] = 0;
        }
        try {
            playerSurroundings[1][1] = maps[currentMap][pY][pX];
        }
        catch(err){
            playerSurroundings[1][1] = 0;
        }
        try {
            playerSurroundings[1][2] = maps[currentMap][pY][pX+1];
            if (playerSurroundings[1][2] === null){
                playerSurroundings[1][2] = 0;
            }
            if (playerSurroundings[1][2] == undefined){
                playerSurroundings[1][2] = 0;
            }
        }
        catch(err){
            playerSurroundings[1][2] = 0;
        }
        try {
            playerSurroundings[2][0] = maps[currentMap][pY+1][pX-1];
            if (playerSurroundings[2][0] === null){
                playerSurroundings[2][0] = 0;
            }
            if (playerSurroundings[2][0] == undefined){
                playerSurroundings[2][0] = 0;
            }
        }
        catch(err){
            playerSurroundings[2][0] = 0;
        }
        try {
            playerSurroundings[2][1] = maps[currentMap][pY+1][pX];
            if (playerSurroundings[2][1] === null){
                playerSurroundings[2][1] = 0;
            }
            if (playerSurroundings[2][1] == undefined){
                playerSurroundings[2][1] = 0;
            }
        }
        catch(err){
            playerSurroundings[2][1] = 0;
        }
        try {
            playerSurroundings[2][2] = maps[currentMap][pY+1][pX+1];
            if (playerSurroundings[2][2] === null){
                playerSurroundings[2][2] = 0;
            }
            if (playerSurroundings[2][2] == undefined){
                playerSurroundings[2][2] = 0;
            }
        }
        catch(err){
            playerSurroundings[2][2] = 0;
        }
        return callback();
    };
    probeSurroundings(0, 0, function(){
        console.log('initial probe');
    });
    var displayPlayer = function(){
        document.getElementById('player').style.left = wherePlayer.x+'px';
        document.getElementById('player').style.top = wherePlayer.y+'px';
    };
    displayPlayer();
    
    var movePlayer = function(){
        if(wherePlayer.movingX && !wherePlayer.movingY && wherePlayer.y%32 === 0){
            if(wherePlayer.movingX === 'left'){
                if(lookLeft()){
                    wherePlayer.x -= 4;
                    if(!($('#player').css('animation')=='walk-left 0.4s steps(3) infinite')){
                        $('#player').css('animation', 'walk-left 0.4s steps(3) infinite');
                    }
                    if(probed){
                       probed=false;
                    }
                }
            }
            if(wherePlayer.movingX === 'right'){
                if(lookRight()){
                    wherePlayer.x += 4;
                    if(!($('#player').css('animation')=='walk-right 0.4s steps(3) infinite')){
                        $('#player').css('animation', 'walk-right 0.4s steps(3) infinite');
                    }
                    if(probed){
                       probed=false;
                    }
                }
            }
        }
        if(wherePlayer.movingY && !wherePlayer.movingX && wherePlayer.x%32 === 0){
            if(wherePlayer.movingY === 'up'){
                if(lookUp()){
                    wherePlayer.y -= 4;
                    if(!($('#player').css('animation')=='walk-up 0.4s steps(3) infinite')){
                        $('#player').css('animation', 'walk-up 0.4s steps(3) infinite');
                    }
                    if(probed){
                       probed=false;
                    }
                }
            }
            if(wherePlayer.movingY === 'down'){
                if(lookDown()){
                    wherePlayer.y += 4;
                    if(!($('#player').css('animation')=='walk-down 0.4s steps(3) infinite')){
                        $('#player').css('animation', 'walk-down 0.4s steps(3) infinite');
                    }
                    if(probed){
                       probed=false;
                    }
                }
            }
        }
        if (!wherePlayer.movingX){
            if(!(wherePlayer.x%32===0)){
                if(wherePlayer.lastDirX === 'left'){
                    wherePlayer.x -= 4;
                } else if (wherePlayer.lastDirX === 'right'){
                    wherePlayer.x += 4;
                }
            }
        }
        if (!wherePlayer.movingY){
            if(!(wherePlayer.y%32 === 0)){
                if(wherePlayer.lastDirY === 'up'){
                    wherePlayer.y -= 4;
                } else if (wherePlayer.lastDirY === 'down'){
                    wherePlayer.y += 4;
                }
            }
        }
        if (!wherePlayer.movingY && !wherePlayer.movingX && wherePlayer.x%32 === 0 && wherePlayer.y%32 === 0){
            if(wherePlayer.lastDir === 'left'){
                $('#player').css('animation', 'stand-left 2.0s steps(1) infinite')
            } else if(wherePlayer.lastDir === 'up'){
                $('#player').css('animation', 'stand-up 2.0s steps(1) infinite')
            } else if(wherePlayer.lastDir === 'right'){
                $('#player').css('animation', 'stand-right 2.0s steps(1) infinite')
            } else if(wherePlayer.lastDir === 'down'){
                $('#player').css('animation', 'stand-down 2.0s steps(1) infinite')
            }
        }
        
        if (wherePlayer.x%32 === 0 && wherePlayer.y%32 === 0 && !probed){
            probeSurroundings(wherePlayer.x, wherePlayer.y, function(){
                if (playerSurroundings[1][1] === 2){
                    var encounter = Math.floor(Math.random()*101);
                    if (encounter < encounterRate){
                        alert('pokemon attacks!')
//                        if encounter is less than the encounter Rate run PokemonEncounter function
//                        before PokemonEncounter function runs, disable directional controls and 
//                        use only mouse controls.  show hidden fight screen.  after fight is successful
//                        hide fight screen and re enable directional controls
                    }
                }
            });
        }
    };
    
    document.onkeydown = function(e){
        if(e.keyCode==37){
            if(!wherePlayer.movingLeft && !wherePlayer.movingUp && !wherePlayer.movingRight && !wherePlayer.movingDown ){
                wherePlayer.movingX = 'left';
            }
        };
        if(e.keyCode==38){
            if(!wherePlayer.movingLeft && !wherePlayer.movingUp && !wherePlayer.movingRight && !wherePlayer.movingDown ){
                wherePlayer.movingY = 'up';
            }
        };
        if(e.keyCode==39){
            if(!wherePlayer.movingLeft && !wherePlayer.movingUp && !wherePlayer.movingRight && !wherePlayer.movingDown ){
                wherePlayer.movingX = 'right';
            }
        };
        if(e.keyCode==40){
            if(!wherePlayer.movingLeft && !wherePlayer.movingUp && !wherePlayer.movingRight && !wherePlayer.movingDown ){
                wherePlayer.movingY = 'down';
            }
        };
    };
    
    document.onkeyup = function(e){
        if(e.keyCode==37){
            wherePlayer.movingX = false;
            wherePlayer.lastDirX = 'left';
            wherePlayer.lastDir = 'left';
        };
        if(e.keyCode==38){
            wherePlayer.movingY = false;
            wherePlayer.lastDirY = 'up';
            wherePlayer.lastDir = 'up';
        };
        if(e.keyCode==39){
            wherePlayer.movingX = false;
            wherePlayer.lastDirX = 'right';
            wherePlayer.lastDir = 'right';
        };
        if(e.keyCode==40){
            wherePlayer.movingY = false;
            wherePlayer.lastDirY = 'down';
            wherePlayer.lastDir = 'down';
        };
    };
    startAnimating(30);
})