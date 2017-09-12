var mongoose = require('mongoose');
var User = mongoose.model('User');
var Item = mongoose.model('Item');
var bcrypt = require('bcryptjs');
var Pokemon = mongoose.model('Pokemon');
var PokemonCache = mongoose.model('PokemonCache');
module.exports = (function(){
    return {
        checkPokemonCache: function(req, res){
            return res.json({})
        }
    }
})()