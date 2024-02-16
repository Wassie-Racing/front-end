import React from 'react';
import styled from 'styled-components';

import spritetest2 from "../../../assets/images/spritetest2.png";

const HorseWrapper = styled.div`
  background-image: url(${spritetest2});
  position: absolute;
  top: ${({ position }) => position}px;

  pointer-events: none;
  width: 40px;
  height: 60px;
`;

const Horse = ({ position }) => {
  return <HorseWrapper position={position} />;
};

export default Horse;