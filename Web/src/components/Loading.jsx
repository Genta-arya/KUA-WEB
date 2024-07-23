import React from "react";
import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <HashLoader size={16} color="#0FA588" />
    </div>
  );
};

export default Loading;
