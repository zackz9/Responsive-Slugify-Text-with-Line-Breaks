
// GSAP animation for page load scroll
window.addEventListener('load', () => {
    gsap.from("body", { opacity: 0, duration: 1.5 });
    gsap.from(".w-4/5", { y: -50, opacity: 0, duration: 1.5, ease: "power3.out" });
  });

  // Fonction pour convertir un texte en slug
  function slugify(text) {
    return text
      .normalize('NFD') // Décompose les caractères accentués
      .replace(/[\u0300-\u036f]/g, '') // Supprime les diacritiques
      .toLowerCase() // Met tout en minuscule
      .trim() // Supprime les espaces au début et à la fin
      .replace(/[^a-z0-9\s-]/g, '') // Supprime les caractères spéciaux
      .replace(/\s+/g, '-') // Remplace les espaces par des tirets
      .replace(/-+/g, '-'); // Élimine les tirets consécutifs
  }
  

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

  // Récupérer les éléments HTML
  const textInput = document.getElementById('textInput');
  const slugifyButton = document.getElementById('slugifyButton');
  const slugifiedLinks = document.getElementById('slugifiedLinks');
  const resultDiv = document.querySelector('.result');

  // Ajouter un événement au clic du bouton
  slugifyButton.addEventListener('click', function() {
    // Récupérer et traiter le texte ligne par ligne
    const inputText = textInput.value;
    const lines = inputText.split('\n'); // Séparer le texte par les sauts de ligne
    slugifiedLinks.innerHTML = ''; // Vider le conteneur de liens avant d'ajouter de nouveaux éléments

    lines.forEach(line => {
        if (line.trim()) { // Ignorer les lignes vides
          const slug = slugify(line);
          const slugElement = document.createElement('span');
          slugElement.textContent = slug;
          slugElement.className = 'block text-blue-600 cursor-pointer hover:underline';
          
          // Ajouter l'événement de clic pour copier le slug dans le presse-papiers
          slugElement.addEventListener('click', () => copyToClipboard(slug));
      
          slugifiedLinks.appendChild(slugElement);
        }
      });
      
    // Animation GSAP pour afficher le résultat avec un effet de fondu et translation
    gsap.to(resultDiv, { opacity: 1, duration: 0.8, x: 10, ease: "power2.out" });
  });