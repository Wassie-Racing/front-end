import { useModal } from "../../../utils/ModalContext";
import { useEffect, useRef, useState } from "react";
import { FaDiscord} from "react-icons/fa";
import { BsTelegram } from "react-icons/bs";
import { MdNotes } from "react-icons/md";
import Button from "../../button";
import NavWrapper from "./Header.style";
import MobileMenu from "../../../components/section/header/mobileMenu/MobileMenu";
import logo from "../../../assets/images/USDpluslogo.webp";

import logoalt from "../../../assets/images/USDpluslogoalt.webp";


import React from 'react';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'

import { Web3Button} from "@web3modal/react";

import { Web3NetworkSwitch } from '@web3modal/react';

import logotesting from  '../../../assets/images/altlogo2.webp'



const Header = () => {
  const [isOpen, setIsOpen] = useState(false);


const [isMobileMenu, setMobileMenu] = useState(false);
const handleMobileMenu = () => {
  setMobileMenu(!isMobileMenu);
};


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
        <div className="Degenesys_menu_right_sect">
          <div className="Degenesys_menu_list">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/flip">Flip</a>
              </li>
              <li>
                <a href="#about">Game Details</a>
              </li>
            </ul>
          </div>
          <div className="Degenesys_menu_btns">
          <a href="https://t.me/MDMAToken" aria-label="join telegram button">
              <Button sm variant="telegram" className="join_btn">
                <BsTelegram /> Join
              </Button>
            </a>    
            <a href="https://discord.gg/GFajQmAB67" aria-label="join discord button">
              <Button sm variant="discord" className="join_btn">
                <FaDiscord /> Join
              </Button>
            </a>        
            <button className="menu_btn" onClick={handleMobileMenu} aria-label="mobile menu button">
              <MdNotes />
            </button>
          </div>

        </div>
      </div>
      {isMobileMenu && <MobileMenu mobileMenuhandle={handleMobileMenu} />}
    </div>
  </NavWrapper>
);
};

export default Header;
