//Recupere les info du local storage
let addProduit = JSON.parse(localStorage.getItem('produit'));

const panierDisplay = async () => {
  //add produit est il existant ou null
  if (addProduit) {
    await addProduit;
    console.log(addProduit);

    //add produit existant alors creation des cart avec les produit du localstorage
    const cart = document.getElementById('cart__items');

    cart.innerHTML = addProduit.map(
      (produit) => `
    <article class="cart__item" data-id="${produit._id}" data-color="${produit.colorsChoisi}" data-quantite="${produit.quantite}" data-prix="${produit.prix}">
    <div class="cart__item__img">
    <img src=${produit.imageUrl} alt=${produit.altTxt}>
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
    <h2>${produit.name}</h2>
    <p>${produit.colorsChoisi}</p>
    <p>${produit.price} €</p>
    </div>
    <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
    <p>Qté : </p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${produit.quantite}>
    </div>
    <div class="cart__item__content__settings__delete">
    <p class="deleteItem">Supprimer</p>
    </div>
    </div>
                </div>
                </article>
                
                
                `
    );
  } else {
    //si panier vide
    document.querySelector('h1').innerHTML =
      "Vous n'avez pas d'article dans votre panier";
  }
  // reste à l'écoute grâce aux fonctions suivantes pour modifier l'affichage
  modifQuantité();
};
panierDisplay();



// fonction modifQuantité, modifie dynamiquement les quantités du panier

function modifQuantité() {
  const cart = document.querySelectorAll('.cart__item');
  // manière de regarder ce que l'on a d'affiché dynamiquement grace au dataset
  // On écoute ce qu'il se passe dans itemQuantity de l'article concerné
  cart.forEach((cart) => {
    cart.addEventListener('change', (eq) => {
      // vérification d'information de la valeur du clic et son positionnement dans les articles
      let panier = JSON.parse(localStorage.getItem('produit'));
      // boucle pour modifier la quantité du produit du panier grace à la nouvelle valeur
      for (article of panier)
        if (
          article._id === cart.dataset.id &&
          cart.dataset.color === article.colorsChoisi
        ) {
          article.quantite = eq.target.value;
          console.log(article.quantite);
          localStorage.produit = JSON.stringify(panier);
          // on met à jour le dataset quantité
          cart.dataset.quantite = eq.target.value;
          // on joue la fonction pour actualiser les données
          //totalProduit();
        }
    });
  });
}

// fonction supression on supprime un article dynamiquement du panier et donc de l'affichage

function suppression() {
  // déclaration de variables
  const cartdelete = document.querySelectorAll('.cart__item .deleteItem');



}
