import React, { useEffect } from "react";


const Profile = props => {
    let id = props.match.params.id;
    console.log('userID',id);
    return (
        <div className="container">
            Profile
        </div>
    );

}

export default Profile;


