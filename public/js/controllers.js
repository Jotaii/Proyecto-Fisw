var app = angular.module('MyApp', []);

app.controller('questionController', function($scope){

    //objeto pregunta
    $scope.pregunta = {
        id: 1,
        premisa: '¿Que shiushia?',
        culo: "Mett adentro porfavor"
    };

});

app.controller('mainController', function($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/')
        .success(function(data) {
            $scope.caca = "kisawea";

            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

});

function interigual(a,b,c,d){
    if (a == b || a == c ||
        a == d || b == c ||
        b == d || c == d){
        return true;
    }
    return false;
}

app.controller('testController', function($scope){
    $scope.igual = function() {
        if (interigual($scope.a1,$scope.b1,$scope.c1,$scope.d1)) {
            $scope.IsMatch=true;
            return false;
        }
        if (interigual($scope.a2,$scope.b2,$scope.c2,$scope.d2)) {
            $scope.IsMatch=true;
            return false;
        }
        if (interigual($scope.a3,$scope.b3,$scope.c3,$scope.d3)) {
            $scope.IsMatch=true;
            return false;
        }
        if (interigual($scope.a4,$scope.b4,$scope.c4,$scope.d4)) {
            $scope.IsMatch=true;
            return false;
        }
        if (interigual($scope.a5,$scope.b5,$scope.c5,$scope.d5)) {
            $scope.IsMatch=true;
            return false;
        }
        if (interigual($scope.a6,$scope.b6,$scope.c6,$scope.d6)) {
            $scope.IsMatch=true;
            return false;
        }
        if (interigual($scope.a7,$scope.b7,$scope.c7,$scope.d7)) {
            $scope.IsMatch=true;
            return false;
        }
        if (interigual($scope.a8,$scope.b8,$scope.c8,$scope.d8)) {
            $scope.IsMatch=true;
            return false;
        }
        if (interigual($scope.a9,$scope.b9,$scope.c9,$scope.d9)) {
            $scope.IsMatch=true;
            return false;
        }
        if (interigual($scope.a10,$scope.b10,$scope.c10,$scope.d10)) {
            $scope.IsMatch=true;
            return false;
        }
        if (interigual($scope.a11,$scope.b11,$scope.c11,$scope.d11)) {
            $scope.IsMatch=true;
            return false;
        }
        if (interigual($scope.a12,$scope.b12,$scope.c12,$scope.d12)) {
            $scope.IsMatch=true;
            return false;
        }
        $scope.IsMatch=false;
    }
    //objeto pregunta
    $scope.pregunta = {
        id: 1,
        premisa: '¿Que shiushia?',
        culo: "Mett adentro porfavor"
    };

});