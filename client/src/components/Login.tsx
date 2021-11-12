import { observer } from 'mobx-react-lite';
import React, {useState,useContext} from 'react';
import { Context } from '../App';

export default observer(function Login() {
   const [email,setEmail] = useState("");
   const [password,setPassword] = useState("");
const {login,registration} = useContext(Context);

    return (
        <div className="form">       
            <div>
                <input type='text' onChange={(e)=> setEmail(e.target.value)} value={email} placeholder="Email..." />
            </div>
            <div>
                <input type='password' onChange={(e)=> setPassword(e.target.value)} value={password} placeholder="Password..." />
            </div>
            <div>
                <button onClick={()=> login(email,password)}>Login</button>
            </div>
            <div>
                <button onClick={()=> registration(email,password)}>Register</button>
            </div>
        </div>
    
    )
})
