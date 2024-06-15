import React from "react";
import "./a4.css";
import Preview from "./Preview";
import { MapInteractionCSS } from "react-map-interaction";

const A4Component = ({ activeTemplate, setActiveTemplate }) => {
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
          <Preview
            activeTemplate={activeTemplate}
            setActiveTemplate={setActiveTemplate}
          />
        </div>
      </div>
    </MapInteractionCSS>
  );
};

export default A4Component;
