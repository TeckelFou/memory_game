//récupérer et gère le formulaire, [ ] pour accéder à l'éelement par son nom
function entryForm() {
  //selection du formulaire
  const form = document.forms["formulaire"];
  //recup des champs
  const userName = form["userName"];
  const email = form["mail"];
  const password = form["mdp"];
  const confirmPassword = form["confirmMdp"];

  const errorUsername = document.getElementById("error-username");
  const errorMail = document.getElementById("error-mail");
  const errorMdp = document.getElementById("error-mdp");
  const errorConfirm = document.getElementById("error-confirm");

//pour voir le mot de passe (mais ca ne fonctionne qu'à moitié misère)

const eye = document.querySelector(".iconPasswordOn");
const eyeoff = document.querySelector(".iconPasswordOff");
const passwordField = document.querySelector("input[type=password]");

eye.addEventListener("click", () => {
   eye.style.display = "none";
   eyeoff.style.display = "inline";
  passwordField.type = "text";
});

eyeoff.addEventListener("click", () => {
  eyeoff.style.display = "none";
  eye.style.display = "inline";
  passwordField.type = "password";
});

  // event on clique sur confirmer (submit)
  form.addEventListener("submit", function (event) {
    //on se dis que le formulaire est valide et après on mettra les conditions false si y'a erreurs
    let formConfirm = true;

    // reset le formulaire à chaque soumission
    errorUsername.textContent = "";
    errorMail.textContent = "";
    errorMdp.textContent = "";
    errorConfirm.textContent = "";

    //pour enlever les blancs, espaces etc et on regarde si c'est pas vide ou invalide
    const valeurName = userName.value.trim();
    const valeurMail = email.value.trim();
    const valeurMdp = password.value.trim();
    const valeurConfirm = confirmPassword.value.trim();

    //et c'est parti pour tout vérifier youpi
    //mail

    if (valeurMail === "") {
      errorMail.textContent = "Veuillez entrer un email";
      formConfirm = false;
    }
    //verifie email valide
    else if (!email.validity.valid) {
      errorMail.textContent = "Veuillez entrer un email valide";
      formConfirm = false;
    }

    //nom utilisateur
    if (valeurName === "") {
      errorUsername.textContent = "Veuillez entrer un nom d'utilisateur";
      formConfirm = false;
    } else if (valeurName.length < 3) {
      errorUsername.textContent = "Au moins 3 caractères requis";
      formConfirm = false;
    }

    //mdp + confirmer
    const nbrMdp = /[\d]/.test(valeurMdp);
    const mdpCaraSpe = /[\W_]/.test(valeurMdp);
    const mdpCara = valeurMdp.length >= 6;

    

    if (valeurMdp === "" || valeurConfirm === "") {
      errorMdp.textContent = "Veuillez entrer un mot de passe";
      formConfirm = false;
    } else if (!nbrMdp || !mdpCaraSpe || !mdpCara) {
      errorMdp.textContent =
        "Min. 6 caractères, 1 chiffre, 1 caractère spécial";
      formConfirm = false;
    }

   
    //identiques ou pas
    if (valeurMdp !== valeurConfirm) {
      errorConfirm.textContent = "Les mots de passe ne correspondent pas";
      formConfirm = false;
    }
   
    /*let strength = 0;
    if (valeurMdp(/[a-z]/) && valeurMdp > 6){
      strength++; }
    
    if (valeurMdp(/[\d]/)) {
      strength++;
    }
    if (valeurMdp(/[\W_]/)){
      strength++;
    }

    if(strength < 2){
      barre.style.color ="red";
    }*/

    
      if (!formConfirm) {
        //empeche l'envoi si ca ne fonctionne pas
        event.preventDefault();
      }
    if (formConfirm) {
      //pour stock les différents profils sans écraser le précédent
      //objet qui représente l'utilisateur

      const newUser = {
        username: valeurName,
        mail: valeurMail,
        password: valeurMdp,
      };
      //zou dans le localStorage, ils se différencient avec chaque nom entré
      localStorage.setItem(valeurName, JSON.stringify(newUser));

      //on met event prevent pour que la page ne quitte pas
      event.preventDefault();
      alert("Inscription terminée !");

      form.reset();
    }
  });
}
entryForm();
