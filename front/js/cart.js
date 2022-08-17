//Recupere les info du local storage
let addProduit = JSON.parse(localStorage.getItem('produit'));

const panierDisplay = async () => {
  //add produit est il existant ou null
  if (addProduit) {
    await addProduit;
    console.log(addProduit);

    //add produit existant alors creation des cart avec les produit du localstorage
    const cart = document.getElementById('cart__items');

    cart.innerHTML = addProduit
      .map(
        (produit) => `
    <article class="cart__item" data-id="${produit._id}" data-color="${produit.colorsChoisi}" data-quantite="${produit.quantite}" data-prix="${produit.price}">
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
                    <p class="deleteItem" data-id="${produit._id}" data-color="${produit.colorsChoisi}" data-quantite="${produit.quantite}">Supprimer</p>
                </div>
            </div>
        </div>
    </article> `
      )
      .join('');
  } else {
    //si panier vide
    document.querySelector('h1').innerHTML =
      "Vous n'avez pas d'article dans votre panier";
  }
  // reste à l'écoute grâce aux fonctions suivantes pour modifier l'affichage
  modifQuantité();
  removeProduct();
  totalProduit();
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
          totalProduit();
        }
    });
  });
}

// fonction supprimer un produit
const removeProduct = async (panierDisplay) => {
  await panierDisplay;
  let itemDeleted = document.querySelectorAll('.deleteItem');

  itemDeleted.forEach((corbeille) => {
    corbeille.addEventListener('click', () => {
      let totalAddProduitRemove = addProduit.length;
      if (totalAddProduitRemove == 1) {
        return (
          localStorage.removeItem('produit'),
          (location.href = 'cart.html'),
          alert('Article supprimer du panier')
        );
      } else {
        someProduct = addProduit.filter((el) => {
          if (
            corbeille.dataset.id != el._id ||
            corbeille.dataset.color != el.colorsChoisi
          ) {
            return true;
          }
        });
        localStorage.setItem('produit', JSON.stringify(someProduct));
        totalProduit()((location.href = 'cart.html'));
      }
    });
  });
  return;
};

// fonction ajout nombre total produit et coût total

function totalProduit() {
  // déclaration variable en tant que nombre
  let totalArticle = 0;
  // déclaration variable en tant que nombre
  let totalPrix = 0;
  // on pointe l'élément
  const cart = document.querySelectorAll('.cart__item');
  // pour chaque élément cart
  cart.forEach((cart) => {
    //récupère les quantités des produits grâce au dataset
    totalArticle += JSON.parse(cart.dataset.quantite);
    // créais un opérateur pour le total produit grâce au dataset
    totalPrix += cart.dataset.quantite * cart.dataset.prix;
  });
  //endroit d'affichage nombre d'article
  document.getElementById('totalQuantity').textContent = totalArticle;
  //endroit d'affichage du prix total
  document.getElementById('totalPrice').textContent = totalPrix;
}
