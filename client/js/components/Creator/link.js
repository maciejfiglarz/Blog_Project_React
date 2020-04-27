import React, { useState } from "react";
import { PrimaryBtn } from "../../containers/buttons";
import { InputText } from "./../../containers/form";
import { Loader } from "../../containers/loader";
import { useDispatch } from "react-redux";

import postMenagerServices from "../../services/post-menager";
import alertActions from "./../../store/alert/action";

import postMenagerActions from "./../../store/post-menager/action";

import { Message } from "../../containers/message";
import { connect } from "react-redux";

import PropTypes from "prop-types";

const CreatorLink = (props) => {
  const { alert, createPost, user } = props;
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [siteName, setSiteName] = useState("");
  const [siteTitle, setSiteTitle] = useState("");
  const [siteDescription, setSiteDescription] = useState("");
  const [sitePhoto, setSitePhoto] = useState("");

  const stylePhoto = {
    backgroundImage: `url(${sitePhoto})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const onChange = (e) => {
    const url = e.target.value;
    setLink(url);

    setTimeout(() => {
      loadData(url);
    }, 1000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createPost({
      post: {
        title,
        content,
        isCorrentLink: checkIsCorrentLink(),
        link,
        linkPhoto: sitePhoto,
        linkSiteName:siteName,
        type: "link",
      },
      user,
    });
  };

  const checkIsCorrentLink = () => {
    return siteName && siteTitle && sitePhoto ? true : false;
  };

  const loadData = async (url) => {
    setLoading(true);
    dispatch(alertActions.clear());

    if (url.length > 0) {
      const result = await postMenagerServices.getLinkData(url);
      const { data } = result;
      const { success, params } = data;

      if (success) {
        setData(params);
      } else {
        clearData();
        dispatch(alertActions.error({ wrongLink: "Błędy link" }));
      }
    } else {
      dispatch(alertActions.error({ wrongLink: "Musisz wkleić link" }));
    }
    setLoading(false);
  };

  const setData = (params) => {
    setSitePhoto(params.image);
    setSiteTitle(params.title);
    setSiteDescription(params.description);
    setSiteName(params.siteName);
  };

  const clearData = () => {
    setSitePhoto("");
    setSiteTitle("");
    setSiteDescription("");
    setSiteName("");
  };
  console.log("isCorrect", checkIsCorrentLink(), siteName && siteTitle && sitePhoto);
  return (
    <form className="creator-form" onSubmit={handleSubmit}>
      {isLoading && <Loader />}
      {!isLoading && siteTitle && (
        <div className="creator-form__link">
          <div className="creator-form__link-photo" style={stylePhoto} />
          <div className="creator-form__link-content">
            <h1 className="creator-form__link-title">{siteTitle}</h1>
            <p className="creator-form__link-description">{siteDescription}</p>
          </div>
        </div>
      )}

      {/* {alert.message && <Message alert={alert} field={"link"} />}
      <input
        onChange={onChange}
        value={link}
        className="input__text-regular creator-form__input"
        name="link"
        placeholder="Link do strony"
      /> */}
      {alert.message && <Message alert={alert} field={"link"} />}
      <InputText
        onChange={onChange}
        name="link"
        value={link}
        className={"creator-form__input"}
        placeholder={"Link"}
      />

      {alert.message && <Message alert={alert} field={"linkTitle"} />}
      {/* <input
        onChange={(e) => setLinkTitle(e.target.value)}
        value={linkTitle}
        className="input__text-regular creator-form__input"
        name="linkTitle"
        placeholder="Tytuł"
      /> */}
      <InputText
        onChange={(e) => setTitle(e.target.value)}
        name="title"
        value={title}
        className={"creator-form__input"}
        placeholder="Tytuł"
        maxLength="255"
      />

      <input
        onChange={(e) => setContent(e.target.value)}
        value={content}
        className="input__text-regular creator-form__input"
        name="contante"
        placeholder="Opis"
      />
      <PrimaryBtn
        extraClass="creator-form__button"
        text="Dodaj"
        handleSubmit={handleSubmit}
      />
    </form>
  );
};

CreatorLink.propTypes = {
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

export default connect(mapStateToProps, actionCreators)(CreatorLink);
