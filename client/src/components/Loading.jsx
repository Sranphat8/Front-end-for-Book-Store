import React from "react";

const Loading = ({ text = "Loading..." }) => (
  <div className="w-full flex justify-center py-16">
    <span className="loading loading-spinner loading-lg" />
    <span className="ml-3 text-lg">{text}</span>
  </div>
);

export default Loading;
