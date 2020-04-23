import React, { useState } from "react";
import { PrimaryBtn } from "./../../../containers/buttons";
import { uploadsUrl } from "./../../../constants/types";

import { InputText, Checkbox, TextArea } from "./../../../containers/form";

import { Message } from "./../../../containers/message";
import Workspace from "./workspace";

const CreatorGraphic = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [graphicPhoto, setGraphicPhoto] = useState("");
  const [graphicTitle, setGraphicTitle] = useState("");
  const [graphicTitleTop, setGraphicTitleTop] = useState("");
  const [graphicContent, setGraphicContent] = useState("");
  const [isTitleTop, setIsTitleTop] = useState(false);
  const { alert } = props;

  const onChangesIsTitleTop = () => setIsTitleTop(!isTitleTop);
  return (
    <div className="creator-graphic">
      <Workspace
        photo={graphicPhoto}
        title={graphicTitle}
        titleTop={graphicTitleTop}
        content={graphicContent}
      />

      {alert.message && <Message alert={alert} field={"titlePost"} />}
      <div className="creator-graphic__form">
        {alert.message && <Message alert={alert} field={"graphicTitle"} />}
        <InputText
          onChange={(e) => setGraphicTitle(e.target.value)}
          name="title"
          value={graphicTitle}
          className={"creator-form__input"}
          placeholder={"Tytuł"}
        />
        <Checkbox
          name={"isTitleTop"}
          onChange={onChangesIsTitleTop}
          label={"Dodaj górny tytuł"}
        />

        <InputText
          onChange={(e) => setGraphicTitleTop(e.target.value)}
          name="title"
          value={graphicTitle}
          className={`creator-form__input ${isTitleTop ? "" : "display-none"}`}
          placeholder={"Górny tytuł"}
        />

        <TextArea
          onChange={(e) => setGraphicContent(e.target.value)}
          name="content"
          value={graphicTitle}
          className={"creator-form__input"}
          placeholder={"Opis"}
        />
      </div>
    </div>
  );
};

export default CreatorGraphic;
