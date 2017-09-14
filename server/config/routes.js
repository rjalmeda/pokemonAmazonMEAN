var userController = require('./../controllers/userController.js');
var amazonController = require('./../controllers/amazonController.js');
var pokemonController = require('./../controllers/pokemonController.js');
module.exports = function(app){
    app.post('/login', function(req,res){
        userController.login(req,res);
    });
    app.get('/checkUser', function(req,res){
        userController.checkUser(req,res);
    });
    app.post('/popEgg', function(req,res){
        userController.popEgg(req,res);
    });
    app.post('/searchForItems', function(req,res){
        amazonController.searchForItems(req,res);
    });
    app.post('/addItemToDB', function(req,res){
        amazonController.addItemToDB(req,res);
    })
    app.post('/addItemToCart', function(req,res){
        amazonController.addItemToCart(req,res);
    })
    app.get('/displayCart', function(req,res){
        amazonController.displayCart(req,res);
    })
    app.get('/getNewPokemon/:pokeId', function(req,res){
        pokemonController.getNewPokemon(req,res);
    })
    app.post('/getMove', function(req,res){
        pokemonController.getMove(req,res);
    })
    app.post('/cachePokemon', function(req,res){
        pokemonController.cachePokemon(req,res);
    })
};