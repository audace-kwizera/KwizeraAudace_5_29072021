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