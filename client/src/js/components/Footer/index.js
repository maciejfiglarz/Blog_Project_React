import React from "react";
import footerLogo from "./../../../images/footer_logo.png";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container--full">
        <div className="footer__logo">
          <img src={footerLogo} />
        </div>
        <div className="footer__menu-wrap">
          <ul className="footer__menu">
            <li className="footer__menu-item">Polityka prywatności</li>
            <li className="footer__menu-item">Regulamin</li>
            <li className="footer__menu-item">Kontakt</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
