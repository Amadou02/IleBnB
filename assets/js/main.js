var eCommApp = angular.module('appComm', ['ngRoute']);
var total = 0;
var nbr = 0;

//au demarrage de mon appli
eCommApp.run(function($rootScope, $http){
  //j'initialise mes tableaux
    $rootScope.cartList=[];

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
      .when('/panier',{
        controller: 'panierCtrl',
        templateUrl: 'partials/panier.html'
      })
			.otherwise({
					redirectTo: '/articles'
			});
		}
]);
// Création d'un controller 'articleCtrl'
eCommApp.controller('articleCtrl', function($scope, $rootScope, $routeParams) {
  $scope.filtre=$routeParams.cat;
  // console.log($scope.filtre);
});

// Création d'un controller 'detailCtrl'
eCommApp.controller('detailCtrl',function($rootScope,$scope,$routeParams){

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
  $scope.surfHab = $scope.element[$scope.id].surfHab;
  // console.log($scope.element[$scope.id]);
  console.log('Etat panier :');
  console.log($rootScope.cartList);

  $scope.addCart = function() {
    var test = true;
    for (var i = 0; i < $rootScope.cartList.length; i++) {
      if ($rootScope.cartList[i] == $scope.element[$scope.id]) {
        alert('Élement déja présent dans le panier');
        test = false;
      }
    }
    if (test) {
      let qte = +$('.quantity').val();
      console.log(qte);
      // console.log($scope.element[$scope.id]);
      var newArray = $.extend({}, $scope.element[$scope.id], {"Quantite":qte});
      $rootScope.cartList.push(newArray);
      // console.log('Panier après ajout :');
      // console.log($rootScope.cartList);
      // console.log('Prix article :');
      console.log($scope.element[$scope.id].prix);
      total += $scope.element[$scope.id].prix * qte;
      console.log('Total panier :');
      console.log(total);
    }
  };

});

// Création d'un controller 'articleCtrl'
eCommApp.controller('panierCtrl', function($scope, $rootScope) {

  $scope.totalPanier = total;

  $scope.suppCart = function(index){
    console.log(index);
    var response = confirm("Voulez-vous vraiment supprimer votre ile ?!");
    if (response == true) {
      total -= $rootScope.cartList[index].prix * $rootScope.cartList[index].Quantite;
      $scope.totalPanier = total;
      $rootScope.cartList.splice(index, 1);
    }
  };

  $scope.addCart = function(index){

  };

  $scope.minusCart = function(index){

  };

  $scope.emptyCart = function(){
    var response = confirm("Voulez-vous vraiment vider votre panier ?!");
    if (response == true) {
      $rootScope.cartList=[];
      $scope.totalPanier = 0;
    }
  };

  $scope.validCart = function(index){

  };
});

// Fonction pour changer l'image dans les détails
function changeImage() {
  // On change la valeur de l'attribut scr
  // $('#mainImg').attr('src', newSrc);
  alert('test');
}

function openNav() {
    document.getElementById("sideNavigation").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("sideNavigation").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}
