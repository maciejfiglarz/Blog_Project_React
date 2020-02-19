import React, { useState, useEffect } from "react";
import { useFetch } from "./../../hooks/useFetch";
import { imagePostUrl, domainUrl } from "./../../constants/types";

const Choicer = props => {
  const { data, loading } = useFetch(`${domainUrl}photo/`);
  const setVisibility = props.setVisibility;
  const isVisible = props.isVisable;
  const setImage = props.setImage;

  const onClickClose = () => {
    setVisibility(prev => !prev);
  };

  const onClickSetImage = (event) => {
    const id = event.target.dataset.id;
    const value = event.target.dataset.value;
    setImage({'id':id,'value':value});
    onClickClose(); 
  };


  return (
    <div className={`choicer ${isVisible ? "choicer--visable" : ""}`}>
      <div className="choicer__close" onClick={onClickClose}>
        <i className="fas fa-times"></i>
      </div>
      <div className="choicer-list">
        {data &&
          data.map(photo => {
            const imageUrl = imagePostUrl + photo.value;
            const imageStyle = {
              backgroundImage: `url('${imageUrl}')`,
              backgroundSize: 'cover'
            };
            return (
              <div
                key={photo.value}
                className="choicer__image"
                style={imageStyle}
                onClick={onClickSetImage}
                data-id={photo.id}
                data-value={photo.value}
              ></div>
            );
          })}
      </div>
    </div>
  );
};

export default Choicer;
