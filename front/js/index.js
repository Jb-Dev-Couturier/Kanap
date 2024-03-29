//////////////////////////////////////////////////////////////////////////////////////////////
//Récupération du tableau de produits disponibles
//////////////////////////////////////////////////////////////////////////////////////////////
getProducts();

//////////////////////////////////////////////////////////////////////////////////////////////
//Création des articles via la liste récupérée précédemment
//////////////////////////////////////////////////////////////////////////////////////////////
creationProducts();


//////////////////////////////////////////////////////////////////////////////////////////////
//Appel API methode FETCH
//////////////////////////////////////////////////////////////////////////////////////////////
async function getProducts() {
    let products = await fetch(`${apiUrl}/api/products`);
    console.log("Les produits ont été récupérés !")
    return products.json();
}
//////////////////////////////////////////////////////////////////////////////////////////////
//Creation des cart produits
//////////////////////////////////////////////////////////////////////////////////////////////
async function creationProducts() {
    let result = await getProducts()
    .then( (product) => {
        for (let i=0; i < product.length; i++) {		

            // Insertion de l'élément "a"
            let productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
            productLink.href = `product.html?_id=${product[i]._id}`;

            // Insertion de l'élément "article"
            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            // Insertion de l'image
            let productImg = document.createElement ("img");
            productArticle.appendChild(productImg);
            productImg.src = product[i].imageUrl;
            productImg.alt = product[i].altTxt;

            // Insertion du titre "h3"
            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = product[i].name;

            // Insertion de la description "p"
            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productName");
            productDescription.innerHTML = product[i].description;
        }
    });
    console.log("Les produits ont été crées !");
}
