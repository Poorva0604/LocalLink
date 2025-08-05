import React,{ useEffect, useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
export default function Profile(){
    const navigate=useNavigate();
    const logoutlogic=()=>{
        localStorage.setItem("IsLoggedIn","false");
        window.dispatchEvent(new Event("loginStatusChanged"));
        navigate("/");
    }
    const addlogic=()=>{
        navigate("/addservice");
    }
    const[profile,setProfile]=useState({name:'',services:[]})
    useEffect(()=>{
    const fetchProfile=async()=>{
        const userId=localStorage.getItem("uId");
        if(!userId)return;
        try{
            const response=await fetch(`http://localhost:8080/api/auth/profile/${userId}`);
            if(response.ok){
                const data=await response.json();
                setProfile({name:data.name,services:data.services});
            }
        }catch(error){
            console.error("Error fetching profile",error);
        }
    };
    fetchProfile();
    },[]);

    const deleteService=async(serviceId)=>{
        try{
            const response=await fetch(`http://localhost:8080/api/services/service/${serviceId}`,{
                method: 'DELETE',
            })
            if(response.ok){
                alert("Service deleted successfully");
                setProfile(prev => ({
                    ...prev,
                    services: prev.services.filter(service => service.id !== serviceId)
                }));
            }
            else{
                alert("Something went wrong. Failed to delete service");
                console.error("Failed to delete service");
            }
        }catch(error){
            alert("Error deleting service: ",error);
            console.error("Error deleting service: ",error);
        }
    }

    return(
        <>
            <div className="wholepage">
                <h2>Name: {profile.name}</h2>
                <h2>Your services:</h2>
                <div className="services">
                    {profile.services.length===0?(
                        <p className="Noservice-class">You have not added services</p>
                    ):(profile.services.map(service=>(
                        <div className="service-module">
                            <div className="each-service">
                            <h3>{service.serviceName}</h3>
                            <p><strong>Description:</strong>{service.description}</p>
                            <p><strong>Location:</strong>{service.location}</p>
                            <p><strong>Service Provider:</strong>{service.serviceprovider}</p>
                            <p><strong>Contact:</strong>{service.contact}</p>
                            <button onClick={() => deleteService(service.id)} className="delete-btn">Delete</button>
                            </div>
                        </div>
                    ))
                    )}
                </div>
                <div className="buttons">
                    <button onClick={addlogic} className="addbutton">Add Service</button>
                    <button onClick={logoutlogic} className="logoutbtn">Log Out</button>
                </div>
            </div>
        </>
    );
}