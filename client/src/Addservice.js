import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./Addservice.css";
export default function Addservice(){
  const[serviceprovider,setServiceprovider]=useState('');
  const[serviceName,setServiceName]=useState('');
  const[description,setDescription]=useState('');
  const[location,setLocation]=useState('');
  const [contact, setContact] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem("uId"));
  // const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  console.log(userId);

   const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!/^\d{10}$/.test(contact)) {
      setSuccessMsg('contact should be 10 digit');
      return;
    }
    else{
    try {
      const response=await fetch("http://localhost:8080/api/services/add",{
        method: "POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({
          serviceprovider:serviceprovider,
          serviceName:serviceName,
          description:description,
          location:location,
          contact:contact,
          userId
        })
      });
      if(response.ok){
        setSuccessMsg("Sevice Added");
      }
      else{
        setSuccessMsg("Failed to add service");
      }
    } catch (error) {
      console.log("error: ",error);
      setSuccessMsg("Something went wrong");
    }
  }
  };
    return(
        <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="addserviceform">
            <div className="back-to-page"><Link to="/profile"><img src="/back-img.png" alt="Logo"></img></Link></div>
            <h2>Add Service</h2>
            <div className="form-grid">
            <input type="text" name="serviceprovider" placeholder="Service Provider or Company Name" value={serviceprovider} onChange={(e) => setServiceprovider(e.target.value)} required />
            <input type="text" name="serviceName" placeholder="Service Name" value={serviceName} onChange={(e) => setServiceName(e.target.value)} required />
            <input type="text" name="contact" placeholder="Contact Number(10 digits)" value={contact} onChange={(e) => setContact(e.target.value)} required />
            <input type="text" name="location" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </div>
            <textarea className="desc" name="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} required />
            
            {successMsg && <p className="text-green-500 mb-2">{successMsg}</p>}

            <button type="submit">Submit</button>
        
        </form>
        </div>
    );
}

