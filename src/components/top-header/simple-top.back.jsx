import React ,{useState} from 'react';
import {ReactComponent as Cross} from '../../assets/cross.svg';
import {Post ,Get} from '../../service/service.setup' ;
import {ReactComponent as Photo} from '../../assets/photo.svg';
import './top.header.style.scss'


const TopHeaderWithBack = ({history})=>{
    const [file ,setFile] = useState('') ;
    const submitHandler = async e  =>{
        e.preventDefault();
        console.log(file)
        const formData = new FormData();
  
        formData.append('files' ,file);
        console.log(formData)
        try{
       let  res = await Post('/uploadImage' ,formData ,{
           headers:{
              'fileId':'751' ,
                'Content-Type':'multipart/form-data',
                "points":'[{"bottomleftx":"1","bottomlefty":"2","bottomrightx":"3","bottomrighty":"24","path":"/storage/emulated/0/Android/data/com.example.bookscanner/files/Pictures/jpg_1588253554482_jpg.jpg","topleftx":"5","toplefty":"6","toprightx":"7","toprighty":"8","ff_local_datetime":"54615856864"}]'
           }
         }) ;
         console.log(res)
        }catch(err){
         console.log(err)
        }
      
      
      }
    const  topRowStyle = {
        padding:"10px 10px" ,
        background:"rgba(0, 0, 0, 0.125)"
        }
    return(
        <div className ="row secondary-header" style ={topRowStyle}>
        <div className ="col-md-12">
        <form style ={{display:"inline"}} onSubmit ={submitHandler}>
        <label for="fileInput"className="input-label"> 
           <Photo style ={{width:"30px"}}/>
           <input className ="input-file" onChange ={(e)=>setFile(e.target.files[0])} type = "file" name = 'uploadFile'></input>
          </label>

     <input  className ="btn btn-primary ml-4" type ='submit' value ='Upload' />
     
   </form>
        <button onClick ={()=>history.goBack()} className ="btn btn-success float-right">Go Back</button>
        </div>
        </div>
    )
}
export default TopHeaderWithBack ;