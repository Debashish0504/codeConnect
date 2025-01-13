import axios from 'axios'
import React, { useState } from 'react'

const Login = () => {

    const [emailId , setEmailId] = useState("")
    const [password , setPassword] =useState("")

    const handleLogin = async () => {
      try {
          const res = await axios.post('http://localhost:8000/login' , {
            emailId,
            password
          },
          {withCredentials : true}
          )

      } catch (error) {
        console.error(error)
      }
    }
    
  return (
    <div className= "flex justify-center my-10">
    <div className="card bg-base-200 w-96 shadow-xl">
    <div className="card-body">
      <h2 className="card-title justify-center">Login</h2>
      <label className= "form-control w-full max-w-xs my-2">
            <div className= "label">
                <span className= "label-text">Email Id {emailId}</span>
            </div>
            <input type='text' 
            value={emailId}
            className= "input input-bordered w-full max-w-xs"
            onChange={(e)=> setEmailId(e.target.value)}/>
      </label>
      <label className= "form-control w-full max-w-xs my-2">
        <div className= "label">
            <span className= "label-text">Password</span>
        </div>
            <input type='text' 
            value={password}
            className='input input-bordered w-full max-w-x'
            onChange={(e)=> setPassword(e.target.value)}/>
      </label>
      <div className="card-actions justify-end">
        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
      </div>
    </div>
  </div>
  </div>
  )
}

export default Login