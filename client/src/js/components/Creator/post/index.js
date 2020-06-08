import React, { useState } from "react";

import { Message } from "../../../containers/message";
import { Checkbox, InputText, TextArea } from "../../../containers/form";
import CKEditor from "../../../hooks/useCKEditor";

import CreatorPhotoUploader from "./photo-uploader";
import PropTypes from "prop-types";
import postMenagerActions from "../../../store/post-menager/action";
import { connect } from "react-redux";
import { CreatePostBtn } from "../../../containers/buttons";

const CreatorPost = ({ alert, createPost, user }) => {
  const [title, setTitle] = useState("");
  const [isAcceptRules, setIsAcceptRules] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const [isPhotoActive, setIsPhotoActive] = useState(false);

  const onChangePhotoActive = () => setIsPhotoActive(!isPhotoActive);
  const handleSubmit = (event) => {
    event.preventDefault();
    createPost({
      post: {
        title,
        content,
        photo,
        isPhotoActive,
        type: "post",
        isAcceptRules,
      },
      user,
    });
  };

  return (
    <form className="creator-form" onSubmit={handleSubmit}>
      <Checkbox
        name="isPhotoActive"
        onChange={onChangePhotoActive}
        label="Dodaj miniaturkę"
      />

      {alert.message && <Message alert={alert} field="postPhoto" />}
      <CreatorPhotoUploader
        alert={alert}
        setPhoto={setPhoto}
        photo={photo}
        isPhotoActive={isPhotoActive}
      />

      {alert.message && <Message alert={alert} field="postTitle" />}
      <TextArea
        onChange={(e) => setTitle(e.target.value)}
        name="title"
        value={title}
        className="creator-form__input input__text--primary input__text--title"
        placeholder="Tytuł"
        maxLength={255}
      />

      {alert.message && <Message alert={alert} field="postContent" />}
      <div className="creator-form__ckeditor">
        <CKEditor setContent={setContent} content={content} />
      </div>

      {alert.message && <Message alert={alert} field="postIsAcceptRules" />}
      <div className="creator-form__accept">
        <Checkbox
          name="postIsAccept"
          onChange={(e) => setIsAcceptRules(!isAcceptRules)}
          label="Akceptuję regulamin serwisu Szlauf.pl"
        />
      </div>
      <CreatePostBtn handleSubmit={handleSubmit} />
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
