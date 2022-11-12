
import { useEffect, useRef, useState } from 'react';
import './App.css';
// import video from "video.mp4";


function App() {

  const videoRef=useRef(null)
  const photoRef=useRef(null)

  const [hasPhoto,setHasPhoto] =useState(false);
  
  const getvideo =()=>{
  
    navigator.mediaDevices.getUserMedia({
      video:{width:1200, height:800}
    })
    .then( stream=>{
      let video=videoRef.current;
      video.srcObject=stream;
      video.play()
      
    })
    .catch(err=>{
      console.log(err)
    })
  }


const takePhoto =()=>{
  const width=414;
  const height=width/(16/9);
  let video=videoRef.current;
  let photo =photoRef.current;
  photo.width=width;
  photo.height=height;
  let ctx =photo.getContext('2d');
  ctx.drawImage(video,0,0,width,height)
  setHasPhoto(true)
}

 const closePhoto =()=>{
  let photo =photoRef.current;
  let ctx =photo.getContext('2d')
  ctx.clearRect(0,0,photo.width,photo.height)
   setHasPhoto(false) 
}

  useEffect(()=>{
    getvideo()
  },[videoRef])

  return (
    <div className="App">
     <h1> video will be available very soon </h1>
      <div className='camera'>
        <video ref={videoRef}></video>
        <button onClick={()=>{takePhoto()}}>snap!</button>
      </div>
      <div className={'result ' +(hasPhoto ?'hasPhoto' :'')}>
        <canvas ref={photoRef}></canvas>
        <button onClick={()=>{closePhoto()}}>Close</button>
      </div>
    </div>
  );
}

export default App;
