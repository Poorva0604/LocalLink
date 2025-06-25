import React, { useEffect, useState } from "react";
import "./Header.css"
import { Link } from 'react-router-dom';
export default function Header(){
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    useEffect(() => {
        const updateLoginStatus = () => {
            const loggedin = localStorage.getItem("IsLoggedIn") === "true";
            setIsLoggedIn(loggedin);
        };

        updateLoginStatus(); // Run once on mount

        // 🔔 Listen for login status change events
        window.addEventListener("loginStatusChanged", updateLoginStatus);

        return () => {
            window.removeEventListener("loginStatusChanged", updateLoginStatus);
        };
    }, []);
    return(
        <div className="head">
            <div className="top"><img src="/weblogo.png" alt="Logo"></img>
            <h2 className="webname">LocalLink</h2></div>
            <ul className="navbar">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/loginpage">Add Your Service</Link></li>
                {isLoggedIn && 
                <Link to="/profile"><img className="profilebtn" src="/profile-icon.png" alt="profile"></img></Link> }
            </ul>
        </div>
    );
}