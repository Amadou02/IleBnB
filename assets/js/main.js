var eCommApp = angular.module('appComm', ['ngRoute']);

//au demarrage de mon appli
eCommApp.run(function($rootScope, $http){
    $http.get("articles.json")
    .then(function(response) {
      // reponse.data correspond au données du JSON et le renvoi dans la variable 'element'
        $rootScope.element = response.data;
        console.log($rootScope.element);
      });
});
// Configuration des routes
eCommApp.config(['$routeProvider', function($routeProvider, $routeParams) {
			// Système de routage
			$routeProvider
			.when('/articles/:cat?', {
					templateUrl: 'partials/articles.html',
					controller: 'articleCtrl'
			})
      .when('/detail/:id?',{
        controller: 'detailCtrl',
        templateUrl: 'partials/detail.html'
      })
			.otherwise({
					redirectTo: '/articles'
			});

		}
]);
// Création d'un controller 'articleCtrl'
eCommApp.controller('articleCtrl', function($scope, $rootScope, $routeParams) {
  $scope.filtre=$routeParams.cat;
  console.log($scope.filtre);
});

// Création d'un controller 'detailCtrl'
eCommApp.controller('detailCtrl',function($rootScope,$scope,$http,$routeParams){
  $scope.id=$routeParams.id;
  $scope.nom = $scope.element[$scope.id].nom;
  $scope.lieu = $scope.element[$scope.id].lieu;
  $scope.prix = $scope.element[$scope.id].prix;
  $scope.taille = $scope.element[$scope.id].taille;
  $scope.img1 = $scope.element[$scope.id].img1;
  $scope.img2 = $scope.element[$scope.id].img2;
  $scope.img3 = $scope.element[$scope.id].img3;
  $scope.descCourte = $scope.element[$scope.id].descCourte;
  $scope.descLong = $scope.element[$scope.id].descLong;
  $scope.ammenage = $scope.element[$scope.id].ammenage;
  $scope.Nationalite = $scope.element[$scope.id].Nationalite;

});

// Fonction pour changer l'image dans les détails
function changeImage(newSrc) {
  // On change la valeur de l'attribut scr
  $('#mainImg').attr('src', newSrc);
}
// Test
function openNav() {
    document.getElementById("sideNavigation").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("sideNavigation").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}
