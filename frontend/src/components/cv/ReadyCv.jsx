import { fetchAllCv } from "@/store/features/resume/resumeSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "@/utils/api";
import Template3 from "./templates/Template3";
import Template7 from "./templates/Template7";
import Resume from "./templates/TestRes";
import AveryTemp from "./templates/AveryTemp";
import BarLoading from "../common/BarLoading";

const ReadyCv = ({ cvId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCv({ cvId }));
  }, [dispatch, cvId]);

  const allCv = useSelector((state) => state.resumes.allCv);
  const loading = useSelector((state) => state.resumes.loading);
  const error = useSelector((state) => state.resumes.error);

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
    template_id,
    picture,
  } = allCv;
  let imgURl = `${baseUrl}/static/cv_pictures/${picture}`;
  return (
    <>
      <BarLoading isLoading={loading} />
      <div className="page">
        <div className="subpage">
          {template_id === 1 && (
            <Template3
              img={imgURl}
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
          )}
          {template_id === 2 && (
            <Template7
              loading={loading}
              img={imgURl}
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
          )}
          {template_id === 3 && (
            <Resume
              img={imgURl}
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
          )}
          {template_id === 4 && (
            <AveryTemp
              img={imgURl}
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
          )}
        </div>
      </div>
    </>
  );
};

export default ReadyCv;
