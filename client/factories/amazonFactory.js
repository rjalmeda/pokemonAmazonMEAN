app.factory('amazonFactory', function($http){
    var factory = {};
    factory.searchForItems = function(query, callback){
        $http.post('/searchForItems', query).then(function(data){
            callback(data);
        })
    }
    return factory;
})