import React, { useState } from "react";
import { CreatePostBtn } from "../../containers/buttons";
import { serverUrl, uploadsUrl } from "../../constants/types";
import { Loader } from "../../containers/loader";
import { Message } from "../../containers/message";
import { InputText, TextArea, Checkbox } from "./../../containers/form";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import postMenagerActions from "./../../store/post-menager/action";
import alertActions from "./../../store/alert/action";
import { useDispatch } from "react-redux";

const CreatorYoutube = ({ alert, createPost, user }) => {
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();
  const [link, setLink] = useState();
  const [error, setError] = useState();
  const [isAcceptRules, setIsAcceptRules] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [youtube, setYoutube] = useState("");

  const onChange = (e) => {
    const link = e.target.value;
    const id = getYoutubeID(link);
    if (id) {
      dispatch(alertActions.error({ youtubeLink: "" }));
      setYoutube(id);
    } else {
      dispatch(alertActions.error({ youtubeLink: "Link jest niepoprawny!" }));
      setYoutube("");
    }
  };

  const handleSubmit = (event) => {
    console.log('event');
    event.preventDefault();
    createPost({
      post: {
        youtube,
        title,
        content,
        type: "youtube",
        isAcceptRules,
      },
      user,
    });
  };

  const getYoutubeID = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  };

  return (
    <form  onSubmit={handleSubmit}>
      {/* {error && (
        <>
          <div className={`message message-error`}>{error}</div>
          <Message
            alert={{ message: error, type: "error" }}
            field={"youtubeLink"}
          />
        </>
      )} */}

      {alert.message && <Message alert={alert} field="youtubeLink" />}
      <InputText
        onChange={onChange}
        name="youtubeLink"
        value={link}
        className="input__text-regular creator-form__input"
        placeholder="Link youtube"
      />
      {youtube && (
        <iframe
          className="creator-form__youtube"
          width="100%"
          height="215"
          src={"https://www.youtube.com/embed/" + youtube}
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      )}
      {alert.message && <Message alert={alert} field="youtubeTitle" />}
      <TextArea
        onChange={(e) => setTitle(e.target.value)}
        name="youtubeTitle"
        value={title}
        className="creator-form__input input__text--title"
        placeholder="Tytuł"
        maxLength="255"
      />

      <TextArea
        onChange={(e) => setContent(e.target.value)}
        name="youtubeContent"
        value={content}
        className="creator-form__input"
        placeholder="Opis"
        maxLength="500"
      />
      {alert.message && <Message alert={alert} field="youtubeIsAcceptRules" />}
      <div className="creator-form__accept">
        <Checkbox
          name="isAcceptRules"
          onChange={(e) => setIsAcceptRules(!isAcceptRules)}
          label="Akceptuję regulamin serwisu Szlauf.pl"
        />
      </div>
      <CreatePostBtn handleSubmit={handleSubmit} />
    </form>
  );
};

CreatorYoutube.propTypes = {
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

export default connect(mapStateToProps, actionCreators)(CreatorYoutube);
