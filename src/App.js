import React  from 'react';
import Navigation from  './components/Navigation/Navigation';
import FaceDetection from  './components/Facedetection/Facedetection';
import Logo from './components/Logo/Logo';
import Clarifai from 'clarifai' ;
import ImageLinkForm from './components/ImageLinkForm/Imagelinkform' ;
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Signin from './components/Signin/Signin' ;
import './App.css'; 
import 'tachyons' ;

const app = new  Clarifai.App({
  apiKey:'24b3781c6755492599230a1e2d0a3125'
}) ;

const particleOptions = {
  particles: {
    number : {
      value:100 ,
      density: {
        enable: true,
        value_area: 800 
      }
    } 
  }
}

class App extends React.Component{
  constructor(){
    super() ;
    this.state = {
      input: '' ,
      imageUrl:'',
      box:{} ,
    }
   }

   CalculateFaceLocation = (data) =>{
     const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box ; 
     const image = document.getElementById('inputimage') ;
     const width = Number(image.height) ;
     const height = Number(image.width) ;
     return {
       leftCol : clarifaiFace.left_col * width ,
       topRow: clarifaiFace.top_row * height,
       rightCol :width - ( clarifaiFace.right_col * width ),
       bottomRow: height - ( clarifaiFace.bottom_row*height),
     }
   }

  displayFaceBox = (box) =>{
    // console.log(box) ;
     this.setState({box : box}) ;
   }

  onInputChange = (event)=>{
    this.setState({input: event.target.value});
  } 

  onButtonSubmit = ()=>{
    this.setState({imageUrl : this.state.input});
    // console.log('submit');
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
       this.state.input)
       .then((response) =>this.displayFaceBox(this.CalculateFaceLocation(response) ) )
       .catch(err=>console.log(err)) ;
  
  }
  render(){
  return (
    <div className="App"> 
    <Particles className ='particles' 
      params ={particleOptions}
    />

 
     <Navigation/>
     <Signin/>
      <Logo/>
      <Rank/>
     <ImageLinkForm 
     onInputChange = {this.onInputChange} 
     onButtonSubmit = {this.onButtonSubmit}/>
     <FaceDetection box = {this.state.box} imageUrl={this.state.imageUrl}/>
     </div>
  );
  }
}

export default App;
