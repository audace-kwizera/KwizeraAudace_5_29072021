//Recuperer les produit dans la page panier
//Verifier si le local storage est vide, on va lire la clé produit via getItem
let localStorageInit = JSON.parse(localStorage.getItem("product"))
//conversion des données js dans le localstorage en json via json.parse
console.log(localStorageInit)

/**
 * Selection de la classe html pour rajouter les produits
 */

const selectionContenuPanier = document.querySelector("#templatePanier__message")
console.log(selectionContenuPanier)

let panierRempli = []

/**
 * Verifier si le panier est vide ou rempli
 */
//si vide => afficher le panier est vide
if (localStorageInit === null || localStorageInit == 0) {
    const panierVide = `<div class="templatePanier__message__vide">
    <h3>Votre panier est vide</h3>
</div>`
    selectionContenuPanier.innerHTML = panierVide
    //console.log("vide")
} else {
    //si rempli => afficher produit
    //on utilise k car i a déjà été utilisés
    for (j = 0; j < localStorageInit.length; j++) {
        //console.log(localStorageInit.length)

        //Affichage de produit en boucle (la lettre k va permettre a for de rajouter les élements tant qu'il y en a)
        panierRempli = panierRempli + `<div id="containerPanier" class="containerPanier">
    <div>${localStorageInit[j].quantite} x Nounours ${localStorageInit[j].nomProduit} de couleur ${localStorageInit[j].optionProduit} produit</div>
    <div>${localStorageInit[j].prix} - <a class="btn btn__supprimer">Retirer</a> </div>
</div>`
        //console.log("rempli")
    }

    //Afficher le panier
    if (j === localStorageInit.length) {
        selectionContenuPanier.innerHTML = panierRempli
    }
}

/**
 * Supprimer un produit du panier
 */
let suppressionProduitPanier = document.querySelectorAll(".btn__supprimer")
console.log(suppressionProduitPanier)

//j'utilise k pour la boucle car i et j ont été utilisé
for (let k = 0; k < suppressionProduitPanier.length; k++) {
    //evenement au clic
    suppressionProduitPanier[k].addEventListener("click", (event) => {
        event.preventDefault()

        //On selectionne l'id du produit 
        let suppressionProduitPanierId = localStorageInit[k].idProduit
        console.log("suppressionProduitPanierId")
        console.log(suppressionProduitPanierId)

        /**
         * supprimer les objets en cliquant sur le bouton
         * en filtrant les elements à supprimer pour retourner 
         * un nouveau array mis a jour avec fonction inverse "!"
         * */
        localStorageInit = localStorageInit.filter((el) => el.idProduit !== suppressionProduitPanierId)
        console.log(localStorageInit)

        /**Envoyer les produits choisi dans le localstorage 
        * pour éviter l'effacement des produits lors deraffraichissement de page
        * et creer la clé product
        */
        localStorage.setItem("product", JSON.stringify(localStorageInit))

        //message suppression
        alert ("Nounours supprimé du panier")
        //Rechargement page
        window.location.href = "panier.html"
    })
}

/**
 * On va mettre un lien pour vider le panier
 */

const viderProduitPanier = `<a id="btn__vider__panier" class="btn btn__vider__panier"> Vider le Panier </a>`

//*Aficher le lien d'un coup grâce à insertadjacenthtml avant la fin
selectionContenuPanier.insertAdjacentHTML("beforeend", viderProduitPanier)

//Recuperer infos lien vider panier
const viderProduitPanierLink = document.querySelector("#btn__vider__panier")
console.log(viderProduitPanierLink) 

/**
 * On va supprimer la key du localstorage pour vider le panier
 */
 viderProduitPanierLink.addEventListener("click", (event) => {
     //stoppe comportement par default du bouton
     event.preventDefault

     //Vider local storage grâce à remove item
     localStorage.removeItem("product")

     //message confirmation panier vidé et rechargement de la page
     alert("Vous avez vidé le panier")
     window.location.href = "panier.html"
 })

 /**
  * Calcul total du panier en recuperant les prix des produits
  */
 let panierRempliPrixTotal = []
 

 //Recuperation des prix i, j et k ont été utilisé alors on va utiliser l
 for (let l = 0; l < localStorageInit.length; l++){
     let panierRempliPrix = localStorageInit[l].prix
     //Mettre les prix dans un array pour pouvoir les caluler, 
     //on utilis push pour rajouter les elements
     panierRempliPrixTotal.push(panierRempliPrix)

     //console.log(panierRempliPrixTotal)
 }
 //On transforme les prix en nombre grâce à parsefloat
 panierRempliPrixTotal = panierRempliPrixTotal.map((x) => parseFloat(x));

 //On va faire le calcul pour obtenir le total de tous les produits avec reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue
const prixTotalPanier = (panierRempliPrixTotal.reduce(reducer,0))

//console.log(prixTotalPanier)


/**
 * Affichage du prix total
 */

const afficherPrixTotalPanier = `<div id="affichagePrixTotalPanier" class="affichagePrixTotalPanier">Prix Total: ${prixTotalPanier}</div>`
//Afficher sur l'ecran
selectionContenuPanier.insertAdjacentHTML("beforeend", afficherPrixTotalPanier)

// Affichage du prix en euros
affichagePrixTotalPanier.innerText = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
}).format(prixTotalPanier);