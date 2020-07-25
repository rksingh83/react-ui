



import React , {useEffect ,useState} from  'react' ;
import CreateFolder from "../create-folder/create-folder.component";
import TestButton from '../create-folder/create.btn.component' ;
import GetLoader from '../../ui/loder' ;
import {Post ,Get} from '../../service/service.setup' ;
import './create-image.style.scss' ;
import {ReactComponent as Cross} from '../../assets/cross.svg';
import ImageSlider from  './image.slider' ;
import { ToastContainer, toast } from 'react-toastify';
import TopSingleHeader from '../top-header/new.header';
import {connect} from 'react-redux'
const DisplayOriginalImage = ({match ,history ,sharedWithMe})=>{
   const [imageUrl , setImageUrl] = useState('');
   const [imageId , setImageId] = useState(match.params.id);
   const [allImages , setAllImages] = useState([]);
 
  useEffect(() => {
    const IMAGE_ORIGINAL_URL =  (sharedWithMe =='HOME')?'getAnyCloudImages':'getAnySharedCloudImages';
    const requestFile = { ids:[match.params.id],imagetype:"original",}
  
    Post(`/${IMAGE_ORIGINAL_URL}`,requestFile)
    .then((res)=>{
      if(res.data.code==201){
        alert(res.data.error);
         history.push('/logout');
    }
   //  console.log((res.data.imageInput[0].align_image_org))
     setImageUrl(res.data.imageInput[0].align_image_org)
     
   }) ;
   const requestImages = { id:match.params.folderId} ;
   const sharedRequest = { fileId: match.params.folderId, allPageAcess: true };
   const allImagesRequest =  (sharedWithMe =='HOME')?requestImages:sharedRequest;
   const IMAGE_URL =  (sharedWithMe =='HOME')?'getAllFileImages':'getAllSharedFileImages';
 
   Post(`/${IMAGE_URL}`,allImagesRequest)
   .then((res)=>{
    if(res.data.code==201){
      alert(res.data.error);
      history.push('/logout');
  }
   const   allCloud = [] ;
     res.data.imageInput.forEach((image=>allCloud.push(image.id))) ;
     const IMAGE_SMALL_URL =  (sharedWithMe =='HOME')?'getAnyCloudImages':'getAnySharedCloudImages';
 
     Post(`/${IMAGE_SMALL_URL}`,{ids:allCloud ,imagetype:"small"})
     .then((res)=>{
      if(res.data.code==201){
        alert(res.data.error);
         history.push('/logout');
    }
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
       <TopSingleHeader  imageId ={imageId} images ={allImages} history={history}/>
      <div  style={{ display: "flex" ,flexWrap:"wrap"}}>


   <ImageSlider current ={match.params.id}
   history ={history}
   setImageId = {setImageId}
    images ={allImages}></ImageSlider>
    </div>
    </>
    )

}
const mapStateToPros = ({ sharedWithMe: { sharedWithMe } }) => ({
  sharedWithMe,
});
export default connect(mapStateToPros)(DisplayOriginalImage);
//export default DisplayOriginalImage ;