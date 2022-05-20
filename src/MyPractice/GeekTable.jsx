import React from 'react'
import JsonData from './2022-data.json'
function JsonDataDisplay(){
	const DisplayData=JsonData.map(
		(info)=>{
			const bookList= info.sources.map((book, index)=>
				<td><a href={book}>{index + 1}</a></td>
	   		)

			return(
				<tr>
					<td>{info.state}</td>
					<td>{info.killed}</td>
					<td>{info.city}</td>
					{bookList}
				</tr>
			)
		}
	)

	return(
		<div>
			<table class="table table-striped">
				<thead>
					<tr>
					<th>State</th>
					<th>Wounded</th>
					<th>City</th>
					<th>Sources</th>
					</tr>
				</thead>
				<tbody>
				
					
					{DisplayData}
					
				</tbody>
			</table>
			
		</div>
	)
}

export default JsonDataDisplay;

