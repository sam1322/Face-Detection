import React  from 'react';
import Navigation from  './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/Imagelinkform' ;
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
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

class App extends React.Component{
  render(){
  return (
    <div className="App"> 
    <Particles className ='particles' 
      params ={particleOptions}
    />

 
     <Navigation/>
      <Logo/>
      <Rank/>
     <ImageLinkForm/>
     {/*<FaceDetection/>" */}
     </div>
  );
  }
}

export default App;
