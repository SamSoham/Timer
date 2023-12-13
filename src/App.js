import { useEffect, useState } from 'react';
import './App.css';
import { IconButton, Snackbar,Alert } from '@mui/material';
import { PlayCircle } from '@mui/icons-material';

function App() {

  const [time,setTime] = useState(0)
  const [min,setMin] = useState(0)
  const [hr,setHr] = useState(0)
  const [sec,setSec] = useState(0)
  const [start,setStart] = useState(false)
  const [open,setOpen] = useState(false)
  var timer 
  
  function set(){
   if(time>-1){
    let seconds = time*60
    let hours = Math.floor(seconds/3600)
      seconds -= hours*3600
    let minutes = Math.floor(seconds/60)
      seconds -= minutes*60
    setHr(hours)
    setMin(minutes)
    setSec(seconds)
   }
   else{
    setOpen(true)
   }
  }

  function reset(){
    setHr(0)
    setMin(0)
    setSec(0)
    setTime(0)
  }

  useEffect(()=>{
    set()
  },[time])

  useEffect(()=>{
    if(start){
      timer = setInterval(()=>{
        sec && setSec(sec-1)
        if(sec===0 && min>0){
          setSec(59)
          setMin(min-1)
        }
        if(min===0 && hr>0){
          setHr(hr-1)
          setMin(59)
          setSec(59)
        }
      },1000)
   
      return ()=>clearInterval(timer)
    }
  })


  return (
    <div className="App">
      <Snackbar open={open} autoHideDuration={5000} onClose={()=>setOpen(false)}>
  <Alert onClose={()=>setOpen(false)} severity="warning" sx={{ width: '100%' }}>
    Enter a valid number
  </Alert>
</Snackbar>
     <div className='mininput'>
     <p>Enter in minutes</p>
     <input value={time} onChange={(e)=>setTime(e.target.value)}></input>
     </div>
     <div className='play'>
      <IconButton onClick={()=>setStart(true)}>
        <PlayCircle sx={{color:"#05ABCD",fontSize:"32px"}}/>
      </IconButton>
     <div className='time'>
     <p>{hr>9?hr:"0"+hr}:</p><p>{min>9 ? min : "0"+min}:</p><p>{sec>9 ? sec:"0"+sec}</p>
     </div>
     </div>
     <div className='btn'>
     <button onClick={()=>setStart(false)}>Pause</button>
     <button onClick={()=>reset()}>Reset</button>
     </div>
    </div>
  );
}

export default App;
