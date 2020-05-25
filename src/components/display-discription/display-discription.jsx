
import React  from 'react' ;

const DisplayImageDescription = ({isShowNumber, date ,imageDescription ,pageNumber ,iSDisplayDiv})=>{

   
        if(iSDisplayDiv){
         return (    
        <>
        <li className ="list-group-item">Description :{imageDescription}</li>
        {isShowNumber?
        <li className ="list-group-item">Page Number : {pageNumber} </li>
        :""}
        <li className ="list-group-item">Date :{date}
        </li>
        </>
         )
        }else{
           return null;
        }
    
}
export default DisplayImageDescription ; 