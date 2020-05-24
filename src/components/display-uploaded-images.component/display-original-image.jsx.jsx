



import React , {useEffect ,useState} from  'react' ;
import CreateFolder from "../create-folder/create-folder.component";
import TestButton from '../create-folder/create.btn.component' ;
import GetLoader from '../../ui/loder' ;
import {Post ,Get} from '../../service/service.setup' ;
import './create-image.style.scss' ;
import {ReactComponent as Cross} from '../../assets/cross.svg';

const DisplayOriginalImage = ({match ,history})=>{
   const [imageUrl , setImageUrl] = useState('')
  useEffect(() => {
    const requestFile = { ids:[match.params.id],imagetype:"original",}
  
    Post('mydiginotes/getAnyCloudImages',requestFile)
    .then((res)=>{
     console.log((res.data.imageInput[0].align_image_org))
     setImageUrl(res.data.imageInput[0].align_image_org)
     
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
    
      <div style={{ display: "flex" ,flexWrap:"wrap" ,justifyContent:"center",alignItems:"center" }}>
        <Cross onClick = {()=>history.goBack()} style  ={crossStyle}></Cross>
       <img
       style ={styleImage}
         src ={`${imageUrl}`}

        ></img>

    </div>
    )
   

}
export default DisplayOriginalImage ;