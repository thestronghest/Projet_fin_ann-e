
let paniers = JSON.parse(localStorage.getItem('panierHerveKalombo')) || [];

function afficherProduit(paniers) {
    // Récupère le contenu du panier depuis le localStorage ou initialise un tableau vide si le panier est vide ou non défini

    // Sélectionne l'élément HTML avec l'ID 'cartContainer' où les produits seront affichés
    const paniertab = document.getElementById('cartContainer');

    // Vide le contenu HTML de l'élément 'cartContainer'
    paniertab.innerHTML = '';

    // Initialise un compteur y et une variable total1 pour le total des prix des produits
    let y = 0;
    let tolal1 = 0;

    // Parcourt chaque produit dans le panier
    paniers.forEach(produit => {
        // Crée un élément 'tr' (ligne de tableau) pour chaque produit
        const trContainer = document.createElement('tr');

        // Remplit l'élément 'tr' avec les détails du produit (image, nom, prix, quantité)
        trContainer.innerHTML = `
            <button id="retirer" class="far fa-times-circle" style="color: red; margin-left: 70px; margin-top: 60px; border: none; padding: 10px; cursor: pointer;">X</button>
            <td><img src="${produit.img}"></td>
            <td>${produit.nom}</td>
            <td>$${produit.prix}</td>
            <td><input type="number" value="${produit.quantity}"></td>
            <td>
                <select name="taille" id="taille">
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="2XL">2XL</option>
                    <option value="3XL">3XL</option>
                </select>
            </td>
            <td>$${produit.prix * produit.quantity}</td>
        `;

        // Ajoute cette ligne de produit à l'élément 'cartContainer'
        paniertab.appendChild(trContainer);
        // Sélectionne tous les éléments avec la classe 'far fa-times-circle' (icônes pour retirer les produits)
        let i = document.querySelectorAll('.far.fa-times-circle');
        // Associe un événement de clic à l'icône de retrait pour le produit actuel
        i[y].onclick = () => {
            retirer(produit.nom); // Appelle la fonction 'retirer' avec l'image du produit comme argument
        }
        // Ajoute le prix du produit au total
        tolal1 +=(parseInt(produit.prix)*parseInt(produit.quantity));
        // Sélectionne tous les éléments avec la classe 'Total'
        const tota = document.querySelectorAll('.Total');
        // Met à jour le contenu HTML de chaque élément 'Total' avec le nouveau total
        tota.forEach(tota => {
            tota.innerHTML = '$' + tolal1;
        });
        // Incrémente le compteur y
        y++;
    });

    const inputs = document.querySelectorAll('input')
    console.log(inputs);
    console.log(paniers)
    let ancienP;
    let newProd
    let newPan


    inputs.forEach(input => {
        input.onchange = () => {
            ancienP = paniers.find((inp, index) => inp.nom === input.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.textContent ?? { index, prod: inp })
            console.log(ancienP);
            newProd = {
                ...ancienP,
                quantity: parseInt(input.value)
            }
            newPan = paniers.filter(pan => pan.nom !== newProd.nom)
            console.log(newPan);

            newPan.push(newProd)
            paniers = [...newPan]
            console.log(paniers);

            localStorage.setItem('panierHerveKalombo', JSON.stringify(paniers));

            afficherProduit(paniers)
        }
    })
}


function maj() {

}
// Fonction pour retirer un produit du panier
function retirer(id) {
    // Affiche un message dans la console pour le debug avec l'ID du produit à retirer
    console.log('element eleve : ' + id);

    // Récupère le contenu du panier depuis le localStorage ou initialise un tableau vide si le panier est vide ou non défini
    let panier = JSON.parse(localStorage.getItem('panierHerveKalombo')) || [];

    // Filtre le panier pour exclure le produit avec l'ID spécifié
    panier = panier.filter(paniernom => (paniernom.nom !== id));

    // Affiche le panier mis à jour dans la console pour le debug
    console.log(panier);

    // Sauvegarde le panier mis à jour dans le localStorage
    localStorage.setItem('panierHerveKalombo', JSON.stringify(panier));

    // Appelle la fonction 'afficherProduit' pour rafraîchir l'affichage du panier
    afficherProduit(panier);
}

// Appelle la fonction 'afficherProduit' pour afficher le contenu du panier au chargement de la page
afficherProduit(paniers);


// Sélectionne tous les éléments 'a' à l'intérieur des éléments avec la classe 'articles' et les parcourt un par un
document.querySelectorAll('#payement').forEach(button => {
    // Ajoute un écouteur d'événement pour le clic sur chaque lien
    button.addEventListener('click', function (event) {
        // Empêche le comportement par défaut du lien (navigation)
        event.preventDefault();
        // Affiche l'élément avec l'ID 'modalOverlay' en modifiant son style display
        document.getElementById('modalOverlay').style.display = 'block';
        // Affiche l'élément avec l'ID 'Formulaire_achat' en modifiant son style display
        document.getElementById('Formulaire_achat').style.display = 'block';
        // Ajoute la classe 'modal-open' à l'élément body pour désactiver le défilement
        document.body.classList.add('modal-open');

    });
});

// Ajoute un écouteur d'événement pour le clic sur l'élément avec l'ID 'closeFormButton'
document.getElementById('closeFormButton').addEventListener('click', function () {
    // Cache l'élément avec l'ID 'modalOverlay' en modifiant son style display
    document.getElementById('modalOverlay').style.display = 'none';
    // Cache l'élément avec l'ID 'Formulaire_achat' en modifiant son style display
    document.getElementById('Formulaire_achat').style.display = 'none';
    // Retire la classe 'modal-open' de l'élément body pour réactiver le défilement
    document.body.classList.remove('modal-open');
});

