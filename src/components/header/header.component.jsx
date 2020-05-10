import React from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import {auth} from  '../../firebase/firebase.utilis';
import Cookies from 'js-cookie' ;
import './header.style.scss';
import {connect} from 'react-redux';






const Header =({currentUser,hidden})=>{
    const imgStyle ={width:"20%",position :"relative",
    top:'-30px'}
  const isToken = Cookies.get('token');
 
return(
  <nav className="navbar navbar-expand-lg navbar-light bg-dark">
<div className ='header'>

<Link className='logo-container' to='/'>
<img style ={imgStyle} src = {require('../../assets/logo.png')}></img> 
</Link>
<div className='options'>
<Link className ='option' to ='/'>Home</Link>

{currentUser?<Link className ='option' to ='/folder'>Create Folder</Link>:""}
{currentUser?"":<Link className ='option' to ='/login'>Login</Link>}
{currentUser?"":<Link className ='option' to ='/signup'>Signup</Link>}
{currentUser?<Link className ='option' to ='/logout'>Logout</Link>:""}
</div>
</div>
</nav>
)               
}
const mapStateToPros = ({user:{currentUser}})=>({currentUser})
export default connect(mapStateToPros)(Header);