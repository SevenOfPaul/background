import  jwt from  'jsonwebtoken';
import  config  from "../config/config.json" assert {type:"json"};
export default function(payload){
   return  jwt.sign(payload,config.secret,{ expiresIn:  '30 days' })
}