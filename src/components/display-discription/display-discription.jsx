
import React  from 'react' ;

const DisplayImageDescription = ({imageDescription ,pageNumber ,iSDisplayDiv})=>{

   
        if(iSDisplayDiv){
         return (    
        <>
        <li className ="list-group-item">Description :{imageDescription}</li>
        <li className ="list-group-item">Page Number {pageNumber} </li>
        <li className ="list-group-item">Date</li>
        </>
         )
        }else{
           return null;
        }
    
}
export default DisplayImageDescription ; 