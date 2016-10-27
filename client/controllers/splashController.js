app.controller('splashController', function($scope, $location, loginFactory, pokemonFactory){
    $scope.newpokemons = [];
    
    var pokecry = function(id){
        
    };
    
    var checkUser = function(callback){
        loginFactory.checkUser(function(data){
            console.log(data);
            $scope.user = data.data.user
//            console.log($scope.user);
            if($scope.user.eggs.length>0){
                for (var i = 0; i<$scope.user.eggs.length; i++){
                    console.log('fetching');
                    pokemonFactory.getNewPokemon($scope.user.eggs[i], function(data){
                        var newpokemon = {};
                        var j,k;
                        var done = false;
                        newpokemon.name = data.data.name.toUpperCase();
                        newpokemon.id = data.data.id;
                        newpokemon.moves = [];
                        for (j = 0; j<2; j++){
                            pokemonFactory.getMove(data.data.moves[j].move.url, function(move){
                                newpokemon.moves.push(move.data);
                                if (j >= 2 && k >= data.data.types.length && newpokemon.abilities.length === 1 && !done){
                                    $scope.newpokemons.push(newpokemon);
                                    pokemonFactory.popEgg(newpokemon, function(data){
                                        console.log('registered new pokemon to user');
                                        console.log(data);
                                        done = true;
                                    })
                                };
                            })
                        };
                        newpokemon.types = [];
                        for (k = 0; k<data.data.types.length; k++){
                            newpokemon.types.push(data.data.types[k].type.name);
                            if (j >= 2 && k >= data.data.types.length && newpokemon.abilities.length === 1 && !done){
                                $scope.newpokemons.push(newpokemon);
                                pokemonFactory.popEgg(newpokemon, function(data){
                                    console.log('registered new pokemon to user');
                                    console.log(data);
                                    done = true;
                                })
                            };
                        };
                        newpokemon.abilities = [];
                        pokemonFactory.getAbility(data.data.abilities[0].ability.url, function(ability){
                            newpokemon.abilities.push(ability.data);
                            if (j >= 2 && k >= data.data.types.length && newpokemon.abilities.length === 1 && !done){
                                $scope.newpokemons.push(newpokemon);
                                pokemonFactory.popEgg(newpokemon, function(data){
                                    console.log('registered new pokemon to user');
                                    console.log(data);
                                    done = true;
                                })
                            };
                        });
                        newpokemon.hp = data.data.stats[5].base_stat;
                        newpokemon.spd = data.data.stats[0].base_stat;
                        newpokemon.def = data.data.stats[3].base_stat;
                        newpokemon.atk = data.data.stats[4].base_stat;
                        newpokemon.spcAtk = data.data.stats[2].base_stat;
                        newpokemon.spcDef = data.data.stats[1].base_stat;
                        newpokemon.lvl = 1;
                        newpokemon.xp = 0;
                        // Sounds //
                        
                        newpokemon.ogg = './assets/sounds/'+newpokemon.id+'.ogg';
                        newpokemon.mp3 = './assets/sounds/'+newpokemon.id+'.mp3';
                        console.log(newpokemon);
//                        $scope.newpokemons.push(newpokemon);
//                        pokemonFactory.popEgg(newpokemon, function(data){
//                            console.log('registered new pokemon to user');
//                            console.log(data);
//                        })
                    });
                }
            } else {
                $location.url('/lobby');
            }
        });
        
    };
    checkUser();
})