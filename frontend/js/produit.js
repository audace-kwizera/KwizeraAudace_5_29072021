/**
 * Utilisation de la technique clé valeur pour créer une page produit pour chaque produit
 */
//Création d'une fontion no name appelé grâce à () pour récupèrer l'id de notre url
(async function() {
    const productId = getProductId()
    console.log(productId)
    //Appel du produit
    const product = getProduct(productId)
    //Changer le contenu de notre div existante, on rafraichi en récupérant les infos sur notre produit
    hydrateProduct(product)
})()

//Recupérer l'id
function getProductId() {
    return new URL(location.href).searchParams.get("id")
}

function getProduct(productId) {

}

function hydrateProduct(product) {

}