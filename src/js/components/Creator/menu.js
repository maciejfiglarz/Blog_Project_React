import React from "react";

const CreatorMenu = () => {
  const handleClick = event => {
    const name = event.target.dataset.name;
    actionMenu(name);
    actionContent(name);
  };

  const actionMenu = name => {
    const menuArray = document.querySelectorAll(".creator-switcher__menu-tab");

    menuArray .forEach(el => {
      if (el.dataset.name == name) {
        el.classList.add("creator-switcher__menu-tab--active");
      } else {
        el.classList.remove("creator-switcher__menu-tab--active");
      }
    });
  };

  const actionContent = name => {
    const contentArray = document.querySelectorAll(
      ".creator-switcher__content"
    );

    contentArray.forEach(el => {
      if (el.dataset.name == name) {
        el.classList.add("creator-switcher__content--active");
      } else {
        el.classList.remove("creator-switcher__content--active");
      }
    });
  };

  return (
    <div className="creator-switcher">
      <ul onClick={handleClick} className="creator-switcher__menu">
        <li
          data-name="post"
          className="creator-switcher__menu-tab creator-switcher__menu-tab--active"
        >
          <i className="creator-switcher__menu-icon fas fa-align-left"></i>
          Post
        </li>
        <li
          onClick={handleClick}
          data-name="photo"
          className="creator-switcher__menu-tab"
        >
          <i className="creator-switcher__menu-icon far fa-image"></i>
          Zdjęcie
        </li>
        <li
          onClick={handleClick}
          data-name="youtube"
          className="creator-switcher__menu-tab"
        >
          <i className="creator-switcher__menu-icon fab fa-youtube"></i>
          Youtube
        </li>
        <li
          onClick={handleClick}
          data-name="link"
          className="creator-switcher__menu-tab"
        >
          <i className="creator-switcher__menu-icon fas fa-link"></i> Link
        </li>
      </ul>
    </div>
  );
};

export default CreatorMenu;
