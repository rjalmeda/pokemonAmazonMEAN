app.factory('pokemonFactory', function($http){
    var factory = {};
    factory.getNewPokemon = function(pokeid, callback){

        $http.get(`http://pokeapi.co/api/v2/pokemon/${pokeid}`).then(function(data){

            callback(data);
        });
    };
    factory.getAbility = function(abilityUrl, callback){
        $http.get(abilityUrl).then(function(data){
            callback(data);
        })
    };
    factory.getMove = function(moveUrl, callback){
        $http.get(moveUrl).then(function(data){
            callback(data);
        })
    };
    factory.popEgg = function(pokemon, callback){
        $http.post('/popEgg', pokemon).then(function(data){
            callback(data);
        })
    };
    return factory;
});