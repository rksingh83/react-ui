import React , {useState} from 'react' ;
import Login from  './login.component';
import SignUp from '../signup/singnup.component';
import Input from '../boostrapinput/input.component';

import {Post ,Get} from '../../service/service.setup' ;
import {connect} from 'react-redux';
import  {setCurrentUser} from '../../redux/user/user.actions' ;
import Cookies from 'js-cookie'
import './lon.style.scss';
//import { useHistory } from "react-router-dom";
const createHistory = require("history").createBrowserHistory;

const LoginPage = ({history ,setCurrentUser})=>{
 // console.log(props)
  const [email ,setEmail] = useState('') ;
  const [password ,setPassword] = useState('') ;
  const loginHandler = ()=>{
    
    Post('mydiginotes/signin',{email,password})    
    .then((res)=>{
    
        if(res.data.error){
           alert(res.data.error)
        }else{
         
          const code = res.data.code ;
          console.log(code)
          if(code=="411"){
            console.log("234");
         //  let  history = useHistory();
            Cookies.set('token', res.data.data.authentication.token);
            history.push("/otp");

             
          }
          if(code == "200"){
            console.log("console.log") ;
           // let  history = useHistory();
            Cookies.set('token', res.data.data.authentication.token);
            setCurrentUser(res.data.data)
             history.push("/folder");
             

            
          }
          if(code ==401 ){
            alert('User Not Found')
          }
        
         // Cookies.set('token', res.data.data.authentication.token)
      // this.state.history.push("/login");
        }
    } )
  }
  return(
    <div className ="row mt-4p">
    <div className ="container">
      <div className ="col col-md-6 col-lg-4 col-xs-10">
     <div className = "card card-body">
    <div className='sign-up'>
    <form >
       <Input  placeholder ="Enter your Email" label ='Email'
        value ={email} handleChange={(e)=>setEmail(e.target.value)} name='email' required
        type='input'>
       </Input>
       <Input  placeholder ="Enter your password" label ='Password'
        value ={password} handleChange={(e)=>setPassword(e.target.value)} name='email'
        type='password'>
       </Input>
       <Input label =''
        value = "LogIn"  className= "btn btn-success" onClick={loginHandler} name='cnfpass'
        type='button'>
       </Input>
    </form>
    </div>
    </div></div>
    </div>
    </div>
  )
}


const mapDispatchToProps = dispatch =>({setCurrentUser:user=>dispatch(setCurrentUser(user))})

export default connect(null,mapDispatchToProps)(LoginPage);