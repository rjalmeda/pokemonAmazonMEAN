var mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PASS}@ds149201.mlab.com:49201/pokemonmean`);
var path = require('path');
var fs = require('fs');
var models_path = path.join(__dirname, './../models');
fs.readdirSync(models_path).forEach(function(file){
    if(file.indexOf('.js') >= 0){
        require(path.join(models_path, file));
    };
});