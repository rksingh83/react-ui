import React from 'react';

import './App.css';
import Home from './components/home/home.component';
import {Switch,Route,Redirect} from 'react-router-dom';
import   './homepage.style.scss';
import Header from './components/header/header.component';
import LoginPage from './components/login/login.page';
import  OTP from './components/login/otp';
import LouOut from './components/login/logout'

//import LouOut from './components/login/otp';

import ModalPop from './components/modal/modal.component'
import {connect} from 'react-redux'
import SingnUp from './components/signup/singnup.component';
import {Post ,Get} from './service/service.setup' ;
class App extends React.Component{
 //#endregio
 constructor(){
   super();
   this.state={
     currentUser:'',
     file :[]
     
   }
 }

 unsubscribeAuth = null;

 componentDidMount(){
  const requestFile = { filefolderRequest:[]}
  Post('mydiginotes/getAllFiles',requestFile)
  .then((res)=>{
    if(res.data.filefolderRequest){
  let data =  (res.data.filefolderRequest).map(item=>item.fileName)
   this.setState({file:data}) ;
    }
 })
 }

  render(){
  return (
    <div className="App">
    <Header/>
    <Switch>
    <Route  exact path ='/login' component ={LoginPage}/>
    <Route exact path ='/folder' component={() => <ModalPop openModel= {false} file={this.state.file} />}/>
    <Route exact path ='/' component={Home}/>
    <Route exact path ='/signup' component={SingnUp}/>
    <Route exact path ='/otp' component={OTP}/>
    <Route exact path ='/logout' component={LouOut}/>
  
   
    </Switch>

    </div>
  );
  }
}

const mapStateToProps = ({user})=>({
   currentUser :user.currentUser
})
export default  connect(mapStateToProps)(App);
