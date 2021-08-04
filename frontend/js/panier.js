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

/**
 * Verifier si le panier est vide ou rempli
 */
//si vide => afficher le panier est vide
if(localStorageInit === null) {
const panierVide = `
<div class="templatePanier__message__vide">
    <div>Le panier est vide</div>
</div>
`
localStorageInit.innerHTML = panierVide

console.log("vide")
} else {
    console.log("rempli")
}


