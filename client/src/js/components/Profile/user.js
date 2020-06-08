import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { uploadsUrl } from "./../../constants/types";
import emptyAvatar from "./../../../images/empty_avatar.jpeg";
import userActions from "./../../store/user/action";
import { InputFile } from "./../../containers/form";

const ProfileUser = ({ user, userProfile, updateAvatar }) => {
  const [isLoading, setIsLoading] = useState();
  const isLogged = user.isLogged;
  const handleInputFile = (e) => {
    setIsLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatarFile", file);
    updateAvatar(formData, user);
  };

  const avatarStyle = (photo) => {
    const imageUrl = photo ? `${uploadsUrl}/avatar/${photo}` : emptyAvatar;
    return {
      backgroundImage: `url('${imageUrl}')`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
    };
  };
  return (
    <section className="profile-user">
      {userProfile && (
        <>
          <div
            className="profile-user__avatar"
            style={avatarStyle(isLogged ? user.avatar : userProfile.avatar)}
          ></div>
          <div className="profile-user__info">
            <h3 className="profile-user__info-username">
              {userProfile.username}
            </h3>
            {isLogged && (
              <InputFile name="avatarFile" onChange={handleInputFile} />
            )}
          </div>
        </>
      )}
    </section>
  );
};

ProfileUser.propTypes = {
  user: PropTypes.object,
  updateAvatar: PropTypes.func,
  userProfile: PropTypes.object,
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const actionCreators = {
  updateAvatar: userActions.updateAvatar,
};

export default connect(mapStateToProps, actionCreators)(ProfileUser);
