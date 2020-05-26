import React, { useState } from "react";
import { CreatePostBtn } from "../../containers/buttons";
import { InputText, TextArea, Checkbox } from "./../../containers/form";
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

  const [isAcceptRules, setIsAcceptRules] = useState(false);

  const stylePhoto = {
    backgroundImage: `url(${sitePhoto})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const onChange = (e) => {
    const url = e.target.value;
    setLink(url);
    setLoading(true);
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
        linkSiteName: siteName,
        type: "link",
      },
      user,
    });
  };

  const checkIsCorrentLink = () => {
    return siteName && siteTitle && sitePhoto ? true : false;
  };

  const loadData = async (url) => {
    dispatch(alertActions.clear());

    if (url.length > 0) {
      const result = await postMenagerServices.getLinkData(url);
      let error = {};
      const { data } = result;
      const { success, params } = data;
      console.log("linkData", data);
      if (success) {
        setData(params);
      } else {
        clearData();
        dispatch(alertActions.error({ link: "Błędy link" }));
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

      {alert.message && <Message alert={alert} field="link" />}
      <InputText
        onChange={onChange}
        name="link"
        value={link}
        className="creator-form__input"
        placeholder="Link www"
      />

      {alert.message && <Message alert={alert} field="linkTitle" />}
      <TextArea
        onChange={(e) => setTitle(e.target.value)}
        name="linkTitle"
        value={title}
        className="creator-form__input input__text--title"
        placeholder="Tytuł"
        maxLength="255"
      />

      <TextArea
        onChange={(e) => setContent(e.target.value)}
        name="content"
        value={content}
        className="creator-form__input"
        placeholder="Opis"
        maxLength="500"
      />
      {alert.message && <Message alert={alert} field="graphicIsAcceptRules" />}
      <div className="creator-form__accept">
        <Checkbox
          name="graphicIsAccept"
          onChange={(e) => setIsAcceptRules(!isAcceptRules)}
          label="Akceptuję regulamin serwisu Szlauf.pl"
        />
      </div>

      <CreatePostBtn handleSubmit={handleSubmit} />
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
