var eCommApp = angular.module('appComm', ['ngRoute']);

//au demarrage de mon appli
eCommApp.run(function($rootScope){
    //Init des tableaux
    $rootScope.idList=[];
    $rootScope.nomList=[];
    $rootScope.lieuList=[];
    $rootScope.prixList=[];
    $rootScope.tailleList=[];
    $rootScope.img1List=[];
    $rootScope.img2List=[];
    $rootScope.img3List=[];
    $rootScope.descCourteList=[];
    $rootScope.descLongList=[];
    $rootScope.amménagéList=[];
    $rootScope.NationalitéList=[];
    $rootScope.surfHabList=[];
});

// Configuration des routes
eCommApp.config(['$routeProvider', function($routeProvider) {
			// Système de routage
			$routeProvider
			.when('/', {
					templateUrl: 'partials/articles.html',
					controller: 'articleCtrl'
			})
      .when('/detail/:id?',{
        controller: 'detailCtrl',
        templateUrl: 'partials/detail.html'
})
			.otherwise({
					redirectTo: '/'
			});
		}
]);
// Création d'un controller 'articleCtrl'
eCommApp.controller('articleCtrl', function($scope, $http) {
  // http.get permet de récup les données (data) du JSON
  $http.get("articles.json")
  .then(function(response) {
    // reponse.data correspond au données du JSON et le renvoi dans la variable 'element'
      $scope.id = response.data;
    });
  });
// Création d'un controller 'articleCtrl'
eCommApp.controller('detailCtrl',function($rootScope,$scope,$routeParams){
    // je récupère le parametre indiqué dans la route (c'est l'index de mes tableaux)
    $scope.id=$routeParams.id;
    //je recupère les varialbles dans les tableaux correspondants, à l'index 'id'
    $scope.id =  $rootScope.idList=[$scope.id];
    $scope.nom =  $rootScope.nomList=[$scope.id];
    $scope.lieu =  $rootScope.lieuList=[$scope.id];
    $scope.prix =  $rootScope.prixList=[$scope.id];
    $scope.taille =  $rootScope.tailleList=[$scope.id];
    $scope.img1 =  $rootScope.img1List=[$scope.id];
    $scope.img2 =  $rootScope.img2List=[$scope.id];
    $scope.img3 =  $rootScope.img3List=[$scope.id];
    $scope.descCourte =  $rootScope.descCourteList=[$scope.id];
    $scope.descLong =  $rootScope.descLongList=[$scope.id];
    $scope.amménagé =  $rootScope.amménagéList=[$scope.id];
    $scope.Nationalité =  $rootScope.NationalitéList=[$scope.id];
    $scope.surfHab =  $rootScope.surfHabList=[$scope.id];
});

// Fonction pour changer l'image dans les détails
function changeImage(a) {
  // On change la valeur de l'attribut scr
  $('#mainImg').attr('src', a);
}

$('.element').on('click', function(){
  alert('Test');
});
