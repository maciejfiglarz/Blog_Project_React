import React, { useEffect, useState } from "react";
import InfinityList from "../InfinityList";
import postActions from "../../store/post/action";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { InputFile } from "../../containers/form";

const ProfileContent = ({ paginationPost, posts, userId }) => {
  return (
    <section className="profile-content">
      <ul className="profile-content__menu">
        <li className="profile-content__menu-item">Dodane posty</li>
        <li className="profile-content__menu-item">Skomentowane</li>
      </ul>
      <div className="profile-user__list">
        <InfinityList
          posts={posts}
          pagination={paginationPost}
          params={{ user: userId }}
        />
      </div>
    </section>
  );
};

ProfileContent.propTypes = {
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
  paginationPost: postActions.pagination,
};

export default connect(mapStateToProps, actionCreators)(ProfileContent);
