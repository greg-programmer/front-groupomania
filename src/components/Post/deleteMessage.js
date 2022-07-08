import React,{useState,useContext} from "react";
import axios from "axios";
import { UidContext } from "../AppContext"


//Un component pour supprimer un poste//
//{time} est le props qui permet d'avoir la date du poste exacte //
const DeleteMessage = ({time}) => {
   const uid = useContext(UidContext)
   const [targetTime,SetTargetTime] = useState(time)
   console.log(targetTime)

   const deleteAxios =  async (e) => {
      //On envoie dans le body de la requête, la date du poste, ainsi le back-end peut faire un controle de son coté//     
        const data = {       
         createdAt : targetTime         
      }
//appel de l'API pour la suppression du poste//
    await axios({
         method:"delete",
         url:`http://localhost:4080/api/post/${uid}`,data, withCredentials : true,
      }).then(res =>((res.data)))     
     .catch((err)=> console.log(err));
     }

 //JSX du boutton de suppression//    
   return (
      <div className="deletePost">
        <div className="deletePost_h3">
        <h3>Confirmer la suppression?</h3>
        </div>
        <div className="deletePost_Button"> 
        <form onSubmit={deleteAxios}>
        <button className="deletePost_buttonYes" type="submit">Oui</button>
         </form>             
        </div>       
      </div>
   )
} 
export default DeleteMessage



