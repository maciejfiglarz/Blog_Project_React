import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/pl";
import { Message } from "./../../containers/message";
import { Checkbox, InputFile } from "./../../containers/form";
import postMenagerService from "./../../services/post-menager";
import CreatorPhotoUploader from "./partials/photo-uploader";

const editorConfiguration = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "|",
    "indent",
    "outdent",
    "|",
    "blockQuote",
    "mediaEmbed",
    "undo",
    "redo",
    "insertImage",
  ],
  heading: {
    options: [
      { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
      // { model: 'heading1', view: 'h1', title: 'Duży Nagłowek', class: 'ck-heading_heading1' },
      {
        model: "heading2",
        view: "h2",
        title: "Nagłowek",
        class: "ck-heading_heading2",
      },
    ],
  },
  language: "pl",
};

const CreatorPost = (props) => {
  const {
    alert,
    setPostPhoto,
    postPhoto,
    setIsPostPhotoActive,
    isPostPhotoActive,
  } = props;
  
  const onChangePostPhotoActive = () =>
    setIsPostPhotoActive(!isPostPhotoActive);

  return (
    <React.Fragment>
      <Checkbox
        name={"isPostPhoto"}
        onChange={onChangePostPhotoActive}
        label={"Dodaj miniaturkę"}
      />

      <CreatorPhotoUploader
        alert={alert}
        setPhoto={setPostPhoto}
        photo={postPhoto}
        isPostPhotoActive={isPostPhotoActive}
      />

      {alert.message && <Message alert={alert} field={"titlePost"} />}

      <input
        onChange={(e) => props.setTitle(e.target.value)}
        value={props.title}
        className="input__text-regular creator-form__input"
        name="title"
        placeholder="Tytuł"
      />

      {/* <textarea
        onChange={e => props.setContent(e.target.value)}
        className="input__text-regular creator-form__textarea"
        onKeyDown={handleKeyDown}
        name="value"
        placeholder="Treść postu..."
        value={props.content}
      /> */}

      {alert.message && <Message alert={alert} field={"contentPost"} />}
      <div className="input__text-regular">
        <CKEditor
          // handleKeyDown={handleKeyDown}
          editor={ClassicEditor}
          config={editorConfiguration}
          name="title"
          data=""
          onInit={(editor) => {
            // console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            // console.log({ event, editor, data });
            props.setContent(data);
          }}
          // onBlur={(event, editor) => {
          //   console.log("Blur.", editor);
          // }}
          // onFocus={(event, editor) => {
          //   console.log("Focus.", editor);
          // }}
        />
      </div>
    </React.Fragment>
  );
};

export default CreatorPost;
