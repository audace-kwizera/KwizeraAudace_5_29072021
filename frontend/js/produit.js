/**
 * Utilisation de la technique clé valeur pour créer une page produit pour chaque produit
 */
//Création d'une fontion no name appelé grâce à () pour récupèrer l'id de notre url
(async function () {
    const productId = getProductId()
    //Appel du produit
    //Attendre que les produits soit trouvés par fetch pour les récuperer des produits
    const product = await getProduct(productId)
    const colorsSelection = document.querySelector("colors")
    //console.log(product)
    //Changer le contenu de notre div existante, on rafraichi en récupérant les infos sur notre produit
    hydrateProduct(product)
})()

//Recupérer l'id
function getProductId() {
    return new URL(location.href).searchParams.get("id")
}

function getProduct(productId) {
    //Chercher et récupérer les données via fetch
    return fetch(`http://localhost:3000/api/teddies/${productId}`)
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
        .catch(function (error) {
            alert(error)
            /**
             * Test 2 => Affichage d'une erreur si aucun produit trouvé
             * console.log(error)
             */
        })
}

function hydrateProduct(product) {
    document.getElementById("templateProduct__image").src = product.imageUrl
    document.getElementById("templateProduct__title").textContent = product.name
    document.getElementById("templateProduct__description").textContent = product.description
    document.getElementById("templateProduct__price").textContent = product.price


    //Convertir les prix en euros
    product.price = product.price / 100
    templateProduct__price.innerText = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
    }).format(product.price);

    //Creation du menu déroulant pour les couleurs
    let colorsSelection = document.getElementById("templateProduct__option__couleur")
    //Remplir les options du menu selon les infos renvoyés par l'api
    for (let i = 0; i < product.colors.length; i++) {
        let option = document.createElement("option")
        option.innerText = product.colors[i]
        colorsSelection.appendChild(option)
    }
}

