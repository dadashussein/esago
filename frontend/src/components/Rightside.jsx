import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Template2 from "./templates/Template2";
import Template3 from "./templates/Template3";
import { usePDF } from 'react-to-pdf';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';

const Rightside = () => {
  const { name, lastname, jobtitle, address, phone, email, bio } = useSelector(
    (state) => state.personal
  );
  const education = useSelector((state) => state.education.education);
  const experience = useSelector((state) => state.experience.experience);
  const [finalEducation, setFinalEducation] = useState([]);
  const [finalExperience, setFinalExperience] = useState([]);
  useEffect(() => {
    localStorage.setItem("education", JSON.stringify(education));
  }, [education]);

  useEffect(() => {
    const educationFromStorage = JSON.parse(localStorage.getItem("education"));

    if (education.length <= 1) {
      setFinalEducation(education);
    } else {
      setFinalEducation(educationFromStorage);
    }
  }, [education]);



  useEffect(() => {
    localStorage.setItem("experience", JSON.stringify(experience));
  }, [experience]);

  useEffect(() => {
    const experienceFromStorage = JSON.parse(localStorage.getItem("experience"));

    if (experience.length <= 1) {
      setFinalExperience(experience);
    } else {
      setFinalExperience(experienceFromStorage);
    }
  }, [experience]);



  // const options = {
  //   method: 'open',
  //   resolution: Resolution.HIGH,
  //   page: {
  //     margin: Margin.SMALL,
  //     format: 'letter',
  //     orientation: 'landscape',
  //   },
  //   canvas: {
  //     mimeType: 'image/png',
  //     qualityRatio: 1
  //   },
  //   overrides: {
  //     pdf: {
  //       compress: true
  //     },
  //     canvas: {
  //       useCORS: true
  //     }
  //   },
  // };

 

  // const handleGeneratePDF = async () => {
  //   const getTargetElement = () => document.getElementById('myhtml');
  //   try {
  //     const targetElement = getTargetElement();
  //     const blob = await generatePDF(targetElement, options);


  //     const file = new File([blob], "document.pdf", { type: "application/pdf" });
      

  //     // Create FormData
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     console.log(formData);

  //     const token = localStorage.getItem("accessToken");
  //     const response = await fetch("http://127.0.0.1:8000/resumes", {
  //       method: "POST",

  //       headers: {
  //         'Authorization': 'Bearer ' + token,
  //       },
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       console.log("File uploaded successfully");
  //     } else {
  //       console.error("File upload failed");
  //     }
  //   } catch (error) {
  //     console.error("Error generating or uploading PDF:", error);
  //   }
  // };


  const auth = useSelector((state) => state.auth.currentUser);
  console.log(auth);
  let imgURl = `http://localhost:8000/static/profiles/${auth?.profile_picture}`


  return (
    <div className="bg-gray-100">
      {/* <Template2
        name={name}
        lastname={lastname}
        jobtitle={jobtitle}
        address={address}
        phone={phone}
        email={email}
        bio={bio}
        education={finalEducation}
        experience={finalExperience}
      /> */}
      <div className="h-[842px] w-[595px]" id="myhtml">

        <Template3 name={name}
          img={imgURl}
          lastname={lastname}
          jobtitle={jobtitle}
          address={address}
          phone={phone}
          email={email}
          bio={bio}
          education={finalEducation}
          experience={finalExperience} />
      </div>


      {/* <button onClick={handleGeneratePDF} className="bg-blue-500 text-white p-2 rounded-md mt-4">
        Download PDF
      </button> */}


    </div>
  );
};

export default Rightside;
