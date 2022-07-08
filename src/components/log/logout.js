import React,{useContext} from "react";
import axios from "axios";
import cookie from "js-cookie";
import { UidContext } from "../AppContext"


//Mise en place du logout grace au cookie//
const Logout = () => {    
    //uid réprésente le token de l'utilisateur// 
    const uid = useContext(UidContext)
    let date = new Date (Date.now() + 86400000); //86400000 = 1 jour//

     const removeCookie = (key) => {
         if(window != "undefined"){
             cookie.remove(key,{expires:1})
         }
     };

     const Logout = async (res) => {
        console.log("déconnexion")
        await axios({
            method:"get",
            url:`http://localhost:4080/api/auth/login/logout/${uid}`,
            withCredentials : true
        })
       .then(()=>{
        //Création du token avec une date antérieure pour qu'il soit supprimé//
        const token = res.data  
        document.cookie = `token= ${token}; path=/; secure; expires= Thu, 1 Jan 1970 00:00:00 UTC`; 
        //Retour à la page de connexion// 
        window.location = "/profil";
       })

        .catch((err)=> console.log(err));   
     }   
       

    return(
      <li onClick={Logout}>
          <img src ="./img/icons/logout.svg" alt="logout"/>
      </li>
    );
};

export default Logout;