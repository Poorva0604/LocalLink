import React,{ useState } from "react";
import "./Loginpage.css"
export default function Registerpage(){
    const[name,setName]=useState('');
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[headline,setHeadline]=useState('Register');
  const msg=async(e)=>{
    e.preventDefault();
    try{
            const response=await fetch("http://localhost:8080/api/auth/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name:name,
                    email:email,
                    password:password
                })
            });
            if(response.ok){
                setHeadline("You have Registered successfully");
            }
            else{
                setHeadline("User Already Exists");
            }
        }catch (error) {
        console.error("Login error:", error);
        setHeadline("Something went wrong. Please try again.");
    }
  }
    return(
        <div className="loginform">
            <form className="mainform">
            <h2>{headline}</h2>
            <label>Name</label><br></br>
                <input
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                /><br></br><br></br>
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
                <button onClick={msg}>Register</button><br></br><br></br>
                
            </form>
        </div>
    );
}