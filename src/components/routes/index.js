import React from "react";
import { BrowserRouter as Router,Route, Switch,Redirect, Routes } from "react-router-dom";
//Importation du composant Home qui représente la page d'accueil//
import Home from "../../pages/Home";
//Importation du composant Profil qui représente la page profil de l'utilisateur//
import Profil from "../../pages/Profil";
//Importation du composant Trending qui représente la page d'actualité//
import NavBar from "../navBar";

//Const index contient toutes les url :
const index = () => {
    return(
      <Router>
      <NavBar/>                
      {/*Utilisation du switch pour passer d'une url à une autre*/} 
      <Switch>
        {/* {Home = page d'accueil}   */}
     <Route path="/home"exact component={Home}/>        
     {/* {Profil = page profile de l'utilisateur} */}
      <Route path="/profil"exact component={Profil}/>             
        {/* //{Redirect = l'utilisateur est redirigé vers la page d'accueil en cas de probléme} */}
       <Redirect to="/profil"exact component={Profil}/>
      </Switch>
  </Router>        
    )
}

export default index