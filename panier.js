// Initialisation du panier enfant depuis le localStorage
let panierEnfant = JSON.parse(localStorage.getItem('panierEnfant')) || [];

// Fonction pour afficher le panier
function afficherPanierEnfant() {
    const panierDiv = document.getElementById("panier");
    if (!panierDiv) return;

    if (panierEnfant.length === 0) {
        panierDiv.innerHTML = "<p>Votre panier est vide.</p>";
        return;
    }
    let html = "<ul>";
    let total = 0;

    panierEnfant.forEach((item, index) => {
        html += `<li>${item.nom} - ${item.prix}$ 
        <button onclick="supprimerDuPanierEnfant(${index})">Supprimer</button></li>`;
        total += item.prix;
    });
    html += `</ul><p><strong>Total: ${total}$</strong></p>`;
    panierDiv.innerHTML = html;
}

// Fonction pour ajouter un produit au panier
function ajouterAuPanierEnfant({ nom, prix }) {
    panierEnfant.push({ nom, prix });
    sauvegarderPanierEnfant();
    afficherPanierEnfant();
}

// Fonction pour supprimer un produit du panier
function supprimerDuPanierEnfant(index) {
    panierEnfant.splice(index, 1);
    sauvegarderPanierEnfant();
    afficherPanierEnfant();
}

// Fonction pour sauvegarder le panier dans le localStorage
function sauvegarderPanierEnfant() {
    localStorage.setItem("panierEnfant", JSON.stringify(panierEnfant));
}

// Affichage du panier au chargement de la page
window.onload = afficherPanierEnfant;

// --- Validation du formulaire d'achat (exemple) ---
function validerFormulaireAchat(event) {
    event.preventDefault();

    var NomComplet = document.getElementById("NomComplet");
    var Numtel = document.getElementById("Numtel");
    var Email = document.getElementById("Email");
    var Adresse = document.getElementById("Adresse");

    var Anomvaleur = NomComplet.value;
    var Bnumvaleur = Numtel.value;
    var Cmailvaleur = Email.value;
    var Dadressevaleur = Adresse.value;

    let messagesErreur = document.querySelectorAll("#message_erreur");
    messagesErreur.forEach(message => {
        message.style.display = "none";
    });

    let valide = true;
    let NomCompletRegexp = /^[a-zA-Z-]+$/;
    let BnumvaleurRegexp = /^[0-9]+$/;
    let CmailvaleurRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (Anomvaleur === "") {
        messagesErreur[0].textContent = "Le champ 'Nom complet' est vide";
        messagesErreur[0].style.display = "block";
        valide = false;
    } else if (!NomCompletRegexp.test(Anomvaleur)) {
        messagesErreur[0].textContent = "Le nom ne doit contenir que des lettres ou des tirets.";
        messagesErreur[0].style.display = "block";
        valide = false;
    }

    if (Bnumvaleur === "") {
        messagesErreur[1].textContent = "Le champ 'Numéro de téléphone' est vide";
        messagesErreur[1].style.display = "block";
        valide = false;
    } else if (!BnumvaleurRegexp.test(Bnumvaleur) || Bnumvaleur.length !== 10) {
        messagesErreur[1].textContent = "Le numéro doit contenir exactement 10 chiffres.";
        messagesErreur[1].style.display = "block";
        valide = false;
    }

    if (Cmailvaleur === "") {
        messagesErreur[2].textContent = "Le champ 'Email' est vide";
        messagesErreur[2].style.display = "block";
        valide = false;
    } else if (!CmailvaleurRegexp.test(Cmailvaleur)) {
        messagesErreur[2].textContent = "Format d'email invalide.";
        messagesErreur[2].style.display = "block";
        valide = false;
    }

    if (Dadressevaleur === "") {
        messagesErreur[3].textContent = "Le champ 'Adresse' est vide";
        messagesErreur[3].style.display = "block";
        valide = false;
    }

    if (valide) {
        alert('Votre commande a bien été effectuée.');
        // Ici tu peux vider le panier si tu veux
        panierEnfant = [];
        sauvegarderPanierEnfant();
        afficherPanierEnfant();
    } else {
        alert('Veuillez corriger les erreurs dans le formulaire.');
    }
}

// Exemple d'écouteur pour le bouton d'enregistrement du formulaire
var btnEnregistrer = document.getElementById("btnEnresgistrer");
if (btnEnregistrer) {
    btnEnregistrer.addEventListener("click", validerFormulaireAchat);
}