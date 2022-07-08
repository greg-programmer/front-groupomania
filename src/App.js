import React, { useEffect, useState } from 'react'
//Récupère automatiquement le fichier index.js du dossier routes//
import Routes from "./components/routes"; 
import { UidContext } from './components/AppContext';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.action';

const App = () => {
   const [uid,setUid] = useState(null);
  const dispatch = useDispatch();

  //Un controle du token est tout de suite et si c'est pas le bon alors, il est renvoyé//
   useEffect (() => {
   const fetchToken = async()=> {
     await axios ({
       method:"get",
       url:"http://localhost:4080/api/auth/login/token",
       withCredentials:true
     }) 
     .then((res)=>{
       setUid(res.data)})    
     .catch((err)=>console.log("no token =>",err,window.assign()));       
   };
   fetchToken();
   
   if(uid)dispatch(getUser(uid))
  },[uid +1]);      

    return(    
      //{uid} en props pour pouvoir l'utiliser dans toute l'application//
      <UidContext.Provider value= {uid}>
     <Routes/>   
      </UidContext.Provider>    
    );
}; 

export default App
