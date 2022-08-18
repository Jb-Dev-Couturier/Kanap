let commandeProducts = JSON.parse(localStorage.getItem('commandes'));

//------------------------------------------------------------
// fonction affichage autoinvoquée du numéro de commande et vide du storage
//------------------------------------------------------------

const Commande = async ()=>{

    if (commandeProducts){
        await commandeProducts
        console.log(commandeProducts);
        const order = document.getElementById('orderId');

        order.innerHTML = commandeProducts
          .map((commande) => `<br>${commande.order}<br>Merci pour votre achat`)
          sessionStorage.clear();
          localStorage.clear();
    }


}
Commande();




//`<br>${numCom}<br>Merci pour votre achat`;