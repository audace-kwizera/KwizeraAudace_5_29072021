//Recuperer les produit dans la page panier
//Verifier si le local storage est vide, on va lire la clé produit via getItem
let products = JSON.parse(localStorage.getItem("product"))
//conversion des données js dans le localstorage en json via json.parse

/**
 * Selection de la classe html pour rajouter les produits
 */

const selectionContenuPanier = document.querySelector("#templatePanier__message")

let panierRempli = []

/**
 * Verifier si le panier est vide ou rempli
 */
//si vide => afficher le panier est vide
if (products === null || products == 0) {
    const panierVide = `<div class="templatePanier__message__vide">
    <h3>Votre panier est vide</h3>
</div>`
    selectionContenuPanier.innerHTML = panierVide
} else {
    //si rempli => afficher produit
    //on utilise k car i a déjà été utilisés
    for (j = 0; j < products.length; j++) {

        //Affichage de produit en boucle (la lettre k va permettre a for de rajouter les élements tant qu'il y en a)
        panierRempli = panierRempli + `<div id="containerPanier" class="containerPanier">
    <div class="containerPanier__description">${products[j].quantite} x Nounours ${products[j].nomProduit} de couleur ${products[j].optionProduit} produit</div>
    <div class="containerPanier__prix">${products[j].prix} - <a class="btn btn__supprimer">Retirer</a> </div>
</div>`
    }

    //Afficher le panier
    if (j === products.length) {
        selectionContenuPanier.innerHTML = panierRempli
    }
}

/**
 * Supprimer un produit du panier
 */
let suppressionProduitPanier = document.querySelectorAll(".btn__supprimer")

