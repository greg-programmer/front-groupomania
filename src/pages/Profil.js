//******************COMPOSANT POUR LA PAGE PROFIL**********************************//


import React, { useContext, useEffect } from "react";
//Importation du composant log pour pouvoir l'integrer dans la page profil//
import Log from '../components/log';
//Importation du userId via UidContext//
import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/profil/update.profil";

const Profil = () => {   
  const uid = useContext(UidContext)
  return (
    // Si c'est le bon token alors l'utilisateur est sur la page profil  
    <div className="profil-page">
      {uid ?(        
        <UpdateProfil/>           
      ) : (
        // Sinon on renvoie à la page profil de connexion  
        <div className="log-container">
          {/*Signin et signup sont les props qui pourront être récupéré dans /log/index.js  */}
        <Log signin={false} signup={true} />
        <div className="img-container">
          <img src="./img/icon.png" alt="log"/>          
        </div>
      </div>
      )}   
    </div>
  )
};

export default Profil