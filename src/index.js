import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux' ;
import {store ,persistor} from  './redux/source'
import { PersistGate } from 'redux-persist/integration/react'
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
ReactDOM.render(
<Provider store={store}>              
 <BrowserRouter>
 <PersistGate persistor ={persistor}>
<App />
</PersistGate>
</BrowserRouter>
</Provider>  
,
document.getElementById('root'));
