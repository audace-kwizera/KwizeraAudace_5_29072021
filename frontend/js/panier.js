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
if (localStorageInit === null) {
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
    <div>${localStorageInit[j].prix} - <a class="btn btn__supprimer">Retirer</a </div>
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
let suppressionProduitPanier = document.querySelector(".btn__supprimer")
console.log(suppressionProduitPanier)
