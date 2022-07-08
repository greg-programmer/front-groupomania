import React, { useContext, useState,useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./log/logout";


//Composant qui représente le header//
const NavBar = () => {
  //Récupération du token//  
  const uid = useContext(UidContext);
  const [userData,setUserData] = useState('');  
  //Si c'est le bon token alors on récupère son image//
  if(uid){
    axios
    .get(`http://localhost:4080/api/auth/login/getoneuser/${uid}`)
    .then(response => setUserData(response.data.imageUrl));       
  }

  return(
   <nav>
       <div className="nav-container">
           <div className="logo">
                     <div className="logo">
                       <img src ="./img/icon.png" alt="icone"/>
                       <h1>Groupomania</h1>
                   </div>              
           </div>
           {uid ?(
             <ul>
                 <li></li>
                 <li className="welcome">  
                 <NavLink exact to = "/profil">
                    <div className="avatar">
                     {/* image du profil récupérée */}
                    <img src ={userData} alt="icone" />
                    </div>                  
                 </NavLink>                   
                 </li>
                 <Logout/>
             </ul>  
           ) : (
               <ul>
                   <li></li>
                   <li>
                       <NavLink exact to ="/profil" >
                           <img src ="./img/connect.jpg" alt="login"/>                                             
                       </NavLink>
                   </li>
               </ul>
           )}
       </div>
   </nav>
  )
};

export default NavBar;