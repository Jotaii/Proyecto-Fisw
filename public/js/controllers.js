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

app.controller('AddContCtrl', function($scope){

    $scope.indice = 0;
    $scope.textoPlano= "";

    $scope.contenidos = [
        {
            nombre: "Motivacion",
            desc: "Se sugiere escribir un pequeño parrafo en el cual se explique de qué sirve abordar el tópico"
        },
        {
            nombre: "Definicion de conceptos clave",
            desc: "Se debe escribir la definicion de los conceptos claves para comprender la unidad en estudio"
        },
        {
            nombre:"Experimentos a realizar",
            desc: "Se aconseja dar pautas para realizar experimentos en casa evidenciando así el fenomeno en estudio"
        },
        {
            nombre:"Video motivacional",
            desc: "Video en el cual se explique la importancia de entender el fenómeno en estudio"
        },
        {
            nombre:"Que problema resuelve el topico",
            desc: "Se aconseja colocar breves ejemplos de qué tipo de problemas aborda el tópico y con que otros temas se relaciona"
        },
        {
            nombre:"Datos necesarios para los ejercicios del tema",
            desc: "Explicación de que datos son necesarios conocer o tener noción para un correcto estudio"
        },
        {
            nombre:"Formulario",
            desc: "Se solicita subir las fórmulas utilizadas a lo largo del tópico"
        },
        {
            nombre:"Ejemplos",
            desc: "Se aconseja subir ejemplos con enunciado y solucion respectiva, de uno en uno"
        },
        {
            nombre:"Preguntas del tipo 'Que pasa si...'",
            desc: "Se invita a plantear preguntas de caracter introductorio del tipo ¿Qué pasa si...?"
        },
        {
            nombre:"Lluvia de ideas",
            desc: "Se invita al profesor a plantear una serie de Ideas separados por comas, por ejemplo: Leyes de Newton, Segunda" +
            "Ley de Newton, Inercia, Primera Ley de Newton, Accion y reacción, Tercera Ley de Newton, Movimiento, Fuerza, Velocidad"
        },
        {
            nombre:"Analogias",
            desc: "Se invita al profesor a plantear analogías respecto al tema en estudio con situaciones cotidianas para que el" +
            " alumno logre asimilar la practica con situaciones habituales"
        },
        {
            nombre:"Ejercicio de mapa conceptual",
            desc: "Se invita al profesor a entregar conceptos claves separados por coma con tal de que el estudiante construya " +
            "un mapa conceptual utilizandolos"
        },
        {
            nombre:"Base Teorica",
            desc: "Se invita al profesor a entregar las bases teóricas del topico en estudio"
        },
        {
            nombre:"Conocimientos previos",
            desc: "Se invita al profesor a informar al alumno acerca de los conocimientos previos que debería poseer para comprender " +
            "de mejor manera el tópico en estudio"
        },
        {
            nombre:"Principio y Teoria",
            desc: "Se invita al profesor a entregar al estudiante todos los principios y teorías en las cuales se basa el tema en estudio",
        },
        {
            nombre:"Documentacion adicional",
            desc: "Se solicita al profesor adjuntar links de documentación relevante acerca del estudio del tema en cuestión para " +
            "que el alumno pueda complementar su aprendizaje"
        },
        {
            nombre:"Que aprenderas con el topico",
            desc: "Se solicita al profesor adjuntar un breve texto acerca de qué es lo que el estudiante aprenderá en este tema y de que" +
            " le servirá para su formación"
        },
        {
            nombre:"Experimentacion con Explicacion",
            desc: "Se solicita al profesor escribir una explicación acerca de un fenómeno presentado en video separados por coma," +
            "Ejemplo: Esta es la explicacion breve de un video donde se observa el fenomeno X, www.youtube.com/XXXXXXXXXXXXXXXXXXXXXXXX"
        },
        {
            nombre:"Formulario con ejercicios",
            desc: "Se solicita al profesor Incluir en este contenido formulas con explicacion y un ejercicio tipo utilizando el siguiente " +
            "orden de ingreso de datos: imagen de la formula, explicación de la formula, ejercicio tipo que utiliza la formula"
        }
    ];

    $scope.descripcion = $scope.contenidos[parseInt($scope.indice)].desc;
    $scope.nombre = $scope.contenidos[parseInt($scope.indice)].nombre;
    $scope.MostrarDescripcion = function () {
        $scope.descripcion = $scope.contenidos[parseInt($scope.indice)].desc;
        $scope.nombre = $scope.contenidos[parseInt($scope.indice)].nombre;
    };
    $scope.subirContenido= function () {

    }
});

