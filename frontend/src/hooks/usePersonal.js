import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import {
  fetchInfo,
  patchPhoto,
  postInfo,
  setPersonalField,
} from "@/store/features/personal/personalSlice";
import { baseUrl } from "@/utils/api";

const usePersonal = (cvId, activeTemplate) => {
  const dispatch = useDispatch();
  const personal = useSelector((state) => state.personal.personal);
  const status = useSelector((state) => state.personal.status);
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  useEffect(() => {
    dispatch(fetchInfo(cvId));
  }, [dispatch, cvId]);

  useEffect(() => {
    dispatch(setPersonalField({ field: "template_id", value: activeTemplate }));
  }, [activeTemplate, dispatch]);

  const handleInputChange = (field, value) => {
    dispatch(setPersonalField({ field, value }));
  };

  const handleSendAndNext = async () => {
    try {
      const resultAction = await dispatch(postInfo({ info: personal, cvId }));
      unwrapResult(resultAction);
    } catch (error) {
      console.error("Failed to save personal info: ", error);
    }
  };

  const handleAvatar = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar({
        file: file,
        url: URL.createObjectURL(file),
      });

      dispatch(patchPhoto({ cvId, file }));
    }
  };

  const imgUrl = `${baseUrl}/static/cv_pictures/${personal?.picture}`;

  return {
    personal,
    avatar,
    status,
    imgUrl,
    handleInputChange,
    handleSendAndNext,
    handleAvatar,
  };
};

export default usePersonal;
