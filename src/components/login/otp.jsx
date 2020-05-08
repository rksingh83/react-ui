import React , {useState} from 'react' ;
import Input from '../boostrapinput/input.component';
import {Post ,Get} from '../../service/service.setup' ;
import {connect} from 'react-redux';
import  {setCurrentUser} from '../../redux/user/user.actions' ;
import Cookies from 'js-cookie' ;
const createHistory = require("history").createBrowserHistory;

const OTP = ({history})=>{
    const [emailOtp ,setOtp] = useState('') ;
    const otpHandler = ()=>{
        Post('mydiginotes/otpVerification',{emailOtp})
        .then(res=>{
           if(res.data.error){
               alert(res.data.error) 
               if(res.data.code==200){
                 history.push('/folder')
               }
           }
        }) 
    } ;
    return (
        <div className ="row mt-4">
        <div className ="container">
          <div className ="col col-md-6 col-lg-4 col-xs-10">
         <div className = "card card-body">
        <div className='sign-up'>
      <form >
      <Input  placeholder ="Enter OTP" label ='OTP'
       value ={emailOtp} handleChange={(e)=>setOtp(e.target.value)} name='otp' required
       type='input'>
      </Input>
      <Input label =''
       value = "LogIn"  className= "btn btn-success" onClick={otpHandler} name='cnfpass'
       type='button'>
      </Input>
   </form>
   </div>
   </div></div>
   </div>
   </div>
    )
  }

  

  export default OTP ;