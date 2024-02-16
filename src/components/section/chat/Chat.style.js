import styled from 'styled-components';
import outer from "../../../assets/images/cloudtest.png"
import bg2 from "../../../assets/images/bg2.webp"
const ChatStyleWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #F9FFF9;
  border: 6px solid #000;
  border-image: url(${outer}) 8 8 8 8 repeat;


  header {
    color: #8d99ae;

    flex: none; // Ensures it doesn't shrink or grow
    position: sticky;
    top: 0;
    background-color: #F1FEF1; // or any color that matches your design
    z-index: 1;
    
  }

  .chat-room-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0; // Allows the container to shrink

  }

  .chat-scrollable {
    flex: 1;
    overflow-y: auto;
    min-height: 0; // Allows the container to shrink

  }

  /* For Webkit browsers */
.chat-scrollable::-webkit-scrollbar {
  width: 12px; /* Width of the scrollbar */
}

.chat-scrollable::-webkit-scrollbar-thumb {
  background-color: #888; /* Color of the scroll thumb */
  border-radius: 4px; /* Radius of the scroll thumb */
}

.chat-scrollable::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Color of the scroll thumb on hover */
}

/* For Firefox */
.chat-scrollable {
  scrollbar-width: thin; /* "auto" or "thin"  */
  scrollbar-color: #888; /* thumb and track color */
}

  .chat-input-form {

    display: flex;
    justify-content: no-space;

    flex: none;
    position: sticky;

    background: #F1FEF1;
    box-sizing: border-box;
    margin: 0;

    white-space: nowrap;
    overflow: hidden;
    font-size: 20px;
    

  }

  input {
    background-color: #F1FEF1;
    font-weight: 600;

    flex-grow: 1;

    color: black;

    border: 4px solid #000;
    border-image: url(${outer}) 8 8 8 8 repeat;
    text-align: center;
    
  }

  button {
    flex-shrink: 0;
    background-color: #FFF4FF;
    border: 4px solid #000;
    border-image: url(${outer}) 8 8 8 8 repeat;   
  }

  .uid {
    font-family: 'Patrick Hand';
    font-weight: 600;
    font-size: 20px;
    color: black;
    margin: 0px 0; // Reduces the vertical margin between chat entries
    text-shadow: 2px 2px 2px #fff;
    margin-left: 10px;
    border: 8px solid #000;
    border-image: url(${outer}) 8 8 8 8 repeat;  
  }
  
  p {
    background-color: #FFF4FF;
    font-family: 'Patrick Hand';
    font-weight: 600;
    font-size: 20px;
    color: black;
    margin: 0px 0; // Reduces the vertical margin between chat entries
    text-shadow: 2px 2px 2px #fff;
    margin-left: 20px;

    border: 4px solid #000;
    border-image: url(${outer}) 8 8 8 8 repeat;   

  }
`;

export default ChatStyleWrapper;

