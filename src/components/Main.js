import React from 'react'
import RenTable from '../MyPractice/RenTable';
import HeaderLinks from '../components/HeaderLinks';
import { useParams } from 'react-router-dom';

export default function Main(props) {
    const {id} = useParams();
    console.log(id);
  return (
    <div><HeaderLinks /> <RenTable ID={id} /></div>
  )
}
