import React from "react";
import styles from "./ConfirmDialog.module.css";

const ConfirmDialog = ({ userId, setActiveStatus, onConfirm }) => {
  const handleDeleteCancel = () => {
    setActiveStatus(false);
  };

  const handleDeleteConfirm = () => {
    setActiveStatus(false);
    onConfirm(userId);
  };

  return (
    <div className={styles.confirmationContainer}>
      <p>
        ARE YOU SURE YOU WANT TO{" "}
        <span className={styles.emphasized}>DELETE</span> THIS USER?
      </p>
      <div className={styles.confirmationButtons}>
        <button className={styles.buttonYes} onClick={handleDeleteConfirm}>
          Delete
        </button>
        <button className={styles.buttonNo} onClick={handleDeleteCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmDialog;
