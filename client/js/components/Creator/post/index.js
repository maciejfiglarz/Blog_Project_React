import React, { useState } from "react";

import { Message } from "../../../containers/message";
import { Checkbox, InputText } from "../../../containers/form";
import CKEditor from "../../../hooks/useCKEditor";

import CreatorPhotoUploader from "./photo-uploader";
import PropTypes from "prop-types";
import postMenagerActions from "../../../store/post-menager/action";
import { connect } from "react-redux";
import { PrimaryBtn } from "../../../containers/buttons";

const CreatorPost = (props) => {
  const { alert, createPost, user } = props;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const [isPhotoActive, setIsPhotoActive] = useState(false);

  const onChangePhotoActive = () => setIsPhotoActive(!isPhotoActive);
  const handleSubmit = (event) => {
    event.preventDefault();
    createPost({
      post: { title, content, photo, isPhotoActive, type: "post" },
      user,
    });
  };

  return (
    <form className="creator-form" onSubmit={handleSubmit}>
      <Checkbox
        name={"isPhotoActive"}
        onChange={onChangePhotoActive}
        label={"Dodaj miniaturkę"}
      />

      {alert.message && <Message alert={alert} field={"postPhoto"} />}
      <CreatorPhotoUploader
        alert={alert}
        setPhoto={setPhoto}
        photo={photo}
        isPhotoActive={isPhotoActive}
      />

      {alert.message && <Message alert={alert} field={"postTitle"} />}
      <InputText
        onChange={(e) => setTitle(e.target.value)}
        name="content"
        value={title}
        className={"creator-form__input"}
        placeholder={"Tytuł"}
      />

      {alert.message && <Message alert={alert} field={"postContent"} />}
      <div className="input__text-regular">
        <CKEditor setContent={setContent} content={content} />
      </div>
      <PrimaryBtn
        extraClass="creator-form__button"
        text="Dodaj"
        handleSubmit={handleSubmit}
      />
    </form>
  );
};

CreatorPost.propTypes = {
  alert: PropTypes.object,
  user: PropTypes.object,
  createPost: PropTypes.func,
  loading: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { alert, user } = state;
  return { alert, user };
};

const actionCreators = {
  createPost: postMenagerActions.createPost,
  loading: postMenagerActions.loading,
};

export default connect(mapStateToProps, actionCreators)(CreatorPost);
