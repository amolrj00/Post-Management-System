import React, { useState, useContext }from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';


function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {setAuthState} = useContext(AuthContext);

    let history = useHistory();

    const login = () => {
        const data = { username: username, password: password}
        axios.post("http://localhost:6060/auth/login", data).then((response) => {
            if(response.data.error) {
              alert(response.data.error);
            }
            else{
              sessionStorage.setItem("accessToken", response.data.token);
              setAuthState({
                username: response.data.username,
                id:response.data.id,
                status:true });
              history.push("/");
            }
        });
    };
  return (
    <div className='loginContainer'>
      <input type="text" className='loginUser' onChange={(event) => {setUsername(event.target.value)}}/>
      <input type="password" className='loginPassword' onChange={(event) => {setPassword(event.target.value)}} />

      <button onClick={login}> Login </button>

    </div>
  )
}

export default Login
