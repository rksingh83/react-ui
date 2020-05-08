import {combineReducers} from 'redux' ;
import userRecuder from './user/user.reducer' ;
import fileReducer from './file/file.reducer'; 


export default  combineReducers({
  user :userRecuder ,
  currentFile:fileReducer
})