import React from 'react';
import CustomButton from '../custom-button/custom-button.componenet';
import axios from 'axios'
import Input from '../boostrapinput/input.component';
import AddFolder from '../add-folder/add-folder.component'
import {Post ,Get} from '../../service/service.setup'
import Modal from 'react-modal';
class SingnUp extends React.Component{
   constructor(props){
     super(props);

     this.state = {
       name:'',
       email:'',
       password:'',
       cnfpass:'',
       phoneNumber:'' ,
       history :props.history
     }
   }
    handleChange = (e)=>{
      const {name,value} =(e.target) ;
  
      this.setState({[name]:value}) 

   }
   handleSubmit = (e)=>{
     e.preventDefault();
     const {name ,email , password ,phoneNumber} = this.state ;
     const  user = {name,email,password ,phoneNumber}

   Post('mydiginotes/registration',user)    
     .then((res)=>{
         if(res.data.error){
            alert(res.data.error)
         }else{
        this.state.history.push("/login");
         }
     } )
       
   }
    ValidateInput = (user)=>{
    
    }

   render(){
    

    const {name,email,password,cnfpass ,phoneNumber} =this.state;
   return (
     <div className ="row mt-4">
     <div className ="container">
       <div className ="col col-md-6 col-lg-4 col-xs-10">
      <div className = "card card-body">
     <div className='sign-up'>
     <form onSubmit ={this.handleSubmit}>
        <Input  placeholder ="Enter your Name" label ='Name'
         value ={name} handleChange={this.handleChange} name='name' required
         type='input'>
        </Input>
        <Input  placeholder ="Enter your Email" label ='Email'
         value ={email} handleChange={this.handleChange} name='email'
         type='input'>
        </Input>
        <Input  placeholder ="Enter your phone number" label ='Phone'
         value ={phoneNumber} handleChange={this.handleChange} name='phoneNumber'
         type='input'>
        </Input>
        <Input  placeholder ="Enter password Name" label ='Password'
         value ={password} handleChange={this.handleChange} name='password'
         type='input'>
        </Input>
        <Input  placeholder ="Confirm your password" label ='Confirm Password'
         value ={cnfpass} handleChange={this.handleChange} name='cnfpass'
         type='input'>
        </Input>
        <Input label =''
         value = "SignUp"  className= "btn btn-success" onClick={this.handleSubmit} name='cnfpass'
         type='button'>
        </Input>
     </form>
     </div>
     </div></div>
     </div>
     </div>
   );
   }

}
export default SingnUp