//recupere l'adresse html avec l'id puis split '?_id=' et '._id' pour recuperere juste ._id
const produit = window.location.search.split('?_id=').join('');

//creation tableau pour stocker element recuperer
let produitData = [];

//recupere info du produit en BD avec la variable 'produit' qui contient l'id du produit
const fetchProduit = async () => {
  await fetch(`http://localhost:3000/api/products/${produit}`)
    //renvoi reponse en promise traite en json
    .then((res) => res.json())
    .then((promise) => {
      produitData = promise;
    });
};

//afficher le produit en inner html

const produitDisplay = async () => {
  await fetchProduit();

  const imageAlt = document.querySelector('article div.item__img');
  const titre = document.querySelector('#title');
  const prix = document.querySelector('#price');
  const description = document.querySelector('#description');
  const button = document.querySelector('article div.item__content__addButton');
  imageAlt.innerHTML = `<img src="${produitData.imageUrl}" alt="${produitData.altTxt}">`;
  titre.textContent = `${produitData.name}`;
  prix.textContent = `${produitData.price}`;
  description.textContent = `${produitData.description}`;
  button.innerHTML = `<button id="${produitData._id}" >Ajouter au panier</button>`;
  
  //pour le choix des couleurs
  let select = document.getElementById('colors')
  

  //recupere les different couleur disponible
  produitData.colors.forEach((color)=>{
    //cree un element option dans liste de selection
    let tagOption = document.createElement('option');
    //Injecte les valeur dans la variable tag option
    tagOption.innerHTML =`${color}`
    tagOption.value = `${color}`;
    //tagOption devient un enfant de select pour afficher les couleur disponible
    select.appendChild(tagOption)
  })
  addKanap(produitData)
};

produitDisplay();


//add produit aux local storage
const addKanap = ()=>{
    //cible boutton 'ajouter au panier'
    let bouton = document.getElementById(produitData._id);
    //ecoute du click
    bouton.addEventListener('click', ()=>{
        //variable avec contenu du local storage
        let produitStorage = JSON.parse(localStorage.getItem('produit'));
        //a l'ecoute cible color et quantity
        let select = document.getElementById('colors' );
        let quantity = document.getElementById('quantity');
        console.log(select);
        console.log(quantity)
        
        //ajoutez un objet  couleur et quantité a produitdata
        const fusionProduitColor = Object.assign({}, produitData, {
          colorsChoisi: `${select.value}`,
          quantite: `${quantity.value}`,
        });
        console.log(fusionProduitColor);

        //condition pour creer le storage (premiere fois)
        if (produitStorage == null) {
          produitStorage = [];
          //envoie les info produit au local storage
          produitStorage.push(fusionProduitColor);
          console.log(produitStorage);
          //ajout des donnes au local storage
          localStorage.setItem('produit', JSON.stringify(produitStorage));
          alert('Produit ajouté aux panier')
        }
    })
}
