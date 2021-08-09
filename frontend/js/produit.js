/**
 * Utilisation de la technique clé valeur pour créer une page produit pour chaque produit
 */
//Création d'une fontion no name appelé grâce à () pour récupèrer l'id de notre url
(async function () {
    const productId = getProductId()
    //Appel du produit
    //Attendre que les produits soit trouvés par fetch pour les récuperer des produits
    const product = await getProduct(productId)
    //const colorsSelection = document.querySelector("colors")
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

//Recuperation des données séléctionnées par l'utilisateur et envoi au panier
//Selection du nom du produit
const addProductName = document.getElementById("templateProduct__title")
//console.log(addProductName)

//Selection de id du produit
const addProductId = getProductId()
//console.log(addProductId)

//Selection de l'id de l'option du produit
const addProductColor = document.getElementById("templateProduct__option__couleur")
//console.log(addProductColor)

//Attraper la quantité choisi par l'utilisateur 
const addProductQuantity = document.getElementById("templateProduct__quantite__nombre")
//console.log(addProductQuantity)

//Ajouter le prix choisi par l'utilisateur 
//const addProductPrice = document.getElementById("templateProduct__price")
//console.log(addProductPrice)


/*================= Panier  =================*/


//Selection du bouton ajout panier
const addProductToCart = document.getElementById("templateProduct__link__add")
//console.log(addProductToCart)

/* Creation de l'evenement d'ajout au panier */

//Envoyer le panier
addProductToCart.addEventListener("click", (event) => {
    //Bloque la rectualisation de la page a l'appui du bouton
    event.preventDefault()

    /*==============    Creation Objet ========*/

    //Selection du nom du produit
    const addProductNameChoice = addProductName.innerHTML
    //console.log(addProductNameChoice)

    //Mettre le choix de l'utilisateur pour l'option 
    const addProductChoice = addProductColor.value
    //console.log(addProductChoice)

    //Ajouter la quantité choisi par l'utilisateur 
    const addProductQuantityChoice = addProductQuantity.value
    //console.log(addProductQuantityChoice)

    //Ajuster le prix selon la quantité choisi par l'utilisateur 
    const addProductPriceQuantity = templateProduct__price.innerText
    //console.log(addProductPriceQuantity)

    //Recuperer les données du lot produit à ajouter
    let addProductOptions = {
        nomProduit: addProductNameChoice,
        optionProduit: addProductChoice,
        quantite: addProductQuantityChoice,
        prix: parseFloat(addProductPriceQuantity) * addProductQuantityChoice,
        idProduit: addProductId,
    }
    console.log(addProductOptions)

    //Convertir les prix en euros
    addProductOptions.prix = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
    }).format(addProductOptions.prix);

    /*===============   Local Storage   =========*/
    //Verifier si le local storage est vide, on va lire la clé produit via getItem
    let products = JSON.parse(localStorage.getItem("product"))
    //conversion des données js dans le localstorage en json via json.parse
    //console.log(products)

    //Petit message de confirmation
    const messageConfirmer = () => {
        if (window.confirm(`Le gentil nounours ${addProductNameChoice} de couleur ${addProductChoice} a bien été ajouté :)
Pour voir le panier cliquez sur OK ou ANNULER pour revenir à l'accueil`)) {

            //Adresse pour voir le panier
            window.location.href = "panier.html"
        } else {
            window.location.href = "index.html"
        }
    }

    //Ajout du lot dans le localstorage
    const ajoutLocalStorage = () => {
        products.push(addProductOptions)

        /**Envoyer les produits choisi dans le localstorage 
        * pour éviter l'effacement des produits lors deraffraichissement de page
        * et creer la clé product
        */
        localStorage.setItem("product", JSON.stringify(products))
    }


    //Si il y a ou non une clé des produits dans le localstorage 
    if (products) {
        //Pour ajouter de nouveaux produits en plus
        ajoutLocalStorage()

        //Envoyer une confirmation pour le client
        messageConfirmer()

    } else {
        //Creer un array vide
        products = []

        //Mettre dans le tableau le contenu du lot de produits
        ajoutLocalStorage()

        //Envoyer une confirmation pour le client
        messageConfirmer()
    }
})


