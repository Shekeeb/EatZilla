import React, { useContext, useState } from 'react'
import './Login.css'
import { TiDelete } from "react-icons/ti"
import { StoreContext } from '../../Context/StoreContext'
import axios from "axios"

const Login = ({ setShowLogin }) => {

  const { url,setToken } = useContext(StoreContext);

  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currentState === "Login") {
      newUrl = newUrl + "/api/user/login"
    }
    else {
      newUrl = newUrl + "/api/user/register"
    }

    const resonse=await axios.post(newUrl,data);

    if (resonse.data.success) {
      setToken(resonse.data.token);
      localStorage.setItem("token",resonse.data.token);
      setShowLogin(false);
    }
    else{
      alert(response.data.message);
    }
  }

  return (
    <div className='login'>
      <form onSubmit={onLogin} className="login-container">

        <div className="login-title">
          <h2>{currentState}</h2>
          <TiDelete onClick={() => setShowLogin(false)} className='cross-icon' />
        </div>

        <div className="login-input">
          {currentState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Enter Your Name' required />}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Enter Your E-mail ID' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Enter Your Password" required />
        </div>

        <button type='submit'>{currentState === "Sign Up" ? "Create Account" : "Login"}</button>

        <div className="login-condition">
          <input type="checkbox" required />
          <p>By continuing, I Agree to the terms of use & privacy policy</p>
        </div>

        {
          currentState === "Login" ? <p>Don't have an Account? <span onClick={() => setCurrentState("Sign Up")}>Register Here</span></p>
            : <p>Already have an Account? <span onClick={() => setCurrentState("Login")}>Login Here</span></p>
        }

      </form>
    </div>
  )
}

export default Login