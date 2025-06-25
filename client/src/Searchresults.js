import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './Searchresults.css';
export default function Searchresults(){
    const { state } = useLocation();
    const navigate=useNavigate();
    const results=state?.results || []
    return(
        <div className="result-page">
            <h2>Search Results</h2>
            <div className="result-grid">
                {results.map((service,index)=>(
                    <div key={index} className="service-card">
                        <h3>{service.serviceName}</h3>
                        <p><strong>Description:</strong> {service.description}</p>
                        <p><strong>Location:</strong> {service.location}</p>
                        <p><strong>Service Provider:</strong> {service.serviceprovider}</p>
                        <p><strong>Contact:</strong> {service.contact}</p>
                    </div>
                ))}
            </div>
            <button onClick={() => navigate("/")}>Back to Search</button>
        </div>
    )
}