import React, { useState } from "react";
import { PrimaryBtn } from "../../containers/buttons";
import { Loader } from "../../containers/loader";
import { useDispatch } from "react-redux";

import postMenagerServices from "../../services/post-menager";
import alertActions from "./../../store/alert/action";

import { Message } from "./../../containers/message";

const CreatorLink = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [siteName, setSiteName] = useState();
  const dispatch = useDispatch();

  const stylePhoto = {
    backgroundImage: `url(${props.linkPhoto})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const onChange = (e) => {
    const url = e.target.value;
    props.setLink(url);

    setTimeout(() => {
      loadData(url);
    }, 1000);
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
    props.setLinkPhoto(params.image);
    setTitle(params.title);
    setDescription(params.description);
    setSiteName(params.siteName);
  };

  const clearData = () => {
    props.setLinkPhoto("");
    setTitle("");
    setDescription("");
    setSiteName("");
  };

  const { alert } = props;
  console.log("alertxxx", alert);
  return (
    <React.Fragment>
      {error}
      {isLoading && <Loader />}
      {!isLoading && title && (
        <div className="creator-form__link">
          <div className="creator-form__link-photo" style={stylePhoto} />
          <div className="creator-form__link-content">
            {/* <div className="creator-form__link-sitename"> {siteName}</div> */}
            <h1 className="creator-form__link-title">{title}</h1>
            <p className="creator-form__link-description">{description}</p>
          </div>
        </div>
      )}

      {alert.message && <Message alert={alert} field={"link"} />}
      <input
        onChange={onChange}
        value={props.link}
        className="input__text-regular creator-form__input"
        name="link"
        placeholder="Link do strony"
      />
      {alert.message && <Message alert={alert} field={"linkTitle"} />}
      <input
        onChange={(e) => props.setLinkTitle(e.target.value)}
        value={props.linkTitle}
        className="input__text-regular creator-form__input"
        name="linkTitle"
        placeholder="Tytuł"
      />
      <input
        onChange={(e) => props.setLinkContent(e.target.value)}
        value={props.linkContent}
        className="input__text-regular creator-form__input"
        name="linkTitle"
        placeholder="Opis"
      />
    </React.Fragment>
  );
};

export default CreatorLink;
