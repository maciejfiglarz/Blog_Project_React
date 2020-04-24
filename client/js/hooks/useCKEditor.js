import React,{ useEffect, useState } from "react";
import PropTypes from "prop-types";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/pl";

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

const useCKEditor = (props) => {
  const { setContent,content } = props;

  return (
    <CKEditor
      editor={ClassicEditor}
      config={editorConfiguration}
      name="title"
      data={content}
      onInit={(editor) => {
        // console.log("Editor is ready to use!", editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        // console.log({ event, editor, data });
        setContent(data);
      }}
      // onBlur={(event, editor) => {
      //   console.log("Blur.", editor);
      // }}
      // onFocus={(event, editor) => {
      //   console.log("Focus.", editor);
      // }}
    />
  );
};

useCKEditor.propTypes = {
  setContent: PropTypes.func,
  content: PropTypes.string
};

export default useCKEditor;
