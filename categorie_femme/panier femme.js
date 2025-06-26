let paniers = JSON.parse(localStorage.getItem('panierFemme')) || [];

function afficherProduit(paniers) {
    const paniertab = document.getElementById('cartContainer');
    paniertab.innerHTML = '';

    let tolal1 = 0;

    paniers.forEach((produit, index) => {
        const trContainer = document.createElement('tr');
        trContainer.innerHTML = `
            <td><button class="retirer" style="color: red; border: none; padding: 10px; cursor: pointer;">X</button></td>
            <td><img src="${produit.img}" style="width:60px"></td>
            <td>${produit.nom}</td>
            <td>$${produit.prix}</td>
            <td><input type="number" min="1" value="${produit.quantity}" class="quantite"></td>
            <td>
                <select name="taille" class="taille">
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="2XL">2XL</option>
                    <option value="3XL">3XL</option>
                </select>
            </td>
            <td class="soustotal">$${produit.prix * produit.quantity}</td>
        `;
        paniertab.appendChild(trContainer);

        // Suppression d'un produit
        trContainer.querySelector('.retirer').onclick = () => {
            retirer(produit.nom);
        };

        // Modification de la quantité
        trContainer.querySelector('.quantite').onchange = (e) => {
            let newQte = parseInt(e.target.value);
            if (newQte < 1) newQte = 1;
            produit.quantity = newQte;
            localStorage.setItem('panierFemme', JSON.stringify(paniers));
            afficherProduit(paniers);
        };

        tolal1 += produit.prix * produit.quantity;
    });

    let totalEl = document.querySelector('.Total');
    if (totalEl) totalEl.textContent = '$' + tolal1;
}

function retirer(nom) {
    paniers = paniers.filter(p => p.nom !== nom);
    localStorage.setItem('panierFemme', JSON.stringify(paniers));
    afficherProduit(paniers);
}

afficherProduit(paniers);

// Ouvre le formulaire d'achat
document.querySelectorAll('#payement').forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById('modalOverlay').style.display = 'block';
        document.getElementById('Formulaire_achat').style.display = 'block';
        document.body.classList.add('modal-open');
    });
});

// Ferme le formulaire d'achat
document.getElementById('closeFormButton').addEventListener('click', function () {
    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('Formulaire_achat').style.display = 'none';
    document.body.classList.remove('modal-open');
});

// Validation du formulaire d'achat
document.getElementById('Formulaire_achat').addEventListener('submit', function (event) {
    event.preventDefault();
    if (regexp()) {
        alert('Votre commande a bien été effectuée.');
        document.getElementById('modalOverlay').style.display = 'none';
        document.getElementById('Formulaire_achat').style.display = 'none';
        document.body.classList.remove('modal-open');
        paniers = [];
        localStorage.setItem('panierFemme', JSON.stringify(paniers));
        afficherProduit(paniers);
    }
});

// Validation des champs du formulaire
function regexp() {
    var NomComplet = document.getElementById("NomComplet");
    var Numtel = document.getElementById("Numtel");
    var Email = document.getElementById("Email");
    var Adresse = document.getElementById("Adresse");

    var Anomvaleur = NomComplet ? NomComplet.value : "";
    var Bnumvaleur = Numtel ? Numtel.value : "";
    var Cmailvaleur = Email ? Email.value : "";
    var Dadressevaleur = Adresse ? Adresse.value : "";

    let messagesErreur = document.querySelectorAll(".message_erreur");
    messagesErreur.forEach(message => {
        message.style.display = "none";
    });

    let valide = true;
    let NomCompletRegexp = /^[a-zA-ZÀ-ÿ\s'-]+$/;
    let BnumvaleurRegexp = /^[0-9]+$/;
    let CmailvaleurRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (Anomvaleur === "") {
        messagesErreur[0].textContent = "le champ 'Nom complet' est vide ";
        messagesErreur[0].style.display = "block";
        valide = false;
    } else if (!NomCompletRegexp.test(Anomvaleur)) {
        messagesErreur[0].textContent = "le champ 'Nom complet' ne doit contenir que des lettres, espaces ou tirets.";
        messagesErreur[0].style.display = "block";
        valide = false;
    }

    if (Bnumvaleur === "") {
        messagesErreur[1].textContent = "le champ 'Numéro de téléphone' est vide";
        messagesErreur[1].style.display = "block";
        valide = false;
    } else if (!BnumvaleurRegexp.test(Bnumvaleur) || Bnumvaleur.length !== 10) {
        messagesErreur[1].textContent = "Le numéro doit contenir exactement 10 chiffres.";
        messagesErreur[1].style.display = "block";
        valide = false;
    }

    if (Cmailvaleur === "") {
        messagesErreur[2].textContent = "le champ 'Email' est vide ";
        messagesErreur[2].style.display = "block";
        valide = false;
    } else if (!CmailvaleurRegexp.test(Cmailvaleur)) {
        messagesErreur[2].textContent = "Format d'email invalide.";
        messagesErreur[2].style.display = "block";
        valide = false;
    }

    if (Dadressevaleur === "") {
        messagesErreur[3].textContent = "le champ 'Adresse' est vide ";
        messagesErreur[3].style.display = "block";
        valide = false;
    }

    return valide;
}