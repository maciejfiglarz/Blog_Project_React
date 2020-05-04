import React, { useEffect, useState } from "react";

import userServices from "./../../services/user";
import postActions from "./../../store/post/action";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ProfileUser from "./user";
import ProfileContent from "./content";

const Profile = ({ pagination, posts, alert, match, user }) => {
  const id = match.params.id;
  const [userProfile, setUserProfile] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await userServices.fetchById({ id });
      const { data } = result;
      setUserProfile(data);
    };
    fetchUserData();
  }, []);

  return (
    <div className="container">
      <div className="profile">
        <ProfileUser user={user} userProfile={userProfile} />
        <ProfileContent userId={userProfile._id} />
      </div>
    </div>
  );
};

Profile.propTypes = {
  posts: PropTypes.object,
  loading: PropTypes.func,
  pagination: PropTypes.func,
  alert: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = (state) => {
  const { alert, posts, user } = state;
  return { alert, posts };
};

const actionCreators = {
  pagination: postActions.pagination,
};

export default connect(mapStateToProps, actionCreators)(Profile);
