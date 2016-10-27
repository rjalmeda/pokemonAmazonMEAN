app.controller('gameController', function($scope, $location, pokemonFactory){
    $scope.gameTest = 'yay me';
    $scope.battlePartialUrl = 'partials/battle.html';
    $scope.battleTest = 'yay me 222222';
    $scope.randomPokemon = {};
    $scope.generateRandomPokemon = function(){
        console.log('generating random encounter pokemon');
        pokemonFactory.getNewPokemon(16, function(data){
            console.log('received random pokemon.  Generating info')
            var randPokemon = {};
            var j,k;
            var done = false;
            randPokemon.name = data.data.name.toUpperCase();
            randPokemon.id = data.data.id;
            randPokemon.moves = [];
            for (j = 0; j<2; j++){
                pokemonFactory.getMove(data.data.moves[j].move.url, function(move){
                    randPokemon.moves.push(move.data);
                    if (j >= 2 && k >= data.data.types.length && randPokemon.abilities.length === 1 && !done){
                        $scope.randomPokemon = randPokemon;
                        console.log(randPokemon);
                        console.log($scope.randomPokemon);
                    };
                })
            };
            randPokemon.types = [];
            for (k = 0; k<data.data.types.length; k++){
                randPokemon.types.push(data.data.types[k].type.name);
                if (j >= 2 && k >= data.data.types.length && randPokemon.abilities.length === 1 && !done){
                    $scope.randomPokemon = randPokemon;
                    console.log(randPokemon);
                    console.log($scope.randomPokemon);
                };
            };
            randPokemon.abilities = [];
            pokemonFactory.getAbility(data.data.abilities[0].ability.url, function(ability){
                randPokemon.abilities.push(ability.data);
                if (j >= 2 && k >= data.data.types.length && randPokemon.abilities.length === 1 && !done){
                    $scope.randomPokemon = randPokemon;
                    console.log(randPokemon);
                    console.log($scope.randomPokemon);
                };
            });
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
            console.log(randPokemon);
            console.log($scope.randomPokemon);
        });
    };
//    $scope.generateRandomPokemon();
})