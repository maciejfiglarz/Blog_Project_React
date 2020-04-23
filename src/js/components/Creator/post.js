import React from "react";

import { Message } from "./../../containers/message";
import { Checkbox, InputText } from "./../../containers/form";
import CKEditor from "./../../hooks/useCKEditor";

import CreatorPhotoUploader from "./partials/photo-uploader";
import PropTypes from "prop-types";

const CreatorPost = (props) => {
  const {
    alert,
    postContent,
    setPostContent,
    setPostPhoto,
    postPhoto,
    setIsPostPhotoActive,
    isPostPhotoActive,
  } = props;

  const onChangePostPhotoActive = () =>
    setIsPostPhotoActive(!isPostPhotoActive);

  return (
    <React.Fragment>
      <Checkbox
        name={"isPostPhoto"}
        onChange={onChangePostPhotoActive}
        label={"Dodaj miniaturkę"}
      />
     {alert.message && <Message alert={alert} field={"postPhoto"} />}
      <CreatorPhotoUploader
        alert={alert}
        setPhoto={setPostPhoto}
        photo={postPhoto}
        isPostPhotoActive={isPostPhotoActive}
      />

      {alert.message && <Message alert={alert} field={"postTitle"} />}
      <InputText
        onChange={(e) => setPostContent(e.target.value)}
        name="content"
        value={postContent}
        className={"creator-form__input"}
        placeholder={"Tytuł"}
      />

      {alert.message && <Message alert={alert} field={"postContent"} />}
      <div className="input__text-regular">
        <CKEditor setContent={setPostContent} />
      </div>
    </React.Fragment>
  );
};

CreatorPhotoUploader.propTypes = {
  alert: PropTypes.object,
  postContent: PropTypes.string,
  setPostContent: PropTypes.func,
  postPhoto: PropTypes.string,
  setPostPhoto: PropTypes.func,
  setIsPostPhotoActive: PropTypes.func,
  isPostPhotoActive: PropTypes.bool,
};

export default CreatorPost;
