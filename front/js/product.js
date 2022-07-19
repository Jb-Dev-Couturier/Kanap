//--------------------------------------------------------------------------
// Récupération de l'id du produit via l' URL
//--------------------------------------------------------------------------
//la variable params récupère l'url de la page 
const params = new URLSearchParams(document.location.search); 
// la variable id va récupérer la valeur du paramètre _id
const id = params.get('_id');
console.log(id);


//------------------------------------------------------------------------
// Récupération des produits de l'api
//------------------------------------------------------------------------
let url = 'http://localhost:3000/api/products';

fetch(url)
  // quand tu as la réponse donne le résultat en json.
  .then((res) => res.json())
  // ce que l'on a reçu et qui a été traité en json sera appelé ListeProduits
  .then((ListeProduits) => {
    // donne moi des informations en console sur ce qui est récupéré sous forme tableau.
    console.table(ListeProduits);
    // appel de la fonction d'affichage des produits
    afficheProduit(ListeProduits);
  })
  // dans le cas d'une erreur remplace le contenu de titre par un h1 au contenu de erreur 404 et renvoit en console l'erreur.
  .catch((err) => {
    document.querySelector('.item').innerHTML =
      '<h1>Erreur 404<br><br> Serveur injoignable veullez nous excuser...</h1>';
    console.log('erreur 404, sur ressource api:' + err);
  });

//------------------------------------------------------------------------
// Création d'objet articleClient
//------------------------------------------------------------------------
// déclaration objet articleClient prêt à être modifiée par les fonctions suivantes d'évènements
let articleClient = {};
// affecter l'id du procuit a article client dans la variable id
articleClient._id = id;
//------------------------------------------------------------------------
// fonction d'affichage du produit de l'api
//------------------------------------------------------------------------
function afficheProduit(produit){

  // déclaration des variables pointage des éléments
    let imageAlt = document.querySelector('article div.item__img');
    let title = document.querySelector('#title');
    let price = document.querySelector('#price');
    let description = document.querySelector('#description');
    let couleurChange = document.querySelector('#colors');
      // boucle for pour chercher un indice
  for (let choix of produit) {
    //si id (définit par l'url) est identique à un _id d'un des produits du tableau, on récupère son indice de tableau qui sert pour les éléments produit à ajouter
    if (id === choix._id) {
      //ajout des éléments de manière dynamique grace a variable <choix.'arguments'>
      imageAlt.innerHTML = `<img src="${choix.imageUrl}" alt="${choix.altTxt}">`;
      title.textContent = `${choix.name}`;
      price.textContent = `${choix.price}`;
      description.textContent = `${choix.description}`;
      // boucle pour chercher les couleurs pour chaque produit en fonction de sa clef/valeur (la logique: tableau dans un tableau = boucle dans boucle)
      for (let couleur of choix.colors) {
        // ajout des balises d'option couleur avec leur valeur
        couleurChange.innerHTML += `<option value="${couleur}">${couleur}</option>`;
      }
    }
  }
  console.log('affichage effectué');
}