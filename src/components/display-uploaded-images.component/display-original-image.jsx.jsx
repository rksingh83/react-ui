



import React , {useEffect ,useState} from  'react' ;
import CreateFolder from "../create-folder/create-folder.component";
import TestButton from '../create-folder/create.btn.component' ;
import GetLoader from '../../ui/loder' ;
import {Post ,Get} from '../../service/service.setup' ;
import './create-image.style.scss' ;
import {ReactComponent as Cross} from '../../assets/cross.svg';
import ImageSlider from  './image.slider' ;
import { ToastContainer, toast } from 'react-toastify';
import TopHeaderWithBack from '../top-header/simple-top.back';
const DisplayOriginalImage = ({match ,history})=>{
   const [imageUrl , setImageUrl] = useState('');
   const [allImages , setAllImages] = useState([]);
 
  useEffect(() => {
    const requestFile = { ids:[match.params.id],imagetype:"original",}
  
    Post('mydiginotes/getAnyCloudImages',requestFile)
    .then((res)=>{
   //  console.log((res.data.imageInput[0].align_image_org))
     setImageUrl(res.data.imageInput[0].align_image_org)
     
   }) ;
   const requestImages = { id:match.params.folderId}
 
   Post('mydiginotes/getAllFileImages',requestImages)
   .then((res)=>{
   const   allCloud = [] ;
     res.data.imageInput.forEach((image=>allCloud.push(image.id)))
     Post('mydiginotes/getAnyCloudImages',{ids:allCloud ,imagetype:"small"})
     .then((res)=>{
      setAllImages((res.data.imageInput))
    }) ;
   })

 },[]);
 const styleImage = {
   width:"80vh",
   height:"80vh"
 }
 const crossStyle = {
   position:"absolute" ,
   width:"4rem" ,
   height:"2rem",
   top:"5rem",
   right:"3rem"
 }
    return(
       <>
       <TopHeaderWithBack history={history}/>
      <div  style={{ display: "flex" ,flexWrap:"wrap"}}>


   <ImageSlider current ={match.params.id}
   history ={history}
    images ={allImages}></ImageSlider>
    </div>
    </>
    )

}
export default DisplayOriginalImage ;