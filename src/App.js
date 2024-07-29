import { useCallback, useState, useEffect } from 'react';
import './App.css';

function App() {
  const [length, setlength] = useState(8);
  const [numallowed, setnumallowed]=useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [password, setpassword] = useState("");

  const handlecopy =()=>{
    window.navigator.clipboard.writeText(password);
  }

  const passwordGenerator = useCallback(()=>{
    let pass="";
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numallowed) str+="0123456789";
    if(charallowed) str+="@#$%^&*()[]{}'~`"
    
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);
      
    }
    setpassword(pass);
    console.log(pass);

  }, [length, numallowed, charallowed, setpassword])

  useEffect(()=>{
    passwordGenerator();
  },[length, numallowed, charallowed])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-600'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input className='outline-none w-full py-1 px-3' placeholder='Password' value={password} readOnly/>
          <button className='outline-none bg-blue-700 text-white px-3 py-1 shrink-0' onClick={handlecopy(password)}>copy</button>
        </div>
        
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type='range' min={8} max={100} value={length} className='cursor-pointer' onChange={(e)=>{
              setlength(e.target.value)}}/>
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' defaultChecked={numallowed} id='numberInput' onChange={()=>{setnumallowed((lol)=>{return !lol})}}/>
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' defaultChecked={numallowed} id='charInput' onChange={()=>{setcharallowed((lol)=>{return !lol})}}/>
            <label htmlFor='charInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
