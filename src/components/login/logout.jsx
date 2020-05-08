import React , {useState} from 'react' ;
import Input from '../boostrapinput/input.component';
import {Post ,Get} from '../../service/service.setup' ;
import {connect} from 'react-redux';
import  {setCurrentUser} from '../../redux/user/user.actions' ;
import Cookies from 'js-cookie' ;
import  {setCurrentFile} from '../../redux/file/file.actions' ;
const createHistory = require("history").createBrowserHistory;

  const LouOut = ({ history,setCurrentUser ,setCurrentFile})=>{
        console.log(setCurrentUser)
        Cookies.set('token','');
       
       setCurrentUser(null)
        history.push("/");
        setCurrentFile([])
        return true
  }
  

const mapDispatchToProps = dispatch =>( {setCurrentUser:user=>dispatch(setCurrentUser(user)) ,
setCurrentFile:currentFile=>dispatch(setCurrentFile(currentFile))})
  export default connect(null,mapDispatchToProps)(LouOut)