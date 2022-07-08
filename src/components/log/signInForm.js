//******************COMPOSANT POUR LA PAGE SE CONNECTER**********************************//

import React, { useState } from "react";
import axios from 'axios';

// sessionStorage.removeItem('userId')
// sessionStorage.removeItem('token') 

//1)On met se qu'on stocke//
const SignupInForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let date = new Date (Date.now() + 86400000); //86400000 = 1 jour//

    //2)On met la logique//
    const handleLogin = (e) => {
        //La page ne se recharge pas//
        e.preventDefault();
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');

        axios({
            method: "post",
            url: `http://localhost:4080/api/auth/login`,
            withCredentials: true,
            data: {
                email,
                password,
            }          
        })              
            //Condition pour gérer les erreurs//
            .then((res) => {
                if (res.data.error) {
                    emailError.innerHTML = res.data.error;
                    passwordError.innerHTML = res.data.errors.password;
                    //Sinon on renvoie à l'accueil//  
                } else {
                    //On envoie le token dans un cookie//
                   const token = res.data.token  
                   document.cookie = `token= ${token}; path=/; secure; expires=`+ date;                    
                   window.location = "/home";
                  
                } 
            })
            .catch((err) => {
                console.log(err);    
                emailError.innerHTML = err.response.data.error;                                
            });        
                       

    };  
    
    //3)On renvoie l'affichage JSX qui est le rendu visuel //
    return (
        <form action="" onSubmit={handleLogin} id="sign-up-form">
            <label htmlFor="email">Email</label>
            <br />
            <input type="text"
             name="email" 
             id="email"
             onChange={(e) =>
             setEmail(e.target.value)}
             value={email}
              />
             <div className="email error"></div> 
             <br/>
             <label htmlFor="password"></label> 
             <br/>
             <input type= "password"
              name="password" 
              id ="password"
               onChange={(e) =>
             setPassword(e.target.value)}
             value={password}
             />
             <div className="password error"></div>
             <br/>
            {/*Quand on clique sur le bouton <input type ="submit"/>, onSubmit se déclenche */
          /*pour lancer toute la logique du formulaire du dessus*/}
            <input type="submit" value="se connecter" />
        </form>
    )
};

export default SignupInForm;