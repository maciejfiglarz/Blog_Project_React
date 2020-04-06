import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";

import axios from "axios";

import { PrimaryBtn } from "./../../containers/buttons";
import { serverUrl } from "./../../constants/types";

import CreatorMenu from "./menu";
import CreatorBase from "./base";
import CreatorPhoto from "./photo";
import CreatorYoutube from "./youtube";
import CreatorLink from "./link";

const Creator = props => {
  const [postId, setPostId] = useState();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const [photo, setPhoto] = useState();
  const [youtube, setYoutube] = useState();

  const [link, setLink] = useState();
  const [linkPhoto, setLinkPhoto] = useState();

  const [type, setType] = useState("post");

  if (postId) {
    // return <Redirect to={"/status/" + postId} />;
    return <Redirect to="/" />;
  }

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post(`${serverUrl}/post`, {
        title: title,
        content: content,
        type: type,
        photo: photo,
        youtube,youtube,
        link: link,
        linkPhoto: linkPhoto
      })
      .then(resp => {
        const id = resp.data._id;
        setPostId(id);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <section className="creator">
      <h1 className="creator-title">Dodaj {type}</h1>

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
            <CreatorYoutube setYoutube={setYoutube} youtube={youtube} />
          </div>

          <div data-name="link" className="creator-switcher__content">
            <CreatorLink
              link={link}
              setLink={setLink}
              linkPhoto={linkPhoto}
              setLinkPhoto={setLinkPhoto}
            />
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
