//////////////////////////////////////////////////////////////////////////////////////////////
// Variable
//////////////////////////////////////////////////////////////////////////////////////////////

let commandeProducts = JSON.parse(localStorage.getItem('commandes'));

//////////////////////////////////////////////////////////////////////////////////////////////
// Récupération des produits de l'api
//////////////////////////////////////////////////////////////////////////////////////////////

fetch(`${apiUrl}/api/products`)
  .then((res) => res.json())
  .then((kanaps) => {
    // appel de la fonction panierInit
    panierInit(kanaps);
  })
  .catch((err) => {
    document.querySelector('#cartAndFormContainer').innerHTML =
      '<h1>Nous rencontrons des problemes de connexion <br> Veuillez Nous excuser </h1>';
  });

//////////////////////////////////////////////////////////////////////////////////////////////
// Fonction init panier avec condition
//////////////////////////////////////////////////////////////////////////////////////////////

//recupere info API
function panierInit(kanaps) {
  // on récupère le panier avec info selectionClient client
  let panierClient = JSON.parse(localStorage.getItem('produitStorage'));
  // si il y a un panier
  if (panierClient && panierClient.length != 0) {
    //recuper un article dans le panier
    for (let articleClient of panierClient) {
      // cree boucle pour recupere un produit de la Data
      for (
        let indexProduit = 0, totalProduit = kanaps.length;
        indexProduit < totalProduit;
        indexProduit++
      ) {
        //si article id choisi a correspondance avec un produit en data
        if (articleClient._id === kanaps[indexProduit]._id) {
          // création et ajout des valeurs correspondante
          articleClient.name = kanaps[indexProduit].name;
          articleClient.prix = kanaps[indexProduit].price;
          articleClient.image = kanaps[indexProduit].imageUrl;
          articleClient.description = kanaps[indexProduit].description;
          articleClient.alt = kanaps[indexProduit].altTxt;
        }
      }
    }
    // panierDisplay (avec arguments)

    panierDisplay(panierClient);
  } else {
    // si il n'y a pas de panier on reset
    document.querySelector('#totalQuantity').innerHTML = '0';
    document.querySelector('#totalPrice').innerHTML = '0';
    document.querySelector('h1').innerHTML =
      "Vous n'avez pas d'article dans votre panier";
  }
  // reste à l'écoute
  modifQuantité();
  suppression();
}

//////////////////////////////////////////////////////////////////////////////////////////////
//Fonction affichage panier (avec argument (correspond a panierClient du localStorage) )
//////////////////////////////////////////////////////////////////////////////////////////////
function panierDisplay(articlePanier) {
  // Pointe la zone d'affichage
  let cartItem = document.querySelector('#cart__items');
  // map des affichages des produits du panier (ajout dataset pour cibler valeur)
  cartItem.innerHTML += articlePanier
    .map(
      (selectionClient) =>
        `<article class="cart__item" data-id="${selectionClient._id}" data-couleur="${selectionClient.couleur}" data-quantité="${selectionClient.quantité}" data-prix="${selectionClient.prix}">
        <div class="cart__item__img">
            <img src="${selectionClient.image}" alt="${selectionClient.alt}">
        </div>
        <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${selectionClient.name}</h2>
                    <p>couleur : ${selectionClient.couleur}</p>
                    <p data-prix="${selectionClient.prix}">${selectionClient.prix} €</p>
                </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${selectionClient.quantité}>
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem" data-id="${selectionClient._id}" data-couleur="${selectionClient.couleur}">Supprimer</p>
                </div>
            </div>
        </div>
    </article> `
    )
    .join('');
  // reste à l'écoute
  totalProduit();
}

