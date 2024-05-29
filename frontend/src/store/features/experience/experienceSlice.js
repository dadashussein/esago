import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    experience: [
        {
            company: '',
            field: '',
            companyPlace: '',
            workStart: '',
            workEnd: '',
            workDesc: ''
        }
    ]
};

const experienceSlice = createSlice({
    name: 'experience',
    initialState,
    reducers: {
        addExperience: (state) => {
            state.experience.push({
                company: '',
                field: '',
                companyPlace: '',
                workStart: '',
                workEnd: '',
                workDesc: '',
                skills: []

            });

        },
        setExperienceField: (state, action) => {
            const { index, field, value } = action.payload;
            state.experience[index][field] = value;
        },
        removeExperience: (state, action) => {
            if (state.experience.length > 1) {
                state.experience.splice(action.payload, 1);
            }
        }
    }
});

export const { addExperience, setExperienceField, removeExperience } = experienceSlice.actions;

export default experienceSlice.reducer;
