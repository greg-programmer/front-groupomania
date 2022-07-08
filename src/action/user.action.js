import axios from 'axios';
export const GET_USER ="GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";

//Récupération des données pour pouvoir les dispatcher dans le store grace à Axios//
export const getUser = (uid) => {
    return (dispatch) => {
        return axios
        .get(`http://localhost:4080/api/auth/login/getusers`)
        .then((res)=>{
          dispatch({type:GET_USER, payload:res.data});
          console.log(res);
        })
        .catch((err)=>console.log('erreur ',err));        
    };
};

export const uploadPicture = (data, uid) => {
  return (dispatch) => {
    return axios
    .put(`http://localhost:4080/api/auth/user/upload/${uid}`,data)
    .then((res)=> {
      console.log(res.data.imageUrl)
       return axios
       .get(`http://localhost:4080/api/auth/login/getuser/${uid}`)
       .then((res)=>{
         console.log(res)
           dispatch ({type:UPLOAD_PICTURE, payload:res.data.imageUrl})
           console.log(res.data.imageUrl)
       })
    })
    .catch((err) => console.log(err))
  };
}
