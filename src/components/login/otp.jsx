import React , {useState} from 'react' ;
import Input from '../boostrapinput/input.component';
import {Post ,Get} from '../../service/service.setup' ;
import {connect} from 'react-redux';
import  {setCurrentUser} from '../../redux/user/user.actions' ;
import Cookies from 'js-cookie' ;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const createHistory = require("history").createBrowserHistory;

const OTP = ({history})=>{
    const [emailOtp ,setOtp] = useState('') ;
    const otpHandler = ()=>{
        Post('/otpVerification',{emailOtp})
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
        Post('/forgotOtpVerification',{emailOtp ,email})
        .then(res=>{
         
           if(res.data.error){
               alert(res.data.error) 

           }
           if(res.data.code==200){
         
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
  const [emailOtp ,setOtp] = useState('') ;
  const [password ,setPassword] = useState('') ;
  const [isDisplayOtp ,setIsDisplayOtpInput] = useState(false) ;
  const [isDisplayVerify,setIsDisplayOtpSend] = useState(true) ;
  const [isDisplaySavePass ,setIsDisplaySavePass] = useState(false) ;
  
 const  sendOtpHandler =()=>{
   if(email=='')
   toast('Enter Email')
 
      Post('/forgotpassword',{email})
  .then(res=>{
  
     if(res.data.error){
      alert(res.data.error) 
         if(res.data.code==200){
          setIsDisplayOtpInput(true);
          setIsDisplayOtpSend(false)
           
         }
     }
  }) 
  }
  const otpHandler = ()=>{
    Post('/forgotOtpVerification',{emailOtp ,email})
    .then(res=>{
    
       if(res.data.error){
        alert(res.data.error) 

       }
       if(res.data.code==200){
         setIsDisplayOtpInput(false);
         setIsDisplaySavePass(true)
      }
    }) 
  }
  const savePassHandler = ()=>{
    Post('/newPassword',{password ,email})
    .then(res=>{
   
       if(res.data.error){
        alert.error(res.data.error) 

       }
       if(res.data.code==200){
    
        history.push('/login')
      }
    })
  }
  return (
    <div className ="row mt-4">
    <ToastContainer></ToastContainer>
    <div className ="container">
      <div className ="col col-md-6 col-lg-4 col-xs-10">
     <div className = "card card-body">
    <div className='sign-up'>
  <form >
  <Input  placeholder ="Enter Email" label ='Email'
   value ={email} handleChange={(e)=>setEmail(e.target.value)} name='otp' required
   type='input'>
  </Input>
  <div className ={`${(isDisplayOtp)?"":"hideInput"}`}>
  <Input  placeholder ="Enter OTP" label ='OTP'   
       value ={emailOtp} handleChange={(e)=>setOtp(e.target.value)} name='otp' required
       type='input'>
      </Input>
  </div>
  <div className ={`${(isDisplayVerify)?"":"hideInput"}`}>
  <Input label =''

   value = "Send Otp"  className= "btn btn-success" onClick={sendOtpHandler} name='cnfpass'
   type='button'>
  </Input>
</div>


  <div className ={`${(isDisplayOtp)?"":"hideInput"}`}>
  <Input label =''
       value = "Verify"  className= "btn btn-success" onClick={otpHandler} name='cnfpass'
       type='button'>
      </Input>
      </div>
      <div className ={`${(isDisplaySavePass)?"":"hideInput"}`}>
  <Input  placeholder ="Enter New Password" label ='Password'   
       value ={password} handleChange={(e)=>setPassword(e.target.value)} name='otp' required
       type='input'>
      </Input>
  </div>
      <div className ={`${(isDisplaySavePass)?"":"hideInput"}`}>
     <Input label =''
       value = "Save Password"  className= "btn btn-success" onClick={savePassHandler} name='cnfpass'
       type='button'>
      </Input>
      </div>
      
</form>
</div>
</div></div>
</div>
</div>
)
}

  export default OTP ;