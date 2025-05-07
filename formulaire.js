//récupérer le formulaire 
function entryForm() {
    const form = document.forms["formulaire"];
    const userName = form["userName"];
    const email = form["mail"];
    const password = form["mdp"];
    const confirmPassword = form["confirmMdp"];
    
    
// event on clique sur confirmer (submit)
form.addEventListener("submit", function (event) {

let formConfirm = true;

//et c'est parti pour tout vérifier 

//mail
//pour enlever les blancs, espaces etc et on regarde si c'est pas vide ou invalide
const valeurMail = email.value.trim();
if (valeurMail ===""){
        alert("Veuillez entrer un mail");
        formConfirm = false;
    }
else if (!email.validity.valid) {
        alert("Veuillez entrer un mail valide");
        formConfirm = false;
    }

//nom utilisateur
const valeurName = userName.value.trim();

if (valeurName ==="") {
        alert("Veuillez entrer un nom d'utilisateur");
        formConfirm = false;

    }
    else {
const nameCara = valeurName.length >= 3;       

if(!nameCara){
    alert("Le nom d'utilisateur doit contenir au moins 3 caractères")
    formConfirm = false;

}
//mdp + confirmer
const valeurMdp = password.value.trim()
const valeurConfirm = confirmPassword.value.trim()

if (valeurMdp ==="" || valeurConfirm === "") {
        alert("Veuillez entrer un mot de passe");
        formConfirm = false;
}
else {
    const nbrMdp = /[\d]/.test(valeurMdp);
    const mdpCaraSpe = /[\W_]/.test(valeurMdp);
    const mdpCara = valeurMdp.length >= 6;

if (!nbrMdp || !mdpCaraSpe || !mdpCara) {
        alert("Le mot de passe doit contenir : 6 caractères - 1 chiffre - 1 caractère spécial");
        formConfirm = false;
}

if (valeurMdp !== valeurConfirm) {
    alert("Les mots de passe ne correspondent pas");
        formConfirm = false;
}
   
//empeche l'envoi si ca ne fonctionne pas
if (!formConfirm){
    event.preventDefault();
}
if (formConfirm) {
   

    localStorage.setItem("username", valeurName);
    localStorage.setItem("mail", valeurMail);
    localStorage.setItem("password", valeurMdp);
    
        event.preventDefault();
    alert("Inscription terminée !"); 

    /*const mailStorage = JSON.parse(valeurMdp.get ('mail') || '[]'); 
    mailStorage.push(valeurMail);
    localStorage.set('mail', JSON.stringify(valeurMail));


    console.log(mailStorage)*/
localStorage.setItem(valeurMail, JSON.stringify(valeurMail));
        
    
}
}
}
});
}
entryForm()