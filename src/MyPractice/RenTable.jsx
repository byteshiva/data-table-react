import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useTable, usePagination } from 'react-table';
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import StateUSA_ACR from './states_hash.json';

const RenTab = (props) => {
  const { id } = useParams();
  // const effectRan = useRef(false);
  const MassURL = props.URL || `https://mass-shooting-tracker-data.s3.us-east-2.amazonaws.com/${id}-data.json`;

  const [mass, setMass] = useState([]);
  const [sumkilled, setSumKilled] = useState(0);
  const [sumwounded, setSumWounded] = useState(0);
  const [loading, setLoading] = useState(true);

  const ShooterNames = (data) => data.map(shooter => shooter).join(', ');

  const extractColumn = (arr, column) => arr.map(row => row[column]);

  const findAllElements = (row) => (row.state.length > 2) ? row.state : StateUSA_ACR[row.state];

  const removeTextFromLink = (link) => link.replace(/\(([^)]+)\)/g, '');

  const removeMapsFromLink = (link) => link.replace(/(\([^)]+\))/g, '');

  const convertToInt = (arr) => arr.map(x => parseInt(x, 10));

  const sumOfAllNum = (arr) => arr.reduce((sum, value) => sum + value, 0);

  const fetchData = useCallback(async () => {
    console.log('Fetching data...');
    setLoading(true);
    const result = await axios.get(MassURL);
    console.log("result.data", result.data);

    // add new element to array of objects
    result.data.forEach(element => element.sum = result.data.length);

    const killedArr = extractColumn(result.data, 'killed');
    const woundedArr = extractColumn(result.data, 'wounded');

    let killedSum = sumOfAllNum(convertToInt(killedArr));
    let woundedSum = sumOfAllNum(convertToInt(woundedArr));

    setSumKilled(killedSum);
    setSumWounded(woundedSum);
    setMass(result.data);
    setLoading(false);
  }, [MassURL]);

  useEffect(() => {
    console.log("Started use Effect");
    fetchData();

    return () => {
      console.log('cleaned up');
    };
  }, [fetchData]);

  const data = useMemo(() => mass, [mass]);

  const columns = useMemo(() => [
    {
      Header: '#',
      accessor: (row, index) => row.sum - index,
    },
    {
      Header: 'Date',
      accessor: row => moment(row.date).format('MM/DD/YYYY')
    },
    {
      Header: 'Location',
      accessor: row => `${row.city}, ${findAllElements(row)}`
    },
    {
      'Header': 'Shooter Names',
      'accessor': row => <div style={{ textAlign: 'left' }}>{ShooterNames(row.names)}</div>,
    },
    {
      Header: 'Sources',
      accessor: row => row.sources.map((source, index) => (
        <span key={`a${index + 1}`}>
          <span> <a href={source} target="_blank" rel="noreferrer" id={index + 1}>{index + 1}</a></span>
        </span>
      ))
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
        const mapurldata = `${googleurl}${row.city},+${row.state},+USA`;
        return (
          <a href={removeMapsFromLink(mapurldata)} target="_blank" rel="noreferrer">
            {StateUSA_ACR[row.state]} - {removeTextFromLink(row.city)}
          </a>
        );
      }
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50px", marginTop: "15px" }}>
        <h2 style={{ margin: 0 }}>Community Safety Awareness - USA Mass Shooting Tracker</h2>
      </header>
      {loading && <div><h4>Loading data, Please wait...</h4></div>}

      {!loading && (
        <div>
          <div><h2>Year: {id} ->  Total Killed: {sumkilled} and Injured: {sumwounded}</h2></div>
          <table {...getTableProps()} style={{ border: 'solid 2px skyblue', marginLeft: 'auto', marginRight: 'auto' }}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps()}
                      style={{
                        borderBottom: 'solid 3px red',
                        background: '#FFB500',
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
              {page.map(row => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: '10px',
                          border: 'solid 1px gray',
                          background: '#FDDF95',
                        }}
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </button>{' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'<'}
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {'>'}
            </button>{' '}
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              {'>>'}
            </button>{' '}
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <span>
              | Go to page:{' '}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  gotoPage(page)
                }}
                style={{ width: '100px' }}
              />
            </span>{' '}
            <select
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>

        </div>
      )}
    </div>
  );
}

export default RenTab;
