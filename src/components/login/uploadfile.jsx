import React , {useState , useEffect} from 'react' ;
import Input from '../boostrapinput/input.component';
import {Post ,Get} from '../../service/service.setup' ;
import {connect} from 'react-redux';
import  {setCurrentUser} from '../../redux/user/user.actions' ;
import Cookies from 'js-cookie' ;
import LeftSideBar from '../sidebar/left.sidebar.compoent' ;
import DisplayImages from '../display-uploaded-images.component/display-uploded-images';
import DisplayImageDescription from  '../display-discription/display-discription' ;
import TopHeaderWithBack from '../top-header/simple-top.back';

const UploadFile = ({match , history})=>{
    const [file ,setOtp] = useState('') ;
    const [isLoading, setIsLoading] = useState(false);
    const [images ,setImages] = useState([]) ;
    const [imageDescription ,setImagesDescription] = useState('Hi') ;
    const [pageNumber ,setPageNumber] = useState('') ;
    const [iSDisplayDiv ,setIsDisplayDiv] = useState(false) ;
    const [activeIndex ,setActiveIndex] = useState(0) ;
    const [folderId , setFolderId] = useState(match.params.id)

    const sideBarStyle = {
      border: "1px solid rgba(0, 0, 0, 0.125)",
      height: "90vh"
  }
    const totalEle = ['My Files' ,'Recent' ,'Photos'  ,'Recycle Bin'] ;
     const [LiElement ,setLiEl]= useState(totalEle)
    const handleActive = (e)=>{
      setActiveIndex(LiElement.indexOf(e));
      setLiEl(totalEle)
   }
    const otpHandler = ()=>{
        
    } ;
    const showContentHandler = (pageNo ,des ,flag)=>{
      setIsDisplayDiv(flag)
      setImagesDescription(des);
      setPageNumber(pageNo)
    }
    const hideContentHandler = (flag)=>{
    setIsDisplayDiv(flag)
    }
    useEffect(() => {
      const requestFile = { id:match.params.id}
      setIsLoading(true)
      Post('mydiginotes/getAllFileImages',requestFile)
      .then((res)=>{
       (setImages(res.data.imageInput))
       setIsLoading(false)
     })
   },[]);
  
    return (
        <> 
        <TopHeaderWithBack history={history}/>
        <div className ="row">
<div className ="col-md-2">
            <ul className="list-group" style ={sideBarStyle}>
            {totalEle.map((item ,index)=><LeftSideBar 
            item={item}
            key = {index}
            isActive = {(activeIndex==index)?true:false}
            changeActive = {handleActive}
            />)}
            <DisplayImageDescription 
              pageNumber = {pageNumber}
              iSDisplayDiv ={iSDisplayDiv}
             imageDescription={imageDescription}/>
            </ul>
            
            </div>
   <div className ="col-md-9">
     <DisplayImages history = {history}
       onHove ={showContentHandler}
       onLeave ={hideContentHandler}
       images ={images} 
       folderId ={folderId}
       isLoading ={isLoading}/>

   </div>
   </div>
   </>
    )
  }

  

  export default UploadFile ;