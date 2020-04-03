import React, { useState } from "react";
import { PrimaryBtn } from "../../containers/buttons";
import { serverUrl, uploadsUrl } from "../../constants/types";
import { Loader } from "../../containers/loader";
import axios from "axios";

const CreatorLink = props => {
  const [isLoaded, setLoaded] = useState();

  const [error, setError] = useState();

  const [data, setData] = useState();

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const [siteName, setSiteName] = useState();

  const stylePhoto = {
    backgroundImage: `url(${props.linkPhoto})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain, cover"
  };

  const onChange = e => {
    const url = e.target.value;
    loadData(url);
  };

  const loadData = url => {
    console.log("action");
    axios
      .post(`${serverUrl}/post/link`, {
        url: url
      })
      .then(resp => {
        props.setLinkPhoto(resp.data.image);
        setTitle(resp.data.title);
        setDescription(resp.data.description);
        setSiteName(resp.data.siteName);
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  return (
    <div>
      {error}
      {title && (
        <div className="creator-form__link">
          <div className="creator-form__link-photo" style={stylePhoto} />
          <div className="creator-form__link-content">
            <div className="creator-form__link-sitename"> {siteName}</div>

            <h1 className="creator-form__link-title">{title}</h1>
            <p className="creator-form__link-title">{description}</p>
          </div>
        </div>
      )}

      <input
        onChange={onChange}
        value={props.link}
        className="input__text-regular creator-form__input"
        name="link"
        placeholder="Link do strony"
      />
    </div>
  );
};

export default CreatorLink;
