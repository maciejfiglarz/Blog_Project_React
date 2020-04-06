import React, { useState } from "react";
import { PrimaryBtn } from "../../containers/buttons";
import { serverUrl, uploadsUrl } from "./../../constants/types";
import { Loader } from "./../../containers/loader";
import axios from "axios";

const CreatorPhoto = props => {
  const [isLoaded, setLoaded] = useState();

  const onChange = e => {
    e.preventDefault();
    const file = e.target.files[0];
    setLoaded(true);
    const formData = new FormData();
    formData.append("photo", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post(`${serverUrl}/post/photo-temponary`, formData, config)
      .then(response => {
        console.log("response", response);
        setLoaded(false);
        props.setPhoto(response.data.fileName);
      })
      .catch(error => {});
  };

  const remove = () => {
    console.log('remove');
    props.setPhoto("");
    axios
      .post(`${serverUrl}/post/photo-temponary/remove`, { photo: props.photo })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log('error',error);
      });
  };

  return (
    <div className="creator-form__photo-wrap">
      <div className="creator-form__photo">
        {isLoaded && <Loader />}

        {!isLoaded && !props.photo && (
          <div>
            <input
              type="file"
              name="file"
              id="file"
              onChange={onChange}
              className="inputfile creator-form__photo-file"
            />
            <label className="button-primary" htmlFor="file">
              Wybierz zdjęcie
            </label>
          </div>
        )}

        {props.photo && (
          <div>
            <div className="creator-form__photo-uploaded">
              <img src={uploadsUrl + "/post-temponary/" + props.photo} />
            </div>
          </div>
        )}
      </div>
      {props.photo && (
        <div className="creator-form__photo-footer">
          <i onClick={remove} className="fas fa-trash-alt"></i>
        </div>
      )}
    </div>
  );
};

export default CreatorPhoto;
