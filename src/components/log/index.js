//******************COMPOSANT POUR LA PAGE LOG**********************************//

import React, { useState } from "react";
import SignupInForm from "./signInForm";
import SignupUpForm from "./singUpForm";
{/*(props) récupère <Log signin ={false} signup={true} dans /log/ /> */}
{/*Donc react reconnaît ex: props.signin*/}
const Log = (props) => {

    //1)On met se qu'on stocke//
                                     {/*<log = "sigin" > */} 
    const [SignUpModal, setSignUpModal] = useState(props.signup);
                                     {/*<log = "sigin" > */}  
const [SignInModal, setSignInModal] = useState(props.signin); 

    //2)On met la logique//

    {/*On récupère l'évenement de ce qui a été cliqué*/ }
    const handleModals = (e) => {
        {/*Si l'utilisateur clique sur register alors le composant setSignUpModal s'affiche*/ }
        if (e.target.id === 'register') {
            setSignInModal(false);
            setSignUpModal(true)
            {/*Sinon si l'utilisateur clique sur login alors le composant setSignInModal s'affiche*/ }
        } else if (e.target.id === "login") {
            setSignUpModal(false);
            setSignInModal(true);
        }
    }

    //3)On renvoie l'affichage JSX qui est le rendu visuel //
    return (
        <div className="connection-form">
            <div className="form-container">
                <ul>
                    {/*Une liste apparaît quand on clique sur s'inscrire ou se connecter */}
                    <li onClick={handleModals} id="register"
                        className={SignUpModal ? "active-btn" : null}
                        >
                        S'inscrire
                        </li>
                    <li onClick={handleModals} id="login"
                    className={SignInModal ? "active-btn" : null}
                    >Se connecter</li>
                </ul>
                {/*Si c'est signUp est sur true alors tu m'affiches SignupForm*/}
                {SignUpModal && <SignupUpForm />}
                {/*Si c'est signIn est sur true alors tu m'affiches SignInForm*/}
                {SignInModal && <SignupInForm />}
            </div>
        </div>
    )
}

export default Log
