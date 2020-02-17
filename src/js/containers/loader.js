import React from "react";

export const Loader = props=> {
  let classNames = "loader ";
  if(props.extraClass){
    classNames += props.extraClass;
  }
    console.log(classNames,props);
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
