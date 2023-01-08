
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
      let video=videoRef?.current;
      video.srcObject=stream;
      console.log(video,'check out what is a')
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
  // console.log(ctx.canvas.parentElement)
  setHasPhoto(true);
  // var canvas=ctx.canvas.parentElement;
  // var data = canvas[0].toDataURL('image/png');
  // console.log(data,'the canvas data')
  var can = document.getElementsByTagName("canvas")[0]; 


  // the procedure for saving the data here 

  
  // var data=can.toDataURL('image/png').replace("image/png", "image/octet-stream");
  // console.log(data,'check the data ')
  // window.location.href=data;

  savePhoto(can)
}

 const closePhoto =()=>{
  let photo =photoRef.current;
  let ctx =photo.getContext('2d')
  ctx.clearRect(0,0,photo.width,photo.height)
   setHasPhoto(false) 
   
}

const savePhoto=(pic)=>{
  var savingData=pic.toDataURL('image/png').replace('image/png','image/octet-stream')
  window.location.href=savingData;
}
  useEffect(()=>{
    getvideo()
  },[videoRef])

  return (
    <div className="App">
     {/* <h1> video will be available very soon </h1> */}
      <div className='camera'>
        <video preload="none"  ref={videoRef}></video>
        <button onClick={()=>{takePhoto()}}>snap!</button>
      </div>
      <div className={'result ' +(hasPhoto ?'hasPhoto' :'')}>
        <canvas ref={photoRef}></canvas>
        <button onClick={()=>{closePhoto()}}>Close</button>
        <button onClick={()=>{savePhoto()}}>Save</button>
      </div>
    </div>
  );
}

export default App;
