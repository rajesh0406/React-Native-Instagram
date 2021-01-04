import {USER_DETAILS} from './actionType';
import {TOKEN} from './actionType';
const initialState={
   user:[
       {testing:"123"}
   ],
   token:[]
}
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case USER_DETAILS:return{
            ...state,
            user:action.payload
        }
        case TOKEN:return{
            ...state,
            token:action.payload
        }
        default:return state
    }
}
export default reducer;