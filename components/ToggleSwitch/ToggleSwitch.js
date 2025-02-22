import React from "react";
import styles from "./ToggleSwitch.module.css";

const ToggleSwitch = ({ checked, onChange, label, disabled }) => {
  return (
    <label
      className={`${styles.toggleSwitch} ${disabled ? styles.disabled : ""}`}
    >
      <span className={styles.label}>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span className={styles.slider}></span>
    </label>
  );
};

export default ToggleSwitch;
