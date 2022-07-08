import axios from 'axios';
import React, { useContext, useEffect, forceUpdate, useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { likePost } from '../../actions/postAction';
import { UidContext } from '../AppContext';
import { useSelector } from "react-redux";

//Les props contiennent//
// le nombre de like,{testlike}
// les users,{user}
// la date de création du poste {time}
//le tableau vide pour contenir les likes//{usersLiked}
const LikeButton = ({post, testLike, user,time,usersLiked}) => { 
const [liked, setLiked] = useState(false);
let [likes,setLikes] = useState(0)
const [targetTime,SetTargetTime] = useState(time)
const uid = useContext(UidContext);
const likeRef = useRef(0)

//Cette fonction met à jour la couleure des coeurs quand un utilisateur est enregistré dans le tableau usersLiked//
useEffect(() => {
   if(!usersLiked.includes(uid)){
    setLiked(false)
   }
   if(usersLiked.includes(uid)){
    setLiked(true)
   }
}, []) 


//Cette fonction gère les likes//
const like = async () => {

  if(!usersLiked.includes(uid)){
    console.log("pas dans le tableaux") 
   {
    const data = { 
      userId :uid,     
      createdAt : targetTime,  
      like: 1        
   } 
  
   //On envoie les données au backend pour pouvoir stoker le like dans la base de données//
  await axios.post (`http://localhost:4080/api/post/${user}/like`,data)
     
      .then(res =>(console.log(setLikes(res.data)))) }     
    }    

  if(usersLiked.includes(uid)){
    console.log("Dans le tableaux")    
    {
      const data = {
        userId :uid,         
        createdAt : targetTime,   
        like : 0 ,        
     } 
      
  await axios.post (`http://localhost:4080/api/post/${user}/like`,data)
     
      .then(res =>(console.log(setLikes(res.data))))}     
    }
    console.log("likes ===1",likes)
    console.log("likes ===0",likes)

//---Organisation des conditions par rapport à la réponse du backend----//
//Pas de like enregistré dans le tableau usersliked//
      if(likes === 0 | likes === 1 && !usersLiked.includes(uid)){
        likeRef.current++ 
        setLiked(true) 
      }
      if(likes.likes === 0 && !usersLiked.includes(uid)){
        likeRef.current++ 
        setLiked(true)         
      }
      if(likes.likes === 1 && !usersLiked.includes(uid)){
        likeRef.current-- 
        setLiked(false) 
      }   
   //des likes enregistrés dans le tableau usersliked//   

      if(likes === 0 | likes === 1 && usersLiked.includes(uid)){
        likeRef.current--  
        setLiked(false) 
      }         
      if(likes.likes === 0 && usersLiked.includes(uid)){
        likeRef.current++  
        setLiked(true) 
      }
      if(likes.likes === 1 && usersLiked.includes(uid)){
        likeRef.current--  
        setLiked(false) 
      }
  }   

   return(
     <div className='like-container'>
       { liked === false  &&(              
          <div className='like-container-number'>
             {/* {Initialisation du liRef.current à 0 pour pouvoir interagir en temps réél} */}
              <p className='numberLike'>{likeRef.current + testLike}</p>                                    
              <img src='./img/icons/heart.svg' 
              onClick={like} alt="like"/> 
          </div>                       
     )}    
         { liked === true &&(              
          <div className='like-container-number'>
            {/* {Initialisation du liRef.current à 0 pour pouvoir interagir en temps réél} */}
              <p className='numberLike'>{likeRef.current + testLike}</p>                                    
              <img src='./img/icons/heart-filled.svg' 
              onClick={like} alt="like"/> 
          </div>                       
     )}   
     </div>
    )
}

export default LikeButton;