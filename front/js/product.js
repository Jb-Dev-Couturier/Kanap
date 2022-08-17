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
  const couleurOption = document.querySelector('#colors');

  imageAlt.innerHTML = `<img src="${produitData.imageUrl}" alt="${produitData.altTxt}">`;
  titre.textContent = `${produitData.name}`;
  prix.textContent = `${produitData.price}`;
  description.textContent = `${produitData.description}`;

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
};

produitDisplay();
