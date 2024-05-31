import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	personal: {
		name: '',
		lastname: '',
		jobtitle: '',
		address: '',
		phone: '',
		email: '',
		bio: '',
	},
};

const personalSlice = createSlice({
	name: 'personal',
	initialState,
	reducers: {
		setPersonalField: (state, action) => {
			const { field, value } = action.payload;
			state.personal[field] = value;
		}
	},
});

export const {
	setPersonalField,
} = personalSlice.actions;

export default personalSlice.reducer;
