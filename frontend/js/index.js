/**
 * Fonction main qui va contenir le code de base pour éviter
 * les variables au niveau du script de base
 */
main()

//Transfprmation de la fonction main en asynchrone pour pouvoir utiliser await
async function main() {
    //Attendre que les produits soit trouvés par fetch pour les récuperer des produits
    const products = await getProducts()
    //console.log(products)
    //Fonctions qui affiche tous les produits
    displayProducts(products)
}

function getProducts() {
    //Chercher et récupérer les données via fetch
    return fetch("http://localhost:3000/api/teddies")
        //Transformer données en json
        .then(function (httpBodyResponse) {
            return httpBodyResponse.json()
        })
        //Récuperation de tous les produits (json)
        .then(function (products) {
            return products
            /**
             * Test 1 => récupération des données ok le fetch récupère les donnés
             * console.log(products)
             */
        })
        //Affichage d'un message au cas ou il y a une erreur 
        .catch(function(error) {
            alert(error)
            /**
             * Test 2 => Affichage d'une erreur si aucun produit trouvé
             * console.log(error)
             */
        })
}


function displayProducts() {

}