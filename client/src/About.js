import React from "react";
import { Link } from "react-router-dom";
import './About.css'
export default function About(){
    return(
        <div className="main-about-container">
        <div className="aboutpage">
            <div className="back-to-page"><Link to="/"><img src="/back-img.png" alt="Logo"></img></Link></div>
            <h2>About LocalLink</h2>
            <pre>LocalLink is your go-to platform for discovering local businesses.
We connect people with services they need, right in their neighborhood.
Businesses can showcase their work, build visibility, and grow locally.
Simple, reliable and community-driven — that's the LocalLink promise.</pre>
        </div>
        </div>
    );
}