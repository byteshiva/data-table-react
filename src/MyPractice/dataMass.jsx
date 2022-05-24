import axios from "axios";
import {useState, useEffect}   from "react";
import StateUSA_ACR from './states_hash.json'
import moment from "moment";



function Mass() {
    const [mass, setMass] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [stateusa, setStateusa] = useState([]);

    const googleurl = "https://www.google.com/maps/place/";

    // Cleveland,+OH,+USA/
    

    const handleMass = (mass) => {
        axios.get("https://mass-shooting-tracker-data.s3.us-east-2.amazonaws.com/2022-data.json")
        .then(response => {
            setMass(response.data);
            setStateusa(StateUSA_ACR);
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setError(error);
        });

    }

    useEffect(() => {
        handleMass();
    });
   
    const loopData = mass.map((data, index) => {
        let datenow = moment(data.date).format('MM/DD/YYYY');
        const mapurldata = googleurl + data.city + ",+" + data.state + ",+USA";
        const sources = data.sources.map((source, index) => {
            return (<span key={'a'+index + 1}>
                <span>  <a href={source} id={index + 1} >{index + 1}</a></span>
            </span>)
        });

        return (
            <tr key={index+1}>
                <td>{datenow}</td>
                <td>{stateusa[data.state]}</td>
                <td>{data.city}</td>
                <td>{data.killed}</td>
                <td>{sources}</td>
                <td><a href={mapurldata} target="_blank" rel="noreferrer">{stateusa[data.state]} - {data.city}</a></td>        
            </tr>
        )
    })

    return ( 
        <div className="container">
        {loading && <div>Loading data please wait..</div>}
        <div> 
            <table table table-striped >
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>State</th>
                        <th>City</th>
                        <th>Killed</th>
                        <th>Sources</th>
                        <th>Map</th>
                    </tr>
                </thead>
                <tbody>
                {loopData}
                </tbody>
            </table>
            </div>
        <button onClick={handleMass}>Get Data</button>
    </div>
    )

}

export default Mass;