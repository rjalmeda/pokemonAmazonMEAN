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
                        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
                    ]   
                ];
    var world = maps[0];
    
    var displayWorld = function() {
        var worldOutput = '';
        for (var i=0; i<world.length; i++){
            worldOutput += '<div class="row">';
            for (var j=0; j<world[i].length; j++){
                if(world[i][j]==0) worldOutput += '<div class="empty standardTile"></div>';
                if(world[i][j]==1) worldOutput += '<div class="grass standardTile"></div>';
                if(world[i][j]==2) worldOutput += '<div class="grass standardTile"></div>';
                if(world[i][j]==3) worldOutput += '<div class="rock standardTile"></div>';
                if(world[i][j]==4) worldOutput += '<div class="path standardTile"></div>';
                if(world[i][j]==5) worldOutput += '<div class="wall standardTile"></div>';
                if(world[i][j]==9) worldOutput += '<div id="player" class="player standardTile"></div>';
            }
            worldOutput += '</div>';
        }
        $('div.world').html(worldOutput);
    };
    displayWorld();
    
    var wherePlayer = {
        movingX: false,
        movingY: false,
        lastDirX: 'right',
        lastDirY: 'down',
        x: 0,
        y: 0
    };
    
    var displayPlayer = function(){
        document.getElementById('player').style.left = wherePlayer.x+'px';
        document.getElementById('player').style.top = wherePlayer.y+'px';
    };
    displayPlayer();
    
    var movePlayer = function(){
        if(wherePlayer.movingX && !wherePlayer.movingY && wherePlayer.y%32 === 0){
            if(wherePlayer.movingX === 'left'){
                wherePlayer.x -= 4;
                if(!($('#player').css('animation')=='walk-left 0.4s steps(3) infinite')){
                    $('#player').css('animation', 'walk-left 0.4s steps(3) infinite');
                }
            }
            if(wherePlayer.movingX === 'right'){
                wherePlayer.x += 4;
                if(!($('#player').css('animation')=='walk-right 0.4s steps(3) infinite')){
                    $('#player').css('animation', 'walk-right 0.4s steps(3) infinite');
                }
            }
        }
        if(wherePlayer.movingY && !wherePlayer.movingX && wherePlayer.x%32 === 0){
            if(wherePlayer.movingY === 'up'){
                wherePlayer.y -= 4;
                if(!($('#player').css('animation')=='walk-up 0.4s steps(3) infinite')){
                    $('#player').css('animation', 'walk-up 0.4s steps(3) infinite');
                }
            }
            if(wherePlayer.movingY === 'down'){
                wherePlayer.y += 4;
                if(!($('#player').css('animation')=='walk-down 0.4s steps(3) infinite')){
                    $('#player').css('animation', 'walk-down 0.4s steps(3) infinite');
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

    document.onkeypress = function(e){
        console.log(e);
    };
    startAnimating(30);
})