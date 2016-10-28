app.controller('gameController', function($scope, $location, pokemonFactory, loginFactory){
    $scope.currentPokemonIdx = 0;
    var checkUser = function(callback){
        loginFactory.checkUser(function(data){
            console.log(data);
            $scope.user = data.data.user;
            currentPokemon = $scope.user.pokemons[$scope.currentPokemonIdx];
        })
        callback();
    }
    checkUser(function(){
        console.log($scope);
    });                   
    $scope.battlePartialUrl = 'partials/battle.html';
    $scope.randomPokemon = {};
    $scope.generateRandomPokemon = function(){
        console.log('generating random encounter pokemon');
        var randomPokeID = Math.floor(Math.random()*41);
        pokemonFactory.getNewPokemon(randomPokeID, function(data){
            console.log('received random pokemon.  Generating info')
            var randPokemon = {};
            var j,k;
            var done = false;
            randPokemon.name = data.data.name.toUpperCase();
            randPokemon.id = data.data.id;
            randPokemon.moves = [];
            randPokemon.types = [];
            randPokemon.abilities = [];
            randPokemon.hp = data.data.stats[5].base_stat;
            randPokemon.spd = data.data.stats[0].base_stat;
            randPokemon.def = data.data.stats[3].base_stat;
            randPokemon.atk = data.data.stats[4].base_stat;
            randPokemon.spcAtk = data.data.stats[2].base_stat;
            randPokemon.spcDef = data.data.stats[1].base_stat;
            randPokemon.lvl = 1;
            randPokemon.xp = 0;
            // Sounds //

            randPokemon.ogg = './assets/sounds/'+randPokemon.id+'.ogg';
            randPokemon.mp3 = './assets/sounds/'+randPokemon.id+'.mp3';
            for (j = 0; j<2; j++){
                pokemonFactory.getMove(data.data.moves[j].move.url, function(move){
                    randPokemon.moves.push(move.data);
                    if(randPokemon.moves.length === 2 && randPokemon.types.length === data.data.types.length && randPokemon.abilities.length === 1){
                        $scope.randomPokemon = randPokemon;
                        enemyPokemon = randPokemon;
                        console.log($scope.randomPokemon);
                        console.log('Enemy Pokemon is Ready!');
                        enemyReady = true;
                    }
                })
            };
            for (k = 0; k<data.data.types.length; k++){
                randPokemon.types.push(data.data.types[k].type.name);
                if(randPokemon.moves.length === 2 && randPokemon.types.length === data.data.types.length && randPokemon.abilities.length === 1){
                    $scope.randomPokemon = randPokemon;
                    enemyPokemon = randPokemon;
                    console.log($scope.randomPokemon);
                    console.log('Enemy Pokemon is Ready!');
                    enemyReady = true;
                }
            };
            pokemonFactory.getAbility(data.data.abilities[0].ability.url, function(ability){
                randPokemon.abilities.push(ability.data);
                if(randPokemon.moves.length === 2 && randPokemon.types.length === data.data.types.length && randPokemon.abilities.length === 1){
                    $scope.randomPokemon = randPokemon;
                    enemyPokemon = randPokemon;
                    console.log($scope.randomPokemon);
                    console.log('Enemy Pokemon is Ready!');
                    enemyReady = true;
                }
            });
        });
    };
    $scope.generateRandomPokemon();
    $scope.controllerLogPlayer = function(){
        console.log(currentPlayer);
    }
})