import styled from "styled-components";

import bg2 from "../../../assets/images/bg2.webp"

import outer from "../../../assets/images/cloudtest.png"

const NavWrapper = styled.nav`
  background-color: #000;
  background-image: url(${bg2});
  border-bottom: 4px solid #000;
  border-left: 4px solid #000;
  border-right: 4px solid #000;
  border-image: url(${outer}) 16 16 16 16 repeat;
  z-index: 10;
  display: flex;
  align-items: left;
  justify-content: left;
  
  &.Degenesys_header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 10vh;
    transition: all 0.3s;
  }

  .Degenesys_menu_sect {
    height: 66px;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .Degenesys_menu_left_sect {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 5%;

    .logo {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

  }

  .Degenesys_menu_right_sect {
    width: 85%;
    display: flex;
    align-items: center;
    justify-content: left;
  }

  .Degenesys_menu_list {
    margin-left: 55px;
    margin-right: 196px;
    max-width: 514px;
    min-width: 409px;
    width: 100%;
    ul {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0;
      padding: 0;




      }

      li {
        position: relative;
        cursor: pointer;

        a {
          font-family: "Patrick Hand";
          font-style: normal;
          font-weight: 600;
          font-size: 26px;
          line-height: 22px;
          text-align: center;
          text-transform: uppercase;
          color: #251070;
        }

        &:hover {
          a {
            color: #F48CA0;
            font-family: "Patrick Hand";
            font-size: 32px;
          }
        }

        /* submenu */
        &.submenu {
          .sub_menu_sect {
            background: transparent;
            border-top: 50px solid transparent;
            position: absolute;
            top: -50px;
            left: -20px;
            width: 190px;
            visibility: hidden;
            opacity: 0;
            z-index: -100;
            transition: all 0.5s;

            .sub_menu_list {
              padding: 15px 20px;
              background: #171f25;
              flex-wrap: wrap;
              li {
                width: 100%;
                a {
                  font-family: "Bakbak One";
                  font-style: normal;
                  font-weight: 400;
                  font-size: 16px;
                  line-height: 40px;
                  color: rgba(255, 255, 255, 0.8);
                  text-transform: capitalize;
                }

                &:hover {
                  a {
                    color: #00ffa3;
                  }
                }
              }
            }
          }

          &:hover {
            .sub_menu_sect {
              top: 7px;
              visibility: visible;
              opacity: 1;
              z-index: 99;
            }
          }
        }
      }
    }
  }

  .Degenesys_menu_btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: center;
    min-width: 284px;
    button {
      color: #E8E9C9;
      font-family: "Bakbak One";
      font-weight: 400;
      font-size: 16px;

      &:hover {
        color: #E8E9C9;
        font-family: "Patrick Hand";
        font-size: 24px;
      }
    }

    .menu_btn {
      display: none;
      border: none;
      background: transparent;
      cursor: pointer;
      svg {
        font-size: 40px;
      }
    }

    .join_btn {
      font-family: "Patrick Hand";
      font-weight: 600;
      font-size: 24px;
      height: 50px;
      width: 114px;
      color: #FFF6F4;
      text-shadow: 1px 1px 3px #D66DE9, 
      2px 2px 3px #efa032, 
      3px 3px 3px #46b59b, 
      4px 4px 3px #017e7f; 
      background-color: #a86bffCF;


    }
  }

  @media (max-width: 1024px) {
    .Degenesys_menu_list {
      margin-right: 20px;
    }
  }
  @media (max-width: 991px) {
    .Degenesys_menu_right_sect {
      justify-content: end;
    }
    .Degenesys_menu_btns {
      justify-content: end;
      .menu_btn {
        display: block;
      }
    }

    .Degenesys_menu_btns {
      .join_btn {
        display: none;
      }
    }
    .Degenesys_menu_list {
      display: none;
      visibility: hidden;
      opacity: 0;
    }
  }

  @media (max-width: 667px) {
    .Degenesys_menu_btns {
      .connect_btn {
        display: none;
      }

      .menu_btn {
        svg {
          font-size: 30px;
        }
      }
    }
  }

  @media (max-width: 540px) {
    .Degenesys_menu_left_sect {
      width: 180px;
      .logo {
        img {
          width: 70px;
        }
      }
    }

    .Degenesys_menu_right_sect {
      width: 50%;
      .Degenesys_menu_right_sect {
        width: 50%;
      }
    }
  }
`;

export default NavWrapper;
