let etudiants = [];

// Fonction pour charger les étudiants depuis le fichier JSON
async function chargerEtudiants() {
    try {
        const response = await fetch('etudiants.json');
        etudiants = await response.json();
        afficherEtudiants();
    } catch (error) {
        console.error("Erreur lors du chargement des étudiants : ", error);
    }
}

// Fonction pour afficher tous les étudiants dans le tableau HTML
function afficherEtudiants() {
    const tableBody = document.getElementById('etudiantsTableBody');
    tableBody.innerHTML = ''; // Nettoyer le tableau avant de l'afficher
    etudiants.forEach(etudiant => {
        const row = `<tr>
                        <td>${etudiant.id}</td>
                        <td>${etudiant.nom}</td>
                        <td>${etudiant.prenom}</td>
                        <td>${etudiant.age}</td>
                        <td>${etudiant.email}</td>
                    </tr>`;
        tableBody.innerHTML += row;
    });
}

// Fonction pour rechercher un étudiant par ID
function rechercherEtudiant() {
    const etudiantId = prompt("Entrez l'Id de l'étudiant :");
    const etudiant = etudiants.find(e => e.id === parseInt(etudiantId));
    console.log(etudiant.id)
    
    if (etudiant) {
        // Afficher les informations de l'étudiant trouvé
        document.getElementById('etudiantsTableBody').innerHTML = `
                    <tr>
                        <td>${etudiant.id}</td>
                        <td>${etudiant.nom}</td>
                        <td>${etudiant.prenom}</td>
                        <td>${etudiant.age}</td>
                        <td>${etudiant.email}</td>
                </tr>
        `;
    } else {
        alert("Étudiant non trouvé");
    }
}

// Fonction pour éditer un étudiant
function editEtudiant() {
    const etudiantId = prompt("Entrez l'Id de l'étudiant à éditer :");
    const etudiant = etudiants.find(e => e.id === parseInt(etudiantId));

    if (etudiant) {
        //masquer la liste complete des étudiants
        document.getElementById('etudiantsTable').style.display = 'none';
        // Remplir le formulaire avec les informations de l'étudiant
        document.getElementById('etudiantForm').style.display = 'block';
        document.getElementById('etudiantId').value = etudiant.id;
        document.getElementById('etudiantNom').value = etudiant.nom;
        document.getElementById('etudiantPrenom').value = etudiant.prenom;
        document.getElementById('etudiantAge').value = etudiant.age;
        document.getElementById('etudiantEmail').value = etudiant.email;
    } else {
        alert("Étudiant non trouvé");
    }
}

// Fonction pour sauvegarder les modifications d'un étudiant
function sauvegarderEtudiant() {
    const etudiantId = document.getElementById('etudiantId').value;
    const etudiant = etudiants.find(e => e.id === parseInt(etudiantId));

    if (etudiant) {
        etudiant.nom = document.getElementById('etudiantNom').value;
        etudiant.prenom = document.getElementById('etudiantPrenom').value;
        etudiant.age = document.getElementById('etudiantAge').value;
        etudiant.email = document.getElementById('etudiantEmail').value;

        afficherEtudiants();
        document.getElementById('etudiantForm').style.display = 'none'; // Cacher le formulaire après modification
        document.getElementById('etudiantsTable').style.display = 'block';
    } else {
        alert("Étudiant non trouvé pour sauvegarde.");
    }
}

// Fonction pour supprimer un étudiant
function supprimerEtudiant() {
    const etudiantId = prompt("Entrez l'Id de l'étudiant à supprimer :");
    const etudiantIndex = etudiants.findIndex(e => e.id === parseInt(etudiantId));

    if (etudiantIndex !== -1) {
        etudiants.splice(etudiantIndex, 1); // Supprimer l'étudiant de la liste
        afficherEtudiants(); // Rafraîchir le tableau
    } else {
        alert("Étudiant non trouvé");
    }
}

// Écouteurs d'événements pour les boutons
document.getElementById('chargerEtudiantsButton').addEventListener('click', chargerEtudiants);
document.getElementById('rechercherEtudiantButton').addEventListener('click', rechercherEtudiant);
document.getElementById('editEtudiantButton').addEventListener('click', editEtudiant);
document.getElementById('sauvegarderEtudiantButton').addEventListener('click', sauvegarderEtudiant);
document.getElementById('supprimerEtudiantButton').addEventListener('click', supprimerEtudiant);









