import React, { useState } from "react";
import { CreatePostBtn } from "../../containers/buttons";
import { serverUrl, uploadsUrl } from "../../constants/types";
import { Loader } from "../../containers/loader";
import { Message } from "../../containers/message";
import { InputText, TextArea, Checkbox } from "./../../containers/form";

const CreatorYoutube = (props) => {
  const [isLoading, setIsLoading] = useState();
  const [link, setLink] = useState();
  const [error, setError] = useState();
  const [isAcceptRules, setIsAcceptRules] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onChange = (e) => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // createPost({
    //   post: {
    //     link,
    //     linkPhoto: sitePhoto,
    //     linkSiteName:siteName,
    //     type: "link",
    //   },
    //   user,
    // });
  };

  const getYoutubeID = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  };

  return (
    <div>
      {error && (
        <>
          <div className={`message message-error`}>{error}</div>
          <Message
            alert={{ message: error, type: "error" }}
            field={"graphicTitle"}
          />
        </>
      )}

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
      {alert.message && <Message alert={alert} field="link" />}
      <InputText
        onChange={onChange}
        name="youtube"
        value={link}
        className="input__text-regular creator-form__input"
        placeholder="Link youtube"
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
      {alert.message && <Message alert={alert} field="isAcceptRules" />}
      <div className="creator-form__accept">
        <Checkbox
          name="isAcceptRules"
          onChange={(e) => setIsAcceptRules(!isAcceptRules)}
          label="Akceptuję regulamin serwisu Szlauf.pl"
        />
      </div>
      <CreatePostBtn handleSubmit={handleSubmit} />
    </div>
  );
};

export default CreatorYoutube;
