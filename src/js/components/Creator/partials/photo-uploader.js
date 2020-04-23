import React, { useState } from "react";
import { InputFile } from "./../../../containers/form";
import postMenagerServices from "./../../../services/post-menager";
import { Message } from "./../../../containers/message";
import { Loader } from "./../../../containers/loader";
import { uploadsUrl } from "./../../../constants/types";
import PropTypes from "prop-types";

const CreatorPhotoUploader = (props) => {
  const [isLoading, setIsLoading] = useState();
  const { alert, photo, setPhoto, isPostPhotoActive, type } = props;

  const onChange = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("photo", file);

    const result = await postMenagerServices.uploadTemponaryPhoto(formData);
    const { data } = result;
    const { fileName } = data;
    setPhoto(fileName);
    setIsLoading(false);
  };

  const remove = () => {
    setPhoto("");
    postMenagerServices.removeTemponaryPhoto(photo);
  };

  return (
    <div
      className={`creator-form__photo-wrap ${
        isPostPhotoActive ? "creator-form__photo-wrap--active" : ""
      }`}
    >
      {alert.message && <Message alert={alert} field={"titlePost"} />}

      <div className="creator-form__photo">
        {isLoading && <Loader />}
        {!isLoading && !photo && <InputFile onChange={onChange} />}

        {photo && (
          <React.Fragment>
            <div className="creator-form__photo-uploaded">
              <img src={uploadsUrl + "/post-temponary/" + photo} />
            </div>
          </React.Fragment>
        )}
      </div>

      {photo && (
        <div className="creator-form__photo-footer">
          <i onClick={remove} className="fas fa-trash-alt"></i>
        </div>
      )}
    </div>
  );
};

CreatorPhotoUploader.propTypes = {
  alert: PropTypes.object,
  photo: PropTypes.string,
  photo: PropTypes.type,
  setPhoto: PropTypes.func,
  isPostPhotoActive: PropTypes.bool,
};

export default CreatorPhotoUploader;
