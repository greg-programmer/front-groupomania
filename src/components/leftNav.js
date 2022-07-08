import { NavLink } from "react-router-dom";


const LeftNav = () => {
  //composant qui représente la navigation de la page d'accueil et de la page profil//     
   return(
       <div className="left-nav-container">
           <div className="icons">
                <div className="icons-bis" >
                   <NavLink to = '/home' exact activeClassName="active-left-nav" >
                     <img className="homeImage" src ="/img/icons/home.svg" alt ="home"/>
                   </NavLink>     
                   <NavLink to = '/profil' exact activeClassName="active-left-nav" >
                     <img className="homeImage" src ="/img/icons/user.svg" alt ="home"/>
                   </NavLink>                 
               </div>
           </div>
       </div>       
   )
}
export default LeftNav;