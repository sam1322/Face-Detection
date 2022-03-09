import React from 'react' ;
import './Facedetection.css'

const FaceDetection = ({ box,imageUrl }) =>{
    return (
        <div className='center '>
        <div className='absolute mt2' >
            <img  id = 'inputimage' alt ='image' src = {imageUrl} width ='500px' height='auto' />
            <div className='bounding-box' style ={{top:box.topRow , right :box.rightCol ,bottom : box.bottomRow , left : box.leftCol}}></div>
        </div>
    </div>
    ) ;
}

export default FaceDetection ;