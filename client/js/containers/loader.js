import React from "react";

export const Loader = (props) => {
  let classNames = "loader ";
  if (props.extraClass) {
    classNames += props.extraClass;
  }
  return (
    <div className={classNames}>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export const LoaderCover = (props) => {
  return (
    <div className="loader__wrap">
      <div className="loader__cover"></div>
      <Loader extraClass={"loader--center"} />
    </div>
  );
};
