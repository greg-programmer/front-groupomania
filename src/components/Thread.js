import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/postAction";
import Card from "./card";

const Thread = () => {
 const [loadPost, setLoadPost] = useState(true) 
const dispatch = useDispatch();
let posts = useSelector((state) => state.postReducer)

   useEffect(() => {
      if(loadPost){
          dispatch(getPosts());     
          setLoadPost(false)     
      }
   },[loadPost,dispatch])

   //JSX qui représente toutes les cartes// 
   return(
     <div className="thread-container">        
         <ul>  
         {/*//On utilise la fonction .map pour pouvoir boucler sur les cartes/*/}
           {posts[0] &&
           posts.map((post)=>{
               console.log(post.content)
              return<Card post ={post} key={post._id}/>                         
           })}         
         </ul>
     </div>
   )
};

export default Thread;