import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchWithAuth from "~/utils/api";

export const postEducation = createAsyncThunk(
	'education/addEducation',
	async ({ cvId, education }, thunkAPI) => {
		try {
			const data = await fetchWithAuth(`/educations/${cvId}`, {
				method: 'POST',
				body: JSON.stringify(education),
			});
			return data;
		}
		catch (err) {
			return thunkAPI.rejectWithValue(err.response.data.detail);
		}
	}
);

export const fetchEducation = createAsyncThunk(
	'education/fetchEducation',
	async ({ cvId }, thunkAPI) => {
		try {
			const data = await fetchWithAuth(`/educations/${cvId}`);
			return data;
		}
		catch (err) {
			return thunkAPI.rejectWithValue(err.response.data.detail);
		}
	}
);

export const deleteEducation = createAsyncThunk(
	'education/deleteEducation',
	async ({ cvId, id }) => {
		await fetchWithAuth(`/educations/${cvId}/${id}`, { method: 'DELETE' });
		return id;
	}
);

export const updateEducation = createAsyncThunk(
	'education/updateEducation',
	async ({ id, education }) => {
		const data = await fetchWithAuth(`/educations/${id}`, {
			method: 'PUT',
			body: JSON.stringify(education),
		});
		return data;
	}
);