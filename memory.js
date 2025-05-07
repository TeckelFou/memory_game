const imagesJeu = [
    "uguette.webp",
    "sani.webp",
    "pochi1.webp",
    "milo.webp",
    "lulo.webp",
    "fleur.webp"
];


//dupliquer les cartes et le mélanger
//... : opérateur qui décompose un tableau pour dupliquer, en gros ca transforme en deux imagesJeu
//sort trie les elements, de maniere perso avec math random et on multiplie par 0.5 pour mélanger de maniere aleatoire
let imagesMelangees = [...imagesJeu, ...imagesJeu].sort(() => 0.5 - Math.random());

//on déclare
let cartesRetourne = 0;
let carteUne = null;
let carteDeux = null;
let coups = 0;
const compteurCoups = document.getElementById("coups"); //on prend l'element coups dans le html
let pairesTrouvees = 0;


//selection de la zone de jeu dans le html
const zoneJeu = document.querySelector('.jeu');


//espace pour relancer
document.addEventListener('keydown', function (event) { 
if (event.code === 'Space' ){
    window.location.reload(); }
});

// pour chaque image mélangée on crée une carte (div)
imagesMelangees.forEach((image) => {
    const carte = document.createElement("div");
    carte.classList.add("carte");
    
//on ajoute le html dans carte avec les deux faces et patati patata    
carte.innerHTML = `
        <div class="flip-box-inner">
            <div class="flip-box-front"></div>
            <div class="flip-box-back">
                <img src="imagesMemory/${image}" alt="image">
            </div>
        </div>
    `;

//flip box inner contient les deux faces
//front c'est la face avant
//le dos et donc l'image
// img src, image ajoutée à l'arrière de la carte


//on stocke le nom de l'image pour comparer
//dataset pour lire les données html des cartes (juste dessus)
    carte.dataset.image = image;

    //on ajoute le clic de la carte
    carte.addEventListener("click", () => {

    //pour éviter les bugs si on clique plusueirus fois sur la même ou si on essaye de clic sur une 3e
    //en gros on return si la carte est déjà flip ou si y'en a 2 retournées
   if(carte.classList.contains("flipped") || cartesRetourne === 2) return;

   //on retourne la carte
   carte.classList.add("flipped");
   cartesRetourne++;

   //on attribu les valeurs pour chaque carte retournée
if(cartesRetourne === 1){
    carteUne = carte;
} else if (cartesRetourne === 2){
    carteDeux = carte;
    coups++;
    compteurCoups.textContent = coups; //maj du compteur de coups

//vérifier si les deux cartes sont identiques
setTimeout(() => {
//si ca correspond
    if (carteUne.dataset.image === carteDeux.dataset.image) {
        pairesTrouvees++;
        if (pairesTrouvees === imagesJeu.length) {
             alert("Bravo ! Vous avez réussi en : " + coups);
        } 
        //si non, elles se retournent
    }else {
        carteUne.classList.remove("flipped");
        carteDeux.classList.remove("flipped");
    }
    //on réinitialise pour la suite
    cartesRetourne = 0;
carteUne = null;
carteDeux = null;
},
1000);




}
});
zoneJeu.appendChild(carte); //ajout de la carte au DOM
});

 /*while (function myFunction() {
  document.getElementById(" ").innerHTML = "You pressed a key inside the input field";
})*/