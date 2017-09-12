var mongoose = require('mongoose');
var PokemonCacheModel = mongoose.Schema({
    name: String,
    id: Number,
    data: Object
})
mongoose.model('PokemonCache', PokemonCacheModel);