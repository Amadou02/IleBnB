var eCommApp = angular.module('appComm', ['ngRoute']);
// Variable globale correspondant au total du panier
var total = 0;
// Au démarrage
eCommApp.run(function($rootScope, $http){
  // Initialisation du tableau représentant le contenu du panier
  $rootScope.cartList=[];
  // Récupération des données du JSON
  $http.get("articles.json")
  .then(function(response) {
    // reponse.data correspond au données du JSON et le renvoi dans la variable 'element'
    // On le $rootScope afin d'y avoir accès de partout
      $rootScope.element = response.data;
      // console.log($rootScope.element);
    });
});
// Configuration des routes
eCommApp.config(['$routeProvider', function($routeProvider, $routeParams) {
			// Système de routage
			$routeProvider
      // Route des articles (défaut) avec comme paramètre possible la catégorie
			.when('/articles/:cat?', {
					templateUrl: 'partials/articles.html',
					controller: 'articleCtrl'
			})
      // Route détail des articles avec comme paramètre possible une id
      .when('/detail/:id?',{
        controller: 'detailCtrl',
        templateUrl: 'partials/detail.html'
      })
      .when('/panier',{
        controller: 'panierCtrl',
        templateUrl: 'partials/panier.html'
      })
      // Route par défaut si on se plante de route
			.otherwise({
					redirectTo: '/articles'
			});
		}
]);
// Création d'un controller 'articleCtrl'
eCommApp.controller('articleCtrl', function($scope, $rootScope, $routeParams) {
  // Récupération avec $routeParams de la catégorie (filtre) choisie
  // qu'on scope dans 'filtre' qui sera utilisé dans l'OrderBy du ng-repeat d'article.html
  $scope.filtre=$routeParams.cat;
  // console.log($scope.filtre);
});
// Création d'un controller 'detailCtrl'
eCommApp.controller('detailCtrl',function($rootScope,$scope,$routeParams){
  // Récupération des informations de l'article
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
  // console.log($scope.element[$scope.id].id);
  // console.log('Etat panier :');
  // console.log($rootScope.cartList);
  //
  // Fonction lors de l'ajout au panier
  $scope.addCart = function() {
    // test correspond à la validité du test de doublon
    var test = true;
    // Récup de la quantité choisie lors de l'ajout au panier
    var qte = +$('.quantity').val();
    // On parcours tout le tableau correspondant au contenu du panier ...
    for (var i = 0; i < $rootScope.cartList.length; i++) {
      // Si l'id de l'élément à rajouter correspond à un id du tableau
      if ($rootScope.cartList[i].id == $scope.element[$scope.id].id) {
        // Ajout de la qte choisie à la quantité déjà présente dans le tableau du panier
        $rootScope.cartList[i].Quantite += qte;
        // On modifie le prix en conséquence
        total += $scope.element[$scope.id].prix * qte;
        // alert('Élement déja présent dans le panier');
        test = false;
      }
    }
    // Si test = vrai (pas de doublon trouvé dans la boucle)
    if (test) {
      // console.log(qte);
      // console.log($scope.element[$scope.id]);
      // On fusionne dans un nouveau tableau le contenu de l'article avec un nouveau champ Quantité ...
      var newArray = $.extend({}, $scope.element[$scope.id], {"Quantite":qte});
      // ... que l'on push dans le tableau du panier
      $rootScope.cartList.push(newArray);
      // console.log('Panier après ajout :');
      // console.log($rootScope.cartList);
      // console.log('Prix article :');
      // console.log($scope.element[$scope.id].prix);
      // On modifie le total
      total += $scope.element[$scope.id].prix * qte;
      // console.log('Total panier :');
      // console.log(total);
    }
  };

});
// Création d'un controller 'articleCtrl'
eCommApp.controller('panierCtrl', function($scope, $rootScope) {

  // if ($rootScope.cartList = []) {
  //   $scope.message = "Votre panier est vide !";
  // }
  $scope.totalPanier = total;
  // Fonction à la suppression d'un article
  // (passage en paramètre de l'index de l'article concerné)
  $scope.suppCart = function(index){
    // console.log(index);
    // Demande de confirmation
    var response = confirm("Voulez-vous vraiment supprimer votre ile ?!");
    // Si confirmez
    if (response == true) {
      // On soustrait le prix*qte au total
      total -= $rootScope.cartList[index].prix * $rootScope.cartList[index].Quantite;
      // On mets à jour le total afficher
      $scope.totalPanier = total;
      // Puis on supprime la ligne de l'article au tableau du panier
      $rootScope.cartList.splice(index, 1);
    }
  };
  // Fonction au clique que bouton '+'
  // (passage en paramètre de l'index de l'article concerné)
  $scope.addCart = function(index){
    // Incrémentation de la qte de l'article
    $rootScope.cartList[index].Quantite += 1;
    // Mise à jour du total
    total += $rootScope.cartList[index].prix;
    $scope.totalPanier = total;
  };
  // Fonction au clique que bouton '+'
  // (passage en paramètre de l'index de l'article concerné)
  $scope.minusCart = function(index){
    // Si on a plus d'un article (évite le quantité = 0)
    if ($rootScope.cartList[index].Quantite > 1) {
      // On décrémente la quantité
      $rootScope.cartList[index].Quantite -= 1;
      // Mise à jour du total
      total -= $rootScope.cartList[index].prix;
      $scope.totalPanier = total;
    }
    // Sinon on a qte = 1 pour l'article
    else
    {
      // Demande si l'on veut suppr l'article
      var response = confirm("Voulez-vous vraiment supprimer votre ile ?!");
      if (response == true) {
        // Soustraction du prix de l'article au total puis réaffichage
        total -= $rootScope.cartList[index].prix;
        $scope.totalPanier = total;
        // Suppression de l'article dans le tableau panier
        $rootScope.cartList.splice(index, 1);
      }
    }
  };
  // Fonction pour vider la panier
  $scope.emptyCart = function(){
    // Si panier non vide
    if (total != 0) {
      let response = confirm("Voulez-vous vraiment vider votre panier ?!");
        if (response == true) {
          // On réinitialise le tableau panier et le total
          $rootScope.cartList=[];
          total = 0;
          $scope.totalPanier = total;
        }
    // Sinon le panier est déjà vide
    } else {
      alert('Votre panier est déjà vide, vous avez besoin de vacance ! Achetez donc une ile !');
    }
  };
  // Fonction à la validation du panier
  $scope.validCart = function(){
    // Si le panier n'est pas vide
    if (total != 0) {
      // On empoche l'argent
      alert('Merci pour votre achat !');
      // On réinitialise le tableau panier et le total
      $rootScope.cartList=[];
      total = 0;
      $scope.totalPanier = total;
    // Si le panier est vide
    } else {
      alert('Il faut mettre un article au panier avant de commander !');
    }
  };
});
// Fonction pour changer l'image dans les détails
function changeImage() {
  // On change la valeur de l'attribut scr
  // $('#mainImg').attr('src', newSrc);
  alert('test');
}
// Fonction d'affichage du menu filtre
function openNav() {
  document.getElementById("sideNavigation").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.getElementById("flc").style.display ="none";
}
// Fonction de fermeture du menu filtre
function closeNav() {
  document.getElementById("sideNavigation").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.getElementById("flc").style.display ="block";
}
