import axios from "axios"

//posts
export const GET_POSTS ="GET_POSTS";
export const LIKE_POST ="LIKE_POST";


//Récupération des données pour pouvoir les dispatcher dans le store //
export const getPosts = () => {
    return (dispatch) => {
        return axios 
        //Récupération de la data//
        .get(`http://localhost:4080/api/post`)
        .then((res) => {           
        //Expedition de la data dans le store//  
          console.log(res)   
          dispatch({type:GET_POSTS, payload:res.data})
        })
        .catch((err) => console.log('catch=>',err)) 
    }
}

export const likePost = (postId,userId) => {
  return (dispatch) => {
      return axios 
      //Récupération de la data//
      .post(`http://localhost:4080/api/post/629d18a25bdb34952960c675/like`)
       .then((res)=>{
         console.log('res',res)
         dispatch({type: LIKE_POST, payload:{postId,userId}})
      })
      .catch((err) => console.log('catch=>',err)) 
  }
}