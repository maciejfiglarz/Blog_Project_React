import React, { useState } from "react";
import { PrimaryBtn } from "./../../../containers/buttons";
import { uploadsUrl } from "./../../../constants/types";

import {
  InputText,
  Checkbox,
  TextArea,
  InputFile,
} from "./../../../containers/form";

import { Message } from "./../../../containers/message";
import { Loader } from "./../../../containers/loader";
import PropTypes from "prop-types";

const CreatorWorkspace = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    setTitle,
    title,
    setTitleTop,
    titleTop,
    setContent,
    content,
    photo,
    setPhoto,
  } = props;
  const onChange = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("photo", file);

    const result = await postMenagerServices.uploadTemponaryPhoto(formData);
    const { data } = result;
    const { fileName } = data;
    setPhoto(fileName);
    setIsLoading(false);
  };

  return (
    <div className="creator-graphic">
      <div className="creator-grahic__photo-wrap">
        >{alert.message && <Message alert={alert} field={"titlePost"} />}
        <div className="creator-graphic__photo">
          {isLoading && <Loader />}
          {!isLoading && !photo && <InputFile onChange={onChange} />}

          {photo && (
            <React.Fragment>
              <div className="creator-graphic__photo-uploaded">
                <img src={uploadsUrl + "/post-temponary/" + photo} />
              </div>
            </React.Fragment>
          )}
        </div>
        {/* {photo && (
          <div className="creator-form__photo-footer">
            <i onClick={remove} className="fas fa-trash-alt"></i>
          </div>
        )} */}
      </div>
    </div>
  );
};

CreatorWorkspace.propTypes = {
  setTitle: PropTypes.funct,
  title: PropTypes.string,
  setTitleTop: PropTypes.func,
  titleTop: PropTypes.string,
  setContent: PropTypes.func,
  content: PropTypes.string,
  setPhoto: PropTypes.func,
  photo: PropTypes.string,
};

export default CreatorWorkspace;
