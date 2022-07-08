import React, { useEffect, useState,useContext } from "react";
import { useSelector } from "react-redux";
import LikeButton from "./Post/LikeButton";
import axios from "axios";
import { UidContext } from "../components/AppContext";
import UpdateMessage from "./Post/updateMessage";
import DeleteMessage from "./Post/deleteMessage";

//---Variable de l'administratreur--//
const {REACT_APP_ADMIN} = process.env;

////Représente tous les Hooks // 
const Card = ({ post}) => {
  const [isloading, setIsLoading] = useState(true)
  const posts = useSelector((state) => state.postReducer)  
  //--Les données tous les utilisateurs--//
  const uid = useContext(UidContext);
  const usersData = [useSelector((state) => state.userReducer)]
  const userData = useSelector((state) => state.userReducer) 
  const [likes,setLikes] = useState(0)
  const [toogle,setToogle] = useState(false)
  const [toogleDelete,setToogleDelete] = useState(false)
  const [updateValue,setUpdateValue] = useState(post.content)
//-----------------------------------//  

//Utilisation de UseEffect pour faire un apel à l'Api et récupérer les données//
  useEffect(() => {
    usersData[0] != undefined && setIsLoading(false);    
    console.log(userData)
    console.log(usersData) 
    console.log(posts)   
    axios.get (`http://localhost:4080/api/post/`)   
    .then(res =>(setLikes(res.data))) 
  }, [userData],[likes])  
//-----------------------------------------//

  //--Mise en place d'une fonction pour switcher le component qui met à jour un poste--///
  const update = (e) => {
    setToogleDelete(false)  
    setToogle(!toogle)
   }
 //--------------------------// 

//--Mise en place d'une fonction pour switcher le component qui supprime le poste--//
   const deletePost = (e) => {
    setToogle(false)
    setToogleDelete(!toogleDelete)  
   }

//--La fonction UpdateMessageAxios fait récupére :
//- le contenu texte du poste (Const lisPost)--//
//- l' image du poste (Const listFile)--//
  const UpdateMessageAxios = async (e) => {
    //Récupération des informations dans la BDD//  
        e.preventDefault(); 
        setToogle(!toogle)   
        const listPost = Object.keys(posts).map( post =>(
            posts[post].content             
          ))
          const listFile = Object.keys(posts).map( post =>(
            posts[post].imageUrl      
          ))
          console.log('cliqué')
          console.log(listPost)
          console.log(listFile)                    
    }    

  //Retour du JSX//  
  
  return (
    <li className="card-container" key={post._id} >
      {/* Mise en place d'une condition */}
      {/* Un loader se lance...*/}
      {isloading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (   
        // une fois les données récupérer , le loader s'arrête    
        <>
        {/* Grâce à la fonction map, on récupére les données  */}
          <div className="card-left">
            <img src={
              Object.values(userData).map((user) => {
                  if (post.userId === user._id) return user.imageUrl ;
              }).join('')            
            } alt="poster-pic"         
            />           
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {                   
                    Object.values(userData).map((user) => {
                      console.log(user.job)
                      console.log(user._id)
                      console.log(post.userId)
                      //Condition pour afficher le nom et le prénom de l'utisateurs//
                      if (post.userId === user._id) return user.firstName + '  ' + user.lastName +
                      ' 😉 ' +  `${user.job}`                                           
                    })                   
                  }
                </h3>
              </div>
              {/* Contient la date du poste*/}
              <span>{post.createdAt}</span>
            </div>
            {/* Contient le texte du poste */}
            <p>{post.content}</p>
            {/* L'image est récupèré puis affiché */}
            {post.imageUrl && (<img src={post.imageUrl} 
            alt="card-pic"
             className="card-pic" 
             />)}                   
            <div className="card-footer">
              <div className="comment-icon"> 
                   {/* Affichage du boutton pour mettre à jour  */}
                   {/* l'utilisateur qui a posté est le même que le token? */}
                   {/* ou le token correspond à celui de l'administrateur */}
                   {post.userId === uid || uid === REACT_APP_ADMIN?(
                   <>   
                   {/* Affichage du component updateMessage au clique*/}
                    {toogle?(<>
                    <img onClick={update} test src ="./img/update.png" alt ="update"/> 
                    <UpdateMessage value= {post.content} time = {post.createdAt}/>                    
                    </>):
                    (
                      <img onClick={update} test src ="./img/update.png" alt ="update"/> 
                    )}                                                                                        
                    </>                                       
                   ):(
                     null 
                   )}                 
              </div>    
                {/* Afficher les boutons likes ou les cacher */}
              {toogleDelete || toogle?(null):(
                <LikeButton post=
                {posts}   
                testLike = {post.likes} 
                user = {post.userId} 
                usersLiked = {post.usersLiked}  
                time = {post.createdAt}                                        
                /> 
                    )} 
                    {/* Affichage du boutton pour supprimer  */}    
                    {/* l'utilisateur qui a posté est le même que le token? */}    
                    {/* ou le token correspond à celui de l'administrateur */}
                  {post.userId === uid || uid === REACT_APP_ADMIN?(
                    <>                   
                    {toogleDelete?(<>
                      <DeleteMessage time = {post.createdAt}/>
                       <img onClick={deletePost} src ="./img/25008.png" alt ="delete"/></>):
                    (
                      <img onClick={deletePost} src ="./img/25008.png" alt ="delete"/> 
                    )}                                                                                                                 
                    </>                  
                   ):(
                    <div/>   
                   )}                                          
              </div> 
          </div>
        </>
      )}
    </li>
  )
}

export default Card