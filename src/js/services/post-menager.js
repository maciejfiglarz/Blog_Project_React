import { isMaxLength, isMinLength } from "../helper/validation";
import API from "../helper/api";

const insertPost = async (params) => {
  const { user } = params;

  const config = {
    headers: {
      headers: { Authorization: "Bearer " + user.token },
    },
  };

  return API.post(`/post-menager/insert-post`, params, config);
};

const getLinkData = (url) => {
  return API.post(`/post-menager/get-link-data`, {
    url,
  });
};

const removeTemponaryPhoto = (photo) => {
  return API.post(`/post-menager/photo-temponary/remove`, {
    photo,
  });
};

const uploadTemponaryPhoto = async (data) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return API.post(`/post-menager/photo-temponary`, data, config);
};

const validationPost = (params) => {
  const { title, content, photo, isPhotoActive,isAcceptRules } = params;
  let errors = {};

  if (isMinLength(title, 1)) {
    errors["postTitle"] = "Musisz wybrać tytuł";
  }
  if (isMaxLength(title, 255)) {
    errors["postTitle"] = "Wybrany tytuł jest z długi";
  }
  if (isPhotoActive) {
    if (isMinLength(photo, 0)) {
      errors["postPhoto"] = "Musisz dołączyć zdjęcie";
    }
  }
  if (isMinLength(content, 0)) {
    errors["postContent"] = "Musisz dołączyć opis";
  }
  if (!isAcceptRules) {
    errors["postIsAcceptRules"] = "Musisz zakceptować regulamin";
  }


  return { isValid: Object.keys(errors).length == 0 ? true : false, errors };
};
const validationGraphic = (params) => {
  const { title, photo, isTitleTop, titleTop,isAcceptRules } = params;
  let errors = {};

  if (isMinLength(title, 1)) {
    errors["graphicTitle"] = "Musisz wybrać tytuł";
  }

  if (isTitleTop) {
    if (isMinLength(titleTop, 1)) {
      errors["graphicTitleTop"] =
        "Jeśli zaznaczyłeś górny tytuł musisz go wpisać";
    }
  }

  if (isMinLength(photo, 1)) {
    errors["graphicPhoto"] = "Musisz wybrać zdjęcie";
  }
  console.log('isAccept',isAcceptRules);
  if (!isAcceptRules) {
    errors["graphicIsAcceptRules"] = "Musisz zakceptować regulamin";
  }

  return { isValid: Object.keys(errors).length == 0 ? true : false, errors };
};

const validationLink = (params) => {
  const { title, content, link, linkPhoto,isCorrectLink } = params;
  let errors = {};

  if (isCorrectLink) {
    errors["link"] = "Wybrany link jest nieprawidłowy";
  }
  if (isMinLength(link, 1)) {
    errors["link"] = "Musisz wybrać link";
  }
  if (isMinLength(title, 1)) {
    errors["linkTitle"] = "Musisz wybrać tytuł";
  }
  if (isMaxLength(title, 255)) {
    errors["linktitle"] = "Wybrany tytuł jest z długi";
  }
  return { isValid: Object.keys(errors).length == 0 ? true : false, errors };
};

const postMenagerServices = {
  validationPost,
  validationLink,
  validationGraphic,
  getLinkData,
  uploadTemponaryPhoto,
  removeTemponaryPhoto,
  insertPost,
};

export default postMenagerServices;
