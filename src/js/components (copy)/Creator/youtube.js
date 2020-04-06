import React, { useState } from "react";
import { PrimaryBtn } from "../../containers/buttons";
import { serverUrl, uploadsUrl } from "../../constants/types";
import { Loader } from "../../containers/loader";
import axios from "axios";

const CreatorYoutube = props => {
  const [isLoaded, setLoaded] = useState();
  const [link, setLink] = useState();
  const [error, setError] = useState();

  const onChange = e => {
    const link = e.target.value;
    const id = getYoutubeID(link);
    if (id) {
      setError("");
      props.setYoutube(id);
    } else {
      setError("Link jest niepoprawny!");
      props.setYoutube("");
    }
  };

  
  const getYoutubeID = url => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  };

  return (
    <div>
      {error}
      {props.youtube && (
        <iframe
          className="creator-form__youtube"
          width="100%"
          height="215"
          src={"https://www.youtube.com/embed/" + props.youtube}
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      )}
      <input
        onChange={onChange}
        value={link}
        className="input__text-regular creator-form__input"
        name="youtube"
        placeholder="Link youtube"
      />
    </div>
  );
};

export default CreatorYoutube;
