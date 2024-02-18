import { useEffect} from "react";

import { BsTelegram } from "react-icons/bs";

import Button from "../../../../common/button";
import NavWrapper from "./Header.style";

import React from 'react';

import logotesting from  '../../../../assets/images/altlogo2.webp'


const Header = () => {

useEffect(() => {
  const header = document.getElementById("navbar");
  const handleScroll = window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

  return () => {
    window.removeEventListener("sticky", handleScroll);
  };
}, []);

return (
  <NavWrapper className="Degenesys_header" id="navbar">
    <div className="container">
      <div className="Degenesys_menu_sect">
        <div className="Degenesys_menu_left_sect">
          <div className="logo" width="298" height="78">
            <a href="/">
              <img src={logotesting}/>

            </a>
          </div>
        </div>
        <div className="Degenesys_menu_right_sect Degenesys_v1_menu_right_sect">
          <div className="Degenesys_menu_list">
            <ul>
              <li>
                <a href="/flip">Flip</a>
              </li>
              <li>
                <a href="/highlow">HiLo</a>
              </li>
              <li>
                <a href="https://docs.wassieracing.com/">Game Details</a>
              </li>
            </ul>
          </div>
          <div className="Degenesys_menu_btns">
          <a href="https://t.me/WassieRacing" aria-label="join telegram button">
              <Button sm variant="telegram" className="join_btn">
                <BsTelegram /> Join
              </Button>
            </a>    
      

          </div>

        </div>
      </div>

    </div>
  </NavWrapper>
);
};

export default Header;
