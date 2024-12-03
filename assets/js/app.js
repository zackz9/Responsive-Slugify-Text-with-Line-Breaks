 // Récupérer les éléments HTML
 const textInput = document.getElementById('textInput');
 const slugifyButton = document.getElementById('slugifyButton');
 const slugifiedLinks = document.getElementById('slugifiedLinks');
 const resultDiv = document.querySelector('.result');
 const slugPreview = document.getElementById('slugPreview');

// GSAP animation for page load scroll
window.addEventListener('load', () => {
    gsap.from("body", { opacity: 0, duration: 1.5 });
});

  // Fonction pour convertir un texte en slug
// Fonction pour convertir un texte en slug avec des options personnalisées
function slugify(text, options = {}) {
  const separator = options.separator || '-'; // Séparateur par défaut '-'
  const preserveCase = options.preserveCase || false; // Majuscules
  const maxLength = options.maxLength || Infinity; // Pas de limite par défaut

  let slug = text
      .normalize('NFD') // Décompose les caractères accentués
      .replace(/[\u0300-\u036f]/g, '') // Supprime les diacritiques
      .trim(); // Supprime les espaces au début et à la fin

  if (!preserveCase) {
      slug = slug.toLowerCase(); // Met tout en minuscule
  }

  slug = slug
      .replace(/[^a-z0-9\s-]/gi, '') // Supprime les caractères spéciaux
      .replace(/\s+/g, separator) // Remplace les espaces par le séparateur choisi
      .replace(new RegExp(`${separator}+`, 'g'), separator); // Élimine les séparateurs consécutifs

  return slug.slice(0, maxLength); // Applique la limite de longueur si définie
}

// Fonction pour mettre à jour les slugs en fonction des options sélectionnées
function updateSlugWithOptions() {

  // Récupération des options
  const separator = document.getElementById('separatorSelect').value;
  const preserveCase = document.getElementById('preserveCaseCheckbox').checked;
  const maxLength = parseInt(document.getElementById('maxLengthInput').value, 10) || Infinity;

  // Récupérer le texte entré par l'utilisateur
  const inputText = textInput.value;
  const lines = inputText.split('\n');

  // Nettoyer les résultats précédents
  slugifiedLinks.innerHTML = '';

  // Générer les slugs pour chaque ligne
  lines.forEach(line => {
      if (line.trim()) { // Ignorer les lignes vides
          const slug = slugify(line, { separator, preserveCase, maxLength });

          // Ajouter les slugs au DOM
          const slugElement = document.createElement('span');
          slugElement.textContent = slug;
          slugElement.className = 'block text-blue-600 cursor-pointer hover:underline';
          
          // Ajouter l'événement pour copier dans le presse-papiers
          slugElement.addEventListener('click', () => copyToClipboard(slug));

          slugifiedLinks.appendChild(slugElement);
      }
  });

   //   // Animation GSAP pour afficher le résultat avec un effet de fondu et translation
    gsap.to(resultDiv, { opacity: 1, duration: 0.8, x: 10, ease: "power2.out" });
}


// Gestion du clic sur le bouton "Convertir en Slug"
if (slugifyButton) {
  slugifyButton.addEventListener('click', updateSlugWithOptions);
}




// To Copy on click on result 
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      showToast("Slug copié dans le presse-papiers !");
    });
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg';
    document.body.appendChild(toast);

    // Disparaît après 2 secondes
    setTimeout(() => {
        toast.remove();
    }, 2000);
}

 

  // Ajouter un événement au clic du bouton
  // slugifyButton.addEventListener('click', function() {
  //   // Récupérer et traiter le texte ligne par ligne
  //   const inputText = textInput.value;
  //   const lines = inputText.split('\n'); // Séparer le texte par les sauts de ligne
  //   slugifiedLinks.innerHTML = ''; // Vider le conteneur de liens avant d'ajouter de nouveaux éléments

  //   lines.forEach(line => {
  //       if (line.trim()) { // Ignorer les lignes vides
  //         const slug = slugify(line);
  //         const slugElement = document.createElement('span');
  //         slugElement.textContent = slug;
  //         slugElement.className = 'block text-blue-600 cursor-pointer hover:underline';
          
  //         // Ajouter l'événement de clic pour copier le slug dans le presse-papiers
  //         slugElement.addEventListener('click', () => copyToClipboard(slug));
      
  //         slugifiedLinks.appendChild(slugElement);
  //       }
  //     });
      
  //   // Animation GSAP pour afficher le résultat avec un effet de fondu et translation
  //   gsap.to(resultDiv, { opacity: 1, duration: 0.8, x: 10, ease: "power2.out" });
  // });

  // Prévisualisation dynamique

textInput.addEventListener('input', function () {
  const inputText = textInput.value;
  const lines = inputText.split('\n'); // Diviser le texte en lignes
  slugPreview.innerHTML = ''; // Réinitialiser la prévisualisation

  lines.forEach(line => {
      if (line.trim()) { // Ignorer les lignes vides
          const previewSlug = slugify(line.trim());
          const slugElement = document.createElement('span');
          slugElement.textContent = previewSlug;
          slugElement.className = 'block mb-1 italic text-gray-700';

          slugPreview.appendChild(slugElement);
      }
  });

  // Si aucun texte n'est présent, afficher un message par défaut
  if (!inputText.trim()) {
      slugPreview.textContent = 'Slugified result will appear here...';
  }
});


// Fonction pour compter les mots et les caractères
function countWordsAndCharacters(text) {
  const words = text.trim().split(/\s+/).filter(word => word.length > 0); // Divise par espace et filtre les vides
  const wordCount = words.length; // Nombre de mots
  const characterCount = text.length; // Nombre total de caractères
  return { wordCount, characterCount };
}

// Fonction pour mettre à jour l'affichage du comptage
function updateWordAndCharacterCount() {
  const inputText = textInput.value; // Texte dans le textarea
  const { wordCount, characterCount } = countWordsAndCharacters(inputText); // Récupère le comptage
  document.getElementById('wordCount').textContent = `Mots : ${wordCount}`;
  document.getElementById('characterCount').textContent = `Caractères : ${characterCount}`;
}

// Écouteur d'événements pour la mise à jour en temps réel
textInput.addEventListener('input', updateWordAndCharacterCount);
slugifyButton.addEventListener('click', updateSlugWithOptions);
