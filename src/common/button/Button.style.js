import styled, { css } from "styled-components";

const ButtonWrapper = styled.button`
  position: relative;
  width: 10vw;
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  align-items: center;
  font-family: "Press Start 2P";
  line-height: 22px;
  text-align: center;
  font-weight: 400;
  font-size: 18px;
  text-transform: uppercase;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 1;

  svg {
    margin-right: 10px;
    font-size: 24px;
  }

  .hover-shape {
    position: absolute;
    transition: all 0.4s;
    width: 15px;

    &.shape-left {
      left: 7px;
      top: 7px;
    }
    &.shape-right {
      right: -40px;
      top: 7px;
      transform: rotate(90deg);
      visibility: hidden;
      opacity: 0;
    }

    &.shape-black {
      display: none;
      visibility: hidden;
      opacity: 0;
    }
  }

  &:hover {
    .shape-right {
      right: 7px;
      visibility: visible;
      opacity: 1;
    }

    &::before {
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.35);
    }
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    content: "";
    transition: all 0.4s;
    z-index: -1;
  }

  ${({ sm }) =>
    sm &&
    css`
      width: 150px;
      height: 50px;
    `}
    ${({ pl }) =>
    pl &&
    css`
      width: 50px;
      height: 50px;
    `}
  ${({ lg }) =>
    lg &&
    css`
      width: 200px;
      height: 60px;

      .hover-shape {
        width: 24px;
      }
    `}
    ${({ variant }) =>
    variant === "outline" &&
    css`
      border: 2px solid rgba(255, 255, 255, 0.2);
      color: #ffffff;

      &:hover {
        &::before {
          background: rgba(255, 255, 255, 0.2);
        }
      }
    `} 
    ${({ variant }) =>
    variant === "hovered" &&
    css`
      background: rgba(255, 255, 255, 0.35);
      color: #ffffff;

      &:hover {
        &::before {
          background: rgba(255, 255, 255, 0.2);
        }
      }
    `} 
    ${({ variant }) =>
    variant === "buy" &&
    css`
      background: #228D57;
      color: #E8E9C9;
      border: none;
      border-radius: 25px;
      font-size: 14px;


      &:hover {
        color: #3E3E3C;
        &::before {
          background: #E8E9C9;
          opacity: 0.8;
        }
      }
    `}
    ${({ variant }) =>
    variant === "play" &&
    css`
      border-radius: 25px;


      &:hover {
        &::before {
          background-color: #6bdcfe;
          background-repeat: repeat;
          background-position: center;
          opacity: 0.1;
        }
      }
    `}
    ${({ variant }) =>
    variant === "telegram" &&
    css`
      border: none;
      border-radius: 5px;
      .hover-shape {
        &.shape-black {
          display: block;
          visibility: visible;
          opacity: 1;
        }
        &.shape-white {
          display: none;
          visibility: hidden;
          opacity: 0;
        }
      }

      &:hover {
        &::before {
          background: #1d9dda;
          opacity: 0.75;
        }
      }
    `}
    ${({ variant }) =>
    variant === "discord" &&
    css`
      background: #fe6ec7;
      color: #111111;
      border: none;
      border-radius: 5px;
      .hover-shape {
        &.shape-black {
          display: block;
          visibility: visible;
          opacity: 1;
        }
        &.shape-white {
          display: none;
          visibility: hidden;
          opacity: 0;
        }
      }

      &:hover {
        &::before {
          background: #5865f2;
          opacity: 0.75;
        }
      }
    `}    
    ${({ variant }) =>
    variant === "blue" &&
    css`
      background: #3E3E3C;
      color: #E8E9C9;
      border: none;



      &:hover {
        &::before {
          background: #228D57;
        }
      }
    `}
`;

export default ButtonWrapper;
