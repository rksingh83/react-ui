import {combineReducers} from 'redux' ;
import userRecuder from './user/user.reducer' ;
import fileReducer from './file/file.reducer'; 
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {  persistReducer } from 'redux-persist'

 
const persistConfig = {
  key: 'root',
  storage,
  whiteList:['user','currentFile']
}
 


const  rootReducer  = combineReducers({
  user :userRecuder ,
  currentFile:fileReducer
})

export default persistReducer(persistConfig ,rootReducer)