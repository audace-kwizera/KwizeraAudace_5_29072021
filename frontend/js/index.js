/**
 * Fonction main qui va contenir le code de base pour éviter
 * les variables au niveau du script de base
 */
main()

function main() {
    //Recupération des produits
    const products = getProducts()
    //Fonctions qui affiche tous les produits
    displayProducts(products)
}

function getProducts() {
    //Chercher et récupérer les données via fetch
    fetch("http://localhost:3000/api/teddies")
        //Transformer données en json
        .then(function (httpBodyResponse) {
            return httpBodyResponse.json()
        })
        //Récuperation de tous les produits (json)
        .then(function (produits) {
            /**
             * Test de récupération le fetch récupère les donnés
             * console.log(produits)
             */
        })
}

function displayProducts() {

}