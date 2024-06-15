import React from "react";

const Templates = () => {
  return (
    <div className="">
      <h1>Templates</h1>
      <div className="flex flex-wrap">
        <div className="w-1/4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-bold">Template 1</h2>
            <img src="https://via.placeholder.com/150" alt="Template 1" />
          </div>
        </div>
        <div className="w-1/4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-bold">Template 2</h2>
            <img src="https://via.placeholder.com/150" alt="Template 2" />
          </div>
        </div>
        <div className="w-1/4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-bold">Template 3</h2>
            <img src="https://via.placeholder.com/150" alt="Template 3" />
          </div>
        </div>
        <div className="w-1/4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-bold">Template 4</h2>
            <img src="https://via.placeholder.com/150" alt="Template 4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
