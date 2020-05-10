import React from 'react' ;

const TestButton = ({funName})=>{
   
    return (
        <button onClick ={()=>funName(1,3,4)}>ClickMe</button>
    )
}
export default TestButton ;