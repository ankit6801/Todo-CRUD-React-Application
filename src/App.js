import { useState, useEffect } from 'react';
import './App.css';
import SignUpLogIn from './components/SignUpLogIn';
import Home from './components/Home';
import NewHome from './components/NewHome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [msg, setmsg] = useState("");
  const [show, setshow] = useState(false);

  const errorhandler = (a, b)=>{
    setmsg(a);
    setshow(b);
  };

  useEffect(() => {
    const al = document.querySelector(".alert");
    if(al){
      al.style.display = "block";
      setTimeout(() => {
        al.style.display = "none";
      }, 5000);
    }
  }, [show]);
  

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUpLogIn errorhandler={errorhandler}/>}/>
          <Route path='/home' element={<Home/>}/>
          {/* <Route path='/home' element={<NewHome/>}/> */}
        </Routes>
        { show && <div className="alert">{msg}</div> }
      </BrowserRouter>
    </div>
  );
}

export default App;


