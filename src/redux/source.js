import {createStore, applyMiddleware} from 'redux' ;
import logger from  'redux-logger' ;
import rootReducer from './root-reducer' ;
import { persistStore} from 'redux-persist'

const middlwares = [logger] ;

export const store = createStore(rootReducer,applyMiddleware(...middlwares));
export const persistor          = persistStore(store)

export default {store ,persistor}