import React, { useState } from "react";

import { connect } from "react-redux";
import Textarea from "./Textarea";
import { useForm } from "./../../hooks/useForm";
import { imagesUrl } from "./../../constants/types";
import { RegularButton } from "./../../containers/buttons";
import Choicer from "./choicer";
import { Cover } from "./../../containers/cover";
import { imagePostUrl } from "./../../constants/types";

const Creator = () => {
  const [values, handleChange] = useForm("");
  const emptyImageUrl = imagesUrl + `empty-avatar.jpeg`;
  // const [state, setState] = useState({ isChoicerVisable: false});

  const [isChoicerVisible, setChoicerVisibility] = useState(false);
  const [imagePostData, setImagePost] = useState({ id: null, value: null });

  const handleSubmit = event => {
    event.preventDefault();
  };

  const onClickChoicer = () => {
    setChoicerVisibility(true);
  };

  console.log("imagePostData", imagePostData);

  const imageUrl = !imagePostData.id
    ? emptyImageUrl
    : imagePostUrl + imagePostData.value;
  const imagePostStyle = {
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: 'cover'
  };


  return (
    <div className={"creator"}>
      <Cover isVisable={isChoicerVisible} />
      <Choicer
        isVisable={isChoicerVisible}
        setVisibility={setChoicerVisibility}
        setImage={setImagePost}
      />

      <div className={"creator__image"} style={imagePostStyle}></div>

      <div className="creator-content">
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            value={values.content}
            className={"creator__textarea"}
            name="content"
          ></textarea>

          <div className="creator-submenu">
            <div className={"creator-submenu__functionality"}>
              <i onClick={onClickChoicer} className="far fa-image"></i>
            </div>

            <div className="creator-submenu__action">
              <RegularButton text={"Dodaj"} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// const mapStateToProps = state => {
//   return { user: state.user };
// };

// export default connect(mapStateToProps)(Creator);
export default Creator;
