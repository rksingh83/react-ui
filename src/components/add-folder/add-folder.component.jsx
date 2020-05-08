

import React, { useState } from 'react';
import ModalPop from '../modal/modal.component' ;



const AddFolder = ()=>{
    const [folderName, addName] = useState("");
    const [disc, addDisc] = useState("");
    const addFolderHandler = (e)=>{
    };
    const addDescHandler =  (e)=>{
    
    
    };
    return  (
        <ModalPop
        folderName = {folderName} 
        addName = {addFolderHandler}
        disc = {disc} 
        addDisc = {addDescHandler}

        ></ModalPop>
    )

}


export default AddFolder ;