app.controller('splashController', function($scope, $location, loginFactory, pokemonFactory){
    $scope.newpokemons = [];
    
    var pokecry = function(id){
        
    };
    
    var checkUser = function(callback){
        loginFactory.checkUser(function(data){
            console.log(data);
            $scope.user = data.data.user
//            console.log($scope.user);
            
            var popAllEggs = function(index){
                var done = false;
                pokemonFactory.getNewPokemon($scope.user.eggs[index], function(data){
                    console.log(data);
                    var newpokemon = {};
                    newpokemon.name = data.data.name.toUpperCase();
                    newpokemon.id = data.data.id;
                    newpokemon.moves = [];
                    newpokemon.types = [];
                    newpokemon.abilities = [];
                    newpokemon.hp = data.data.stats[5].base_stat;
                    newpokemon.currentHP = data.data.stats[5].base_stat;
                    newpokemon.spd = data.data.stats[0].base_stat;
                    newpokemon.def = data.data.stats[3].base_stat;
                    newpokemon.atk = data.data.stats[4].base_stat;
                    newpokemon.spcAtk = data.data.stats[2].base_stat;
                    newpokemon.spcDef = data.data.stats[1].base_stat;
                    newpokemon.lvl = 1;
                    newpokemon.xp = 0;
                    newpokemon.ogg = './assets/sounds/'+newpokemon.id+'.ogg';
                    newpokemon.mp3 = './assets/sounds/'+newpokemon.id+'.mp3';
                    for (var j = 0; j<2; j++){
                        pokemonFactory.getMove(data.data.moves[j].move.url, function(move){
                            newpokemon.moves.push(move.data);
                            console.log('getting move - ', j+1);
                            if(j==1 && k == data.data.types.length && !done){
                                done = done;
                                pokemonFactory.popEgg(newpokemon, function(data){
                                    $scope.newpokemons.push(newpokemon);
                                    $scope.user = data.data.user;
                                    console.log(data);
                                    if($scope.user.eggs.length===0){
                                        console.log('moving to the world');
                                        console.log($location.url());
                                        $location.url('/world');
                                        
                                    }
                                })
                                
                            }
                        })
                    };
                    for (var k = 0; k<data.data.types.length; k++){
                        newpokemon.types.push(data.data.types[k].type.name);
                        if(j==2 && k == data.data.types.length - 1 && !done){
                            done = done;
                            pokemonFactory.popEgg(newpokemon, function(data){
                                $scope.newpokemons.push(newpokemon);
                                $scope.user = data.data.user;
                                console.log(data);
                                if(data.data.user.eggs.length === 0){
                                    console.log('trying to move to the world');
                                    console.log($location.url());
                                    $location.url('/world');                        
                                };
                            })
                        }
                    };
                    pokemonFactory.getAbility(data.data.abilities[0].ability.url, function(ability){
                        newpokemon.abilities.push(ability.data);
                    })
                })
            };
            
            for (var z = 0; z < $scope.user.eggs.length ; z++){
                popAllEggs(z);
            }
        });
        
    };
    checkUser();
})