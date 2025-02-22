"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { addUser } from "@/utils/utils";
import styles from "./Adduser.module.css";

export default function AddUserPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      await addUser(data);
      setSuccessMessage("User added successfully!");

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.imageContainer}>
        <img src="/formbg.jpg" alt="Background" className={styles.image} />
      </div>
      <div className={styles.formContainer}>
        <h2 className={styles.header}>Add new user</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Name:</label>
            <input
              type="text"
              className={styles.input}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Title:</label>
            <input
              type="text"
              className={styles.input}
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className={styles.error}>{errors.title.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Catchphrase:</label>
            <input
              type="text"
              className={styles.input}
              {...register("catchphrase", {
                required: "Catchphrase is required",
              })}
            />
            {errors.catchphrase && (
              <p className={styles.error}>{errors.catchphrase.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email:</label>
            <input
              type="email"
              className={styles.input}
              {...register("email", {
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
              })}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Gender:</label>
            <select
              className={styles.input}
              {...register("sex", { required: "Gender is required" })}
            >
              <option value="">Select...</option>
              <option value="man">Man</option>
              <option value="woman">Woman</option>
            </select>
            {errors.sex && <p className={styles.error}>{errors.sex.message}</p>}
          </div>

          {error && <p className={styles.error}>{error}</p>}

          {successMessage && (
            <p className={styles.successMessage}>{successMessage}</p>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
}
