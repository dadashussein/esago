import { useEffect } from "react";
import "./a4.css";
import { MapInteractionCSS } from "react-map-interaction";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCv } from "~/store/features/resume/resumeSlice";
import Preview from "./Preview";
const ReadyCv = ({ cvId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCv({ cvId }));
  }, [dispatch, cvId]);

  const allCv = useSelector((state) => state.resumes.allCv);
  console.log(allCv);

  return (
    <MapInteractionCSS
      showControls
      defaultValue={{
        scale: 0.6,
        translation: { x: 30, y: 20 },
      }}
      minScale={0.5}
      maxScale={3}
      translationBounds={{
        xMax: 400,
        yMax: 200,
      }}
    >
      <div className="page">
        <div className="subpage">
          <Preview />
        </div>
      </div>
    </MapInteractionCSS>
  );
};

export default ReadyCv;
