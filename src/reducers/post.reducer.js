import { GET_POSTS, LIKE_POST } from "../actions/postAction";

const initialState = {};

export default function postReducer(state = initialState, action){
    switch(action.type){
        case GET_POSTS:
        return action.payload;
        case LIKE_POST :
           return state.map((post) =>{
            if(post[0].userId === action.payload.userId){
             return{
              ...post,
              usersLiked :[action.payload.userId, ...post.usersLiked]
             }                 
            }
           })
        default:
            return state;
    }
}