
import React  from 'react' ;

const DisplayImageDescription = ({imageDescription ,pageNumber})=>{

    return (
        <>
        <li className ="list-group-item">Description :{imageDescription}</li>
        <li className ="list-group-item">Page Number {pageNumber} </li>
        <li className ="list-group-item">Date</li>
        </>
    )
}
export default DisplayImageDescription ; 