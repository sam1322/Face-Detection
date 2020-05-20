import React from 'react' ;
import './Imagelinkform.css' ;
const Imagelinkform = ({ onInputChange ,onButtonSubmit}) =>{
    return (
        
        <div>
           <p className='f3'>
               {'This is magic brain which will detect the faces in your picture . Give it a try '}
           </p> 
           {/* <hr/> */}
           <div className='center' >
                <div className='form center pa4 br3 shadow-5'>
               <input className='f4 pa2 w-70 center' type='text' onChange = {onInputChange} />
            
               <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple ml2 ' 
               onClick = {onButtonSubmit}>Detect</button>
               </div>
           </div>
        </div>
    ) ;
}

export default Imagelinkform ;