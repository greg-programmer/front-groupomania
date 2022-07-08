import React, { useDebugValue, useEffect, useState,useContext } from "react";
import LeftNav from "../leftNav";
import UploadIng from "./Uploadimg";
import axios from "axios";
import { UidContext } from '../AppContext';
import { Fragment } from "react";

const UpdateProfil = () => {
    const [userData,setUserData] = useState('');
    //Importation du userId (token)//
    const uid = useContext(UidContext);

 //Récupération de l'objet utilisateur grâce à Axios//
    useEffect (() =>  {
        axios
          .get(`http://localhost:4080/api/auth/login/getoneuser/${uid}`)
          .then(response => setUserData(response.data));          
      }, []);
      if(userData){
        return (
            <Fragment>
            <LeftNav />  
            <div className="profil-container">
                <div className="profil-box">
                 {/* On peut afficher les données utilisateurs {image},{prénom} et {nom}*/}
                <h1>{userData.firstName} {userData.lastName}</h1>
                <div className="lef-part">   
                   <img className="imageProfil" src = {userData.imageUrl} alt ="user-pic"/>                   
                    <UploadIng/>                   
                </div>
                </div>                    
            </div>
            </Fragment>          
        )
      }      
   
};
export default UpdateProfil


