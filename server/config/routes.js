var userController = require('./../controllers/userController.js');
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
};