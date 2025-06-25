import React,{useState, useEffect } from "react";
import './Home.css';
import { useNavigate } from "react-router-dom";
export default function Home(){
    const [service,setService]=useState('');
    const [location, setLocation]=useState('');
    const [serviceOptions, setServiceOptions] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);
    const [msg, setMsg]=useState('');
    const navigate = useNavigate();

    useEffect(() => {
    // Fetch available service names
    fetch("http://localhost:8080/api/services/getservicenames")
      .then(res => res.json())
      .then(data => setServiceOptions(data));

    // Fetch available locations
    fetch("http://localhost:8080/api/services/getlocations")
      .then(res => res.json())
      .then(data => setLocationOptions(data));
  }, []);

    const searchresult=async(e)=>{
        e.preventDefault();
        try{
            const response=await fetch(`http://localhost:8080/api/services/search?serviceName=${service}&location=${location}`);
            if(response.ok){
                const data=await response.json();
                if(data.length>0){
                    //setMsg("Service found");
                    navigate("/searchresults", { state: { results: data } });
                }
                else{
                    setMsg("No matching service found");
                }
            }
            else{
                alert("Failed to fetch search results. Please Try again.");
            }
    }catch(error){
        alert("Error during search.");
        console.error("Error during search.")
    }
};
    return(
        <>
            <div className="homepage">
                <h2>Welcome!</h2>
                <h3>Search below for service you are looking for...</h3>
                <div className="serach-box">
                <form onSubmit={searchresult}>
                {/* <input type="text" value={service} onChange={(e) => setService(e.target.value)} placeholder="Enter service (Eg. Tuition, Laundry etc)" required/>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location (Eg. Tilakwadi, Belagavi)" required/> */}
                <select value={service} onChange={(e) => setService(e.target.value)} required>
            <option value="">Select a service</option>
            {serviceOptions.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>

          <select value={location} onChange={(e) => setLocation(e.target.value)} required>
            <option value="">Select a location</option>
            {locationOptions.map((l, i) => (
              <option key={i} value={l}>{l}</option>
            ))}
          </select>
                
                <button type="submit" className="search-btn">Search</button>
                {msg && <p className="text-green-500 mb-2">{msg}</p>}
                </form>
                </div>
            </div>
        </>
    );
}