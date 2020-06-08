import React, { useState } from "react";
import { PrimaryBtn } from "../../../containers/buttons";
import { uploadsUrl } from "../../../constants/types";
import { connect } from "react-redux";
import { InputFile } from "../../../containers/form";
import postMenagerServices from "./../../../services/post-menager";
import { Message } from "../../../containers/message";
import { Loader } from "../../../containers/loader";
import PropTypes from "prop-types";

const CreatorWorkspace = ({
  title,
  titleTop,
  isTitleTop,
  content,
  photo,
  setPhoto,
  alert,
  color,
  setColor,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleInputFile = async (e) => {
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

  const remove = () => {
    setPhoto("");
    postMenagerServices.removeTemponaryPhoto(photo);
  };

  const handleColor = (e) => {
    const newColor = e.target.dataset.color;
    setColor(newColor);
  };

  const colorsArray = ["#ffb23e", "#00D000", "#F02000", "#0090F0", "#FF8CFC"];
const styleTitle = {
  color,
}
  return (
    <div className="creator-graphic">
      <div className="creator-graphic__workspace-wrap">
        <div className="creator-graphic__workspace-options">
          {colorsArray.map((el) => {
            return (
              <div
                data-color={el}
                onClick={handleColor}
                style={{ backgroundColor: el }}
                className={`creator-graphic__workspace-color ${
                  color == el
                    ? "creator-graphic__workspace-color--active"
                    : ""
                }`}
              ></div>
            );
          })}
        </div>

        {alert.message && <Message alert={alert} field="graphicPhoto" />}
        {isTitleTop && (
          <div style={styleTitle} className="creator-graphic__workspace-title creator-graphic__workspace-title--top">
            {titleTop}
          </div>
        )}
        <div className="creator-graphic__workspace-photo">
          {isLoading && <Loader />}
          {!isLoading && !photo && (
            <InputFile name="graphicFile" onChange={handleInputFile} />
          )}

          {photo && (
            <>
              <img src={uploadsUrl + "/post-temponary/" + photo} />
              <div className="creator-graphic__workspace-footer">
                <i onClick={remove} className="fas fa-trash-alt"></i>
              </div>
            </>
          )}
        </div>
        {title && (
          <div style={styleTitle} className="creator-graphic__workspace-title">{title}</div>
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
