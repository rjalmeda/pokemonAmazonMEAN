app.controller('loginController', function($scope, $location, loginFactory){
    $scope.login = function(){
        if(!$scope.user){
            return alert('Please input a username');
        } else if (!$scope.user.username) {
            return alert('Please input a username');
        } else if ($scope.user.username.length < 5){
            return alert('Username is too short');
        } else if (!$scope.user.password){
            return alert('Password is empty');
        } else if ($scope.user.password.length < 6){
            return alert('Password is too short');
        } else {
            loginFactory.login($scope.user, function(data){
                currentPlayer = data.data.user

                $scope.user = {};
                if (!data.data.user){
                    return alert(data.data.message);
                };
                if (data.data.user.eggs.length > 0){
                    $location.url('/splash');
                } else if (data.data.user) {
                    $location.url('/world');
                } else {
                    return alert('what happened?');
                };
            })
        }
        
    };
});