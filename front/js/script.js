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
    afficheKanaps(ListeProduits);
  })
  // dans le cas d'une erreur remplace le contenu de titre par un h1 au contenu de erreur 404 et renvoit en console l'erreur.
  .catch((err) => {
    document.querySelector('.titles').innerHTML =
      '<h1>Erreur 404<br><br> Serveur injoignable veullez nous excuser...</h1>';
    console.log('erreur 404, sur ressource api:' + err);
  });
//----------------------------------------------------------------------
// fonction d'affichage des produits de l'api sur la page index
//----------------------------------------------------------------------
function afficheKanaps(tab) {
  // déclaration de variable de la zone d'article
  let zoneArticle = document.querySelector('#items');
  // boucle pour chaque indice(nommé 'article') dans tab
  for (let article of tab) {
    // création et ajout des zones d'articles, insertion de l'adresse produit via chemin produit + paramètres(son id);

    zoneArticle.innerHTML += `<a href="./product.html?_id=${article._id}">
    <article>
      <img src="${article.imageUrl}" alt="${article.altTxt}">
      <h3 class="productName">${article.name}</h3>
      <h2 class="productPrice">Prix : ${article.price}€</h2>
      <p class="productDescription">${article.description}</p>
    </article>
  </a>`;
  }
}
