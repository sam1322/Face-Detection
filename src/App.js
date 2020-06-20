import React  from 'react';
import Navigation from  './components/Navigation/Navigation';
import FaceDetection from  './components/Facedetection/Facedetection';
import Logo from './components/Logo/Logo';

import ImageLinkForm from './components/ImageLinkForm/Imagelinkform' ;
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Signin from './components/Signin/Signin' ;
import Register from './components/Register/Register' ;
import './App.css'; 
import 'tachyons' ;


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

const initialState  = {
    input: '' ,
    imageUrl:'',
    box:{} ,
    route:'signin',
    isSignedIn: false ,
    user:{
      id:'',
      name:'' ,
      email:'' ,
      entries:0 ,
      joined:'' ,
    } 
  }


class App extends React.Component{
  constructor(){
    super() ;
    this.state = initialState ; 
   }
   
   loadUser = (data) =>{
     this.setState({user:{
      id:data.id,
      name:data.name ,
      email:data.email ,
      entries:data.entries,
      joined:data.joined,
    }
  })
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

     this.setState({box : box}) ;
   }

  onInputChange = (event)=>{
    this.setState({input: event.target.value});
  } 

  onButtonSubmit = ()=>{
    this.setState({imageUrl : this.state.input});
    // console.log('submit');
    fetch('http://localhost:3000/imageurl', {
      method:'post' ,
      headers :{ 'Content-Type' :'application/json'  } ,
      body :JSON.stringify({
        input : this.state.input
      })
    })
    .then(response =>response.json())
       .then(response =>{
         if(response){
           fetch('http://localhost:3000/image', {
             method:'put' ,
             headers :{ 'Content-Type' :'application/json'  } ,
             body :JSON.stringify({
               id : this.state.user.id 
             })
           })
           .then(response =>response.json())
           .then(count =>{
              this.setState(Object.assign(this.state.user , {entries : count }))
           })
           .catch(console.log)
         }
      
       this.displayFaceBox(this.CalculateFaceLocation(response) ) 
        })
       .catch(err=>console.log(err)) ;
  
  }

  onRouteChange = (route) => {
    if(route === 'signin'){
      this.setState(initialState)
    }
    else if(route==='home'){
      this.setState({isSignedIn : true})
    }
    this.setState({route : route} ) ; 
  }

  render(){
    const {isSignedIn , imageUrl ,box ,route,user } = this.state ;
  return (
    <div className="App"> 
    <Particles className ='particles' 
      params ={particleOptions}
    />
      
    
 
     <Navigation onRouteChange = {this.onRouteChange} isSignedIn = {isSignedIn} />
     {route === 'home'
     ?<div><Logo/>
      <Rank name = {user.name} entries = {user.entries}/>
     <ImageLinkForm 
     onInputChange = {this.onInputChange} 
     onButtonSubmit = {this.onButtonSubmit}/>
     <FaceDetection box = {box} imageUrl={imageUrl}/>
     </div>
      :  ( route === 'signin'
      ?<Signin loadUser = {this.loadUser}  onRouteChange = {this.onRouteChange} />
      :<Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />

      )
      
     }
     </div>
  );
  }
}

export default App;
