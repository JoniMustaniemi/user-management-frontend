"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  fetchUsers,
  paginate,
  assignImagesToUsers,
  deleteUser,
  updateUser,
  fetchAndHandleUserImages,
} from "@/utils/utils";
import ToggleSwitch from "@/components/ToggleSwitch/ToggleSwitch";
import Paginator from "@/components/Paginator/Paginator";
import UserCard from "@/components/UserCard/UserCard";
import Spinner from "@/components/Spinner/Spinner";
import SearchElementId from "@/components/SearchElementId/SearchElementId";
import SearchElementName from "@/components/SearchElementName/SearchElementName";
import styles from "./page.module.css";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [userImages, setUserImages] = useState({ male: [], woman: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchResult, setSearchResult] = useState(null);
  const [showAllUsers, setShowAllUsers] = useState(false);

  const [queryId, setQueryId] = useState("");
  const [queryName, setQueryName] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError("There was an error fetching the users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      fetchAndHandleUserImages(users, userImages, setUserImages);
    }
  }, [users, userImages]);

  const usersWithImages = assignImagesToUsers(users, userImages);

  const displayedUsers = searchResult
    ? usersWithImages.filter((user) => user.name === searchResult.name)
    : usersWithImages;

  const currentUsers = showAllUsers
    ? usersWithImages
    : paginate(displayedUsers, currentPage, usersPerPage);

  const totalPages = Math.ceil(displayedUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleToggleUsers = () => {
    setShowAllUsers((prev) => !prev);
  };

  const handleDelete = (userId) => {
    deleteUser(userId).then(() => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    });
  };

  const handleSelectUser = (selectedUser) => {
    setSearchResult(selectedUser);
    setCurrentPage(1);
    if (selectedUser) {
      setShowAllUsers(false);
    }
  };

  const handleEdit = (userId, updatedUser) => {
    updateUser(userId, updatedUser)
      .then((updatedUserData) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) => {
            if (user.id === updatedUserData.id) {
              return { ...user, ...updatedUserData };
            }
            return user;
          })
        );
      })
      .catch((error) => {
        console.error("Failed to update user:", error);
      });
  };

  return (
    <div className={styles.page}>
      {loading ? (
        <Spinner />
      ) : (
        <main className={styles.main}>
          <div className={styles.sideBar}>
            <SearchElementId
              onSelectUser={handleSelectUser}
              query={queryId}
              setQuery={setQueryId}
              resetOtherQuery={() => setQueryName("")}
            />

            <SearchElementName
              onSelectUser={handleSelectUser}
              query={queryName}
              setQuery={setQueryName}
              resetOtherQuery={() => setQueryId("")}
            />

            <ToggleSwitch
              checked={showAllUsers}
              onChange={handleToggleUsers}
              label={
                showAllUsers ? "Pagination disabled" : "Pagination enabled"
              }
              disabled={displayedUsers.length <= usersPerPage}
            />

            <Link href="/add-user" className={styles.addUserButton}>
              + Add User
            </Link>
          </div>

          <div
            className={`${styles.paginationContainer} ${
              showAllUsers ? styles.hiddenPaginator : ""
            }`}
          >
            {!showAllUsers && displayedUsers.length > usersPerPage && (
              <Paginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>

          {error ? (
            <p>{error}</p>
          ) : (
            <div
              className={`${styles.userList} ${
                searchResult !== null ? styles.xtraPadding : "test"
              }`}
            >
              {currentUsers.map((user, index) => (
                <UserCard
                  key={user.id}
                  user={user}
                  index={index}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          )}
        </main>
      )}
    </div>
  );
}
