import React,{ useState } from "react";
import { Link } from "react-router-dom";
import "./Forgotpswdpage.css"
export default function Forgotpswdpage(){
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('Forgot Password');
    const sendmail=async(e)=>{
        e.preventDefault();
        try{
            const response=await fetch("http://localhost:8080/api/auth/forgot-password",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email:email.trim().toLowerCase()
                })
            });
            if(response.ok){
                setMsg("Password sent to registered email");
            }
            else{
                setMsg("Email not registered");
            }
        }catch(error) {
        console.error("Login error:", error);
        setMsg("Something went wrong. Please try again.");
    }
    }
    return(
        <div className="forgotpage">
            <form className="pswdrecoveryform">
                <div className="back-to-page"><Link to="/loginpage"><img src="/back-img.png" alt="Logo"></img></Link></div>
            <h2>{msg}</h2><br></br>
                <label>Enter Registered Email</label><br></br>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <br></br>
                <br></br>
                <button onClick={sendmail}>Submit</button><br></br><br></br>
            </form>
        </div>
    );
}