//////////////////////////////////////////////////////////////////////////////////////////////
// variable 
//////////////////////////////////////////////////////////////////////////////////////////////
let KanapsData = [];

//////////////////////////////////////////////////////////////////////////////////////////////
//requete API (fetch)
//////////////////////////////////////////////////////////////////////////////////////////////
const fetchKanap = async () => {
  await fetch(`${apiUrl}/api/products`)
    //renvoi reponse en promise traite en json
    .then((res) => res.json())
    //traite la promise
    .then((promise) => {
      //stock tableau promise dans kanapData
      KanapsData = promise;
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////
//function affichage des Kanap
//////////////////////////////////////////////////////////////////////////////////////////////

const kanapDisplay = async () => {
  //attendre la reponse de fetchKanap
  await fetchKanap();
  //recupere la div pour creation element kanap
  //Creation boucle en fonction du nombre article en BD et recuperation des argument
  document.getElementById('items').innerHTML += KanapsData.map(
    (kanap) =>
      `<a href="./product.html?_id=${kanap._id}">
                <article>
                <img src=${kanap.imageUrl} alt=${kanap.altTxt}>
                <h3 class="productName">${kanap.name}</h3>
                <p class="productDescription">Prix : ${kanap.price} €</p>
                <p class="productDescription">${kanap.description}</p>
                </article>
            </a>`
  ).join('');
};

kanapDisplay();
