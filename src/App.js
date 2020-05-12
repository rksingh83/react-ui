import React from 'react';

import './App.css';
import Home from './components/home/home.component';
import {Switch,Route,Redirect} from 'react-router-dom';
import   './homepage.style.scss';
import Header from './components/header/header.component';
import LoginPage from './components/login/login.page';
import  OTP  ,{ForgotPassword ,VerifyOTP} from './components/login/otp'; 
import UploadFile from  './components/login/uploadfile' ;
import LouOut from './components/login/logout'
import SideBar from './components/sidebar/sidebar.component'
//import LouOut from './components/login/otp';

import ModalPop from './components/modal/modal.component'
import {connect} from 'react-redux'
import SingnUp from './components/signup/singnup.component';
import {Post ,Get} from './service/service.setup' ;
class App extends React.Component{
 //#endregio
 constructor(props){
   super(props);
   this.state={
     currentUser:'',
     
   }
 }

 unsubscribeAuth = null;

 componentDidMount(){
   

 }

  render(){
  return (
    <div className="App">
    <Header/>
    <Switch>
    <Route  exact path ='/login' component ={LoginPage}/>>
    <Route exact path ='/' component={this.props.currentUser?SideBar:LoginPage}/>
    <Route exact path ='/signup' component={SingnUp}/>
    <Route exact path ='/otp' component={OTP}/> 
    <Route exact path ='/verify' component={VerifyOTP}/> 
    <Route exact path ='/forgot' component={ForgotPassword}/> 
    <Route exact path ='/folder' component={SideBar}/>
    
    <Route exact path ='/uploadFile' component={UploadFile}/> 
    
    <Route exact path ='/logout' component={LouOut}/>
  
   
    </Switch>

    </div>
  );
  }
}



const mapStateToPros = ({user:{currentUser}})=>({currentUser})

export default  connect(mapStateToPros)(App);
