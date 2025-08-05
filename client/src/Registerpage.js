import React,{ useState } from "react";
import { Link } from "react-router-dom";
import "./Loginpage.css"
export default function Registerpage(){
    const[name,setName]=useState('');
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[headline,setHeadline]=useState('Register Here');
  const validateName = (name) => /^[A-Za-z\s]+$/.test(name);
  const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const msg=async(e)=>{
    e.preventDefault();
    if (!validateName(name)) {
      alert("Name should contain only letters.");
      return;
    }
    if(!validateEmail(email)){
      alert("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
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
      <>
        <div className="loginform">
            <form className="mainform">
              <div className="back-to-page"><Link to="/loginpage"><img src="/back-img.png" alt="Logo"></img></Link></div>
            <h3>{headline === "Register Here" ? (
  <h3 className="simple-register">{headline}</h3>
):headline === "You Have Registered Successfully" ? (
  <h3 className="success-message">{headline}</h3>
) : headline === "Something went wrong. Please try again." ? (
  <h3 className="invalid-message">{headline}</h3>
): headline === "User Already Exists" ? (
  <h3 className="success-message">{headline}</h3>
):(
  <h3>{headline}</h3>)}</h3>
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
        </>
    );
}