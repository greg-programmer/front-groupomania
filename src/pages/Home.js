//******************COMPOSANT POUR LA PAGE D'ACCEUIL**********************************//

import React, { useState } from "react";
import LeftNav from "../components/leftNav";
import DeleteMessage from "../components/Post/deleteMessage";
import PostMessage from "../components/Post/postMessage";
import Thread from "../components/Thread";

const Home = () => {
        
    // const [inverse, SetInverse] = useState(false)    

    // const messageClick = (e) => {
    //     SetInverse(!inverse)
    //      e.preventDefault()    
    //      console.log('inversé')                 
    // }    
   
    return(
      <div className="home">        
          <LeftNav image = "/img/14578.png"/>          
          <div className="main">                                        
           <PostMessage/>                
              <Thread/>                                         
          </div>
      </div>
    )
}

export default Home