// Ajoute un écouteur d'événement pour la soumission du formulaire avec l'ID 'Formulaire_achat'
document.getElementById('Formulaire_achat').addEventListener('submit', function (event) {
    // Empêche le comportement par défaut du formulaire (envoi des données)
    event.preventDefault();
    // Affiche une alerte indiquant que la commande a été effectuée
    alert('Votre commande a bien été effectuée.');
    // Cache l'élément avec l'ID 'modalOverlay' en modifiant son style display
    document.getElementById('modalOverlay').style.display = 'none';
    // Cache l'élément avec l'ID 'Formulaire_achat' en modifiant son style display
    document.getElementById('Formulaire_achat').style.display = 'none';
    // Retire la classe 'modal-open' de l'élément body pour réactiver le défilement
    document.body.classList.remove('modal-open');
});

// Fonction pour valider les champs du formulaire avec des expressions régulières
function regexp(event) {
    // Empêche le comportement par défaut du formulaire (envoi des données)
    event.preventDefault();

    // Sélectionne les éléments du formulaire par leur ID
    var NomComplet = document.getElementById("NomComplet");
    var Numtel = document.getElementById("Numtel");
    var Email = document.getElementById("Email");
    var Adresse = document.getElementById("Adresse");

    // Récupère les valeurs des champs du formulaire
    var Anomvaleur = NomComplet.value;
    var Bnumvaleur = Numtel.value;
    var Cmailvaleur = Email.value;
    var Dadressevaleur = Adresse.value;

    // Sélectionne tous les éléments avec l'ID 'message_erreur'
    let messagesErreur = document.querySelectorAll("#message_erreur");
    // Cache tous les messages d'erreur en modifiant leur style display
    messagesErreur.forEach(message => {
        message.style.display = "none";
    });

    // Variable pour suivre si le formulaire est valide
    let valide = true;
    // Expressions régulières pour valider les champs du formulaire
    let NomCompletRegexp = /^[a-zA-Z-]+$/;
    let BnumvaleurRegexp = /^[0-9]+$/;
    let CmailvaleurRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Vérifie si le champ 'Nom complet' est vide
    if (Anomvaleur === "") {
        messagesErreur[0].textContent = "le champ 'Nom complet' est vide ";
        messagesErreur[0].style.display = "block";
        valide = false;
        // Vérifie si la valeur du champ 'Nom complet' correspond à l'expression régulière
    } else if (!NomCompletRegexp.test(Anomvaleur)) {
        messagesErreur[0].textContent = "le champ 'Nom complet' ne doit contenir que des lettres, pas des blancs, pas d'espace et pas des chiffres. Mais vous pouvez séparer vos noms par des tirer'(-)'!";
        messagesErreur[0].style.display = "block";
        valide = false;
    }

    // Vérifie si le champ 'Numeros de téléphone' est vide
    if (Bnumvaleur === "") {
        messagesErreur[1].textContent = "le champ 'Numeros de téléphone' est vide";
        messagesErreur[1].style.display = "block";
        valide = false;
        // Vérifie si la valeur du champ 'Numeros de téléphone' correspond à l'expression régulière et a une longueur de 10 chiffres
    } else if (!BnumvaleurRegexp.test(Bnumvaleur) || Array.from(Bnumvaleur).length !== 10) {
        messagesErreur[1].textContent = "le champ 'Numeros de téléphone' ne peut contenir qu'une série de 10 chiffres, pas de lettres, pas d'espace, pas des blancs ni des tirer entre les chiffres !";
        messagesErreur[1].style.display = "block";
        valide = false;
    }

    // Vérifie si le champ 'Email' est vide
    if (Cmailvaleur === "") {
        messagesErreur[2].textContent = "le champ 'Email' est vide ";
        messagesErreur[2].style.display = "block";
        valide = false;
        // Vérifie si la valeur du champ 'Email' correspond à l'expression régulière
    } else if (!CmailvaleurRegexp.test(Cmailvaleur)) {
        messagesErreur[2].textContent = "Vérifiez bien votre adresse mail,le blanc et le tirer sont autorisés mais pas d'espace! Voici un exemple du format correct d'une adresse mail  'EgideL1LMD@gmail.com'";
        messagesErreur[2].style.display = "block";
        valide = false;
    }

    // Vérifie si le champ 'Adresse' est vide
    if (Dadressevaleur === "") {
        messagesErreur[3].textContent = "le champ 'Adresse' est vide ";
        messagesErreur[3].style.display = "block";
        valide = false;
    }

    // Si tous les champs sont valides
    if (valide) {
        alert('Votre commande a bien été effectuée.');
        alert(Anomvaleur + " " + Bnumvaleur + " " + Cmailvaleur + " " + Dadressevaleur);
        alert("Vous pouvez fermer le formulaire pour commander à nouveau !");
        // Si un ou plusieurs champs ne sont pas valides
    } else {
        alert('Veuillez corriger les erreurs dans le formulaire.');
    }
}

// Sélectionne le bouton avec l'ID 'btnEnresgistrer'
var btnEnresgistrer = document.getElementById("btnEnresgistrer");
// Ajoute un écouteur d'événement pour le clic sur le bouton 'btnEnresgistrer' qui appelle la fonction regexp
if (btnEnresgistrer.addEventListener) {
    btnEnresgistrer.addEventListener("click", regexp); 
}
