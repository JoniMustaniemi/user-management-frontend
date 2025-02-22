"use client";
import React, { useState, useEffect } from "react";
import { fetchUserByName } from "@/utils/utils";
import styles from "./SearchElementName.module.css";

const SearchElementName = ({
  onSelectUser,
  query,
  setQuery,
  resetOtherQuery,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);

  const debounceDelay = 1000;

  const fetchData = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const { data, noResults } = await fetchUserByName(query);

      if (noResults) {
        setNoResults(true);
        onSelectUser(null);
      } else {
        onSelectUser(data);
        setNoResults(false);
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
      setNoResults(true);
      onSelectUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim() === "") {
      setNoResults(false);
      setError(null);
      onSelectUser(null);
      return;
    }

    const timer = setTimeout(() => {
      if (query.trim()) {
        fetchData(query);
      }
    }, debounceDelay);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const handleSearch = (e) => {
    const userInput = e.target.value;

    if (/^[a-zA-Z0-9 ]*$/.test(userInput)) {
      setQuery(userInput);
      setNoResults(false);
      setError(null);
      resetOtherQuery();
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search by Name..."
        value={query}
        onChange={handleSearch}
        className={styles.searchInput}
      />
      {loading && <p className={styles.loading}>Loading...</p>}

      {error && !loading && <p className={styles.error}>{error}</p>}

      {noResults && !loading && query.trim() !== "" && !error && (
        <p className={styles.noUser}>No user found with name: {query}</p>
      )}
    </div>
  );
};

export default SearchElementName;
