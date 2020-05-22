import React , {useState , useEffect} from 'react' ;
import Input from '../boostrapinput/input.component';
import {Post ,Get} from '../../service/service.setup' ;
import {connect} from 'react-redux';
import  {setCurrentUser} from '../../redux/user/user.actions' ;
import Cookies from 'js-cookie' ;
import DisplayImages from '../display-uploaded-images.component/display-uploded-images'
const createHistory = require("history").createBrowserHistory;

const UploadFile = ({match})=>{
    const [file ,setOtp] = useState('') ;
    const [isLoading, setIsLoading] = useState(false);
    const [images ,setImages] = useState([]) ;
    const otpHandler = ()=>{
        
    } ;
    console.log("MATCH")
    console.log(match)
    useEffect(() => {
      const requestFile = { id:match.params.id}
      setIsLoading(true)
      Post('mydiginotes/getAllFileImages',requestFile)
      .then((res)=>{
       console.log(setImages(res.data.imageInput))
       setIsLoading(false)
     })
   },[]);
    return (
        <div className ="row mt-4">

   <div className ="container">
     <DisplayImages images ={images} isLoading ={isLoading}></DisplayImages>
   </div>
   </div>
    )
  }

  

  export default UploadFile ;