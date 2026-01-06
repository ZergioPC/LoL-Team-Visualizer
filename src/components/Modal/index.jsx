import React from "react";
import { createPortal } from "react-dom";

import './Modal.css';

const Modal = ({ children , onClose })=>{
  return createPortal(
    <div className="Modal" onClick={onClose}>
      <div className="Modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="Modal-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
    ,document.getElementById("modal")
  );
}

export { Modal };