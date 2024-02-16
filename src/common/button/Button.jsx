import ButtonWrapper from "./Button.style";
import React from 'react';


const Button = ({ children, ...props }) => {
  return (
    <ButtonWrapper type="submit" className="Degenesys-btn" {...props}>
      {children}

    </ButtonWrapper>
  );
};

export default Button;
