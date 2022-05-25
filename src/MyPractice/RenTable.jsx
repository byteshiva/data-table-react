import React, { useCallback } from "react";
import { useTable } from 'react-table';
import {useState, useEffect}   from "react";
// import Data from './2022-data.json'
import axios from "axios";
import StateUSA_ACR from './states_hash.json'
import moment from "moment";

function RenTab() {
  const [mass, setMass] = useState([]);
  const [sumkilled, setSumKilled] = useState(0);
  const [sumwounded, setSumWounded] = useState(0);

  const ShooterNames = (data) => data.reduce(function (accumulator,currentValue) {  
    return accumulator+currentValue;  
  }); 

  function extractColumn(arr, column) {
    function reduction(previousValue, currentValue) {
      previousValue.push(currentValue[column]);
      return previousValue;
    }
 
    return arr.reduce(reduction, []);
  }

  const convertToInt = (arr) => arr.map((x) => parseInt(x, 10));
  const sumOfAllNum = (arr) => arr.reduce((sum, value) => sum + value, 0);

  const fetchData = useCallback(async () => {
    // const url = "https://raw.githubusercontent.com/byteshiva/data-table-react/main/src/MyPractice/2022-data.json";
    const url = "https://mass-shooting-tracker-data.s3.us-east-2.amazonaws.com/2022-data.json";
    const result = await axios.get(url);
    console.log("result.data",result.data);

    // add new element to array of objects
    (result.data).forEach(element => element.sum = (result.data).length);

    const killedArr = extractColumn(result.data, 'killed');
    const woundedArr = extractColumn(result.data, 'wounded');
    
    var killedIntArr = convertToInt(killedArr);
    var woundedIntArr = convertToInt(woundedArr);

    let killedSum = sumOfAllNum(killedIntArr);
    let woundedSum = sumOfAllNum(woundedIntArr);

    setSumKilled(killedSum);
    setSumWounded(woundedSum);
    setMass(result.data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
 
      const data = React.useMemo(
        () => mass,
          [mass] 
      );

      const columns = React.useMemo(
            () => [
                    { 
                        Header: '#',
                        accessor: (row, index) => {return (row.sum - index)},
                    },
                    {
                        Header: 'Date',
                        accessor: row =>  moment(row.date).format('MM/DD/YYYY')
                    },
                    {
                        Header: 'Location',
                        accessor: row => row.city + ", " + StateUSA_ACR[row.state]
                    },
                    { 
                      'Header': 'Shooter Names',
                      'accessor': row => ShooterNames(row.names)
                    },
                    {
                        Header: 'Sources',
                        accessor: row => row.sources.map((source, index) => {
                            return (<span key={'a'+index + 1}>
                                <span>  <a href={source} target="_blank" rel="noreferrer" id={index + 1} >{index + 1}</a></span>
                            </span>)
                        })
                    },
                    {
                        Header: 'Killed',
                        accessor: 'killed'
                    },
                    {
                      Header: 'Wounded',
                      accessor: row => row.wounded
                    },
                    {
                      Header: 'Map',
                      accessor: row => {
                        const googleurl = "https://www.google.com/maps/place/";
                        const mapurldata = googleurl + row.city + ",+" + row.state + ",+USA";
                        return (<a href={mapurldata} target="_blank" rel="noreferrer">{StateUSA_ACR[row.state]} - {row.city}</a>)
                      }
                    }
                ],
                []
        );

        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
          } = useTable({ columns, data });
        
          return (
            <div>
            <div><h2>Total Killed: {sumkilled} and wounded: {sumwounded}</h2></div>

            <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th
                        {...column.getHeaderProps()}
                        style={{
                          borderBottom: 'solid 3px red',
                          background: 'aliceblue',
                          color: 'black',
                          fontWeight: 'bold',
                        }}
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            style={{
                              padding: '10px',
                              border: 'solid 1px gray',
                              background: 'papayawhip',
                            }}
                          >
                            {cell.render('Cell')}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
            </div>
          )
    }


export default RenTab;

