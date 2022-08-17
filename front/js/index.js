// variable kanap tableau vide
let KanapsData = [];

//requete API (fetch)
const fetchKanap = async () => {
  await fetch('http://localhost:3000/api/products')
    //renvoi reponse en promise traite en json
    .then((res) => res.json())
    //traite la promise
    .then((promise) => {
        //stock tableau promise dans kanapData
        KanapsData = promise
        console.log(KanapsData);
    });
};

fetchKanap();

//function affichage
