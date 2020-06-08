import React, { useState } from "react";
import { CreatePostBtn } from "../../../containers/buttons";
import { uploadsUrl } from "../../../constants/types";
import { InputText, Checkbox, TextArea } from "../../../containers/form";
import { Message } from "../../../containers/message";
import Workspace from "./workspace";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import postMenagerActions from "../../../store/post-menager/action";

const CreatorGraphic = ({ alert, createPost, user }) => {
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [titleTop, setTitleTop] = useState("");
  const [isTitleTop, setIsTitleTop] = useState(false);
  const [content, setContent] = useState("");
  const [titleColor, setTitleColor] = useState("#ffb23e");
  const [isAcceptRules, setIsAcceptRules] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    createPost({
      post: {
        title,
        titleTop,
        content,
        isTitleTop,
        photo,
        type: "graphic",
        titleColor,
        isAcceptRules,
      },
      user,
    });
  };

  return (
    <div className="creator-graphic">
      <form className="creator-form" onSubmit={handleSubmit}>
        <div className="creator-graphic__form">
          <Checkbox
            name="isTitleTop"
            onChange={e =>  setIsTitleTop(!isTitleTop)}
            label="Dodaj górny tytuł"
            className=""
          />
          {alert.message && <Message alert={alert} field={"graphicTitleTop"} />}
          <TextArea
            onChange={(e) => setTitleTop(e.target.value)}
            name="titleTop"
            value={titleTop}
            color={titleColor}
            className={`creator-form__input input__text--title ${
              isTitleTop ? "" : "display-none"
            }`}
            placeholder="Górny tytuł"
            maxLength={255}
          />
          {alert.message && <Message alert={alert} field={"graphicTitle"} />}
          <TextArea
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            value={title}
            className="creator-form__input input__text--title"
            placeholder="Tytuł"
            maxLength={255}
            color={titleColor}
          />

          <TextArea
            onChange={(e) => setContent(e.target.value)}
            name="content"
            value={content}
            className="creator-form__input input__text--content"
            placeholder="Opis"
            maxLength={500}
          />
        </div>

        <Workspace
          photo={photo}
          setPhoto={setPhoto}
          title={title}
          titleTop={titleTop}
          content={content}
          isTitleTop={isTitleTop}
          color={titleColor}
          setColor={setTitleColor}
        />
        {alert.message && <Message alert={alert} field="graphicIsAcceptRules" />}
        <div className="creator-form__accept">
          <Checkbox
            name="graphicIsAccept"
            onChange={e => setIsAcceptRules(!isAcceptRules)}
            label="Akceptuję regulamin serwisu Szlauf.pl"
          />
        </div>
        <CreatePostBtn handleSubmit={handleSubmit} />
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
};

export default connect(mapStateToProps, actionCreators)(CreatorGraphic);
