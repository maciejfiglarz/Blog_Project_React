import React from "react";
import loader from "./../../images/loader.png";


export const Loader = ({extraClass}) => {
  return (
    <div className={`loader__wrap ${extraClass}`}>
      {/* <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div> */}
      <img className={`loader-lollipop`} src={loader} />
    </div>
  );
};

export const LoaderCover = (props) => {
  return (
    <div className="loader__wrap loader__wrap--cover">
      <div className="loader__cover">
        <img className="loader-lollipop" src={loader} />
      </div>
      {/* <Loader extraClass={"loader--center"} /> */}
    </div>
  );
};
