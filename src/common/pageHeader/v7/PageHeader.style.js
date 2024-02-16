import styled, { keyframes } from 'styled-components';
import outer from "../../../assets/images/cloudtest.png"
import bg1 from "../../../assets/images/bg1.webp"

import wassieIdle1 from "../../../components/section/game/idlespritesnopack.png"
import wassieEnd1 from "../../../components/section/game/endpritesnopack.png";
const flash = keyframes `
  0%, 100% { opacity: 1; }
  50% { opacity: 0.65; filter: hue-rotate(30deg);}
`

const PageHeaderStyleWrapper = styled.div`
  font-family: 'Patrick Hand';
  height: 100vh;
  width: 100%;
  background-image: url(${bg1});
  font-family: "Patrick Hand";
  font-weight: 600;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);

  }

  .chat-box {
    position: absolute;
    right: 1vw;
    padding-top: 10vh;
    padding-bottom: 10vh;
    height: 100%;
    width: 26vw;
  
  }

  .dropdown-container {
    position: relative; /* Establish a positioning context */
    display: inline-block; /* Or block, depending on your layout */
    height: 48px;
    font-size: 24px;

  }

  .select-currency-button {
    border-radius: 5px;
    font-weight: 600;
    text-shadow: 1px 1px 3px #D66DE9, 
    2px 2px 3px #efa032, 
    3px 3px 3px #46b59b, 
    4px 4px 3px #017e7f;
    background-color: #DDFFEE;

    border: 6px solid #000;
    border-image: url(${outer}) 8 8 8 8 repeat;



    &:hover {
      filter: hue-rotate(180deg);
    }
  }

  .select-currency {
    font-size: 24px;
  }

  .currency-dropdown {
    position: absolute;
    top: 100%; /* Position just below the button */
    left: 0;
    background-color: #FAFFEA;
    border: 6px solid #000;
    border-image: url(${outer}) 8 8 8 8 repeat;
    z-index: 1000; /* Ensure it sits above other content */
    width: 100%; /* Match the width to the button or adjust as needed */
  
    display: flex;
    flex-direction: column; /* Stack the currency options */
  }
  
  .currency-dropdown div {
    cursor: pointer;
    text-align: center;
    border: 4px solid #000;
    border-image: url(${outer}) 8 8 8 8 repeat;
  
    &:hover {
      color: black;
      text-shadow: 1px 1px 1px #D66DE9, 
      2px 2px 1px #efa032, 
      3px 3px 1px #46b59b, 
      4px 4px 1px #017e7f;
    }
  }

  .header {
    position: relative; /* This makes the .header div a reference point for absolute positioning */
    font-size: 36px;
    text-shadow: 1px 1px 3px #D66DE9, 
    2px 2px 3px #efa032, 
    3px 3px 3px #46b59b, 
    4px 4px 3px #017e7f;
  }
  
  .header nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%; /* This makes the navigation bar span the entire width of the .header div */
  }
  
  .header ul {
    font-size: 36px;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex; /* This displays the list items inline */
    justify-content: space-around; /* This distributes the space between the list items evenly */
  }
  
  .header li {
    /* Style for list items, if needed */
  }
  
  .header a {
    font-family: "Patrick Hand";
    font-size: 46px;
    text-decoration: none;
    color: #000; /* Change the color as needed */
    padding: 10px; /* Add padding for clickable area */
    display: block;
    &:hover {
      color: #F48CA0;
      font-family: "Patrick Hand";
      font-size: 50px;
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
    left: 40%;
    transform: translate(-50%, -50%);
    width: 65vw;
    height: 80vh;
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
      top: 50%;
      font-weight: 600;
      font-size: 48px;
      opacity: 50%;
    }
    .result-message-right {
      position: absolute;
      left: 50px;
      top: 50%;
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
      margin-bottom: 20px;
      margin-top: 20px;

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
      font-size: 26px;
    }

    .modal-button-container {
      display: flex;
      flex-direction: column;
      justify-content: center; /* Centers children vertically */
      align-items: center; /* Centers children horizontally */
      height: 100%; /* Ensure this is set to fill the parent container */
      margin-top: 10vh;
    }
    
    .game {
      display: flex;
      flex-direction: column; /* Stack children vertically */
      justify-content: center;
      align-items: center; /* Center children horizontally */
      width: 100%; /* Adjust as needed */
      height: 100%; /* Adjust based on your requirements */
      gap: 20px;
    }
    
    .highlighted {
      opacity: 100%;
    }
    .container {
      display: flex;
      position: relative; 
      perspective: 2600px;
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
      width: 27vh;
      height: 37vh;
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
      border: 8px solid #000; 
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

  }


`;

export default PageHeaderStyleWrapper;
