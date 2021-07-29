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
    //Selection de chaque produits de la liste de produits
    for (product of products) {
    //Fonctions qui affiche tous les produits
    displayProduct(product)
    }
}

function getProducts() {
    //Chercher et récupérer les données via fetch
    return fetch("http://localhost:3000/api/teddies")
        //Transformer données en json
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json()
        })
        //Récuperation de tous les produits (json)
        .then(function(products) {
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

//Affichage des produits
function displayProduct(product) {
    //Copie et ajout du template html
    const templateElt = document.getElementById("templateProduct")
    const cloneElt = document.importNode(templateElt.content, true)

    //Remplir les infos du template par les infos de l'api
    cloneElt.getElementById("product__image").src = product.imageUrl
    cloneElt.getElementById("product__title").textContent = product.name
    cloneElt.getElementById("product__description").textContent = product.description
    cloneElt.getElementById("product__price").textContent = product.price
    
}