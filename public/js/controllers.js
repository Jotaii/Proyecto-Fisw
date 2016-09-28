var app = angular.module('MyApp', []);


app.controller('questionController', function($scope){

    //objeto pregunta
    $scope.pregunta = {
        id: 1,
        premisa: '¿Que shiushia?',
        culo: "Mett adentro porfavor"
    };

});