import React,{ useState } from "react";
import { Link } from 'react-router-dom';
import "./Loginpage.css"
export default function Loginpage(){
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('Login');
  const loginstatus=localStorage.getItem("IsLoggedIn")==="true";
    const displaymsg=async(e)=>{
        e.preventDefault();
        if(loginstatus){
            setMsg("You are already logged in");
        }
        else{
            try{
            const response=await fetch("http://localhost:8080/api/auth/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email:email,
                    password:password
                })
            });
            if(response.ok){
                const data = await response.text();
                localStorage.setItem("uId", data);
                console.log("user Id in login page: ",localStorage.getItem("uId"));
                setMsg("You have logged in successfully");
                localStorage.setItem("IsLoggedIn","true");
                window.dispatchEvent(new Event("loginStatusChanged"));
            }
            else{
                setMsg("Invalid Login Credentials. Try Again");
            }
        }catch (error) {
        console.error("Login error:", error);
        setMsg("Something went wrong. Please try again.");
    }
        }
        
    }
    return(
        
        <div className="loginform">
            <form className="mainform">
                {!loginstatus && (<div className="back-to-page"><Link to="/"><img src="/back-img.png" alt="Logo"></img></Link></div>)} 
                {loginstatus && (<div className="profile-link"><Link to="/profile">Go to Profile</Link></div>)}
            {msg === "You have logged in successfully" ? (
  <h2 className="success-message">{msg}</h2>
) : msg === "Invalid Login Credentials. Try Again" ? (
  <h2 className="invalid-message">{msg}</h2>
): msg === "You are already logged in" ? (
  <h2 className="success-message">{msg}</h2>
):(
  <h2 className="simple-login">{msg}</h2>)}
                <label>Email</label><br></br>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                /><br></br>
                <br></br>
                <label>Password</label><br></br>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <br></br>
                <br></br>
                <button onClick={displaymsg}>Login</button><br></br><br></br>

                <div className="links">
                <Link to="/forgotpswdpage">Forgot Password?</Link><br></br>
                <p>Don't have an account? <Link to="/registerpage">Register here</Link></p>
                </div>
                
            </form>
        </div>
        
    );
}