import React from 'react';

import './input.style.scss'


const Input =({handleChange,label,...restProps })=>{
     
  return(
       <div className ='form-group'>
         {
         label?
         (<label className={`${restProps.value.length?'shrink':''} form-input-label`}>
         {label}
         </label>):null
      }
      <input className ='form-control'   onChange={handleChange} {...restProps}/>
     
      </div>
  )
}

export  default Input;