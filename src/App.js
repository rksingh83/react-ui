import React from 'react';

import './App.css';
import Home from './components/home/home.component';
import {Switch,Route,Redirect} from 'react-router-dom';
import   './homepage.style.scss';
import Header from './components/header/header.component';
import LoginPage from './components/login/login.page';
import  OTP from './components/login/otp'; 
import UploadFile from  './components/login/uploadfile' ;
import LouOut from './components/login/logout'
import  {setCurrentFile} from './redux/file/file.actions' ;
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
   setCurrentFile:this.props.setCurrentFile
     
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
    <Route  exact path ='/login' component ={LoginPage}/>
    <Route exact path ='/folder' component={SideBar}/>
    <Route exact path ='/' component={LoginPage}/>
    <Route exact path ='/signup' component={SingnUp}/>
    <Route exact path ='/otp' component={OTP}/> 
    <Route exact path ='/uploadFile' component={UploadFile}/> 
    
    <Route exact path ='/logout' component={LouOut}/>
  
   
    </Switch>

    </div>
  );
  }
}



const mapDispatchToProps = dispatch =>({
  setCurrentFile:currentFile=>dispatch(setCurrentFile(currentFile))
})

export default  connect(null ,mapDispatchToProps)(App);
