import React from "react";
import loaderImg from "../images/loader.gif";

export const LoadingPage = () => (
  <div className="loader">
    <img className="loader__image" src={loaderImg} />
  </div>
);

export default LoadingPage;
