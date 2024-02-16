import styled, { keyframes } from 'styled-components';

import outer from "../../../assets/images/cloudtest.png"
import bg1 from "../../../assets/images/bg1.webp"

const flash = keyframes `
  0%, 100% { opacity: 1; }
  50% { opacity: 0.65; filter: hue-rotate(30deg);}
`

const rainbowanim = keyframes `
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const MainPageStyleWrapper = styled.div`
  display: grid;
  grid-template-rows: 2fr 1fr;
  grid-template-columns: 3fr 1fr;
  height: 100vh;
  width: 100%;
  background-image: url(${bg1});

  font-family: "Patrick Hand";
  font-weight: 600;

  a {
    font-family: "Patrick Hand";
    font-weight: 600;
  }

  .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1000; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.6); /* Black w/ opacity */
    font-family: 'Patrick Hand';
    font-size: 30px;
    font-weight: 600;
    z-index: 10000;


  }
  
  /* Modal Content/Box */
  .modal-main::before {
    content: '';
    position: absolute;
    top: 0px; /* Adjust to fit within the border */
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-image: url(${bg1}); /* Adjust to your desired interior color */
    z-index: -1; /* Behind the content but above the background */
  }
  .modal-main {
    margin: 15% auto; /* 15% from the top and centered */

    width: 36%; /* Could be more or less, depending on screen size */
    height: 40%;
    position: relative; 
    border: 16px solid #000; 
    border-image: url(${outer}) 16 16 16 16 repeat;
    z-index: 1;

    .modal-input {
      text-align: center;
      width: 220px;
    }

    .balance-value {
      &:hover {
        color: white;
        text-shadow: 1px 1px 1px #D66DE9, 
        2px 2px 1px #efa032, 
        3px 3px 1px #46b59b, 
        4px 4px 1px #017e7f;
        cursor: pointer;
    }
    }

    .undertext {
      font-size: 16px;
      margin-bottom: -3px;
    }

    .modal-inner {
      height: calc(100% + 12px); /* Add 10px to the height */
      width: calc(100% + 12px); /* Add 10px to the width */
      position: relative; 
      border: 16px solid #000; 
      border-image: url(${outer}) 16 16 16 16 repeat;
      z-index: 1;
      top: -6px;
      left: -6px;
    }

    .modal-inner::before {
      content: '';
      position: absolute;
      top: 0px; /* Adjust to fit within the border */
      right: 0px;
      bottom: 0px;
      left: 0px;
      background-image: url(${bg1}); /* Adjust to your desired interior color */
      transform: scaleX(-1);
      z-index: -1; /* Behind the content but above the background */
    }

    .logo{
      position: absolute;
      left: 15px;
      top: 15px;
    }

    .balance-title {
      font-size: 36px;
      text-shadow: 1px 1px 3px #D66DE9, 
      2px 2px 3px #efa032, 
      3px 3px 3px #46b59b, 
      4px 4px 3px #017e7f;
      margin-bottom: -7px;
    }
    .close-button {
      font-weight: 600;
      border-radius: 5px;
      background-color: #DDFFEE;
      font-size: 20px;
      margin-left: 5px;
      position: absolute;
      right: 15px;
      top: 15px;

      &:hover {
        filter: hue-rotate(180deg);
      }
    }
    .modal-button-container {
      margin-top: 10px;
    }
    
    .modal-button {
      font-weight: 600;
      border-radius: 5px;
      background-color: #DDFFEE;
      font-size: 30px;
      margin-left: 5px;

      &:hover {
        filter: hue-rotate(180deg);
      }
    }
  }
  /* mini games Modal Content/Box */
  .mini-games-modal-main::before {
    content: '';
    position: absolute;
    top: 0px; /* Adjust to fit within the border */
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-image: url(${bg1}); /* Adjust to your desired interior color */
    z-index: -1; /* Behind the content but above the background */
  }
  .mini-games-modal-main {

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 36%;
    height: 42%;
    position: relative; 
    border: 16px solid #000; 
    border-image: url(${outer}) 16 16 16 16 repeat;
    z-index: 1;

    .modal-button-container {
      display: flex;
      flex-direction: column;
      justify-content: center; /* Centers children vertically */
      align-items: center; /* Centers children horizontally */
      height: 100%; /* Ensure this is set to fill the parent container */
      margin-top: 50px;
    }
    
    .game {
      display: flex;
      flex-direction: column; /* Stack children vertically */
      align-items: center; /* Center children horizontally */
      width: 100%; /* Adjust as needed */
      height: 100%; /* Adjust based on your requirements */
    }
    .game a {
      display: flex;
      flex-direction: column; /* Stack children vertically */
      align-items: center; /* Center children horizontally */
      width: 100%; /* Adjust as needed */
      height: 100%; /* Adjust based on your requirements */
      font-size: 30px;
    }

    
    .box {
      width: 40%; /* 60% of the container width */
      height: 72px; /* 20% of the .game container's height */
      margin: 1% 0; /* Adds a small gap between the boxes */
      display: flex;
      justify-content: center;
      align-items: center;
      color: #333; /* Text color, change as needed */
      border-radius: 4px; /* Optional, for rounded corners */
      cursor: pointer;
      border: 8px solid #000;
      z-index: 1;
      position: relative;

      border-image: url(${outer}) 16 16 16 16 repeat;
      text-shadow: 1px 1px 3px #D66DE9, 
      2px 2px 3px #efa032, 
      3px 3px 3px #46b59b, 
      4px 4px 3px #017e7f; 
      &:hover {
        filter: hue-rotate(180deg);
        color: white;
      }
    }

    .box::before {
      content: '';
      position: absolute;
      top: 0px; /* Adjust to fit within the border */
      right: 0px;
      bottom: 0px;
      left: 0px;
      z-index: -1; /* Behind the content but above the background */
    }
    .box:nth-child(1)::before {
      content: "";
      background-color: #FFEDED;
    }
    
    .box:nth-child(2)::before {
      content: "";
      background-color: #EDFFED; 
    }
    
    .box:nth-child(3)::before {
      content: "";
      background-color: #EBEBFF;
    }

    }

    .mini-games-modal-inner {
      height: calc(100% + 12px); /* Add 10px to the height */
      width: calc(100% + 12px); /* Add 10px to the width */
      position: relative; 
      border: 16px solid #000; 
      border-image: url(${outer}) 16 16 16 16 repeat;
      z-index: 1;
      top: -6px;
      left: -6px;
    }

    .mini-games-modal-inner::before {
      content: '';
      position: absolute;
      top: 0px; /* Adjust to fit within the border */
      right: 0px;
      bottom: 0px;
      left: 0px;
      background-image: url(${bg1}); /* Adjust to your desired interior color */
      transform: scaleX(-1);
      z-index: -1; /* Behind the content but above the background */
    }

    .logo{
      position: absolute;
      left: 15px;
      top: 15px;
    }

    .close-button {
      font-weight: 600;
      border-radius: 5px;
      background-color: #DDFFEE;
      font-size: 20px;
      margin-left: 5px;
      position: absolute;
      right: 15px;
      top: 15px;

      &:hover {
        filter: hue-rotate(180deg);
      }
    }

  }

  /* flip games Modal Content/Box */

  .input-box-container {
    display: flex;
    flex-direction: row;
    gap: 10px;

  }

  .currency-name {
    font-size: 26px;
    display: flex;
    align-items: center;
    text-shadow: 1px 1px 3px #D66DE9, 
    2px 2px 3px #efa032, 
    3px 3px 3px #46b59b, 
    4px 4px 3px #017e7f;
  }
  
  .flip-modal-main::before {
    content: '';
    position: absolute;
    top: 0px; /* Adjust to fit within the border */
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-image: url(${bg1}); /* Adjust to your desired interior color */
    z-index: -1; /* Behind the content but above the background */
  }
  .flip-modal-main {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 36%;
    height: 42%;
    position: relative; 
    border: 16px solid #000; 
    border-image: url(${outer}) 16 16 16 16 repeat;
    z-index: 1;

    .win {
      color: green;
      animation: ${flash} 0.8s linear infinite;
    }
    
    .lose {
      color: red;
    }

    .pending {
      color: grey;
      animation: ${flash} 1.5s linear infinite;
    }
  
    .result-message-left {
      position: absolute;
      right: 20px;
      top: 110px;
      font-weight: 600;
      font-size: 36px;
      opacity: 50%;
    }
    .result-message-right {
      position: absolute;
      left: 20px;
      top: 110px;
      font-weight: 600;
      font-size: 36px;
      opacity: 50%;
    }

    .playing-card {
      height: 180px;
      width: auto;
    }

    .card-container {
      height: 180px;
      width: auto;
      position: relative; 
      border: 8px solid #000; 
      border-image: url(${outer}) 16 16 16 16 repeat;
    }

    .select-pattern {
      margin-top: 20px;
      height: 35px;
      width: 70px;
      font-size: 16px;
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border: 4px solid #000; 
      border-image: url(${outer}) 16 16 16 16 repeat;
      z-index: 1;
      background-color: #DDFFEE;
      position: relative;

      &:hover {
        filter: hue-rotate(180deg);
      }
    }

    .input-box::-webkit-inner-spin-button,
    .input-box::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    
    .input-box {

      text-align: center;
      font-size: 16px;
      margin: 5px 0;
      width: 100px;
      height: 40px;
    }

    .selection-buttons {
      gap: 10px;
      font-size: 12px;
      display: flex;
      flex-direction: row;
      cursor: pointer;
      text-align: center;
      margin-bottom: 5px;

      .selection {
        width: 70px; /* 60% of the container width */
        border: 4px solid #000; 
        border-image: url(${outer}) 16 16 16 16 repeat;
        z-index: 1;
      }
      .selection:nth-child(1) {
        content: "";
        border: none;
      }
      .selection:nth-child(2) {
        content: "";
        background-color: #FFEDED;
      }
      
      .selection:nth-child(3) {
        content: "";
        background-color: #E6E7FF; 
      }
      
      .selection:nth-child(4) {
        content: "";
        background-color: #FFF9E6;
      }
    }

    .bet-summary {
      font-size: 16px;
    }

    .modal-button-container {
      display: flex;
      flex-direction: column;
      justify-content: center; /* Centers children vertically */
      align-items: center; /* Centers children horizontally */
      height: 100%; /* Ensure this is set to fill the parent container */
      margin-top: 10px;
    }
    
    .game {
      display: flex;
      flex-direction: column; /* Stack children vertically */
      justify-content: center;
      align-items: center; /* Center children horizontally */
      width: 100%; /* Adjust as needed */
      height: 100%; /* Adjust based on your requirements */
      gap: 10px;
    }

    .striped::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 5px, /* smaller stripe size */
        rgba(0, 0, 0, 0.2) 5px,
        rgba(0, 0, 0, 0.2) 10px
      );
    }

    .box-container {
      display: flex;
      flex-direction: row; /* Stack children vertically */
      gap: 10px;
    }
    
    .box {
      width: 70px; /* 60% of the container width */
      height: 70px; /* 20% of the .game container's height */
      margin: 1% 0; /* Adds a small gap between the boxes */
      display: flex;
      justify-content: center;
      align-items: center;
      color: #333; /* Text color, change as needed */
      border-radius: 4px; /* Optional, for rounded corners */
      cursor: pointer;
      border: 4px solid #000;
      z-index: 1;
      position: relative;
      font-size: 16px;
      border-image: url(${outer}) 16 16 16 16 repeat;
      opacity: 40%;
      
      &:hover {
        opacity: 100%;
      }

      .red-gif {
        filter: hue-rotate(300deg);
        z-index: 2;
      }
      .blue-gif {
        filter: hue-rotate(160deg);
        z-index: 2;
      }
      .yellow-gif {
        filter: hue-rotate(350deg);
        z-index: 2;
      }

    }  
    .highlighted {
      opacity: 100%;
    }
    .container {
      display: flex;
      min-width: 70px;

      height: 100%;
      perspective: 100px;
    }
    
    .card.flipped {
      transform: rotateY(180deg);
    }
    
    .card {
      min-width: 70px;
      height: 100%;
      width: 100%;
      position: relative;
      transition: transform 1500ms;
      transform-style: preserve-3d;
    }

    .high-low-card {
      height: 180px;
      width: auto;

      position: relative;
      transition: transform 1500ms;
      transform-style: preserve-3d;
    }
    
    .front,
    .back {

      height: 100%;
      width: 100%;
      position: absolute;
      backface-visibility: hidden;

    }
    
    .front {
      
    }
    
    .back {
      background-color: #3a3a3a;
      transform: rotateY(180deg);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5rem;

    }

    .container, .card, .front, .back {
      box-sizing: border-box;
      min-width: 62px;
      min-height: 62px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: none;
      border: none;
      z-index: 2;
    }

    .box::before {
      content: '';
      position: absolute;
      top: 0px; /* Adjust to fit within the border */
      right: 0px;
      bottom: 0px;
      left: 0px;
      z-index: -1; /* Behind the content but above the background */
    }
    .box:nth-child(2)::before {
      content: "";
      background-color: #FFEDED;
    }
    
    .box:nth-child(3)::before {
      content: "";
      background-color: #E6E7FF; 
    }
    
    .box:nth-child(4)::before {
      content: "";
      background-color: #FFF9E6;
    }

    }

    .flip-modal-inner {
      height: calc(100% + 12px); /* Add 10px to the height */
      width: calc(100% + 12px); /* Add 10px to the width */
      position: relative; 
      border: 16px solid #000; 
      border-image: url(${outer}) 16 16 16 16 repeat;
      z-index: 1;
      top: -6px;
      left: -6px;
    }

    .flip-modal-inner::before {
      content: '';
      position: absolute;
      top: 0px; /* Adjust to fit within the border */
      right: 0px;
      bottom: 0px;
      left: 0px;
      background-image: url(${bg1}); /* Adjust to your desired interior color */
      transform: scaleX(-1);
      z-index: -1; /* Behind the content but above the background */
    }

    .logo{
      position: absolute;
      left: 15px;
      top: 15px;
    }

    .close-button {
      font-weight: 600;
      border-radius: 5px;
      background-color: #DDFFEE;
      font-size: 20px;
      margin-left: 5px;
      position: absolute;
      right: 15px;
      top: 15px;

      &:hover {
        filter: hue-rotate(180deg);
      }
    }

    .bet-history {
      font-weight: 600;
      border-radius: 5px;
      background-color: #DDFFEE;
      font-size: 20px;
      margin-left: 5px;
      position: absolute;
      right: 15px;
      bottom: 15px;

      &:hover {
        filter: hue-rotate(180deg);
      }
    }

    .reset {
      font-weight: 600;
      border-radius: 5px;
      background-color: #DDFFEE;
      font-size: 20px;
      margin-left: 5px;
      position: absolute;
      left: 15px;
      bottom: 15px;

      &:hover {
        filter: hue-rotate(180deg);
      }
    }

  }

  /* high low games Modal Content/Box */


  
  .hl-modal-main::before {
    content: '';
    position: absolute;
    top: 0px; /* Adjust to fit within the border */
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-image: url(${bg1}); /* Adjust to your desired interior color */
    z-index: -1; /* Behind the content but above the background */
  }
  .hl-modal-main {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 36%; /* Could be more or less, depending on screen size */
    height: 42%;
    position: relative; 
    border: 16px solid #000; 
    border-image: url(${outer}) 16 16 16 16 repeat;
    z-index: 1;

    .win {
      color: green;
      animation: ${flash} 0.8s linear infinite;
    }
    
    .lose {
      color: red;
    }

    .pending {
      color: grey;
      animation: ${flash} 1.5s linear infinite;
    }
  
    .result-message-left {
      position: absolute;
      right: 50px;
      top: 110px;
      font-weight: 600;
      font-size: 48px;
      opacity: 50%;
    }
    .result-message-right {
      position: absolute;
      left: 50px;
      top: 110px;
      font-weight: 600;
      font-size: 48px;
      opacity: 50%;
    }

    .input-box::-webkit-inner-spin-button,
    .input-box::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    
    .input-box {
      text-align: center;
      font-size: 16px;
      margin: 5px 0;
      width: 100px;
      height: 40px;
    }

    .input-box-container {
      display: flex;
      flex-direction: row;
      gap: 10px;

    }
    .currency-name {
      font-size: 26px;
      display: flex;
      align-items: center;
      text-shadow: 1px 1px 3px #D66DE9, 
      2px 2px 3px #efa032, 
      3px 3px 3px #46b59b, 
      4px 4px 3px #017e7f;
    }

    .bet-summary {
      font-size: 16px;
    }

    .modal-button-container {
      display: flex;
      flex-direction: column;
      justify-content: center; /* Centers children vertically */
      align-items: center; /* Centers children horizontally */
      height: 100%; /* Ensure this is set to fill the parent container */
      margin-top: 10px;
    }
    
    .game {
      display: flex;
      flex-direction: column; /* Stack children vertically */
      justify-content: center;
      align-items: center; /* Center children horizontally */
      width: 100%; /* Adjust as needed */
      height: 100%; /* Adjust based on your requirements */
      gap: 10px;
    }
    
    .highlighted {
      opacity: 100%;
    }
    .container {
      display: flex;
      position: relative; 
      perspective: 800px;
    }
    
    .card.flipped {
      transform: rotateY(180deg);
    }
    
    .card {


      position: relative;
      transition: transform 1500ms;
      transform-style: preserve-3d;
    }
    
    .front,
    .back {

      position: absolute;
      backface-visibility: hidden;

    }
    
    .front {
      
    }
    
    .back {
      background-color: #3a3a3a;
      transform: rotateY(180deg);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5rem;

    }

    .container, .card, .front, .back {
      box-sizing: border-box;
      width: 127px;
      height: 170px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: none;
      border: none;
      z-index: 2;
    }
    .front, .back {
      border: 8px solid #000; 
      border-image: url(${outer}) 16 16 16 16 repeat;
    }

    .buttons-container {
      display: flex;
      justify-content: center;
      gap: 10px;
    }
    
    .bet-button {
      padding: 5px 10px;
      cursor: pointer;
      font-weight: 600;
      border-radius: 5px;
      background-color: #DDFFEE;
      font-size: 24px;
      text-transform: uppercase;
      text-shadow: 1px 1px 3px #D66DE9, 
      2px 2px 3px #efa032, 
      3px 3px 3px #46b59b, 
      4px 4px 3px #017e7f;
  
      &:hover {
        filter: hue-rotate(180deg);
        color: white;
      }
    }

    }

    .hl-modal-inner {
      height: calc(100% + 12px); /* Add 10px to the height */
      width: calc(100% + 12px); /* Add 10px to the width */
      position: relative; 
      border: 16px solid #000; 
      border-image: url(${outer}) 16 16 16 16 repeat;
      z-index: 1;
      top: -6px;
      left: -6px;
    }

    .hl-modal-inner::before {
      content: '';
      position: absolute;
      top: 0px; /* Adjust to fit within the border */
      right: 0px;
      bottom: 0px;
      left: 0px;
      background-image: url(${bg1}); /* Adjust to your desired interior color */
      transform: scaleX(-1);
      z-index: -1; /* Behind the content but above the background */
    }

    .logo{
      position: absolute;
      left: 15px;
      top: 15px;
    }

    .close-button {
      font-weight: 600;
      border-radius: 5px;
      background-color: #DDFFEE;
      font-size: 20px;
      margin-left: 5px;
      position: absolute;
      right: 15px;
      top: 15px;

      &:hover {
        filter: hue-rotate(180deg);
      }
    }

    .bet-history {
      font-weight: 600;
      border-radius: 5px;
      background-color: #DDFFEE;
      font-size: 20px;
      margin-left: 5px;
      position: absolute;
      right: 15px;
      bottom: 15px;

      &:hover {
        filter: hue-rotate(180deg);
      }
    }

    .reset {
      font-weight: 600;
      border-radius: 5px;
      background-color: #DDFFEE;
      font-size: 20px;
      margin-left: 5px;
      position: absolute;
      left: 15px;
      bottom: 15px;

      &:hover {
        filter: hue-rotate(180deg);
      }
    }

  }




  .place-bet-button {
    width: auto;
    padding: 0.5vw 1vw;
    font-weight: 600;
    border-radius: 5px;
    background-color: #DDFFEE;


    

    cursor: pointer;
    font-size: 24px;
    text-transform: uppercase;
    transition: background-color 0.3s ease;
    white-space: nowrap; /* Prevent text wrapping */
    display: flex;
    align-items: center;
    justify-content: center;
    align-text: center;

    text-shadow: 1px 1px 3px #D66DE9, 
    2px 2px 3px #efa032, 
    3px 3px 3px #46b59b, 
    4px 4px 3px #017e7f;

    &:hover {
      filter: hue-rotate(180deg);
      color: white;
    }
  
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
    font-family: 'Patrick Hand';
    font-size: 14px;
    font-weight: 600;
  }
  
  /* Show/Hide classes */
  .display-block {
    display: block;
  }
  
  .display-none {
    display: none;
  }

  .header {
    text-shadow: 1px 1px 3px #D66DE9, 
    2px 2px 3px #efa032, 
    3px 3px 3px #46b59b, 
    4px 4px 3px #017e7f; 
  }

  .game-box {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    display: flex;
    justify-content: center;
    align-items: center;

    .game-outer {
      width: 100%; /* 98% of game-box */
      height: 100%;

      display: flex;
      justify-content: center;
      align-items: center;

      .game-inner {
        width: 100%; /* 95% of game-outer */
        height: 100%; /* 95% of game-outer */
        background-color: #244744;

        .game-main {
          flex-grow: 1;
          height: 100%;
          background-color: #ffffff;
        }
      }
    }
  }

  .login-chat-box {
    z-index: 11;
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    min-height: 0;


    .login-outer {
      width: 100%; 
      height: 100%;


      display: flex;
      justify-content: center;
      align-items: center;
      


      .login-inner {
        width: 100%;
        height: 100%;

        display: grid;
        grid-template-rows: 1fr 9fr;

        .chat-box {
          grid-row: 2 / 8;
          font-family: "Patrick Hand";
        
        }
        .connect-wallet {
          grid-row: 1 / 2;
          font-family: "Patrick Hand";  

          display: flex;
          justify-content: left;
          align-items: center;
          
          background-color: #FFF4FF;
          gap: 25px;
          border: 4px solid #000;
          border-bottom: 0px;
          border-image: url(${outer}) 8 8 8 8 repeat;

          .lottie {
            position: relative;
            padding-right: 60px;
          }

        }

      }
    }
  }
  
  .functions-box {
    grid-row: 2 / 3;
    grid-column: 1 / 2;


    .functions-outer {
      margin-left: 0px;
      width: 100%; /* 98% of game-box */
      height: 100%; /* 98% of game-box */

      display: flex;
      justify-content: center;
      align-items: center;
      .functions-inner {
        width: 100%; /* 95% of game-outer */
        height: 100%; /* 95% of game-outer */

        display: flex;  /* Added this */
        flex-direction: column;  /* Added this */
        font-family: "Patrick Hand"; 
        gap: 5px;

        .bet-choices {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-grow: 0.35;  /* Added this */

          gap: 10px;
          

          .bet-options {
            font-size: 24px; /* Matched from .currency-choice */
            font-weight: 600; /* Matched from .currency-choice */
            flex-grow: 0.8;

            display: flex;
            flex-direction: row; 
            margin-left: 5px;
            
            justify-content: space-between; 
            position: relative; 
            border: 4px solid #000; 
            border-image: url(${outer}) 8 8 8 8 repeat; 
            z-index: 1; 
            text-shadow: 1px 1px 3px #D66DE9, 
                         2px 2px 3px #efa032, 
                         3px 3px 3px #46b59b, 
                         4px 4px 3px #017e7f; 
            
          }

          .container-1,.container-2,.container-3,.container-4 {
            margin-left: -25px;
            margin-top: -20px;
            width: 110px;
            height: 110px;
            transform: scaleX(-1);

          }

          .container-1 {

            filter: hue-rotate(90deg);
          }
          .container-2 {

            filter: hue-rotate(180deg);
          }
          .container-3 {

            filter: hue-rotate(270deg);
          }
          .container-4 {

            filter: hue-rotate(360deg);
          }

          .bet-options::before {
            content: '';
            position: absolute;
            top: 0px; /* Adjust to fit within the border */
            right: 0px;
            bottom: 0px;
            left: 0px;
            background-color: #FFF6F4; /* Adjust to your desired interior color */
            z-index: -1; /* Behind the content but above the background */
          }
          

            .bet-options1 {
              flex-grow: 1;
              
              display: flex;
              justify-content: center;
              align-items: center;
              border: 8px solid #000; 
              border-image: url(${outer}) 8 8 8 8 repeat; 
              position: relative;
              &:hover {
                filter: contrast(70%);
              }
            }
            .bet-options1::before {
              content: '';
              position: absolute;
              top: 0px; /* Adjust to fit within the border */
              right: 0px;
              bottom: 0px;
              left: 0px;
              background-color: #F4F6FF; /* Adjust to your desired interior color */
              z-index: -1; /* Behind the content but above the background */
            }
            .bet-options2 {
              flex-grow: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              border: 8px solid #000; 
              border-image: url(${outer}) 8 8 8 8 repeat;
              position: relative; 
            }
            .bet-options2::before {
              content: '';
              position: absolute;
              top: 0px; /* Adjust to fit within the border */
              right: 0px;
              bottom: 0px;
              left: 0px;
              background-color: #FFF4F4; /* Adjust to your desired interior color */
              z-index: -1; /* Behind the content but above the background */
            }
            .bet-options3 {
              flex-grow: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              border: 8px solid #000; 
              border-image: url(${outer}) 8 8 8 8 repeat;
              position: relative; 
            }
            .bet-options3::before {
              content: '';
              position: absolute;
              top: 0px; /* Adjust to fit within the border */
              right: 0px;
              bottom: 0px;
              left: 0px;
              background-color: #FFFAF4; /* Adjust to your desired interior color */
              z-index: -1; /* Behind the content but above the background */
            }
            .bet-options4 {
              flex-grow: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              border: 8px solid #000; 
              border-image: url(${outer}) 8 8 8 8 repeat;
              position: relative; 
            }
            .bet-options4::before {
              content: '';
              position: absolute;
              top: 0px; /* Adjust to fit within the border */
              right: 0px;
              bottom: 0px;
              left: 0px;
              background-color: #FEF4FF; /* Adjust to your desired interior color */
              z-index: -1; /* Behind the content but above the background */
            }
            .bet-options1,.bet-options2,.bet-options3,.bet-options4 {
              flex-direction: column; /* Stack children vertically */
              .odds-display {
                font-size: 16px;
                position: relative;
                margin-bottom: 10px;

                text-shadow: 0px 0px 0px #D66DE9; 
    
              }
              &:hover {
                filter: contrast(70%);
              }
            }



          .bet-balances {

            flex-grow: 0.7;
            height: 100%;
            display: flex;  /* Added this */
            flex-direction: row;
            gap: 10px;


            .currency-choice {
              font-size: 44px;
              font-weight: 600;
              flex-grow: 0.1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              position: relative;
              padding-left: 5px;
              text-align: center;

              border: 8px solid #000;
              gap: 10px;
          
              border-image: url(${outer}) 8 8 8 8 repeat;
              z-index: 2;
              text-shadow: 1px 1px 3px #D66DE9, 
              2px 2px 3px #efa032, 
              3px 3px 3px #46b59b, 
              4px 4px 3px #017e7f;

              .select-currency-button {
                border-radius: 5px;
                font-weight: 600;
                text-shadow: 1px 1px 3px #D66DE9, 
                2px 2px 3px #efa032, 
                3px 3px 3px #46b59b, 
                4px 4px 3px #017e7f;
                background-color: #DDFFEE;

                &:hover {
                  filter: hue-rotate(180deg);
                }
              }

              .select-currency {
                font-size: 24px;
              }

            }
            .currency-choice::before {
              content: ''; /* Required for pseudo-elements */
              position: absolute;
              top: 0px; /* Adjust these values to match your border width */
              right: 0px;
              bottom: 0px;
              left: 0px;
              background-color: #FAFFEA; /* Your desired interior color */
              z-index: -1; /* Ensures it doesn't cover the content */
            }
            
            .currency-dropdown {
              position: absolute;
              top: 100%;
              left: 0;
              width: 100%;
              z-index: 1000;
              font-size: 18px;
            }
            
            .currency-dropdown div {
              background-color: #FAFFEA;
              cursor: pointer;
              border: 6px solid #000;
          
              border-image: url(${outer}) 8 8 8 8 repeat;

              display: flex; /* Make the div a flex container */
              justify-content: center; /* Center content horizontally */
              align-items: center; /* Center content vertically, if needed */
              text-align: center; /* Center-align the text */

              &:hover {
                color: black;
                cursor: pointer;
                text-shadow: 1px 1px 1px #D66DE9, 
                2px 2px 1px #efa032, 
                3px 3px 1px #46b59b, 
                4px 4px 1px #017e7f;
              }
            }
            .winnings-balance {
              font-size: 22px;
              font-weight: 600;
              flex-grow: 0.4;
              display: flex;
              flex-direction: column;
              align-items: center;
              position: relative;
              border: 8px solid #000;
              border-image: url(${outer}) 8 8 8 8 repeat;
              z-index: 1;
              text-shadow: 1px 1px 3px #D66DE9, 
                           2px 2px 3px #efa032, 
                           3px 3px 3px #46b59b, 
                           4px 4px 3px #017e7f;
              .referrals-number {
                text-shadow: 0px 0px 0px #D66DE9;

              }

              .claim-referrals-button {
                font-weight: 600;
                border-radius: 5px;
                background-color: #DDFFEE;
                font-size: 14px;
                margin-left: 5px;

                &:hover {
                  filter: hue-rotate(180deg);
                }
              }
              .submit-referrals-button {
                font-weight: 600;
                border-radius: 5px;
                background-color: #DDFFEE;
                font-size: 14px;
                margin-left: 5px;

                &:hover {
                  filter: hue-rotate(180deg);
                }
              }

              .referral-input-box {
                font-size: 12px;
              }

            }
            
            .winnings-balance::before {
              content: '';
              position: absolute;
              top: 0px;  /* Adjust these values to match your border width */
              right: 0px;
              bottom: 0px;
              left: 0px;
              background-color: #EBEAFF; /* Your desired interior color */
              z-index: -1; /* Ensures it doesn't cover the content */
            }
            .user-house-balance {
              font-size: 20px;
              font-weight: 600;
              flex-grow: 0.6;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              position: relative;
              border: 8px solid #000;
              border-image: url(${outer}) 8 8 8 8 repeat;
              z-index: 1;


              .balance-title {
                font-size: 24px;
                text-shadow: 1px 1px 3px #D66DE9, 
                2px 2px 3px #efa032, 
                3px 3px 3px #46b59b, 
                4px 4px 3px #017e7f;
                margin-bottom: -7px;
                margin-top: -7px;
              }
              

              .house-modal-button {
                font-size: 16px;
                font-weight: 600;
                border-radius: 5px;
                background-color: #DDFFEE;

                &:hover {
                  filter: hue-rotate(180deg);
                }
              }
            }
            
            .user-house-balance::before {
              content: '';
              position: absolute;
              top: 0px;  /* Ensure these match the border thickness */
              right: 0px;
              bottom: 0px;
              left: 0px;
              background-color: #FFF6EA; /* Your desired interior color */
              z-index: -1; /* Ensure this is behind the content */
            }

            .misc-functions::before {
              content: '';
              position: absolute;
              top: 0px;  /* Ensure these match the border thickness */
              right: 0px;
              bottom: 0px;
              left: 0px;
              background-color: #FFF6EA; /* Your desired interior color */
              z-index: -1; /* Ensure this is behind the content */
            }
            
            .misc-functions {

              flex-grow: 0.1;
              display: flex;
              flex-direction: column;

              border: 6px solid #000;
              border-image: url(${outer}) 8 8 8 8 repeat;
              position: relative;
              z-index: 1;

              gap: 5px;
              width: 170px;



              .misc-top {
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100%;

                font-size: 16px;
                border: 8px solid #000;
                border-image: url(${outer}) 8 8 8 8 repeat;
                position: relative;
                z-index: 1;

                .request-finish-button {
                  font-weight: 600;
                  border-radius: 5px;
                  background-color: #DDFFEE;

                  &:hover {
                    filter: hue-rotate(180deg);
                  }
                }
              }

              .misc-top::before {
                content: '';
                position: absolute;
                top: 0px;  /* Ensure these match the border thickness */
                right: 0px;
                bottom: 0px;
                left: 0px;
                background-color: #FCE6FE; /* Your desired interior color */
                z-index: -1; /* Ensure this is behind the content */
              }

              .misc-bottom {
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100%;
                border: 8px solid #000;
                border-image: url(${outer}) 8 8 8 8 repeat;
                position: relative;
                z-index: 1;


                text-align: center;

                .minigames {
                  font-weight: 600;
                  border-radius: 5px;
                  background-color: #DDFFEE;


                  &:hover {
                    filter: hue-rotate(180deg);
                  }

                  .minigames-text {
                    font-size: 24px;
                    background-image: linear-gradient(to left, #3B0086, #1EFFBC, #F896D8, #6874E8, #FF6663);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-size: 600% 600%;
                    animation: ${rainbowanim} 6s ease-in-out infinite;
                    &:hover {
                      filter: hue-rotate(180deg);
                    }
                  }
                }

              }
              .misc-bottom::before {
                content: '';
                position: absolute;
                top: 0px;  /* Ensure these match the border thickness */
                right: 0px;
                bottom: 0px;
                left: 0px;
                background-color: #EBDDFF; /* Your desired interior color */
                z-index: -1; /* Ensure this is behind the content */
              }
            }

          }
        }

        .bet-functions {
          flex-grow: .65;  /* Added this */




          .bet-main {

            flex-grow: 1;
            height: 100%;

            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            gap: 5px;



          .bet-main-top {

            flex-grow: 0.4;
            width: 100%;
            font-family: "Patrick Hand";
            display: flex;
            justify-content: center;
            align-items: center;

            flex-direction: row;

            position: relative;
            border: 8px solid #000;
            border-image: url(${outer}) 8 8 8 8 repeat;
            z-index: 1;
            

            .bet-main-top-left {
              background: beige;
              flex-grow: 1;
              height: 100%;
              font-family: "Patrick Hand";
              display: flex;
              justify-content: center;
              align-items: center;


              .bet-defaults {
                background: gold;
                flex-grow: 1;
                height: 100%;
                font-family: "Patrick Hand";
                display: flex;
                justify-content: center;
                align-items: center;
              }
  
            }

            .bet-main-top-right {
              background: lime;
              flex-grow: 1;
              height: 100%;
              font-family: "Patrick Hand";
              display: flex;
              justify-content: center;
              align-items: center;

              flex-direction: row;

              gap: 5px;


              .bet-main-top-right-left {
                background: red;
                flex-grow: 1;
                height: 100%;
                font-family: "Patrick Hand";
                display: flex;
                justify-content: center;
                align-items: center;


                gap: 5px;

                .bet-main-top-right-left-raceid {
                  background: grey;
                  flex-grow: 1.5;
                  height: 100%;
                  font-family: "Patrick Hand";
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }

                .bet-main-top-right-left-id {
                  background: silver;
                  flex-grow: 1;
                  height: 100%;
                  font-family: "Patrick Hand";
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              }

              .bet-main-top-right-right {
                background: lightblue;
                flex-grow: 1;
                height: 100%;
                font-family: "Patrick Hand";
                display: flex;
                justify-content: center;
                align-items: center;


                gap: 5px;

                .check-bet {
                  background: salmon;
                  flex-grow: 1;
                  height: 100%;
                  font-family: "Patrick Hand";
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }

                .bet-id {
                  background: LemonChiffon;
                  flex-grow: 1;
                  height: 100%;
                  font-family: "Patrick Hand";
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              }
  
            }

          }

          .bet-main-top::before {
            content: '';
            position: absolute;
            top: 0px;  /* Ensure these match the border thickness */
            right: 0px;
            bottom: 0px;
            left: 0px;
            background-color: #E6FDFE; /* Your desired interior color */
            z-index: -1; /* Ensure this is behind the content */
          }

          .bet-main-bottom {
            flex-grow: 0.6;
            width: 100%;
            font-family: "Patrick Hand";
            display: flex;
            justify-content: center;
            align-items: center;

            position: relative;
            z-index: 1;
            gap: 5px;


            .bet-box {

              flex-grow: 1;
              width: 100%;
              font-family: "Patrick Hand";
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;

              flex-direction: row;

              position: relative;
              z-index: 1;

              border: 6px solid #000;
              border-image: url(${outer}) 8 8 8 8 repeat;

            }


              .bet-box::before {
                content: '';
                position: absolute;
                top: 0px;  /* Ensure these match the border thickness */
                right: 0px;
                bottom: 0px;
                left: 0px;
                background-color: #FAFFEA; /* Your desired interior color */
                z-index: -1; /* Ensure this is behind the content */
              }

              .bet-amount {
                flex-grow: 1;

                font-family: "Patrick Hand";
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;


             
                .bet-amount-inner {
                  flex-grow: 1;
                  font-family: "Patrick Hand";
                  font-size: 36px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  height: 100%;
                  border: 8px solid #000;
                  border-image: url(${outer}) 8 8 8 8 repeat;
                  position: relative;
                  z-index: 1;

                  text-shadow: 1px 1px 3px #D66DE9, 
                  2px 2px 3px #efa032, 
                  3px 3px 3px #46b59b, 
                  4px 4px 3px #017e7f;

                  .token-balance {
                    text-shadow: none;
                    font-size: 18px;
                    display: flex;
                    flex-direction: row;

                    .wrap-button {
                      font-weight: 600;
                      border-radius: 5px;
                      background-color: #DDFFEE;
                      font-size: 14px;
                      margin-left: 5px;

                      .copy-icon {
                        margin-top: -5px;
                      }
      
                      &:hover {
                        filter: hue-rotate(180deg);
                      }
                    }
                  }

                  .max-bet {
                    font-size: 16px;
                    text-shadow: 0px 0px 0px #D66DE9;
                  }

                  .bet-amount-input-box {
                    max-width: 150px;
                    border-radius: 5px;
                    font-size: 26px;
                    text-align: center;
                  }

                }
                .bet-amount-inner::before {
                  content: '';
                  position: absolute;
                  top: 0px;  /* Ensure these match the border thickness */
                  right: 0px;
                  bottom: 0px;
                  left: 0px;
                  background-color: #FEF4FF; /* Your desired interior color */
                  z-index: -1; /* Ensure this is behind the content */
                }
              }

              .bet-selection {
                flex-grow: 0.15;
                font-family: "Patrick Hand";
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                border: 8px solid #000;
                border-image: url(${outer}) 8 8 8 8 repeat;
                position: relative;
                z-index: 1;
              }
              
              .bet-selection::before {
                content: '';
                position: absolute;
                top: 0px;  /* Ensure these match the border thickness */
                right: 0px;
                bottom: 0px;
                left: 0px;
                background-color: #F4F6FF; /* Your desired interior color */
                z-index: -1; /* Ensure this is behind the content */
              }

              .bet-selection-inner {
                margin-left: -25px;
                margin-top: -20px;
                width: 125px;
                height: 125px;
                transform: scaleX(-1);
              }

              
              .bet-placement {
                flex-grow: 1;
                font-family: "Patrick Hand";
                font-size: 36px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100%;

                border: 8px solid #000;
                border-image: url(${outer}) 8 8 8 8 repeat;
                position: relative;
                z-index: 1;

                text-shadow: 1px 1px 3px #D66DE9, 
                2px 2px 3px #efa032, 
                3px 3px 3px #46b59b, 
                4px 4px 3px #017e7f;

                .bet-button {
                  font-size: 36px;
                  font-weight: 600;
                  background-color: #DDFFEE;

                  border-radius: 5px;

                  text-shadow: 1px 1px 3px #D66DE9, 
                  2px 2px 3px #efa032, 
                  3px 3px 3px #46b59b, 
                  4px 4px 3px #017e7f;

                  &:hover {
                    filter: hue-rotate(180deg);
                  }
                }

                /* CSS to modify the bet-button when it's disabled */
                .bet-button:disabled {
                  text-shadow: none;

                  &:hover {
                    filter: none;
                  }
                }

                .bet-summary {
                  font-size: 16px;
                  text-shadow: 0px 0px 0px #D66DE9;
                }
              }

              .bet-placement::before {
                content: '';
                position: absolute;
                top: 0px;  /* Ensure these match the border thickness */
                right: 0px;
                bottom: 0px;
                left: 0px;
                background-color: #FFF4F4; /* Your desired interior color */
                z-index: -1; /* Ensure this is behind the content */
              }
            

            .bet-results {
              
              flex-grow: 1;
              width: 70%;
              font-family: "Patrick Hand";
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;

              flex-direction: row;

              border: 8px solid #000;
              border-image: url(${outer}) 8 8 8 8 repeat;
              position: relative;
              z-index: 1;
              
              text-shadow: 1px 1px 3px #D66DE9, 
              2px 2px 3px #efa032, 
              3px 3px 3px #46b59b, 
              4px 4px 3px #017e7f;
              

            }

            .bet-results::before {
              content: '';
              position: absolute;
              top: 0px;  /* Ensure these match the border thickness */
              right: 0px;
              bottom: 0px;
              left: 0px;
              background-color: #FFF4F4; /* Your desired interior color */
              z-index: -1; /* Ensure this is behind the content */
            }

              .bet-result {

                flex-grow: 2;
                width: 100%;
                font-family: "Patrick Hand";
                display: flex;
                flex-direction: column;
                align-items: center;
                height: 100%;

                border: 8px solid #000;
                border-image: url(${outer}) 8 8 8 8 repeat;
                position: relative;
                z-index: 1;
                font-size: 24px;

                .refresh-button {
                  font-weight: 600;
                  border-radius: 5px;
                  background-color: #DDFFEE;
                  position: absolute;
                  right: 5px;
                  top: 5px;
                  padding-top: 5px;
                  padding-bottom: 5px;

                  .refresh-img {
                    display: block; /* This can help remove extra space around the image */
                    margin: auto; /* This centers the image in the button */
                  }

                  &:hover {
                    filter: hue-rotate(180deg);
                  }
                }

                .bet-result-title {
                  margin-top: -5px;
                  margin-bottom: -5px;
                }

                .status-won {
                  color: green;
                  animation: ${flash} 1.5s linear infinite;
                }
                .status-claimed {
                  color: green;
                  animation: ${flash} 3.5s linear infinite;
                }
                
                .status-lost {
                  color: darkred; /* Adjust color as needed */
                }
                
                .status-pending {
                  color: #cc9900; /* dark yellow, adjust color as needed */
                  animation: ${flash} 2.5s linear infinite;
                }

                .pre-connect-display {
                  text-shadow: 0px 0px 0px #D66DE9;
                }

                .claim-bet-button {
                  font-weight: 600;
                  font-size: 16px; // Consider increasing this if the button is too small to read.
                  border-radius: 5px;
                  background-color: #DDFFEE;
                  height: 18px; // Match the line height of recent-bets or adjust accordingly.
                  line-height: 18px; // Ensuring text is vertically centered.
                  padding: 0 5px; // Adjust horizontal padding if needed, keep vertical padding 0.
                  display: inline-flex; // Utilizing flexbox for centering text.
                  align-items: center; // Align text vertically center.
                  justify-content: center; // Align text horizontally center.
                  margin-left: 5px;
                  
                  &:hover {
                    filter: hue-rotate(180deg);
                  }
                }
                
                .recent-bets {
                  font-size: 16px;
                  line-height: 18px; // Ensure this matches the button's height for alignment.
                  text-shadow: 0px 0px 0px #D66DE9;


                }
                

              }

              .bet-result::before {
                content: '';
                position: absolute;
                top: 0px;  /* Ensure these match the border thickness */
                right: 0px;
                bottom: 0px;
                left: 0px;
                background-color: #E6FDFE; /* Your desired interior color */
                z-index: -1; /* Ensure this is behind the content */
              }

              .bet-misc-functions {
                flex-grow: 0.5;

                font-family: "Patrick Hand";
                font-weight: 600;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                flex-direction: column;
                gap: 5px;
                text-shadow: 1px 1px 3px #D66DE9, 
                  2px 2px 3px #efa032, 
                  3px 3px 3px #46b59b, 
                  4px 4px 3px #017e7f;


                .replay-game {


                  flex-grow: 1;

                  font-family: "Patrick Hand";
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100%;

                  width: 120px;

                  border: 8px solid #000;
                  border-image: url(${outer}) 8 8 8 8 repeat;
                  position: relative;
                  z-index: 1;
                  flex-direction: column;

                  .replay-button {
                    font-weight: 600;
                    border-radius: 5px;
                    background-color: #DDFFEE;

                    &:hover {
                      filter: hue-rotate(180deg);
                    }
                  }

                  .replay-input-box {
                    max-width: 85px;
                    border-radius: 5px;
                  }
                }

                .replay-game::before {
                  content: '';
                  position: absolute;
                  top: 0px;  /* Ensure these match the border thickness */
                  right: 0px;
                  bottom: 0px;
                  left: 0px;
                  background-color: #E6EAFE; /* Your desired interior color */
                  z-index: -1; /* Ensure this is behind the content */
                }

                .withdraw {


                  flex-grow: 1;
                  
                  font-family: "Patrick Hand";
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100%;
                  width: 100%;

                  border: 8px solid #000;
                  border-image: url(${outer}) 8 8 8 8 repeat;
                  position: relative;
                  z-index: 1;

                  .claim-bet-button {
                    font-weight: 600;
                    border-radius: 5px;

                    background-color: #DDFFEE;

                    &:hover {
                      filter: hue-rotate(180deg);
                    }
                  }
                }

                .withdraw::before {
                  content: '';
                  position: absolute;
                  top: 0px;  /* Ensure these match the border thickness */
                  right: 0px;
                  bottom: 0px;
                  left: 0px;
                  background-color: #FCE6FE; /* Your desired interior color */
                  z-index: -1; /* Ensure this is behind the content */
                }

              }
            
          }


          }
        }
      }
    }
  }

  .events-box {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    
    .events-outer {
      width: 100%; 
      height: 100%;
      background-color: #ECF6F6;
      display: flex;
      justify-content: center;
      align-items: center;  

      
      .events-inner {
        width: 100%;
        height: 100%;

        display: flex;  /* Added this */
        flex-direction: column;  /* Added this */

        border: 4px solid #000;
        border-image: url(${outer}) 8 8 8 8 repeat;

        text-shadow: 1px 1px 3px #F6ECEC, 
        2px 2px 3px #efa032, 
        3px 3px 3px #46b59b, 
        4px 4px 3px #F6ECEC;  
        
        .events-title {
          font-family: 'Patrick Hand';
          font-size: 28px;
          font-weight: 600;

          border: 8px solid #000;
          
          border-image: url(${outer}) 8 8 8 8 repeat;

          display: flex; /* Make the div a flex container */
          justify-content: center; /* Center content horizontally */
          align-items: center; /* Center content vertically, if needed */
          text-align: center; /* Center-align the text */
          

        }

        .events-feed {
          flex-grow: 1;  /* Added this */
          font-family: 'Patrick Hand';
          font-size: 15.5px;
          font-weight: 600;
          text-align: center; /* Center-align the text */

          border: 4px solid #000;        
          border-image: url(${outer}) 8 8 8 8 repeat;
          
        }

      }
    }
  }
`;

export default MainPageStyleWrapper;