//////////////////////////////////////////////////////////////////////////////////////////////
// fonction modifQuantité (dataset logique)
//////////////////////////////////////////////////////////////////////////////////////////////
function modifQuantité() {
  const cart = document.querySelectorAll('.cart__item');
  cart.forEach((cart) => {
    cart.addEventListener('change', (eq) => {
      // vérification d'information de la valeur
      let panier = JSON.parse(localStorage.getItem('produitStorage'));
      // boucle pour modifier la quantité
      for (articleClient of panier)
        if (
          articleClient._id === cart.dataset.id &&
          cart.dataset.couleur === articleClient.couleur &&
          eq.target.value >= 1 &&
          eq.target.value <= 100
        ) {
          articleClient.quantité = eq.target.value;
          localStorage.produitStorage = JSON.stringify(panier);
          // on met à jour le dataset quantité
          cart.dataset.quantité = eq.target.value;
          // on joue la fonction pour actualiser les données
          totalProduit();
        } else {
          alert('Indiquez des quantités Valide SVP');
          eq.target.value = articleClient.quantité;
        }
    });
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////
// fonction suprimer (dataset logique)
//////////////////////////////////////////////////////////////////////////////////////////////
function suppression() {
  // déclaration de variables
  const cartdelete = document.querySelectorAll('.cart__item .deleteItem');
  // pour chaque élément present dan les panier
  cartdelete.forEach((cartdelete) => {
    // a l'ecoute du click
    cartdelete.addEventListener('click', () => {
      //confirmation window (methode js)
      if (window.confirm('Voulez vous supprimer cet article?')) {
        
        // appel de la ressource du local storage
        let panier = JSON.parse(localStorage.getItem('produitStorage'));
        //cherche un article dans le panier
        for (let articlePanier = 0, c = panier.length; articlePanier < c; articlePanier++)
          if (
            panier[articlePanier]._id === cartdelete.dataset.id &&
            panier[articlePanier].couleur === cartdelete.dataset.couleur
          ) {
            // déclaration variable pour suppression
            const num = [articlePanier];
            // création nouveauPanier
            let nouveauPanier = JSON.parse(
              localStorage.getItem('produitStorage')
            );
            //suppression de 1 élément à l'indice num (methode JS splice (cible un element tableau))
            nouveauPanier.splice(num, 1);
            //affichage informatif
            if (nouveauPanier && nouveauPanier.length == 0) {
              // si il n'y a plus d'article
              document.querySelector('#totalQuantity').innerHTML = '0';
              document.querySelector('#totalPrice').innerHTML = '0';
              document.querySelector('h1').innerHTML =
                "Vous n'avez pas d'article dans votre panier";
            }
            localStorage.produitStorage = JSON.stringify(nouveauPanier);
            //rafraichi la page
            return location.reload();
          }
      }
    });
  });
}
//////////////////////////////////////////////////////////////////////////////////////////////
// fonction ajout nombre total produit et coût total
//////////////////////////////////////////////////////////////////////////////////////////////
function totalProduit() {
  let totalArticle = 0;
  let totalPrix = 0;

  // on pointe l'élément
  const cart = document.querySelectorAll('.cart__item');
  // pour chaque élément cart present dans le panier
  cart.forEach((cart) => {
    //récupère quantités des produits
    totalArticle += JSON.parse(cart.dataset.quantité);
    // crée opérateur pour le total
    totalPrix += cart.dataset.quantité * cart.dataset.prix;
  });
  document.getElementById('totalQuantity').textContent = totalArticle;
  document.getElementById('totalPrice').textContent = totalPrix;
}



//////////////////////////////////////////////////////////////////////////////////////////////
// Formulaire de contact
//////////////////////////////////////////////////////////////////////////////////////////////

const prenom = document.getElementById('firstName');
const nom = document.getElementById('lastName');
const adresse = document.getElementById('address');
const ville = document.getElementById('city');
const email = document.getElementById('email');

let valuePrenom, valueNom, valueEmail, valueAdresse, valueVille;

//////////////////////////////////////////////////////////////////////////////////////////////
// Prenom
//////////////////////////////////////////////////////////////////////////////////////////////

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
  if (
    e.target.value.match(/^[a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ.,'’\s-]{3,25}$/)
  ) {
    firstNameErrorMsg.classList.add('opacity');
    firstNameErrorMsg.innerHTML = '.';
    valuePrenom = e.target.value;
  }
  if (
    !e.target.value.match(
      /^[a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ.,'’\s-]{3,25}$/
    ) &&
    e.target.value.length > 3 &&
    e.target.value.length < 25
  ) {
    firstNameErrorMsg.classList.remove('opacity');
    firstNameErrorMsg.innerHTML = 'Pas de caracteres ou de chiffres';
    valuePrenom = null;
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Nom
//////////////////////////////////////////////////////////////////////////////////////////////
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
  if (
    e.target.value.match(/^[a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ.,'’\s-]{3,25}$/)
  ) {
    lastNameErrorMsg.classList.add('opacity');
    lastNameErrorMsg.innerHTML = '.';
    valueNom = e.target.value;
  }
  if (
    !e.target.value.match(
      /^[a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ.,'’\s-]{3,25}$/
    ) &&
    e.target.value.length > 3 &&
    e.target.value.length < 25
  ) {
    lastNameErrorMsg.classList.remove('opacity');
    lastNameErrorMsg.innerHTML = 'Pas de caracteres ou de chiffres';
    valueNom = null;
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Address
//////////////////////////////////////////////////////////////////////////////////////////////
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
  if (
    e.target.value.match(
      /^[0-9]{1,6} [a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ.,'’\s-]{3,35}$/
    )
  ) {
    addressErrorMsg.classList.add('opacity');
    addressErrorMsg.innerHTML = '.';
    valueAdresse = e.target.value;
  }
  if (
    !e.target.value.match(
      /^[0-9]{1,6}[a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ.,'’\s-]{3,35}$/
    ) &&
    e.target.value.length > 3 &&
    e.target.value.length < 35
  ) {
    addressErrorMsg.classList.remove('opacity');
    addressErrorMsg.innerHTML = 'Adresse invalide : 123 chemin...';
    valueAdresse = null;
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Ville
//////////////////////////////////////////////////////////////////////////////////////////////
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
  if (
    e.target.value.match(
      /^[a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ.,'’\s-]{3,25}$/i
    )
  ) {
    cityErrorMsg.classList.add('opacity');
    cityErrorMsg.innerHTML = '.';
    valueVille = e.target.value;
  }
  if (
    !e.target.value.match(
      /^[a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ.,'’\s-]{3,25}$/i
    ) &&
    e.target.value.length > 3 &&
    e.target.value.length < 25
  ) {
    cityErrorMsg.classList.remove('opacity');
    cityErrorMsg.innerHTML = 'Pas de caracteres ou de chiffres';
    valueVille = null;
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Email
//////////////////////////////////////////////////////////////////////////////////////////////
email.addEventListener('input', (e) => {
  if (e.target.value.length == 0) {
    emailErrorMsg.classList.add('opacity');
    emailErrorMsg.innerHTML = '.';
    valueEmail = null;
  } else if (e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    emailErrorMsg.classList.add('opacity');
    emailErrorMsg.innerHTML = '.';
    valueEmail = e.target.value;
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

//////////////////////////////////////////////////////////////////////////////////////////////
// Ecoute du formulaire pour envoie info API
//////////////////////////////////////////////////////////////////////////////////////////////

formulaireContact.addEventListener('submit', async (e) => {
  e.preventDefault();
  //condition formulaire remplie
  if (valuePrenom && valueNom && valueEmail && valueVille && valueAdresse) {
    const commandeFinal = JSON.parse(localStorage.getItem('produitStorage'));

    //creation tableau de ma commande
    let commandeId = [];
    //Push info commande final dans commandId
    await commandeFinal.forEach((commande) => {
      commandeId.push(commande._id); //voir ajout: quantite ,selectionClient couleur
    });
    //stocker les info cree dans data pour envoie API par method Post
    const data = {
      contact: {
        firstName: valuePrenom,
        lastName: valueNom,
        address: valueAdresse,
        city: valueVille,
        email: valueEmail,
      },
      products: commandeId,
    };

    //////////////////////////////////////////////////////////////////////////////////////////////
    // formulaire envoi Requete API + redirection confirmation .html
    //////////////////////////////////////////////////////////////////////////////////////////////

    //method 'post' pour envoyer au back avec les argument attendu
    fetch(`${apiUrl}/api/products/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      //stock la reponse obtenu du serveur dans promise
      .then((promise) => {
        let reponseServeur = promise;

        //stock la reponse en variable avec ses arguments
        const dataCommande = {
          contact: reponseServeur.contact,
          order: reponseServeur.orderId,
        };

        //creation local storage de dataCommande
        if (commandeProducts == null) {
          commandeProducts = [];
          commandeProducts.push(dataCommande);
          localStorage.setItem('commandes', JSON.stringify(commandeProducts));
        } else if (commandeProducts != null) {
          commandeProducts.push(dataCommande);
          localStorage.setItem('commandes', JSON.stringify(commandeProducts));
        }
        //renvoie vers la page confirmation
        localStorage.removeItem('produitStorage');
        window.location.href = `confirmation.html?commande=${reponseServeur.orderId}`;
      });
  } else {
    alert('Remplir le formulaire correctement');
  }
});
