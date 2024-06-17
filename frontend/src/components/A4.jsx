import "./a4.css";
import Preview from "./Preview";

const A4Component = ({ activeTemplate, setActiveTemplate, onGenerate, cvId }) => {
  return (
    <div className="page">
      <div className="subpage">
        <Preview
          onGenerate={onGenerate}
          cvId={cvId}
          activeTemplate={activeTemplate}
          setActiveTemplate={setActiveTemplate}
        />
      </div>
    </div>
  );
};

export default A4Component;
