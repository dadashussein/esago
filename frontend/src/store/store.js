import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import educationReducer from './features/education/educationSlice';
import personalReducer from './features/personal/personalSlice';
import experienceReducer from './features/experience/experienceSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		education: educationReducer,
		personal: personalReducer,
		experience: experienceReducer
	}
});
