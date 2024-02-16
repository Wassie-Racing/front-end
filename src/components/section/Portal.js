import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const Portal = ({ children }) => {
  const portalRoot = useRef(document.createElement("div"));

  useEffect(() => {
    const root = portalRoot.current;
    document.body.appendChild(root);

    return () => {
      document.body.removeChild(root);
    };
  }, []);

  return ReactDOM.createPortal(children, portalRoot.current);
};

export default Portal;
