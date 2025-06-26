// Simulation de la base de donnée
// Sélectionne tous les éléments avec la classe 'produit' 
var button = document.querySelectorAll('#ajout_panier');

console.log(button[1].dataset);

//console.log(button); // Décommentez cette ligne si vous souhaitez afficher les boutons dans la console

// Parcourt tous les boutons sélectionnés
for (let i = 0; i < button.length; i++) {

    //console.log(button[i]); // Décommentez cette ligne si vous souhaitez afficher chaque bouton dans la console

    // Ajoute un écouteur d'événement pour le clic sur chaque bouton
    button[i].onclick = () => {
        // Récupère le nom et le prix du produit à partir des attributs data-name et data-price du bouton
        const name = button[i].dataset.name;
        const price = button[i].dataset.price;
        const image_principale = button[i].parentElement.firstElementChild.src;
        console.log(image_principale)
        ajouterPanier(image_principale, name, price, 1)
    };
}

// Fonction pour ajouter un produit au panier
function ajouterPanier(img, nom, prix, quantity) {
    alert('Produit ajouté au panier') // Affiche une alerte lorsque le produit est ajouté au panier
    let paniers = JSON.parse(localStorage.getItem('panierHerveKalombo')) || []; // Récupère le panier depuis le localStorage ou initialise un tableau vide
    let police = true

    if (police) {
        if (paniers.length == 0) {
            // Si le panier est vide, ajoute le nouveau produit
            paniers.push({
                img: img,
                nom: nom,
                prix: prix,
                quantity: 1
            })
        } else if (paniers.length >= 1) {
            // Si le panier contient déjà des produits
            let produitTrouve = paniers.find(produit => produit.nom == nom) // Cherche si le produit est déjà dans le panier

            console.log(produitTrouve);

            let produitAJour = {
                img: img,
                nom: nom,
                prix: prix,
                quantity: 1
            }

            if (produitTrouve) {
                // Si le produit est trouvé, met à jour ses informations
                paniers = paniers.map(produit => {
                    return produitTrouve.nom == produit.nom ? produitAJour : produit
                })
            } else {
                // Sinon, ajoute le nouveau produit au panier
                paniers.push({
                    img: img,
                    nom: nom,
                    prix: prix,
                    quantity: 1
                })
            }
        }
    }
    console.log(nom);
    localStorage.setItem('panierHerveKalombo', JSON.stringify(paniers)); // Sauvegarde le panier mis à jour dans le localStorage
    console.log(paniers); // Affiche le panier mis à jour dans la console
}