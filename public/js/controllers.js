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