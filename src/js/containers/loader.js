import React from "react";

export const Loader = props=> {
  let classNames = "loader ";
  if(props.extraClass){
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
