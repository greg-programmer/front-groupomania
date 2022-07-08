import axios from "axios";
import React, { useContext,useState } from "react";
import { UidContext } from "../AppContext";

const UploadIng = () => {

  //const file qui récupère la value du fichier//
   const [file, setFile] = useState('');
  //Const uid contient le token de l'utilisateur connecté// 
   const uid = useContext(UidContext)

   //Cette fonction récupère la valeur du fichier est l'enregistre dans le hook file//
      const handleChangeImage = (e) => {   
      setFile(e.target.files[0])  
      console.log(file)        
    }

    //On créé une nouvelle donnée avec l'image [file] et on l'envoie pour afficher l'image//
    const handlePicture = async (e) => {
        const data = new FormData();
        data.append("image",file);
        

      axios.post(`http://localhost:4080/api/auth/user/upload/${uid}`,data,file)      
      .then(res => {     
        console.log("res==>",res)
      })      
    }   

    //JSX qui représente le composant pour la mise à jour de l'image profil //
      return (
         <form action="" onSubmit={handlePicture} className="upload-pic">
             <label htmlFor="file"></label>
             <input type="file" id ="file" name = "image" accept=".jpg, .jpeg, .png"
             onChange={handleChangeImage}
             />
             <br/>
             <input type="submit" value="envoyer"/>
         </form>
      )
};

export default UploadIng;
