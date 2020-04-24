import React, { useState } from "react";
import { PrimaryBtn } from "../../../containers/buttons";
import { uploadsUrl } from "../../../constants/types";
import { InputText, Checkbox, TextArea } from "../../../containers/form";
import { Message } from "../../../containers/message";
import Workspace from "./workspace";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import postMenagerActions from "../../../store/post-menager/action";

const CreatorGraphic = (props) => {
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [titleTop, setTitleTop] = useState("");
  const [content, setContent] = useState("");
  const [isTitleTop, setIsTitleTop] = useState(false);
  const { alert } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    createPost({
      post: { title, content, photo, isPhotoActive, type: "graphic" },
      user,
    });
  };

  const onChangesIsTitleTop = () => setIsTitleTop(!isTitleTop);
  return (
    <div className="creator-graphic">
      <form className="creator-form" onSubmit={handleSubmit}>
        <Workspace
          photo={photo}
          setPhoto={setPhoto}
          title={title}
          titleTop={titleTop}
          content={content}
          isTitleTop={isTitleTop}
        />
        {/* {alert.message && <Message alert={alert} field={"graphicME"} />} */}
        <div className="creator-graphic__form">
          {alert.message && <Message alert={alert} field={"graphicTitle"} />}
          <InputText
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            value={title}
            className={"creator-form__input"}
            placeholder={"Tytuł"}
          />
          <Checkbox
            name={"isTitleTop"}
            onChange={onChangesIsTitleTop}
            label={"Dodaj górny tytuł"}
          />

          <InputText
            onChange={(e) => setTitleTop(e.target.value)}
            name="title"
            value={title}
            className={`creator-form__input ${
              isTitleTop ? "" : "display-none"
            }`}
            placeholder={"Górny tytuł"}
          />

          <TextArea
            onChange={(e) => setContent(e.target.value)}
            name="content"
            value={content}
            className={"creator-form__input"}
            placeholder={"Opis"}
          />
        </div>
      </form>
    </div>
  );
};

CreatorGraphic.propTypes = {
  alert: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = (state) => {
  const { alert, user } = state;
  return { alert, user };
};

const actionCreators = {
  createPost: postMenagerActions.createPost,
  loading: postMenagerActions.loading,
};

export default connect(mapStateToProps, actionCreators)(CreatorGraphic);
