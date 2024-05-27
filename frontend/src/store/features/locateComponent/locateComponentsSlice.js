import { createSlice } from "@reduxjs/toolkit";


const locateComponentsSlice = createSlice({
	name: '',
	initialState: {
		showLogin: false
	},
	reducers: {
		setLoginComponent: (state, action) => {
			state.showLogin = action.payload;
		}
	}
});


export const { setLoginComponent } = locateComponentsSlice.actions;