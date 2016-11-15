app.controller('gameController', function($scope, $location, pokemonFactory, loginFactory, amazonFactory){
    var checkUser = function(callback){
        loginFactory.checkUser(function(data){
            console.log(data);
            $scope.user = data.data.user;
            console.log($scope.user);
        })
        callback();
    }
    checkUser(function(){
 
    });
    
//    amazon product api sample query
    $scope.items = [];
    $scope.item = {};
//    $scope.item0; = "http://ecx.images-amazon.com/images/I/519SmJtgltL._SL160_.jpg";
    $scope.searchItem = function(query){
        console.log(query);
        amazonFactory.searchForItems(query, function(data){
            $scope.items = data.data.results;
        })
    };
    
    $scope.battlePartialUrl = 'partials/battle.html';
    
    var generateRandomPokemon = function(level, difficulty){
        console.log('generating random encounter pokemon');
        var randomPokeID = Math.floor(Math.random()*30+1);
        pokemonFactory.getNewPokemon(randomPokeID, function(data){
//            console.log('received random pokemon.  Generating info')
            var randPokemon = {};
            var j,k;
            var done = false;
            randPokemon.name = data.data.name.toUpperCase();
            randPokemon.id = data.data.id;
            randPokemon.moves = [];
            randPokemon.types = [];
            randPokemon.abilities = [];
            randPokemon.hp = data.data.stats[5].base_stat;
            randPokemon.currentHP = data.data.stats[5].base_stat;
            randPokemon.spd = data.data.stats[0].base_stat;
            randPokemon.def = data.data.stats[3].base_stat;
            randPokemon.atk = data.data.stats[4].base_stat;
            randPokemon.spcAtk = data.data.stats[2].base_stat;
            randPokemon.spcDef = data.data.stats[1].base_stat;
            randPokemon.lvl = level;
            randPokemon.xp = 0;
            // Sounds //

            randPokemon.ogg = './assets/sounds/'+randPokemon.id+'.ogg';
            randPokemon.mp3 = './assets/sounds/'+randPokemon.id+'.mp3';
            for (j = 0; j<2; j++){
                pokemonFactory.getMove(data.data.moves[j].move.url, function(move){
                    randPokemon.moves.push(move.data);
                    if(randPokemon.moves.length === 2 && randPokemon.types.length === data.data.types.length && randPokemon.abilities.length === 1){
                        console.log(randPokemon);
                        console.log('Enemy Pokemon is Ready!');
                        if (difficulty === 'low'){
                            $scope.enemyPokemonLow = randPokemon;
                        } else if (difficulty === 'mid'){
                            $scope.enemeyPokemonMid = randPokemon;
                        } else if (difficulty === 'high'){
                            $scope.enemyPokemonHigh = randPokemon;
                        } else {
                            $scope.enemyPokemonRandom = randPokemon;
                        };
                        console.log($scope);
                        return randPokemon;
                    }
                })
            };
            for (k = 0; k<data.data.types.length; k++){
                randPokemon.types.push(data.data.types[k].type.name);
                if(randPokemon.moves.length === 2 && randPokemon.types.length === data.data.types.length && randPokemon.abilities.length === 1){
                    console.log(randPokemon);
                    console.log('Enemy Pokemon is Ready!');
                    if (difficulty === 'low'){
                        $scope.enemyPokemonLow = randPokemon;
                    } else if (difficulty === 'mid'){
                        $scope.enemeyPokemonMid = randPokemon;
                    } else if (difficulty === 'high'){
                        $scope.enemyPokemonHigh = randPokemon;
                    } else {
                        $scope.enemyPokemonRandom = randPokemon;
                    };
                    console.log($scope);
                    return randPokemon;
                }
            };
            pokemonFactory.getAbility(data.data.abilities[0].ability.url, function(ability){
                randPokemon.abilities.push(ability.data);
                if(randPokemon.moves.length === 2 && randPokemon.types.length === data.data.types.length && randPokemon.abilities.length === 1){
                    console.log(randPokemon);
                    console.log('Enemy Pokemon is Ready!');
                    $scope.enemyPokemonLow = randPokemon;
                    if (difficulty === 'low'){
                        $scope.enemyPokemonLow = randPokemon;
                    } else if (difficulty === 'mid'){
                        $scope.enemeyPokemonMid = randPokemon;
                    } else if (difficulty === 'high'){
                        $scope.enemyPokemonHigh = randPokemon;
                    } else {
                        $scope.enemyPokemonRandom = randPokemon;
                    };

                    return randPokemon;
                }
            });
        });
    };
    $scope.enemyPokemonLow = {};
//    $scope.enemyPokemonMid = {};
//    $scope.enemyPokemonHigh = {};
//    $scope.enemyPokemonRandom = {};
    generateRandomPokemon(1, 'low');
//    generateRandomPokemon(2, 'mid');
//    generateRandomPokemon(5, 'high');
    
    // game Engine
    var pokemontype = {
        'normal':{
            'normal':1,
            'fire':1,
            'water':1,
            'electric':1,
            'grass':1,
            'ice':1,
            'fighting':1,
            'poison':1,
            'ground':1,
            'flying':1,
            'psychic':1,
            'bug':1,
            'rock':0.5,
            'ghost':0,
            'dragon':1,
            'dark':1,
            'steel':0.5,
            'fairy':1
        },
        'fire':{
            'normal':1,
            'fire':0.5,
            'water':0.5,
            'electric':1,
            'grass':2,
            'ice':2,
            'fighting':1,
            'poison':1,
            'ground':1,
            'flying':1,
            'psychic':1,
            'bug':2,
            'rock':0.5,
            'ghost':0,
            'dragon':1,
            'dark':1,
            'steel':0.5,
            'fairy':1
        },
        'water':{
            'normal':1,
            'fire':2,
            'water':0.5,
            'electric':1,
            'grass':0.5,
            'ice':1,
            'fighting':1,
            'poison':1,
            'ground':2,
            'flying':1,
            'psychic':1,
            'bug':1,
            'rock':2,
            'ghost':1,
            'dragon':0.5,
            'dark':1,
            'steel':2,
            'fairy':1
        },
        'electric':{
            'normal':1,
            'fire':1,
            'water':2,
            'electric':0.5,
            'grass':0.5,
            'ice':1,
            'fighting':1,
            'poison':1,
            'ground':0,
            'flying':2,
            'psychic':1,
            'bug':1,
            'rock':1,
            'ghost':1,
            'dragon':0.5,
            'dark':1,
            'steel':1,
            'fairy':1
        },
        'grass':{
            'normal':1,
            'fire':0.5,
            'water':2,
            'electric':1,
            'grass':0.5,
            'ice':1,
            'fighting':1,
            'poison':0.5,
            'ground':2,
            'flying':0.5,
            'psychic':1,
            'bug':0.5,
            'rock':2,
            'ghost':1,
            'dragon':0.5,
            'dark':1,
            'steel':0.5,
            'fairy':1
        },
        'ice':{
            'normal':1,
            'fire':0.5,
            'water':0.5,
            'electric':1,
            'grass':2,
            'ice':0.5,
            'fighting':1,
            'poison':1,
            'ground':2,
            'flying':2,
            'psychic':1,
            'bug':1,
            'rock':1,
            'ghost':1,
            'dragon':2,
            'dark':1,
            'steel':0.5,
            'fairy':1
        },
        'fighting':{
            'normal':2,
            'fire':1,
            'water':1,
            'electric':1,
            'grass':1,
            'ice':2,
            'fighting':1,
            'poison':0.5,
            'ground':1,
            'flying':0.5,
            'psychic':0.5,
            'bug':0.5,
            'rock':2,
            'ghost':0,
            'dragon':1,
            'dark':2,
            'steel':2,
            'fairy':0.5
        },
        'poison':{
            'normal':1,
            'fire':1,
            'water':1,
            'electric':1,
            'grass':2,
            'ice':1,
            'fighting':1,
            'poison':0.5,
            'ground':0.5,
            'flying':1,
            'psychic':1,
            'bug':1,
            'rock':0.5,
            'ghost':0.5,
            'dragon':1,
            'dark':1,
            'steel':0,
            'fairy':2
        },
        'ground':{
            'normal':1,
            'fire':2,
            'water':1,
            'electric':2,
            'grass':0.5,
            'ice':1,
            'fighting':1,
            'poison':2,
            'ground':1,
            'flying':0,
            'psychic':1,
            'bug':0.5,
            'rock':2,
            'ghost':1,
            'dragon':1,
            'dark':1,
            'steel':2,
            'fairy':1
        },
        'flying':{
            'normal':1,
            'fire':1,
            'water':1,
            'electric':0.5,
            'grass':2,
            'ice':1,
            'fighting':2,
            'poison':1,
            'ground':1,
            'flying':1,
            'psychic':1,
            'bug':2,
            'rock':0.5,
            'ghost':1,
            'dragon':1,
            'dark':1,
            'steel':0.5,
            'fairy':1
        },
        'psychic':{
            'normal':1,
            'fire':1,
            'water':1,
            'electric':1,
            'grass':1,
            'ice':1,
            'fighting':2,
            'poison':2,
            'ground':1,
            'flying':1,
            'psychic':0.5,
            'bug':1,
            'rock':1,
            'ghost':1,
            'dragon':1,
            'dark':0,
            'steel':0.5,
            'fairy':1
        },
        'bug':{
            'normal':1,
            'fire':0.5,
            'water':1,
            'electric':1,
            'grass':2,
            'ice':1,
            'fighting':0.5,
            'poison':0.5,
            'ground':1,
            'flying':0.5,
            'psychic':2,
            'bug':1,
            'rock':1,
            'ghost':0.5,
            'dragon':1,
            'dark':2,
            'steel':0.5,
            'fairy':0.5
        },
        'rock':{
            'normal':1,
            'fire':2,
            'water':1,
            'electric':1,
            'grass':1,
            'ice':2,
            'fighting':0.5,
            'poison':1,
            'ground':0.5,
            'flying':2,
            'psychic':1,
            'bug':2,
            'rock':1,
            'ghost':1,
            'dragon':1,
            'dark':1,
            'steel':0.5,
            'fairy':1
        },
        'ghost':{
            'normal':0,
            'fire':1,
            'water':1,
            'electric':1,
            'grass':1,
            'ice':1,
            'fighting':1,
            'poison':1,
            'ground':1,
            'flying':1,
            'psychic':2,
            'bug':1,
            'rock':1,
            'ghost':2,
            'dragon':1,
            'dark':0.5,
            'steel':1,
            'fairy':1
        },
        'dragon':{
            'normal':1,
            'fire':1,
            'water':1,
            'electric':1,
            'grass':1,
            'ice':1,
            'fighting':1,
            'poison':1,
            'ground':1,
            'flying':1,
            'psychic':1,
            'bug':1,
            'rock':1,
            'ghost':1,
            'dragon':2,
            'dark':1,
            'steel':1,
            'fairy':1
        },
        'dark':{
            'normal':1,
            'fire':1,
            'water':1,
            'electric':1,
            'grass':1,
            'ice':1,
            'fighting':0.5,
            'poison':1,
            'ground':1,
            'flying':1,
            'psychic':2,
            'bug':1,
            'rock':1,
            'ghost':2,
            'dragon':1,
            'dark':0.5,
            'steel':1,
            'fairy':0.5
        },
        'steel':{
            'normal':1,
            'fire':0.5,
            'water':0.5,
            'electric':0.5,
            'grass':1,
            'ice':2,
            'fighting':1,
            'poison':1,
            'ground':1,
            'flying':1,
            'psychic':1,
            'bug':1,
            'rock':2,
            'ghost':1,
            'dragon':1,
            'dark':1,
            'steel':0.5,
            'fairy':2
        },
        'fairy':{
            'normal':1,
            'fire':0.5,
            'water':1,
            'electric':1,
            'grass':1,
            'ice':1,
            'fighting':2,
            'poison':0.5,
            'ground':1,
            'flying':1,
            'psychic':1,
            'bug':1,
            'rock':1,
            'ghost':1,
            'dragon':2,
            'dark':2,
            'steel':0.5,
            'fairy':1
        }
    };
    var hitSound = new Audio('assets/music/fx/punch.mp3');
    var missSound = new Audio('assets/music/fx/miss.mp3');
    var attackerSound;
    var defenderSound;
    $scope.currentPokemonIdx = 0;
    
    function calcmultiplier(attacker,defender){
        var multiplier = 1;
        var atkarr = attacker.types;
        var defarr = defender.types;
        for (var atkkey in atkarr){
            var atk = atkarr[atkkey];
            console.log(atk)
            for (var defkey in defarr){
                var def = defarr[defkey]
                console.log(def)
                console.log(pokemontype[atk][def])
                multiplier = multiplier * pokemontype[atk][def];
            }
        };
        return multiplier;
    }
    
    function animate(atk_id,def_id){
        if (atk_id == 1){
            atk_mot1 = '+=25px';
            atk_mot2 = '-=25px';
            def_mot1 = '-=15px';
            def_mot2 = '+=15px';
        } else if (atk_id == 2) {
            atk_mot1 = '-=25px';
            atk_mot2 = '+=25px';
            def_mot1 = '+=15px';
            def_mot2 = '-=15px';
        } else { return false }
        angular.element('.pokemon'+atk_id+'img').animate({left: atk_mot1}, 70);
        setTimeout(function(){angular.element('.pokemon'+atk_id+'img').animate({left: atk_mot2},100)},120);
        angular.element('.pokemon'+def_id+'img').animate({left: def_mot1}, 20);
        setTimeout(function(){angular.element('.pokemon'+def_id+'img').animate({left: def_mot2},20)},30);
        setTimeout(function(){angular.element('.pokemon'+def_id+'img').animate({left: def_mot1},20)},60);
        setTimeout(function(){angular.element('.pokemon'+def_id+'img').animate({left: def_mot2},20)},90);
    };
    
    $scope.attack = function(who){
        if (who === 1){
            var attacker = $scope.user.pokemons[$scope.currentPokemonIdx];
            var defender = $scope.enemyPokemonLow;
            setTimeout(function(){animate(1, 2)},500);
            attackerSound = new Audio(attacker.mp3);
            defenderSound = new Audio(defender.mp3);
        } else {
            var defender = $scope.user.pokemons[$scope.currentPokemonIdx];
            var attacker = $scope.enemyPokemonLow;
            attackerSound = new Audio(attacker.mp3);
            defenderSound = new Audio(defender.mp3);
            setTimeout(function(){animate(2, 1)},500);
        }
        var multiplier = calcmultiplier(attacker, defender);
        if (multiplier == 0){
            angular.element('#status').prepend('Attack has no effect'+'\n');
        } else if (multiplier > 0 && multiplier < 1) {
            angular.element('#status').prepend('Attack is not effective'+'\n');
        } else if (multiplier > 1 && multiplier < 2) {
            angular.element('#status').prepend('Attack is effective'+'\n')
        } else if (multiplier >= 2) {
            angular.element('#status').prepend('Attack is super effective'+'\n')
        } else {
            angular.element('#status').prepend('\n')
        };
        if (defender.id == undefined){
            return (angular.element('#status').prepend(attacker.name+' already won.  Stop beating a dead pokemon. \n\n\n'));
        };
        if (attacker.id == undefined) {
            return (angular.element('#status').prepend('What are you doing '+attacker.name+'?  You already lost.\n'+defender.name+' already won. \n \n'));
        };
        console.log(defender.def);
        var atk = Math.floor(attacker.atk*attacker.atk/defender.def*multiplier*.25*(Math.random()*.5+.5));
        if (atk > 0){
            attackerSound.play();
            setTimeout(function(){hitSound.play();},500);
//            setTimeout(function(){defenderSound.play();},700);
        };
        if (atk <= 0){
            attackerSound.play();
            setTimeout(function(){missSound.play();},500);
//            setTimeout(function(){defenderSound.play();},700);
        };
        angular.element('#status').prepend(attacker.name+' does '+atk+' damage. \n');
        angular.element('#status').prepend(attacker.name+' attacks '+defender.name+'\n');
        defender.hp -= atk;
        angular.element('#current'+2+'hp').html(defender.hp);
    }
})