import React ,{useState} from 'react';
import {ReactComponent as Cross} from '../../assets/cross.svg';

const TopHeaderWithBack = ({history})=>{
    const  topRowStyle = {
        padding:"10px 10px" ,
        background:"rgba(0, 0, 0, 0.125)"
        }
    return(
        <div className ="row secondary-header" style ={topRowStyle}>
        <div className ="col-md-12">
        <button onClick ={()=>history.goBack()} className ="btn btn-success float-right">Go Back</button>
        </div>
        </div>
    )
}
export default TopHeaderWithBack ;