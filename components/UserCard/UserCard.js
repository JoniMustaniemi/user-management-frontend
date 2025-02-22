import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import EditingDialog from "../EditingDialog/EditingDialog";
import styles from "./UserCard.module.css";

export default function UserCard({ user, index, onDelete, onEdit }) {
  const [loaded, setLoaded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const isEven = index % 2 === 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleDeleteInit = () => {
    setIsDeleting(true);
  };

  const handleEditInit = () => {
    setIsEditing(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(user.id);
    setIsDeleting(false);
  };

  const handleEditConfirm = (userId, updatedUser) => {
    onEdit(userId, updatedUser);
    setIsEditing(false);
  };

  return (
    <div
      className={`${styles.card} ${
        isEven ? styles.leftAlign : styles.rightAlign
      } ${loaded ? styles.loaded : ""}`}
    >
      {isDeleting ? (
        <ConfirmDialog
          userId={user.id}
          setActiveStatus={setIsDeleting}
          onConfirm={handleDeleteConfirm}
        />
      ) : isEditing ? (
        <EditingDialog
          user={user}
          setIsEditing={setIsEditing}
          onConfirm={handleEditConfirm}
        />
      ) : (
        <>
          <div className={styles.controlsContainer}>
            <button className={styles.editButton} onClick={handleEditInit}>
              <i className="fas fa-edit"></i>
            </button>
            <button className={styles.deleteButton} onClick={handleDeleteInit}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>

          <div className={styles.imageContainer}>
            <img
              src={user.image || "/defaultImage.jpg"}
              alt={`${user.name}'s portrait`}
              className={styles.image}
            />
          </div>
          <div className={styles.catchphrase}>
            <div className={styles.cornerBorder}></div>
            {user.catchphrase || "N/A"}
          </div>

          <div className={styles.textContainer}>
            <div className={styles.nameContainer}>
              <h3 className={styles.name}>{user.name}</h3>
              <p className={`${styles.identification}`}>ID ({user.id})</p>
            </div>

            <p className={`${styles.title} ${styles.icon}`}>
              <i
                className={`fas fa-briefcase ${
                  isEven ? styles.leftIcon : styles.rightIcon
                }`}
              ></i>
              {user.title || "N/A"}
            </p>

            <p className={`${styles.email} ${styles.icon}`}>
              <i
                className={`fas fa-envelope ${
                  isEven ? styles.leftIcon : styles.rightIcon
                }`}
              ></i>
              {user.email}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
