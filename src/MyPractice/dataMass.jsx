import axios from "axios";
import {useState, useEffect, useCallback}   from "react";
import StateUSA_ACR from './states_hash.json'
import moment from "moment";

function Mass() {
    const [mass, setMass] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    const [stateusa, setStateusa] = useState([]);

    const googleurl = "https://www.google.com/maps/place/";

    // Cleveland,+OH,+USA/
    const handleMass = useCallback((mass) => {
        // https://mass-shooting-tracker-data.s3.us-east-2.amazonaws.com/2022-data.json
        axios.get("https://mass-shooting-tracker-data.s3.us-east-2.amazonaws.com/2022-data.json")
        .then(response => {
            setMass(response.data);
            setStateusa(StateUSA_ACR);
            setLoading(false);
        }).catch(err => {
            console.log(err);
            // setError(error);
        });
    },[]);

    useEffect(() => {
        handleMass();
    },[handleMass]);

   
    let wounded = 0, killed = 0;
    const loopData = mass.map((data, index, massarray) => {
        let datenow = moment(data.date).format('MM/DD/YYYY');
        let arrlength  = massarray.length;
        const mapurldata = googleurl + data.city + ",+" + data.state + ",+USA";
        const sources = data.sources.map((source, index) => {
            return (<span key={'a'+index + 1}>
                <span>  <a href={source} id={index + 1} >{index + 1}</a></span>
            </span>)
        });


        
        // Concatenate Shooters Names
        var ShooterNames=data.names.reduce(function (accumulator,currentValue) {  
            return accumulator+currentValue;  
        }); 


        killed = killed + parseInt(data.killed, 10);
        wounded = wounded + parseInt(data.wounded, 10);
    
        return (
            <tr key={index+1}>
                <td><b>{arrlength-index}</b></td>
                <td>{datenow}</td>
                <td>{data.city}, {stateusa[data.state]}</td>
                <td>{ShooterNames}</td>
                <td>{data.killed}</td>
                <td>{data.wounded}</td>
                <td>{sources}</td>
                <td><a href={mapurldata} target="_blank" rel="noreferrer">{stateusa[data.state]} - {data.city}</a></td>        
            </tr>
        )
    })

    return ( 
        <div className="container">
        <div><h2>Total Killed: {killed}, and wounded: {wounded}</h2></div>
        {loading && <div>Loading data please wait..</div>}
        <div> 
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Shooters</th>
                        <th>Killed</th>
                        <th>Wounded</th>
                        <th>Sources</th>
                        <th>Map</th>
                    </tr>
                </thead>
                <tbody>
                {loopData}
                </tbody>
            </table>
            </div>
        {/* <button onClick={handleMass}>Get Data</button> */}
    </div>
    )

}

export default Mass;