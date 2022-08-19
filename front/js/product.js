//////////////////////////////////////////////////////////////////////////////////////////////
// variable
//////////////////////////////////////////////////////////////////////////////////////////////

const produit = window.location.search.split('?_id=').join('');
// Récupération de l'id du produit
const params = new URLSearchParams(document.location.search);
//tableau donnee data
let kanapClient = {};
//tableau donne choix client
let selectedKanap = {};
//id du produit stocker en variable
const id = params.get('_id');
//article client est id du produit
selectedKanap._id = id;

//////////////////////////////////////////////////////////////////////////////////////////////
// Récupération des produits de l'api et traitement des données
//////////////////////////////////////////////////////////////////////////////////////////////

const fetchProduit = async () => {
  await fetch(`${apiUrl}/api/products/${produit}`)
    //renvoi reponse en promise traite en json
    .then((res) => res.json())
    .then((promise) => {
      kanapClient = promise;
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////
// fonction d'affichage
//////////////////////////////////////////////////////////////////////////////////////////////
const produitDisplay = async () => {
  await fetchProduit();
  // déclaration des variables pointage des élémeconst
  const imageAlt = document.querySelector('article div.item__img');
  const titre = document.querySelector('#title');
  const prix = document.querySelector('#price');
  const description = document.querySelector('#description');
  const selectColor = document.querySelector('#colors');

  imageAlt.innerHTML = `<img src="${kanapClient.imageUrl}" alt="${kanapClient.altTxt}">`;
  titre.textContent = `${kanapClient.name}`;
  prix.textContent = `${kanapClient.price}`;
  description.textContent = `${kanapClient.description}`;

  for (let couleur of kanapClient.colors) {
    // ajout des balises d'option couleur avec leur valeur
    selectColor.innerHTML += `<option value="${couleur}">${couleur}</option>`;
  }
};
produitDisplay();

//////////////////////////////////////////////////////////////////////////////////////////////
// choix couleur dynamique
//////////////////////////////////////////////////////////////////////////////////////////////
let choixCouleur = document.querySelector('#colors');
// On écoute ce qu'il se passe dans #colors
choixCouleur.addEventListener('input', (ec) => {
  let couleurProduit;
  // on récupère la valeur de la cible de l'évenement dans couleur
  couleurProduit = ec.target.value;
  // on ajoute la couleur à l'objet panierClient
  selectedKanap.couleur = couleurProduit;
});

//////////////////////////////////////////////////////////////////////////////////////////////
// choix quantité dynamique
//////////////////////////////////////////////////////////////////////////////////////////////
let choixQuantité = document.querySelector('input[id="quantity"]');
let quantitéProduit;
// On écoute ce qu'il se passe dans input[name="itemQuantity"]
choixQuantité.addEventListener('input', (eq) => {
  // on récupère la valeur de la cible de l'évenement dans couleur
  quantitéProduit = eq.target.value;
  // on ajoute la quantité à l'objet panierClient
  selectedKanap.quantité = quantitéProduit;
});

//////////////////////////////////////////////////////////////////////////////////////////////
// conditions de validation du clic via le bouton ajouter au panier
//////////////////////////////////////////////////////////////////////////////////////////////
// déclaration variable
let choixProduit = document.querySelector('#addToCart');
// On écoute ce qu'il se passe sur le bouton #addToCart pour faire l'action :
choixProduit.addEventListener('click', () => {
  //conditions
  if (
    // valeurs créées dynamiquement au click (voir choix quantite et choix couleur)
    selectedKanap.quantité < 1 ||
    selectedKanap.quantité > 100 ||
    selectedKanap.quantité === undefined ||
    selectedKanap.couleur === '' ||
    selectedKanap.couleur === undefined
  ) {
    alert(
      'Veuillez renseigner une couleur, et/ou une quantité valide (1 et 100)'
    );
  } else {
    //appel fonction si condition ok
    addKanapPanier();
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Déclaration de tableaux pour modifier valeur choisi
//////////////////////////////////////////////////////////////////////////////////////////////

// tableau localstorage
let produitsEnregistrés = [];
// valeur modifier avant ajout localstorage
let produitsTemporaires = [];
//choix client
let produitChoisi = [];
// tableau final pour local storage
let produitsFinal = [];

//////////////////////////////////////////////////////////////////////////////////////////////
// fonction addKanap
//////////////////////////////////////////////////////////////////////////////////////////////
function addKanap() {
  //si produitsEnregistrés
  if (produitsEnregistrés === null) {
    // pousse le produit choisit
    produitChoisi.push(selectedKanap);
    // envoi local storage
    return (
      (localStorage.produitStorage = JSON.stringify(produitChoisi)),
      alert('Votre article a été ajouter au panier MERCI !')
    );
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////
// fonction addNewKanap
//////////////////////////////////////////////////////////////////////////////////////////////
function addNewKanap() {
  // vide produitsFinal
  produitsFinal = [];
  //recupere data de selectedKanap (ancienn donnee client)
  produitsTemporaires.push(selectedKanap);
  //additione ancienne data avec nouvelle data
  produitsFinal = [...produitsEnregistrés, ...produitsTemporaires];
  // vide produitsTemporaires
  produitsTemporaires = [];
  // envoi local storage
  return (
    (localStorage.produitStorage = JSON.stringify(produitsFinal)),
    alert('Votre article a été ajouter au panier MERCI !')
  );
}

//////////////////////////////////////////////////////////////////////////////////////////////
// fonction Panier
//////////////////////////////////////////////////////////////////////////////////////////////
function addKanapPanier() {
  // variable produitStorage
  produitsEnregistrés = JSON.parse(localStorage.getItem('produitStorage'));
  // si produitEnregistrés
  if (produitsEnregistrés) {
    for (let choixClient of produitsEnregistrés) {
      //compare si article existe dans le panier
      if (
        choixClient._id === id &&
        choixClient.couleur === selectedKanap.couleur
      ) {
        alert('Vous aviez déja choisit cet article. Ajout de quantité modifié');
        //additionne ancienne quantite avec nouvelle
        let additionQuantité =
          parseInt(choixClient.quantité) + parseInt(quantitéProduit);
        choixClient.quantité = JSON.stringify(additionQuantité);
        //envoi localStorage
        return (localStorage.produitStorage =
          JSON.stringify(produitsEnregistrés));
      }
    }
    return addNewKanap();
  }
  return addKanap();
}
