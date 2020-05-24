
import React , {useEffect ,useState} from  'react' ;
import './create-image.style.scss' ;
import {ReactComponent as Next} from '../../assets/next.svg';
import {ReactComponent as Back} from '../../assets/back.svg';
import { ToastContainer, toast } from 'react-toastify';
import LeftSideBar from '../sidebar/left.sidebar.compoent' ;
const ImageSlider = ({images ,current ,history})=>{
    const totalEle = ['My Files' ,'Recent' ,'Photos'  ,'Recycle Bin'] ;
    const [LiElement ,setLiEl]= useState(totalEle);
    const [activeIndex ,setActiveIndex] = useState(0) ;
   const handleActive = (e)=>{
     setActiveIndex(LiElement.indexOf(e));
     setLiEl(totalEle)
  }
  const sideBarStyle = {
    border: "1px solid rgba(0, 0, 0, 0.125)",
    height: "90vh"
}
  const styles = {
      position:"absolute"
  }
  console.log(images);
  const ParentStyles = {
    position:"relative",
    display:"flex",
    justifyContent:"center",
}

const getCurrentIndex = ()=>{
    const allImages = document.querySelectorAll('.show-image');
    let imageIndex ;
    allImages.forEach((item)=>{
   if(item.style.display=='block')
   imageIndex =  item.getAttribute('currentindex');
})
const currentImage  = images.filter((item)=>item.id==imageIndex);
let currentIndex =(images.indexOf(currentImage[0]));
return  currentIndex;
}
const nextImage = ()=>{
    const allImages = document.querySelectorAll('.show-image');
  let currentIndex = getCurrentIndex();
if(currentIndex == images.length-1){
    toast.error("You've reached last image in the file ");
    return
}
if(currentIndex<images.length){
   currentIndex = currentIndex+1;
}
let selectedIndex = images[currentIndex].id;
    allImages.forEach((item)=>{
        if(item.getAttribute('currentindex') == selectedIndex){
        item.style.display= 'block'
        }else{
            item.style.display= 'none'
        }
       
     })
}
const prevImage = ()=>{
    const allImages = document.querySelectorAll('.show-image');
  let currentIndex = getCurrentIndex();
if(currentIndex == 0){
    toast.error("You've reached first image in the file ");
     return
 }
if(currentIndex<images.length){
   currentIndex = currentIndex-1;
}
let selectedIndex = images[currentIndex].id;
    allImages.forEach((item)=>{
        if(item.getAttribute('currentindex') == selectedIndex){
        item.style.display= 'block'
        }else{
            item.style.display= 'none'
        }
    
     })
}
    return(
         <>
         <div className ="col-md-2 p-0">

         <ul className="list-group" style ={sideBarStyle}>
            {totalEle.map((item ,index)=><LeftSideBar 
            item={item}
            key = {index}
            isActive = {(activeIndex==index)?true:false}
            changeActive = {handleActive}
            />)}

            </ul>
            
         </div>
        <div class="col-md-9"style ={ParentStyles}>
            <ToastContainer/>
            {images.map((image,index)=>(
                <div  className ="show-image" currentindex ={image.id} style = {{display:(current==image.id)?"block":"none"}} key ={index}>
                    <img className ="image" onClick = {()=>history.push(`/last/${image.id}`)} className = "display-image" src ={image.align_image_small} ></img>
            <div className="card-body custom-card">
            <span className ="image-description">Page Number: <span className="content"> {image.pageNumber}</span></span>
            <span className ="image-description">Date: <span  className="content">{image.ff_local_datetime}</span></span>
            <span className ="image-description">Description : <span  className="content">{image.description}</span> </span>
            </div>
                </div>
            ))}
            <Next className ="next-btn common-btn" onClick ={nextImage} ></Next>
            <Back className ="prev-btn common-btn" onClick ={prevImage}></Back>
        </div>
        </>
    )
}

export default ImageSlider ;