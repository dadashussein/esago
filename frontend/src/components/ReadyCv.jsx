import { useEffect } from "react";
import "./a4.css";
import { MapInteractionCSS } from "react-map-interaction";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCv } from "~/store/features/resume/resumeSlice";
import Preview from "./Preview";
import Template7 from "./templates/Template7";
import Resume from "./templates/TestRes";
import Loading from "./Loading";

const ReadyCv = ({ cvId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCv({ cvId }));
  }, [dispatch, cvId]);

  const allCv = useSelector((state) => state.resumes.allCv);
  const loading = useSelector((state) => state.resumes.loading);
  const error = useSelector((state) => state.resumes.error);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!allCv) {
    return <div>No data available</div>;
  }

  const {
    first_name,
    last_name,
    address,
    bio,
    education,
    email,
    experience,
    job_title,
    phone_number,
    skill,
  } = allCv;

  return (
    <div className="page">
      <div className="subpage">
        <Template7
          loading={loading}
          personal={{
            first_name,
            last_name,
            address,
            bio,
            email,
            job_title,
            phone_number,
          }}
          education={education}
          experience={experience}
          skill={skill}
        />
      </div>
    </div>
  );
};

export default ReadyCv;
