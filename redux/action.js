import {USER_DETAILS} from './actionType';
import {TOKEN} from './actionType';
export const User=(details)=>({
type:USER_DETAILS,
payload:details
});
export const Token=(token)=>({
  type:TOKEN,
payload:token

})