let panier = JSON.parse(localStorage.getItem("panier")) || [];

function ajouterAupanier({ nom, prix }) {
    panier.push({ nom, prix });
    sauvegarderpanier();
    afficherpanier();
}

function supprimerDupanier(index) {
    panier.splice(index, 1);
    sauvegarderpanier();
    afficherpanier();
}

function sauvegarderpanier() {
    localStorage.setItem("panier", JSON.stringify(panier));
}

function afficherpanier() {
    let panierDiv = document.getElementById("panier");
    if (!panierDiv) return; // Sécurité si l'élément n'existe pas

    if (panier.length === 0) {
        panierDiv.innerHTML = "<p>Votre panier est vide.</p>";
        return;
    }
    let html = "<ul>";
    let total = 0;

    panier.forEach((item, index) => {
        html += `<li>${item.nom} - ${item.prix}$ 
        <button onclick="supprimerDupanier(${index})">supprimer</button></li>`;
        total += item.prix;
    });
    html += `</ul><p><strong>Total: ${total}$</strong></p>`;
    panierDiv.innerHTML = html;
}

window.onload = afficherpanier;