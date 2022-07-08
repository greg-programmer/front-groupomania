import React,{useState,useContext,useEffect} from "react";
import axios from "axios";
import { UidContext } from "../AppContext"
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../actions/postAction";

const UpdateMessage = ({post,value,time}) => {
     //Les hooks pour stocker la valeur des valeurs
    //-text//
    //-Image//
    //-Date de création du poste//
    const[targetValue,SetTargetValue] = useState(value) 
    const[targetImage,SetTargetImage] = useState('')    
    const[targetTime,SetTargetTime] = useState(time)
    const uid = useContext(UidContext)
    const [loadPost, setLoadPost] = useState(true) 
    const dispatch = useDispatch();
    let posts = useSelector((state) => state.postReducer)    
    
     //UseEffect est fontion qui lance loader le temps qu'il ne reçois pas les données//  
     useEffect(() => {
          if(loadPost){
              dispatch(getPosts());     
              setLoadPost(false)     
          }
       },[loadPost,dispatch])

    //Récupération des postes//

 //On récupère les valeurs pouvoir les mettre à jour//   
const handleChange = (e) => {       
    let targetPropsValue = {value}        
    let TargetValueSimple = e.target.value
    targetPropsValue = TargetValueSimple
    SetTargetValue(targetPropsValue)  
   if(e.target.files){
    const image = e.target.files[0]
    SetTargetImage(image)
    SetTargetValue(targetValue) 
    console.log('targetImage==>',targetImage)  
   }         
}  

const postMessageAxios = async (e) => {
//Récupération des informations dans la BDD//
    //On créé une nouvelle donnée qui contient//
    //-l'image// 
     //-le contenu du texte// 
      //-la date de création du texte pour pouvoir y accéder dans le body depuis le backend// 
    const data = new FormData();
    data.append("image",targetImage);
    data.append("content",targetValue);
    data.append("createdAt",targetTime)

    //La mise à jour est enregistré//
     await axios({
        method:"put",
        url:`http://localhost:4080/api/post/${uid}`,data,targetValue,targetImage,targetTime,      
        withCredentials : true       
    }).then(res =>((res.data)))     
    .catch((err)=> console.log(err));
    }

 //Représente le JSX avec le composant pour mettre à jour le poste//   
 return(
    <div className="postMessage">
        <form className="formMessage" onSubmit={postMessageAxios}>
            <textarea className="textPost" value = {targetValue} onChange={handleChange} name ="content" type="text" placeholder= {posts.content}  required = "required"/>
            <input type="file" onChange={handleChange} id ="file" name = "image"/>                        
            <button className="buttonMessage" type="submit">Modifier</button>
        </form>
    </div>
 )
}

export default UpdateMessage