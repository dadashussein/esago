import { createAsyncThunk } from "@reduxjs/toolkit";

export const postEducation = createAsyncThunk(
	'education/addEducation',
	async ({ education }, thunkAPI) => {
		try {
			const cvId = localStorage.getItem('cvId');
			const token = localStorage.getItem('accessToken');
			const response = await fetch(`http://127.0.0.1:8000/educations/${cvId}`, {
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
		catch (err) {
			return thunkAPI.rejectWithValue(err.response.data.detail);
		}
	}
);


//okey
export const fetchEducation = createAsyncThunk(
	'education/fetchEducation',
	async (thunkAPI) => {
		try {
			const token = localStorage.getItem('accessToken');
			const cvId = localStorage.getItem('cvId');
			const response = await fetch(`http://127.0.0.1:8000/educations/${cvId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			return data;
		}
		catch (err) {
			return thunkAPI.rejectWithValue(err.response.data.detail);
		}
	}
);

export const deleteEducation = createAsyncThunk(
	'education/deleteEducation',
	async ({ token, id }) => {
		const cvId = localStorage.getItem('cvId');
		const response = await fetch(`http://127.0.0.1:8000/educations/${cvId}/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();
		return id;
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