//j'utilise k pour la boucle car i et j ont été utilisé
for (let k = 0; k < suppressionProduitPanier.length; k++) {
    //evenement au clic
    suppressionProduitPanier[k].addEventListener("click", (event) => {
        event.preventDefault()

        //On selectionne l'id du produit 
        let suppressionProduitPanierId = products[k].idProduit

        /**
         * supprimer les objets en cliquant sur le bouton
         * en filtrant les elements à supprimer pour retourner 
         * un nouveau array mis a jour avec fonction inverse "!"
         * */
        products = products.filter((el) => el.idProduit !== suppressionProduitPanierId)

        /**Envoyer les produits choisi dans le localstorage 
        * pour éviter l'effacement des produits lors deraffraichissement de page
        * et creer la clé product
        */
        localStorage.setItem("product", JSON.stringify(products))

        //message suppression
        alert("Nounours supprimé du panier")
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

/**
 * On va supprimer la key du localstorage pour vider le panier
 */
viderProduitPanierLink.addEventListener("click", (event) => {
    //stoppe comportement par default du bouton
    event.preventDefault()

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
for (let l = 0; l < products.length; l++) {
    let panierRempliPrix = products[l].prix
    //Mettre les prix dans un array pour pouvoir les caluler, 
    //on utilis push pour rajouter les elements
    panierRempliPrixTotal.push(panierRempliPrix)

}
//On transforme les prix en nombre grâce à parsefloat
panierRempliPrixTotal = panierRempliPrixTotal.map((x) => parseFloat(x))

//On va faire le calcul pour obtenir le total de tous les produits avec reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue
const prixTotalPanier = (panierRempliPrixTotal.reduce(reducer, 0))


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

let product = []
product.push = products





/**
 * Formulaire de livraison
 */

const affichageFormulaireLivraison = () => {
    //Selection de l'element du DOM
    const containerFormulaireLivraison = document.querySelector("#templatePanier__message")

    //Formulaire de Livraison
    const formulaireLivraison = `<div id="templateFormulaire" class="templateFormulaire">
    <h3>Formulaire de Livraison</h3>

    <form action="" method="POST" class="templateFormulaire__container">
        <label for="firstName">Prénom</label><span id="errorFirstName" class="errorFormValue"></span>
        <input type="text" name="firstName" id="firstName" required>

        <label for="lastName">Nom</label><span id="errorLastName" class="errorFormValue"></span>
        <input type="text" name="lastName" id="lastName" required>

        <label for="address">Adresse</label><span id="errorAddress" class="errorFormValue"></span>
        <textarea name="address" id="address" required></textarea>

        <label for="city">Ville</label><span id="errorCity" class="errorFormValue"></span>
        <input type="text" name="city" id="city" required>

        <label for="email">Email</label><span id="errorEmail" class="errorFormValue"></span>
        <input type="email" name="email" id="email" required>

        <button id="btn__envoyer__formulaire" class="btn btn__envoyer__formulaire" type="submit" name="btn__envoyer__formulaire">Confirmer le Paiement</button>
    </form>
</div>`

    //Inserer Formulaire de Livraison
    containerFormulaireLivraison.insertAdjacentHTML("afterend", formulaireLivraison)
}

//Afficher le formulaire
affichageFormulaireLivraison()

//On va creer l'evenement envoyer
const boutonEnvoyerFormulaireLivraison = document.querySelector("#btn__envoyer__formulaire")

/**
 * On ecoute le click
 */
//
boutonEnvoyerFormulaireLivraison.addEventListener("click", (event) => {
    event.preventDefault()


    //On recupere les données du formulaire
    const contact = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value
    }


    /**
     * Validation du formulaire grâce au regex 
     * ^pour commencer la regex
     * $pour terminer la regex
     */
    //Paramètres grace aux regex pour la validation des infos du formulaire
    const regExFirstNameLastNameCity = (value) => {
        return /^([A-Za-z\s]{2,15})?([-]{0,1})?([A-Za-z\s]{2,15})$/.test(value)
    }


    const regExMail = (value) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    }

    const regExAdress = (value) => {
        return /^[A-Za-z0-9\s]{5,40}$/.test(value)
    }

    //Erreur
    const regExAlertText = (value) => {
        return `Veuillez utiliser que des lettres pour écrire votre ${value} \n Entre 2 et 20 caractères`
    }


    const regExAlertAdress = (value) => {
        return `Veuillez indiquer une adresse valide`
    }

    const regExAlertMail = (value) => {
        return `Veuillez entrer une ${value} valide`
    }

    //Message d'erraur 
    function remplissageChampsOk(querySelectorId) {
        document.querySelector(`#${querySelectorId}`).textContent = ""
    }

    function remplissageChampsKo(querySelectorId) {
        document.querySelector(`#${querySelectorId}`).textContent = "Oups Petite Erreur, Veuillez Réessayer"
    }

    //Verification des infos du formulaires
    function validationFirstName() {
        const valueFirstName = contact.firstName
        if (regExFirstNameLastNameCity(valueFirstName)) {
            remplissageChampsOk("errorFirstName") 
            return true
        } else {
            remplissageChampsKo("errorFirstName")
            alert(regExAlertText("Prénom"))
            return false
        }
    }

    function validationLastName() {
        const valueLastName = contact.lastName
        if (regExFirstNameLastNameCity(valueLastName)) {
            remplissageChampsOk("errorLastName") 
            return true
        } else {
            remplissageChampsKo("errorLastName")
            alert(regExAlertText("Nom"))
            return false
        }
    }

    function validationAdress() {
        const valueAdress = contact.address
        if (regExAdress(valueAdress)) {
            remplissageChampsOk("errorAddress") 
            return true
        } else {
            remplissageChampsKo("errorAddress")
            alert(regExAlertAdress())
            return false
        }
    }

    function validationCity() {
        const valueCity = contact.city
        if (regExFirstNameLastNameCity(valueCity)) {
            remplissageChampsOk("errorCity") 
            return true
        } else {
            remplissageChampsKo("errorCity")
            alert(regExAlertText("Ville"))
            return false
        }
    }

    function validationEmail() {
        const valueEmail = contact.email
        if (regExMail(valueEmail)) {
            remplissageChampsOk("errorEmail")
            return true
        } else {
            remplissageChampsKo("errorEmail")
            alert(regExAlertMail("adresse mail (par exemple norbert@orinoco.com)"))
            return false
        }
    }


    /**
     * Validation des infos du formulaires
     */
    if (validationFirstName()
        && validationLastName()
        && validationAdress()
        && validationCity()
        && validationEmail()) {
        //Mettre les infos dans le localstorage en format json
        localStorage.setItem("contact", JSON.stringify(contact))
    } else {
        alert("Verifier votre reponse")
    }


    /** 
    Preparer les données de la commande à envoyer au serveur 
    en récupérant les données pour l'api
    */
    const order = {
        contact: {
            firstName: contact.firstName,
            lastName: contact.lastName,
            address: contact.address,
            city: contact.city,
            email: contact.email
        },
        products: product,
    }
    

    //Préparation de l'envoi
    const options = {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "Content-Type": "application/json" },
      };

      //Formatage du prix pour l'affichage en retour sur la page confirmation
      let prixPageConfirmation = affichagePrixTotalPanier.innerText
      prixPageConfirmation = prixPageConfirmation.split()
      
      //Envoi des données
      fetch("http://localhost:3000/api/teddies/order", options)
      //Reponse si tout est validé par l'api
        .then((response) => response.json())
        .then((data) => {

            //On vide le panier après l'envoi 
            localStorage.clear()
            
            //Création de l'id de la commande 
          localStorage.setItem("orderId", data.orderId)
          localStorage.setItem("total", prixPageConfirmation)

          //Redirection sur la page confirmation
          document.location.href = "confirmation.html";
        })
        //Affichage du message d'erreur en cas d'erreur
        .catch((err) => {
            alert("Oups ca ne marche pas, peut être une erreur" + err);
        })
})


/** 
 * Petites options pour le local storage 
 */

//Recuperer la key du localstorage
const keyLocalStorageFormulaireLivraison = localStorage.getItem("contact")

//Transformer données du localstorage en json
const keyLocalStorageFormulaireLivraisonDonnee = JSON.parse(keyLocalStorageFormulaireLivraison)

//Garder les données saisie dans le formulaire même lors d'un ractualisation de page
function saisieInfoLocalStorage(saisie) {
    if(keyLocalStorageFormulaireLivraisonDonnee == null){
    } else {
        document.querySelector(`#${saisie}`).value = keyLocalStorageFormulaireLivraisonDonnee[saisie]
    }
}

saisieInfoLocalStorage("firstName")
saisieInfoLocalStorage("lastName")
saisieInfoLocalStorage("address")
saisieInfoLocalStorage("city")
saisieInfoLocalStorage("email")


//utiliser id comme key pour verifier lors de l'ajout si l'id existe dejà pour l'addition des produits automatiquement

