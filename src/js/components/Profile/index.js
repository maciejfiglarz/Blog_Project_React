import React, { useEffect } from "react";
import InfinityList from "../InfinityList";

const Profile = props => {

    let id = props.match.params.id;
    console.log('userID',id);
    return (
        <div className="container">
           <InfinityList />
        </div>
    );

}

export default Profile;


