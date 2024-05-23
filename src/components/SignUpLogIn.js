import React, { useState } from 'react'
import './styles/SignUpLogIn.css';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { auth } from '../Firebase';

export default function SignUpLogIn(props) {
    const navigate = useNavigate();
    const [name, setname] = useState("");
    const [signupmail, setsignupmail] = useState("");
    const [signuppass, setsignuppass] = useState("");
    const [loginmail, setloginmail] = useState("");
    const [loginpass, setloginpass] = useState("");

    const firstmodechange = ()=>{
        const container = document.querySelector('.container');
        container.classList.add('anime');
    }

    const secondmodechange = ()=>{
        const container = document.querySelector('.container');
        container.classList.remove('anime');
    }

    const signuphandler = (e)=>{
        e.preventDefault();
        props.errorhandler("", false);
        createUserWithEmailAndPassword(auth, signupmail, signuppass)
        .then(res=>{
            updateProfile(auth.currentUser, {
                displayName : name
            })
            .then(res=>{ navigate('/home') })
            .catch(err=> props.errorhandler(err.message, true));
        })
        .catch(err=> props.errorhandler(err.message, true));
    }

    const signinhandler = (e)=>{
        e.preventDefault();
        props.errorhandler("", false);
        signInWithEmailAndPassword(auth, loginmail, loginpass)
        .then(res=>{ navigate('/home') })
        .catch(err=>props.errorhandler(err.message, true));
    }

    const googleauthentication = (e)=>{
        e.preventDefault();
        props.errorhandler("", false);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then(res=>navigate('/home'))
        .catch(err=>props.errorhandler(err.message, true));
    }

    const facebookauthentication = (e)=>{
        e.preventDefault();
        props.errorhandler("", false);
        const facebookprovider = new FacebookAuthProvider();
        signInWithPopup(auth, facebookprovider)
        .then(res=>navigate('/home'))
        .catch(err=>props.errorhandler(err.message, true));
    }


  return (
    <div className='container'>
        <div className="formcontainer">
            <form className='lsform rightform' autoComplete='off'>
                <h1>Sign in</h1>
                <div className="lsinputs">
                    <i className="fa-solid fa-envelope"></i>
                    <input type="email" placeholder='Email' onChange={(e)=>{ setloginmail(e.target.value) }}/>
                </div>
                <div className="lsinputs">
                    <i className="fa-solid fa-lock"></i>
                    <input type="password" placeholder='Password' onChange={(e)=>{ setloginpass(e.target.value) }}/>
                </div>
                <button className='btn' onClick={signinhandler}>SIGN IN</button>
                <div className="social">
                    <p>or Sign in with social platforms</p>
                    <div className="socialicons">
                        <i onClick={googleauthentication} className="fa-brands fa-google"></i>
                        <i onClick={facebookauthentication} className="fa-brands fa-facebook-f"></i>
                        <i className="fa-brands fa-twitter"></i>
                        <i className="fa-brands fa-linkedin-in"></i>
                    </div>
                </div>
            </form>

            <form className='lsform leftform' autoComplete='off'>
                <h1>Sign up</h1>
                <div className="lsinputs">
                    <i className="fa-solid fa-envelope"></i>
                    <input type="text" placeholder='Username' onChange={(e)=>{ setname(e.target.value) }}/>
                </div>
                <div className="lsinputs">
                    <i className="fa-solid fa-envelope"></i>
                    <input type="email" placeholder='Email' onChange={(e)=>{ setsignupmail(e.target.value) }}/>
                </div>
                <div className="lsinputs">
                    <i className="fa-solid fa-lock"></i>
                    <input type="password" placeholder='Password' onChange={(e)=>{ setsignuppass(e.target.value) }}/>
                </div>
                <button className='btn' onClick={signuphandler}>SIGN UP</button>
                <div className="social">
                    <p>or Sign up with social platforms</p>
                    <div className="socialicons">
                        <i onClick={googleauthentication} className="fa-brands fa-google"></i>
                        <i onClick={facebookauthentication} className="fa-brands fa-facebook-f"></i>
                        <i className="fa-brands fa-twitter"></i>
                        <i className="fa-brands fa-linkedin-in"></i>
                    </div>
                </div>
            </form>
        </div>

        <div className="panels">
            <div className="panel leftpanel">
                <div className="panelcontent">
                    <p className='panelcontenthead'>Positive vibes ?</p>
                    <p className='panelcontentpara'>Lorem, ipsum dolor sit amet consectetur adipisicing eandae veniam enim ipsa. Eos molestiae delectus adipisci.</p>
                    <button className='panelbtn' onClick={firstmodechange}>SIGN UP</button>
                </div>
                <img className='panelimg' src="./img/login.svg" alt='sry not available' />
            </div>
            <div className="panel rightpanel">
                <div className="panelcontent">
                    <p className='panelcontenthead'>Positive vibes ?</p>
                    <p className='panelcontentpara'>Lorem, ipsum dolor sit amet consectetur adipisicing eandae veniam enim ipsa. Eos molestiae delectus adipisci.</p>
                    <button className='panelbtn' onClick={secondmodechange}>SIGN IN</button>
                </div>
                <img className='panelimg' src="./img/signup2.svg" alt='sry not available' />
            </div>
        </div>

    </div>
  )
}
