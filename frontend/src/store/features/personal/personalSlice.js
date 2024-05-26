import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	name: 'Your Name',
	lastname: 'Your Lastname',
	jobtitle: 'Your Job Title',
	adress: 'Adress',
	phone: 'Phone Number',
	email: 'Email Address',
	bio: 'Bio',
};

const personalSlice = createSlice({
	name: 'cvInput',
	initialState,
	reducers: {
		setName: (state, action) => {
			state.name = action.payload;
		},
		setLastname: (state, action) => {
			state.lastname = action.payload;
		},
		setJobtitle: (state, action) => {
			state.jobtitle = action.payload;
		},
		setAdress: (state, action) => {
			state.adress = action.payload;
		},
		setPhone: (state, action) => {
			state.phone = action.payload;
		},
		setEmail: (state, action) => {
			state.email = action.payload;
		},
		setBio: (state, action) => {
			state.bio = action.payload;
		},
	},
});

export const {
	setName,
	setLastname,
	setJobtitle,
	setAdress,
	setPhone,
	setEmail,
	setBio,
} = personalSlice.actions;

export default personalSlice.reducer;
