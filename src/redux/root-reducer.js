import {combineReducers} from 'redux' ;
import userRecuder from './user/user.reducer' ;


export default  combineReducers({
  user :userRecuder
})