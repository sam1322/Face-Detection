import React  from 'react';
import Navigation from  './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/Imagelinkform' ;
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css'; 
import 'tachyons' ;

// const particleOptions = {
//   particles: {
//     number : {
//       value:30 ,
//       density: {
//         enable: true,
//         value_area: 800 
//       }
//     } 
//   }
// }

class App extends React.Component{
  render(){
  return (
    <div className="App"> 
    {/* <Particles className ='particles' 
      param ={particleOptions}
    /> */}

    <Particles
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      // zIndex: -1
    }}
    params={{
      number: {
        value: 900,
        density: {
          enable: true,
          value_area: 800
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        polygon: {
          nb_sides: 7
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          }
        }
      },
      "retina_detect": true
    }} />
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
