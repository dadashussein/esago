import { createAsyncThunk } from "@reduxjs/toolkit";

export const postEducation = createAsyncThunk(
	'education/addEducation',
	async ({ token, education }) => {
		console.log(education);
		const response = await fetch("http://127.0.0.1:8000/educations", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(education),
		});
		const data = await response.json();
		return data;
	}
);

export const fetchEducation = createAsyncThunk(
	'education/fetchEducation',
	async (token) => {
		const response = await fetch("http://127.0.0.1:8000/educations", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();
		return data;
	}
);

export const deleteEducation = createAsyncThunk(
	'education/deleteEducation',
	async ({ token, id }) => {
		const response = await fetch(`http://127.0.0.1:8000/educations/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();
		return id; // return the ID to filter the state
	}
);

export const updateEducation = createAsyncThunk(
	'education/updateEducation',
	async ({ token, id, education }) => {
		const response = await fetch(`http://127.0.0.1:8000/educations/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(education),
		});
		const data = await response.json();
		return data;
	}
);