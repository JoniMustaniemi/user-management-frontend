import React, { useState } from "react";
import styles from "./EditingDialog.module.css";

const EditingDialog = ({ user, setIsEditing, onConfirm }) => {
  const [editedUser, setEditedUser] = useState({
    name: user.name,
    email: user.email,
    title: user.title,
    catchphrase: user.catchphrase,
  });

  const [loading] = useState(false);
  const [error] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onConfirm(user.id, editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className={styles.editingDialogContainer}>
      <form className={styles.editingForm}>
        <label className={styles.label}>
          Name:
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleInputChange}
            maxLength={30}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Email:
          <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Title:
          <input
            type="text"
            name="title"
            value={editedUser.title}
            onChange={handleInputChange}
            maxLength={30}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Catchphrase:
          <input
            type="text"
            name="catchphrase"
            value={editedUser.catchphrase}
            onChange={handleInputChange}
            maxLength={30}
            className={styles.input}
          />
        </label>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.buttons}>
        <button
          className={styles.saveButton}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
        <button className={styles.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditingDialog;
