import React, { useState } from "react";
import Posts from "./../../containers/posts";
import { connect } from "react-redux";
import Textarea from "./Textarea";
import { useForm } from "./../../hooks/useForm";

const Creator = () => {
  const [values, handleChange] = useForm("");
  return (
    <div className={"creator"}>
      {/* <Textarea onChange={setContent} value={content} /> */}
      
      <textarea
        onChange={handleChange}
        value={values.content}
        className={"creator__textarea"}
        name="content"
      ></textarea>

    </div>
  );
};

// const mapStateToProps = state => {
//   return { user: state.user };
// };

// export default connect(mapStateToProps)(Creator);
export default Creator;
