import React, { useEffect, useState } from "react";
import axios from "axios";

import { PrimaryBtn } from "./../../containers/buttons";
import { serverUrl } from "./../../constants/types";

import CreatorMenu from "./menu";
import CreatorBase from "./base";
import CreatorPhoto from "./photo";
import CreatorYoutube from "./youtube";

const Creator = props => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const [photo, setPhoto] = useState();
  const [youtube, setYoutube] = useState();

  const [type, setType] = useState();

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post(`${serverUrl}/post`, {
        title: title,
        content: content
      })
      .then(resp => {
        console.log("data", resp.data);
        // props.setLoaded(true);
        resetForm();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
  };

  return (
    <section className="creator">
      <h1 className="creator-title">Dodaj</h1>

      <form className="creator-form" onSubmit={handleSubmit}>
        <CreatorMenu setType={setType} />

        <div className="creator-switcher__content-wrap">
          <div
            data-name="post"
            className="creator-switcher__content creator-switcher__content--active"
          ></div>

          <div data-name="photo" className="creator-switcher__content">
            <CreatorPhoto setPhoto={setPhoto} photo={photo} />
          </div>

          <div data-name="youtube" className="creator-switcher__content">
            <CreatorYoutube setYoutube={setPhoto} youtube={youtube} />
          </div>

          <div data-name="link" className="creator-switcher__content">
            link
          </div>
          <CreatorBase
            setTitle={setTitle}
            title={title}
            setContent={setContent}
            content={content}
          />

          <PrimaryBtn
            extraClass="creator-form__button"
            text="Dodaj"
            handleSubmit={handleSubmit}
          />
        </div>
      </form>
    </section>
  );
};

export default Creator;
