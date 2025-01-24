import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Form = () => {
	const [grouping, setGrouping] = useState('none');
	const [layout, setLayout] = useState('list');
	const [termStart, setTermStart] = useState('');
	const [termEnd, setTermEnd] = useState('');
	const [building, setBuilding] = useState([]);
	const [room, setRoom] = useState('');
	const [requestor, setRequestor] = useState([]);
	const [titleSubstring, setTitleSubstring] = useState('');
	const [diagnoses, setDiagnoses] = useState([]);
	const [matchAllDiagnoses, setMatchAllDiagnoses] = useState(false);

	const { register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label htmlFor="layout">Layout</label>
				<select id="layout" name="layout" onChange={(e) => setLayout(e.target.value)}>
					<option value="list">List</option>
					<option value="chart">Chart</option>
				</select>
			</div>
			<div className="form-group">
				<label htmlFor="grouping">Grouping</label>
				<select id="grouping" name="grouping" onChange={(e) => setGrouping(e.target.value)}>
					<option value="week">Week</option>
					<option value="requestor">Requestor</option>
					<option value="building">Building</option>
					<option value="room">Room</option>
					<option value="diagnoses">Diagnoses</option>
					<option value="none">None</option>
				</select>
			</div>
			<div className="form-group">
				<label htmlFor="termStart">Term Start</label>
				<input id="termStart" name="termStart" type="date" value={termStart} onChange={(e) => setTermStart(e.target.value)} />
			</div>
			<div className="form-group">
				<label htmlFor="termEnd">Term End</label>
				<input id="termEnd" name="termEnd" type="date" value={termEnd} onChange={(e) => setTermEnd(e.target.value)} />
			</div>
			<div className="form-group">
				<label htmlFor="building">Building</label>
				<input id="building" name="building" type="text" value={building} onChange={(e) => setBuilding(e.target.value)} />
			</div>
			<div className="form-group">
				<label htmlFor="room">Room</label>
				<input id="room" name="room" type="text" value={room} onChange={(e) => setRoom(e.target.value)} />
			</div>
			<div className="form-group">
				<label htmlFor="requestor">Requestor</label>
				<input id="requestor" name="requestor" type="text" value={requestor} onChange={(e) => setRequestor(e.target.value)} />
			</div>
			<div className="form-group">
				<label htmlFor="titleSubstring">Title Substring</label>
				<input id="titleSubstring" name="titleSubstring" type="text" value={titleSubstring} onChange={(e) => setTitleSubstring(e.target.value)} />
			</div>
			<div className="form-group">
				<label htmlFor="diagnoses">Diagnoses</label>
				<input id="diagnoses" name="diagnoses" type="text" value={diagnoses} onChange={(e) => setDiagnoses(e.target.value)} />
			</div>
			<div className="form-group">
				<label htmlFor="matchAllDiagnoses">Match All Diagnoses</label>
				<input id="matchAllDiagnoses" name="matchAllDiagnoses" type="checkbox" checked={matchAllDiagnoses} onChange={(e) => setMatchAllDiagnoses(e.target.checked)} />
			</div>
			<button type="submit">Submit</button>
		</form>
	);
};



export default Form;