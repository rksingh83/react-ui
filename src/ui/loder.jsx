import React  from 'react'
import Loader from 'react-loader-spinner'

const GetLoader = ()=>{
    return (
        <Loader
         type="Rings"
         color="#00BFFF"
         height={100}
         width={100}
         timeout={5000} //3 secs
 
      />
    )
}

export default GetLoader ;
