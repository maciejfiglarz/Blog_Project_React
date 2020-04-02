import React, { useState } from "react";
import { PrimaryBtn } from "../../containers/buttons";
import { serverUrl, uploadsUrl } from "../../constants/types";
import { Loader } from "../../containers/loader";
import axios from "axios";

const CreatorLink = props => {
  const [isLoaded, setLoaded] = useState();
  const [link, setLink] = useState();
  const [error, setError] = useState();

  const [data, setData] = useState();

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
        setData({
          image: resp.data.image,
          title: resp.data.title,
          description: resp.data.description,
          siteName: resp.data.siteName
        });
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  return (
    <div>
      {error}
      {data && (
        <div className="creator-form__link">
          <div className="creator-form__link-image"></div>
      <h1 className="creator-form__link">{data.image}</h1>
        </div>
      )}

      <input
        onChange={onChange}
        value={link}
        className="input__text-regular creator-form__input"
        name="link"
        placeholder="Link do strony"
      />
    </div>
  );
};

export default CreatorLink;
