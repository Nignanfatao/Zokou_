const { zokou } = require('../framework/zokou');
const {addOrUpdateDataInCentral1 , getDataFromCentral1} = require('../bdd/central1')
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou(
    {
        nomCom : 'central1',
        categorie : 'NEOverse'
        
    },async (dest,zk,commandeOptions) => {

 const {ms , arg, repondre,superUser} = commandeOptions;

 const data = await getDataFromCentral1();

 if (!arg || !arg[0] || arg.join('') === '') {

    if(data) {
       
        const {message , lien} = data;


        var mode = "public";
        if (s.MODE != "oui") {
            mode = "privé";
        }
      
    
     
    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

    const central1msg = `
      *NEOverse Rp Gaming*
*Date* : ${date}
*Heure* : ${temps}

 ${message}`

 if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption: central1msg }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption: central1msg }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(central1msg);
    
}

    } else {
        if(!superUser) { repondre("il n'y a pas de fiche central1 enregistrée ") ; return};

      await   repondre("Vous n'avez pas encore enregistrer la fiche central1 , pour ce faire ;\n tapez entrez apres central1 votre message et votre lien image ou video dans ce contete : /central1 message;lien");
         repondre(" veuillier me contacter pour plus ample explications")
     }
 } else {

    if(!superUser) { repondre ("Seul les membre de la NS ont le droit de modifier la Fiche central1") ; return};

  
    const texte = arg.join(' ').split(';')[0];
    const tlien = arg.join(' ').split(';')[1]; 


    
await addOrUpdateDataInCentral1(texte , tlien)

repondre('Fiche central1  actualiser avec succes')

}
    });