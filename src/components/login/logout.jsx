import React , {useState} from 'react' ;
import Input from '../boostrapinput/input.component';
import {Post ,Get} from '../../service/service.setup' ;
import {connect} from 'react-redux';
import  {setCurrentUser} from '../../redux/user/user.actions' ;
import Cookies from 'js-cookie' ;
const createHistory = require("history").createBrowserHistory;

  const LouOut = ({setCurrentUser})=>{
        console.log(setCurrentUser)
        Cookies.set('token','');
        let history = createHistory();
       setCurrentUser(null)
        history.goBack("/");
        return true
  }
  

const mapDispatchToProps = dispatch =>({setCurrentUser:user=>dispatch(setCurrentUser(user))})
  export default connect(null,mapDispatchToProps)(LouOut)