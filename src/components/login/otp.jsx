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

 export  const VerifyOTP = ({history})=>{
    const [emailOtp ,setOtp] = useState('') ;
    const [email ,setEmail] = useState('') ;
    const otpHandler = ()=>{
        Post('mydiginotes/forgotOtpVerification',{emailOtp ,email})
        .then(res=>{
          console.log(res)
           if(res.data.error){
               alert(res.data.error) 

           }
           if(res.data.code==200){
             console.log("IN 200")
            history.push('/folder')
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
      <Input  placeholder ="Enter Email" label ='Email'
       value ={email} handleChange={(e)=>setEmail(e.target.value)} name='otp' required
       type='input'>
      </Input>
      <Input  placeholder ="Enter OTP" label ='OTP'
       value ={emailOtp} handleChange={(e)=>setOtp(e.target.value)} name='otp' required
       type='input'>
      </Input>
      <Input label =''
       value = "Submit"  className= "btn btn-success" onClick={otpHandler} name='cnfpass'
       type='button'>
      </Input>
   </form>
   </div>
   </div></div>
   </div>
   </div>
    )
  }
export const ForgotPassword = ({history})=>{
  const [email ,setEmail] = useState('') ;
 const  sendOtpHandler =()=>{
   if(email=='')
     alert('Enter Email')
 
      Post('mydiginotes/forgotpassword',{email})
  .then(res=>{
     console.log(res)
     if(res.data.error){
         alert(res.data.error) 
         if(res.data.code==200){
           history.push('/verify');
           
         }
     }
  }) 
  }

  return (
    <div className ="row mt-4">
    <div className ="container">
      <div className ="col col-md-6 col-lg-4 col-xs-10">
     <div className = "card card-body">
    <div className='sign-up'>
  <form >
  <Input  placeholder ="Enter Email" label ='Email'
   value ={email} handleChange={(e)=>setEmail(e.target.value)} name='otp' required
   type='input'>
  </Input>
  <Input label =''
   value = "Send Otp"  className= "btn btn-success" onClick={sendOtpHandler} name='cnfpass'
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