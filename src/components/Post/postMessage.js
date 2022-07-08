import React,{useState,useContext} from "react";
import axios from "axios";
import { UidContext } from "../AppContext"

const PostMessage = () => {

    //Les hooks pour stocker la valeur des valeurs
    //-text//
    //-Image//
    const[targetValue,SetTargetValue] = useState('') 
    const[targetImage,SetTargetImage] = useState('')
    const uid = useContext(UidContext)

//Fonction qui gére le changement des inputs(file && text) //
const handleChange = (e) => {  

    const textValue = e.target.value
    SetTargetValue(textValue)
    console.log('targetValue ==>',targetValue) 
   if(e.target.files){
    const image = e.target.files[0]
    SetTargetImage(image)
    SetTargetValue(targetValue) 
    console.log('targetImage==>',targetImage)  
   }         
}  

//Fonction qui est appelé quand l'utilisateur clique pour soumettre le poste//
const postMessageAxios = async (e) => {
    //On creer une donnée avec la valeur de l'image et celle du texte//
    const data = new FormData();
    data.append("image",targetImage);
    data.append("content",targetValue);

    //Axios envoie les données pour pouvoir les stoker dans la base de données//
     await axios({
        method:"post",
        url:`http://localhost:4080/api/post/${uid}`,data,targetValue,targetImage,      
        withCredentials : true 
                  //SetTargetValue enregistre la data dans le hook targetValue//      
    }).then(res =>(SetTargetValue((res.data.content))))     
    .catch((err)=> console.log(err));
}
//JSX qui représente le composant pour poster un message//
 return(
    <div className="postMessage">
        <form className="formMessage" onSubmit={postMessageAxios}>
            <textarea className="textPost" value ={targetValue} onChange={handleChange} name ="content" type="text" placeholder="Ecrire un message... " required = "required"/>
            <input type="file" onChange={handleChange} id ="file" name = "image"/>
            <button className="buttonMessage" type="submit">Envoyer</button>
        </form>
    </div>
 )
}

export default PostMessage