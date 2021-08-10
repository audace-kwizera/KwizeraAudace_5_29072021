main()

/**
 * Création d'une fonction pour l'affichage sur la 
 * page des infos par rapport à la confirmation de 
 * la commande 
 */
 
function main() {
    affichageOrderIdPrixMessagePageConfirmation()
}

/**
 * Création d'une fonction qui va contenir 
 * les constantes de chaque info
 */
function affichageOrderIdPrixMessagePageConfirmation() {
    //Préparation de l'affichage des infos sur la page
    const affichageOrderId = document.querySelector("#templateConfirmationCommande__container__orderId")
    const affichagePrixTotal = document.querySelector("#templateConfirmationCommande__container__total")

    /** On va afficher les infos dans les balises 
     * que l'on a crée qui contiendrons les infos récupéré 
     * dans le Localstorage
     */

    affichageOrderId.innerHTML = localStorage.getItem("orderId")
    affichagePrixTotal.innerHTML = localStorage.getItem("total")

    //On efface le localstorage
    localStorage.clear()
}

