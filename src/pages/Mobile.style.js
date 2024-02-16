import styled, { keyframes } from 'styled-components';

import bg1 from "../assets/images/bg1.webp"

import wassieIdle1 from "../components/section/game/idlespritesnopack.png";


const ball = keyframes`
  0% { background-position: 0% 0%;  }
  1.6666666666666667% { background-position: 5.2631578947368425% 0%;  }
  3.3333333333333335% { background-position: 10.526315789473685% 0%;  }
  5% { background-position: 15.789473684210526% 0%;  }
  6.666666666666667% { background-position: 21.05263157894737% 0%;  }
  8.333333333333332% { background-position: 26.31578947368421% 0%;  }
  10% { background-position: 31.57894736842105% 0%;  }
  11.666666666666666% { background-position: 36.8421052631579% 0%;  }
  13.333333333333334% { background-position: 42.10526315789474% 0%;  }
  15% { background-position: 47.36842105263158% 0%;  }
  16.666666666666664% { background-position: 52.63157894736842% 0%;  }
  18.333333333333332% { background-position: 57.89473684210526% 0%;  }
  20% { background-position: 63.1578947368421% 0%;  }
  21.666666666666668% { background-position: 68.42105263157895% 0%;  }
  23.333333333333332% { background-position: 73.6842105263158% 0%;  }
  25% { background-position: 78.94736842105263% 0%;  }
  26.666666666666668% { background-position: 84.21052631578948% 0%;  }
  28.333333333333332% { background-position: 89.47368421052632% 0%;  }
  30% { background-position: 94.73684210526316% 0%;  }
  31.666666666666664% { background-position: 100% 0%;  }
  33.33333333333333% { background-position: 0% 9.090909090909092%;  }
  35% { background-position: 5.2631578947368425% 9.090909090909092%;  }
  36.666666666666664% { background-position: 10.526315789473685% 9.090909090909092%;  }
  38.333333333333336% { background-position: 15.789473684210526% 9.090909090909092%;  }
  40% { background-position: 21.05263157894737% 9.090909090909092%;  }
  41.66666666666667% { background-position: 26.31578947368421% 9.090909090909092%;  }
  43.333333333333336% { background-position: 31.57894736842105% 9.090909090909092%;  }
  45% { background-position: 36.8421052631579% 9.090909090909092%;  }
  46.666666666666664% { background-position: 42.10526315789474% 9.090909090909092%;  }
  48.333333333333336% { background-position: 47.36842105263158% 9.090909090909092%;  }
  50% { background-position: 52.63157894736842% 9.090909090909092%;  }
  51.66666666666667% { background-position: 57.89473684210526% 9.090909090909092%;  }
  53.333333333333336% { background-position: 63.1578947368421% 9.090909090909092%;  }
  55.00000000000001% { background-position: 68.42105263157895% 9.090909090909092%;  }
  56.666666666666664% { background-position: 73.6842105263158% 9.090909090909092%;  }
  58.333333333333336% { background-position: 78.94736842105263% 9.090909090909092%;  }
  60% { background-position: 84.21052631578948% 9.090909090909092%;  }
  61.66666666666667% { background-position: 89.47368421052632% 9.090909090909092%;  }
  63.33333333333333% { background-position: 94.73684210526316% 9.090909090909092%;  }
  65% { background-position: 100% 9.090909090909092%;  }
  66.66666666666666% { background-position: 0% 18.181818181818183%;  }
  68.33333333333333% { background-position: 5.2631578947368425% 18.181818181818183%;  }
  70% { background-position: 10.526315789473685% 18.181818181818183%;  }
  71.66666666666667% { background-position: 15.789473684210526% 18.181818181818183%;  }
  73.33333333333333% { background-position: 21.05263157894737% 18.181818181818183%;  }
  75% { background-position: 26.31578947368421% 18.181818181818183%;  }
  76.66666666666667% { background-position: 31.57894736842105% 18.181818181818183%;  }
  78.33333333333333% { background-position: 36.8421052631579% 18.181818181818183%;  }
  80% { background-position: 42.10526315789474% 18.181818181818183%;  }
  81.66666666666667% { background-position: 47.36842105263158% 18.181818181818183%;  }
  83.33333333333334% { background-position: 52.63157894736842% 18.181818181818183%;  }
  85% { background-position: 57.89473684210526% 18.181818181818183%;  }
  86.66666666666667% { background-position: 63.1578947368421% 18.181818181818183%;  }
  88.33333333333333% { background-position: 68.42105263157895% 18.181818181818183%;  }
  90% { background-position: 73.6842105263158% 18.181818181818183%;  }
  91.66666666666666% { background-position: 78.94736842105263% 18.181818181818183%;  }
  93.33333333333333% { background-position: 84.21052631578948% 18.181818181818183%;  }
  95% { background-position: 89.47368421052632% 18.181818181818183%;  }
  96.66666666666667% { background-position: 94.73684210526316% 18.181818181818183%;  }
  98.33333333333333% { background-position: 100% 18.181818181818183%;  }
`;

const MobileStyleWrapper = styled.div`
margin: -8px;
display: flex; /* New - make it a flex container */
flex-direction: column; /* New - stack items vertically */

background-image: url(${bg1});
font-family: "Patrick Hand";
height: 100vh;
width: 100vw;
z-index: 0;
align-items: center;
justify-content: center;
text-align: center;
position: relative;
background-size: cover; /* Cover the entire viewport */
background-position: center; /* Center the image */

.title {
    font-family: "Patrick Hand";
    font-weight: 600;
    text-transform: uppercase;
    font-size: 3em;
    position: relative;
    text-align: center; 
    white-space: nowrap;
    text-shadow: 3px 3px 10px #eb452b, 
                5px 5px 10px #efa032, 
                7px 7px 10px #46b59b, 
                9px 9px 10px #017e7f, 
                11px 11px 10px #052939,
                13px 13px 10px #eb452b;
  }

.mobile-text {
    font-size: 2.5em;
    padding: 5% 15%;
    font-weight: 600;
}
.horses{
    display: flex; /* New - make it a flex container */
    flex-direction: row;
  .horse {
    left: -30px;
    margin 0 -60px;
    background-image: url(${wassieIdle1});
    background-size: 3760px 2256px;
    position: relative;
    height: 188px;
    width: 188px;
    pointer-events: none;
    transform: scaleX(-1);

    &.ball {
      animation: ${ball} steps(1) 1.5s infinite;
    }

}
.horse:nth-child(1) { filter: hue-rotate(90deg); }
.horse:nth-child(2) { filter: hue-rotate(180deg); }
.horse:nth-child(3) { filter: hue-rotate(270deg); }
.horse:nth-child(4) { filter: hue-rotate(0deg); }
`;

export default MobileStyleWrapper;