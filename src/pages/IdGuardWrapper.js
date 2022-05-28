import React from 'react'
import { useParams } from 'react-router-dom';
import Main from '../components/Main';

import {YearListData } from "../components/YearListData";
import NoMatch from './NoMatch';
// import Support from './Support';


  
export const IdGuardWrapper = () => {
  const { id } = useParams();
  const a = YearListData();
//   hasNumber(id) ? console.log("has number", typeof(id)) : console.log("no number", typeof(id));
  const idNum = parseInt(id);

//   return <Support></Support>
  return a.some(val => val === idNum) ? <Main /> : <NoMatch />;
  
    // : <Navigate  to={`/table/${id}`} replace />;
};

