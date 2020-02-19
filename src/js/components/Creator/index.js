import React, { useState } from "react";

import { connect } from "react-redux";
import Textarea from "./Textarea";
import { useForm } from "./../../hooks/useForm";
import { imagesUrl } from "./../../constants/types";
import { RegularSubmitButton } from "./../../containers/buttons";
import Choicer from "./choicer";
import { Cover } from "./../../containers/cover";
import { imagePostUrl } from "./../../constants/types";
import { validation } from "./validation";

const Creator = () => {
  const [values, handleChange] = useForm("");
  const emptyImageUrl = imagesUrl + `empty-avatar.jpeg`;

  const [isChoicerVisible, setChoicerVisibility] = useState(false);
  const [imagePostData, setImagePost] = useState({ id: null, value: null });
  const [errors, setErrors] = useState([]);

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    setErrors(validation(imagePostData, values));
    if (errors.length > 0) {
    } else {
      resetForm();
    }
    console.log("submit", validation(imagePostData, values), event.target);
  };

  const resetForm = () => {
    setImagePost({ id: null, value: null });
    setErrors([]);
    handleChange({'content':''});
  };
  const onClickChoicer = () => {
    setChoicerVisibility(true);
  };

  console.log("imagePostData", imagePostData, errors);

  const imageUrl = !imagePostData.id
    ? emptyImageUrl
    : imagePostUrl + imagePostData.value;
  const imagePostStyle = {
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: "cover"
  };

  const validationSubmit = () => {
    console.log();
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
        {errors}
        {errors.map(error => {
          <div className="creator-content__error">{error}</div>;
        })}

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
              <RegularSubmitButton type={"submit"} text={"Dodaj"} />
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
