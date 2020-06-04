



import React , {useEffect ,useState} from  'react' ;
import CreateFolder from "../create-folder/create-folder.component";
import TestButton from '../create-folder/create.btn.component' ;
import GetLoader from '../../ui/loder' ;
import {Post ,Get} from '../../service/service.setup' ;
import './create-image.style.scss' ;
import {ReactComponent as Cross} from '../../assets/cross.svg';
import {ReactComponent as Pencil} from '../../assets/edit.svg';

const DisplayLastImage = ({match ,history})=>{
   const [imageUrl , setImageUrl] = useState('')
  useEffect(() => {
    const requestFile = { ids:[match.params.id],imagetype:"original",}
  
    Post('/getAnyCloudImages',requestFile)
    .then((res)=>{
     
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
 const pencilStyle = {
  position:"absolute" ,
  width:"4rem" ,
  height:"2rem",
  top:"5rem",
  right:"5rem"
}
    return(
    
      <div style={{ display: "flex" ,flexWrap:"wrap" ,justifyContent:"center",alignItems:"center" }}>
        <Cross onClick = {()=>history.goBack()} style  ={crossStyle}></Cross>
        <Pencil onClick = {()=>history.push(`/edit/${imageUrl}`)} style  ={pencilStyle}></Pencil>
       <img
       style ={styleImage}
         src ={`${imageUrl}`}

        ></img>

    </div>
    )
   

}
export default DisplayLastImage ;