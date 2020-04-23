import { isMaxLength, isMinLength } from "./../helper/validation";
import API from "./../helper/api";

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

const uploadTemponaryPhoto = (data) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return API.post(`/post/photo-temponary`, data, config);
};

const validation = (params) => {
  const {
    title,
    content,
    titlePost,
    contentPost,
    type,
    photo,
    youtube,

    link,
    linkPhoto,
    linkTitle,
    linkContent,
  } = params;

  let errors = {};

  switch (type) {
    case "post":
      errors = validPost({ titlePost, contentPost, errors, photo });
      break;
    case "link":
      errors = validLink({
        linkPhoto,
        link,
        title,
        linkTitle,
        linkContent,
        errors,
      });
      break;
    default:
    // code block
  }

  console.log("errors", errors);
  return { isValid: errors.length == 0 ? true : false, errors };
};

const validPost = (params) => {
  const { titlePost, contentPost, photo, errors } = params;
  console.log("paramsValid", params);
  if (isMinLength(titlePost, 0)) {
    errors["titlePost"] = "Musisz wybrać tytuł";
  }
  if (isMaxLength(titlePost, 255)) {
    errors["titlePost"] = "Wybrany tytuł jest z długi";
  }
  if (isMinLength(photo, 0)) {
    errors["photo"] = "Musisz dołączyć zdjęcie";
  }
  if (isMinLength(contentPost, 0)) {
    errors["contentPost"] = "Musisz dołączyć opis";
  }

  return errors;
};

const validLink = (params) => {
  const { linkPhoto, link, linkTitle, linkContent, errors } = params;
  if (isMinLength(link, 1)) {
    errors["link"] = "Musisz wybrać link";
  }
  if (isMinLength(linkTitle, 1)) {
    errors["linkTitle"] = "Musisz wybrać tytuł";
  }
  if (isMaxLength(linkTitle, 1)) {
    errors["linkTitle"] = "Wybrany tytuł jest z długi";
  }
  return errors;
};

const postMenagerServices = {
  validation,
  getLinkData,
  uploadTemponaryPhoto,
  removeTemponaryPhoto,
};

export default postMenagerServices;
