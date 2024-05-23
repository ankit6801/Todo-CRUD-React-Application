import React, { useState, useEffect } from 'react'
import './styles/Home.css';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import { uid } from 'uid';
import { set, ref, onValue, remove, update } from 'firebase/database';

export default function Home() {
  const navigate = useNavigate();
  const [user, setuser] = useState("");
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [isupdate, setisupdate] = useState(false);
  const [tempuid, settempuid] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
      setuser(currentUser);
    });
  
    return () => {
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    if(user){
      onValue(ref(db, `/${auth.currentUser.uid}`), snapshot =>{
        settodos([]);
        const data = snapshot.val();
        if(data !== null){
          Object.values(data).map(todo => {
            settodos((oldArray) => [...oldArray, todo]);
          })
        }
      })
    }
  }, [user]);
  

  const logouthandler = (e)=>{
    e.preventDefault();
    signOut(auth);
    navigate('/');
  }

  const addtodohandler = ()=>{
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo : todo, 
      uid : uidd,
    });
    settodo("");
  };

  const updatehandler = (a)=>{
    setisupdate(true);
    settodo(a.todo);
    settempuid(a.uid);
  }
  
  const confirmupdate = ()=>{
    update(ref(db, `/${auth.currentUser.uid}/${tempuid}`), {
      todo : todo,
      uid : tempuid
    });
    settodo("");
    setisupdate(false);
  }

  
  return (
    <div className='home'>

        <div className="profile">
          <i className="userlogo fa-solid fa-circle-user"></i>
          { user && 
          <p className='profilehover'>
            {user.displayName} 
            <i onClick={logouthandler} className="logoutbtn fa-solid fa-arrow-right-from-bracket"></i>
          </p> 
          }
        </div>

        <div className="todocontainer">
          <div className="entertodo">
            <input type="text" placeholder='Add a Todo' className="entertodoinput" value={todo} onChange={(e)=>{ settodo(e.target.value) }} />
            {
              isupdate ?
              <i onClick={confirmupdate} className="confirm-update-todo entertodoicon fa-solid fa-pen"></i>
              :
              <i  onClick={addtodohandler} className="entertodoicon fa-solid fa-plus"></i>
            }
          </div>
          {
            todos.map(a=>{
              return (
                <>
                  <div className='todo'>  
                    <span className='demo'>{a.todo}</span>
                    <div className="todoicons">
                      <i onClick={()=>{ remove(ref(db, `${auth.currentUser.uid}/${a.uid}`)) }} className='deletetodo fa-solid fa-trash'></i>
                      <i onClick={()=>{updatehandler(a)}} className='updatetodo fa-solid fa-pen'></i>
                    </div>
                    {/* <input type="checkbox" className='checktodo'/> */}
                  </div>
                </>
              )})
          }
        </div>
        <img className='homeimg' src="./img/home1.svg" alt='sry not available' />
    </div>
  )
}
