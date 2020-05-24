
import React , {useEffect ,useState} from  'react' ;
import './create-image.style.scss' ;
import {ReactComponent as Next} from '../../assets/next.svg';
import {ReactComponent as Back} from '../../assets/back.svg';
import { ToastContainer, toast } from 'react-toastify';
const ImageSlider = ({images ,current ,history})=>{
  const styles = {
      position:"absolute"
  }
  console.log(images);
  const ParentStyles = {
    position:"relative"
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
         
        <div style ={ParentStyles}>
            <ToastContainer/>
            {images.map((image,index)=>(
                <div  className ="show-image" currentindex ={image.id} style = {{display:(current==image.id)?"block":"none"}} key ={index}>
                    <img className ="image" onClick = {()=>history.push(`/last/${image.id}`)} className = "display-image" src ={image.align_image_small} ></img>
            <span className ="image-description">Page Number: {image.pageNumber}</span>
            <span className ="image-description">Date : {image.ff_local_datetime}</span>
            
                </div>
            ))}
            <Next className ="next-btn common-btn" onClick ={nextImage} ></Next>
            <Back className ="prev-btn common-btn" onClick ={prevImage}></Back>
        </div>
    )
}

export default ImageSlider ;