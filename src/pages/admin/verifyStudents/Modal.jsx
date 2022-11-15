import React from "react";
import styles from "./modal.css";
import CloseIcon from '@mui/icons-material/Close';


const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className='modalWrapper'>
      <div className='modal'>
        <button onClick={onClose} className={`${styles.btnClose}`} >
            <CloseIcon className="btnClose"/>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;