//Recupere les info du local storage
let addProduit = JSON.parse(localStorage.getItem('produit'));

//------------------------------------------------------------------------
//creation panier avec donnée local storage
//------------------------------------------------------------------------
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
    // reste à l'écoute grâce aux fonctions suivantes pour modifier l'affichage
    modifQuantité();
    removeProduct();
    totalProduit();
  } else {
    //si panier vide
    document.querySelector('h1').innerHTML =
      "Vous n'avez pas d'article dans votre panier";
  }
};
panierDisplay();

//------------------------------------------------------------------------
// fonction modifQuantité
//------------------------------------------------------------------------

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

//------------------------------------------------------------------------
// fonction supprimer un produit
//------------------------------------------------------------------------
const removeProduct = async (panierDisplay) => {
  await panierDisplay;
  let itemDeleted = document.querySelectorAll('.deleteItem');

  itemDeleted.forEach((corbeille) => {
    corbeille.addEventListener('click', () => {
      if (window.confirm('Voulez vous supprimer cet article?')) {
        let totalAddProduitRemove = addProduit.length;
        if (totalAddProduitRemove == 1) {
          return (
            localStorage.removeItem('produit'), (location.href = 'cart.html')
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
        }
        localStorage.setItem('produit', JSON.stringify(someProduct));
        totalProduit()((location.href = 'panier.html'));
      }
    });
  });
  return;
};

//------------------------------------------------------------------------
// fonction ajout nombre total produit et coût total
//------------------------------------------------------------------------

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

//------------------------------------------------------------------------
// Formulaire de contact
//------------------------------------------------------------------------

const prenom = document.getElementById('firstName');
const nom = document.getElementById('lastName');
const adresse = document.getElementById('address');
const ville = document.getElementById('city');
const email = document.getElementById('email');



let valuePrenom, valueNom, valueEmail, valueAdresse, valueVille;

//------------------------------------------------------------------------
// Prenom
//------------------------------------------------------------------------

prenom.addEventListener('input', function (e) {
  valuePrenom;
  if (e.target.value.length == 0) {
    firstNameErrorMsg.classList.add('opacity');
    firstNameErrorMsg.innerHTML = '.';
    valuePrenom = null;
  } else if (e.target.value.length < 3 || e.target.length > 25) {
    firstNameErrorMsg.classList.remove('opacity');
    firstNameErrorMsg.innerHTML = `Doit Contenir entre 3 et 25 caractères`;
    valuePrenom = null;
  }
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    firstNameErrorMsg.classList.add('opacity');
    firstNameErrorMsg.innerHTML = '.';
    valuePrenom = e.target.value;
  }
  if (
    !e.target.value.match(/^[a-z A-Z]{3,25}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 25
  ) {
    firstNameErrorMsg.classList.remove('opacity');
    firstNameErrorMsg.innerHTML = 'Pas de caracteres ou de chiffres';
    valuePrenom = null;
  }
});

//------------------------------------------------------------------------
// Nom
//------------------------------------------------------------------------
nom.addEventListener('input', function (e) {
  valueNom;
  if (e.target.value.length == 0) {
    lastNameErrorMsg.classList.add('opacity');
    lastNameErrorMsg.innerHTML = '.';
    valueNom = null;
  } else if (e.target.value.length < 3 || e.target.length > 25) {
    lastNameErrorMsg.classList.remove('opacity');
    lastNameErrorMsg.innerHTML = `Doit Contenir entre 3 et 25 caractères`;
    valueNom = null;
  }
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    lastNameErrorMsg.classList.add('opacity');
    lastNameErrorMsg.innerHTML = '.';
    valueNom = e.target.value;
  }
  if (
    !e.target.value.match(/^[a-z A-Z]{3,25}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 25
  ) {
    lastNameErrorMsg.classList.remove('opacity');
    lastNameErrorMsg.innerHTML = 'Pas de caracteres ou de chiffres';
    valueNom = null;
  }
});

//------------------------------------------------------------------------
// Address
//------------------------------------------------------------------------
adresse.addEventListener('input', function (e) {
  valueAdresse;
  if (e.target.value.length == 0) {
    addressErrorMsg.classList.add('opacity');
    addressErrorMsg.innerHTML = '.';
    valueAdresse = null;
  } else if (e.target.value.length < 3 || e.target.length > 35) {
    addressErrorMsg.classList.remove('opacity');
    addressErrorMsg.innerHTML = `Doit Contenir entre 3 et 35 caractères`;
    valueAdresse = null;
  }
  if (e.target.value.match(/^[0-9]{1,6} [a-z A-Z]{3,35}$/)) {
    addressErrorMsg.classList.add('opacity');
    addressErrorMsg.innerHTML = '.';
    valueAdresse = e.target.value;
  }
  if (
    !e.target.value.match(/^[0-9]{1,6} [a-z A-Z]{3,35}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 35
  ) {
    addressErrorMsg.classList.remove('opacity');
    addressErrorMsg.innerHTML = 'Adresse invalide : 123 chemin...';
    valueAdresse = null;
  }
});

//------------------------------------------------------------------------
// Ville
//------------------------------------------------------------------------
ville.addEventListener('input', function (e) {
  valueVille;
  if (e.target.value.length == 0) {
    cityErrorMsg.classList.add('opacity');
    cityErrorMsg.innerHTML = '.';
    valueVille = null;
  } else if (e.target.value.length < 3 || e.target.length > 25) {
    cityErrorMsg.classList.remove('opacity');
    cityErrorMsg.innerHTML = `Doit Contenir entre 3 et 25 caractères`;
    valueVille = null;
  }
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    cityErrorMsg.classList.add('opacity');
    cityErrorMsg.innerHTML = '.';
    valueVille = e.target.value;
  }
  if (
    !e.target.value.match(/^[a-z A-Z]{3,25}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 25
  ) {
    cityErrorMsg.classList.remove('opacity');
    cityErrorMsg.innerHTML = 'Pas de caracteres ou de chiffres';
    valueVille = null;
  }
});

//------------------------------------------------------------------------
// Email
//------------------------------------------------------------------------
email.addEventListener('input', (e) => {
  if (e.target.value.length == 0) {
    emailErrorMsg.classList.add('opacity');
    emailErrorMsg.innerHTML = '.';
    valueEmail = null;
  } else if (e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    emailErrorMsg.classList.add('opacity');
    emailErrorMsg.innerHTML = '.';
    valueEmail = e.target.value;
    console.log(valueEmail);
  }
  if (
    !e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
    !e.target.value.length == 0
  ) {
    emailErrorMsg.classList.remove('opacity');
    emailErrorMsg.innerHTML = 'Email Incorrect ex: Kanap@gmail.com';
    valueEmail = null;
  }
});


//------------------------------------------------------------------------
// Ecoute du formulaire pour envoie info API
//------------------------------------------------------------------------



formulaireContact.addEventListener('submit',async (e) => {
  e.preventDefault();
  

  if (valuePrenom && valueNom && valueEmail && valueVille && valueAdresse) {
    
    const commandeFinal = JSON.parse(localStorage.getItem('produit'));
    let commandeId = [];
    console.log(commandeFinal);
    console.log(commandeId);

   await commandeFinal.forEach((commande) => {
      commandeId.push([ commande._id, commande.colorsChoisi, commande.quantite]);
    });
console.log(commandeId);
    const data = {
      contact: {
        firstName: valuePrenom,
        lastName: valueNom,
        address: valueAdresse,
        city: valueVille,
        email: valueEmail,
      },
      products: {
        commandeId
      },
    };
    console.log(data);
  } else {
    alert('Remplir le formulaire correctement');
  }
});


//------------------------------------------------------------------------
// formulaire Requete API
//------------------------------------------------------------------------

