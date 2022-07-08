//******************COMPOSANT POUR LA PAGE S'INSCRIRE**********************************//
import React, { useState } from "react";
import axios from "axios";
import SignupInForm from "./signInForm";
const SignupUpForm = () => {

    //Le bloc représente les hooks, ils permettent de mettre à jour le state//
    const [formSubmit, setFormSubmit] = useState(false);
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [job, setJob] = useState("");
//-----------------------------------------------//

   //Un fonction exécuté quand l'utilisateur valide le formulaire//
    const handleRegister = async (e) => {
        e.preventDefault();
        //Les variables contiennent les classes du JSX depuis le Dom//
        const firstNameError = document.querySelector('.firstName.error')
        const lastNameError = document.querySelector('.lastname.error')
        const EmailError = document.querySelector('.email.error')
        const passwordError = document.querySelector('.Password.error')
        const jobError = document.querySelector('job.error')

      //Avec la methode "post", on créé un objet avec les données des utilisateurs//  
        axios({
            method: "post",
            url: "http://localhost:4080/api/auth/signup",
            withCredentials: true,
            data: {
                firstName,
                lastName,
                email,
                password,
                job,
            }
        })
            .then((res) => {
                console.log('res.data===>',res.data)
                if (res.data.errors) {
                    // firstNameError.innerHTML = res.data;
                    // lastNameError.innerHTML = res.data.errors.lastName;
                    // EmailError.innerHTML = res.data.message;
                    // passwordError.innerHTML = res.data.errors.password;
                    // jobError.innerHTML = res.data.errors.job;
                }
                else{
                    setFormSubmit(true)
                }
            })
            .catch((err)=>{
                if(err.response.data.email){
                    EmailError.innerHTML = err.response.data.email;                                 
                }            
                if( err.response.data.password){
                    passwordError.innerHTML = err.response.data.password;
                }
            });

    }
    return (
        <>
        {/* Si l'utilisateur à bien remplie le formulaire, il est renvoyé à la page connexion */}
            {formSubmit ? (
                <>
                    <SignupInForm/>
                    <span></span>
                    <h4 className="sucess">
                        Enregistrement réussi, veuillez-vous reconnecter</h4>
                </>
            ) : (
                //Récupération des valeurs des inputs pour les transferer dans les hooks//
                <form action="" onSubmit={handleRegister} id="sign-up-form">
                    <label htmlFor="firstName">Prénom</label>
                    <br />
                    <input
                        type="text"                        
                        name="firstName"
                        id="firstName"
                        //Dès qu 'il y a un changement dans l'input, on récupére la valeur de champs de texte//
                        onChange={(e) =>                            
                            //Et on l'enregistre la valeur grace à setFirstname//
                            setFirstname(e.target.value)}
                        value={firstName}
                        required = "require"
                    />
                    <div className="firstName error"></div>

                    <label htmlFor="LastName">Nom</label>
                    <br />

                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                          //Dès qu 'il y a un changement dans l'input, on récupére la valeur de champs de texte//
                        onChange={(e) =>
                             //Et on l'enregistre la valeur grace à setLastName//
                            setLastname(e.target.value)}
                        value={lastName}
                        required="require"
                    />
                    <div className="lastName error"></div>

                    <label htmlFor="email">Email</label>
                    <br />
                    <input
                        type="text"
                        name="email"
                        id="email"
                         //Dès qu 'il y a un changement dans l'input, on récupére la valeur de champs de texte//
                        onChange={(e) =>
                             //Et on l'enregistre la valeur grace à setEmail//
                            setEmail(e.target.value)}
                        value={email}
                        require = "require"
                    />
                    <div className="email error">   
                                   
                    </div>

                    <label htmlFor="password">Mot de passe</label>
                    <br />

                    <input
                        type="password"
                        name="password"
                        id="password"
                         //Dès qu 'il y a un changement dans l'input, on récupére la valeur de champs de texte//
                        onChange={(e) =>
                            //Et on l'enregistre la valeur grace à setPassword//
                            setPassword(e.target.value)}
                        value={password}
                    />
                    <div className="Password error"></div>
                    <br />
                    <label for="pet-select"></label>

                    <select
                        name="job"
                        id="job"
                          //Dès qu 'il y a un changement dans l'input, on récupére la valeur de champs de texte//
                        onChange={(e) =>
                            //Et on l'enregistre la valeur grace à setJob//
                            setJob(e.target.value)}
                        value={job}                    >
                        <option value="">--Choisissez votre service--</option>
                        <option value="graphiste">Graphiste</option>
                        <option value="banquier">Banquier</option>
                        <option value="commercial">Commercial</option>
                        <option value="comptable">Comptable</option>
                        <option value="developpeur web">Développeur web</option>
                    </select>

                    <div className="job error"></div>
                    <br />
                    <input type="submit" value="valider inscription" />
                </form>
            )}
        </>
    );
};

export default SignupUpForm;