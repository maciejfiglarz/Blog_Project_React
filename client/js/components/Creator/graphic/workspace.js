import React, { useState } from "react";
import { PrimaryBtn } from "../../../containers/buttons";
import { uploadsUrl } from "../../../constants/types";
import { connect } from "react-redux";
import { InputFile } from "../../../containers/form";
import postMenagerServices from "./../../../services/post-menager";
import { Message } from "../../../containers/message";
import { Loader } from "../../../containers/loader";
import PropTypes from "prop-types";

const CreatorWorkspace = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    title,
    titleTop,
    isTitleTop,
    content,
    photo,
    setPhoto,
    alert,
  } = props;

  const handleInputFile = async (e) => {
    setIsLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("photo", file);
    console.log("odpalone");

    const result = await postMenagerServices.uploadTemponaryPhoto(formData);
    const { data } = result;
    const { fileName } = data;
    console.log("fileName", fileName);
    setPhoto(fileName);
    setIsLoading(false);
  };

  const remove = () => {
    setPhoto("");
    postMenagerServices.removeTemponaryPhoto(photo);
  };

  console.log("photo", isLoading, photo);

  return (
    <div className="creator-graphic">
      <div className="creator-grahic__workspace-wrap">
        {alert.message && <Message alert={alert} field={"graphicPhoto"} />}
        {isTitleTop && (
          <div className="creator-graphic__workspace-title creator-graphic__workspace-title--top">
            {titleTop}
          </div>
        )}
        <div className="creator-graphic__workspace-photo">
          {isLoading && <Loader />}
          {!isLoading && !photo && (
            <InputFile name={"graphicFile"} onChange={handleInputFile} />
          )}

          {photo && (
            <React.Fragment>
              <div className="creator-graphic__workspace-uploaded">
                <img src={uploadsUrl + "/post-temponary/" + photo} />
                <div className="creator-graphic__workspace-footer">
                  <i onClick={remove} className="fas fa-trash-alt"></i>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
        {title && (
          <div className="creator-graphic__workspace-title">{title}</div>
        )}
        {content && (
          <div className="creator-graphic__workspace-description">
            {content}
          </div>
        )}
      </div>
    </div>
  );
};

CreatorWorkspace.propTypes = {
  title: PropTypes.string,
  titleTop: PropTypes.string,
  content: PropTypes.string,
  photo: PropTypes.string,
  setPhoto: PropTypes.func,
  alert: PropTypes.object,
};

const mapStateToProps = (state) => {
  const { alert, user } = state;
  return { alert, user };
};

export default connect(mapStateToProps)(CreatorWorkspace);
