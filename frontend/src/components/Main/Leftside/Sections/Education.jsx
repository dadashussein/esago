import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSchool,
  setDegree,
  setEduLocation,
  setField,
  setEduStart,
  setEduEnd,
  setEduDesc,
} from '../../../../store/features/education/educationSlice';

const Education = () => {
  const dispatch = useDispatch();
  const { school, degree, eduLocation, field, eduStart, eduEnd, eduDesc } = useSelector((state) => state.education);


  return (
    <div className="border-gray-900/10 p-6">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Education</h2>
      <p className="text-sm leading-6 text-gray-600">
        Add your most relevant education, including programs you're currently enrolled in
      </p>

      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="school-name" className="block text-sm font-medium leading-6 text-gray-900">
            School Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              value={school}
              onChange={(e) => dispatch(setSchool(e.target.value))}
              name="school-name"
              id="school-name"
              autoComplete="given-name"
              className="block w-full rounded-md border p-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="school-location" className="block text-sm font-medium leading-6 text-gray-900">
            School Location
          </label>
          <div className="mt-2">
            <input
              type="text"
              value={eduLocation}
              onChange={(e) => dispatch(setEduLocation(e.target.value))}
              name="school-location"
              id="school-location"
              autoComplete="family-name"
              className="block w-full rounded-md border p-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="startDate" className="block text-sm font-medium leading-6 text-gray-900">
            Start Date
          </label>
          <div className="mt-2">
            <input
              type="month"
              value={eduStart}
              onChange={(e) => dispatch(setEduStart(e.target.value))}
              name="startDate"
              id="startDate"
              autoComplete="given-name"
              className="block w-full rounded-md border p-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="endDate" className="block text-sm font-medium leading-6 text-gray-900">
            End Date
          </label>
          <div className="mt-2">
            <input
              type="month"
              value={eduEnd}
              onChange={(e) => dispatch(setEduEnd(e.target.value))}
              name="endDate"
              id="endDate"
              autoComplete="family-name"
              className="block w-full rounded-md border p-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="degree" className="block text-sm font-medium leading-6 text-gray-900">
            Degree
          </label>
          <div className="mt-2">
            <input
              type="text"
              value={degree}
              onChange={(e) => dispatch(setDegree(e.target.value))}
              name="degree"
              id="degree"
              autoComplete="given-name"
              className="block w-full rounded-md border p-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="fieldStudy" className="block text-sm font-medium leading-6 text-gray-900">
            Field of Study
          </label>
          <div className="mt-2">
            <input
              type="text"
              value={field}
              onChange={(e) => dispatch(setField(e.target.value))}
              name="fieldStudy"
              id="fieldStudy"
              autoComplete="family-name"
              className="block w-full rounded-md border p-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="eduDesc" className="block text-sm font-medium leading-6 text-gray-900">
            Description
          </label>
          <div className="mt-2">
            <textarea
              id="eduDesc"
              name="eduDesc"
              placeholder="Coursework, thesis, etc."
              rows={3}
              value={eduDesc}
              onChange={(e) => dispatch(setEduDesc(e.target.value))}
              className="block w-full rounded-md border p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
