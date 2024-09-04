import { useState } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Signup(){
    const [firstname,SetFirstName]=useState()
    const [lastname,SetLastName]=useState()
    const [email,SetEmail]=useState()
    const [password,SetPassword]=useState()
    const navigate=useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/register',{firstname,lastname,email,password})
        .then(result=>{console.log(result)
            navigate('/signsuccess')
        })
        .catch(err=>console.log(err))
    }
    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>First Name</strong>
                        </label>
                        <input type="text" placeholder="Enter Name" autoComplete="off" name="email" className="form-control rounded-0" onChange={(e) => SetFirstName(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Last Name</strong>
                        </label>
                        <input type="text" placeholder="Enter Name" autoComplete="off" name="email" className="form-control rounded-0" onChange={(e) => SetLastName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input type="email" placeholder="Enter Email" autoComplete="off" name="email" className="form-control rounded-0" onChange={(e) => SetEmail(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input type="password" placeholder="Enter Password" name="password" className="form-control rounded-0" onChange={(e) => SetPassword(e.target.value)} required/>
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
                </form>
                    <p>Already Have an Account</p>
                    <Link to="/Login" type="submit" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Login</Link>                
            </div>
        </div>
    );
}

export default Signup;