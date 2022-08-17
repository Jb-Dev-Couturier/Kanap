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

fetchProduit();
