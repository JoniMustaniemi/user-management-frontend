const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Fetches a list of users from the API.
 * @returns {Array} List of users. If an error occurs, an empty array is returned.
 */
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return await response.json();
  } catch (error) {
    handleError(error);
    return [];
  }
};

/**
 * Fetches the user data by calling `fetchUsers` and returns the result.
 * @returns {Array} List of users fetched from the API.
 * @throws Will throw an error if fetching users fails.
 */
export const fetchUsersData = async () => {
  try {
    const data = await fetchUsers();
    return data;
  } catch (error) {
    handleError(error);
    throw new Error("Error fetching users");
  }
};

/**
 * Fetches a user by their ID.
 * @param {string} query - The user ID to search for.
 * @returns {Object} The user data or null if not found. Also returns a boolean indicating if no results were found.
 */
export const fetchUserById = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${query}`);

    if (response.status === 404) {
      return { data: null, noResults: true };
    }

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const data = await response.json();
    return { data, noResults: false };
  } catch (error) {
    handleError(error);
    return { data: null, noResults: true };
  }
};

/**
 * Fetches a user by their name.
 * @param {string} query - The name of the user to search for.
 * @returns {Object} The user data or null if not found, along with a boolean indicating if no results were found.
 */
export const fetchUserByName = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/search?name=${query}`);

    if (response.status === 404) {
      return { data: null, noResults: true };
    }

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();

    if (data[0]) {
      return { data: data[0], noResults: false };
    } else {
      return { data: null, noResults: true };
    }
  } catch (error) {
    handleError(error);
    return { data: null, noResults: true };
  }
};

/**
 * Fetches random user images from an external API.
 * @returns {Array} A list of image URLs for users.
 */
export const fetchUserImages = async () => {
  try {
    const response = await fetch(`https://randomuser.me/api/?results=50`);
    if (!response.ok) {
      throw new Error("Failed to fetch user images");
    }
    const data = await response.json();
    return data.results.map((user) => user.picture.large);
  } catch (error) {
    handleError(error);
    return [];
  }
};

/**
 * Updates the user information.
 * @param {string} userId - The user ID.
 * @param {Object} updatedUserData - The updated user data to be saved.
 * @returns {Object} The updated user data.
 * @throws Will throw an error if updating the user fails.
 */
export const updateUser = async (userId, updatedUserData) => {
  const url = `${API_BASE_URL}/users/${userId}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

/**
 * Adds a new user to the system.
 * @param {Object} data - The user data to add.
 * @returns {Object} The added user data.
 * @throws Will throw an error if adding the user fails.
 */
export const addUser = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to add user");
    }

    return response.json();
  } catch (error) {
    handleError(error);
    throw error;
  }
};

/**
 * Deletes a user from the system.
 * @param {string} userId - The user ID to delete.
 * @returns {boolean} Returns `true` if the deletion was successful, otherwise `false`.
 */
export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    handleError(error);
    return false;
  }
};

/**
 * Assigns images to users based on their gender.
 * @param {Array} users - The list of users to assign images to.
 * @param {Object} userImages - The available user images, divided by gender.
 * @returns {Array} A new array of users with assigned images.
 */
export const assignImagesToUsers = (users, userImages) => {
  if (!users) return;
  const usersWithImages = [];

  const maleImages = [...userImages.male];
  const femaleImages = [...userImages.woman];

  for (const user of users) {
    let userImage = null;

    if (user.sex === "man" && maleImages.length > 0) {
      userImage = maleImages.shift();
    } else if (user.sex === "woman" && femaleImages.length > 0) {
      userImage = femaleImages.shift();
    }

    usersWithImages.push({ ...user, image: userImage });
  }

  return usersWithImages;
};

/**
 * Paginates a list of items.
 * @param {Array} items - The items to paginate.
 * @param {number} currentPage - The current page number.
 * @param {number} itemsPerPage - The number of items per page.
 * @returns {Array} A sliced array of items corresponding to the current page.
 */
export const paginate = (items, currentPage, itemsPerPage) => {
  const offset = (currentPage - 1) * itemsPerPage;
  return items.slice(offset, offset + itemsPerPage);
};

/**
 * Filters image URLs by gender.
 * @param {Array} imageData - The image URLs to filter.
 * @param {string} gender - The gender to filter by ("men" or "women").
 * @returns {Array} A filtered array of image URLs.
 */
export const getImagesByGender = (imageData, gender) => {
  return imageData.filter((url) =>
    new RegExp(`/${gender}/\\d+\\.jpg$`).test(url)
  );
};

/**
 * Counts the number of users of a specified gender.
 * @param {Array} users - The list of users.
 * @param {string} gender - The gender to count ("man" or "woman").
 * @returns {number} The count of users of the specified gender.
 */
export const countUsersByGender = (users, gender) => {
  return users.filter((user) => user.sex === gender).length;
};

/**
 * Fetches user images from the external API.
 * @returns {Array} An array of image URLs.
 * @throws Will throw an error if fetching images fails.
 */
export const fetchUserImagesData = async () => {
  try {
    const imageData = await fetchUserImages();
    return imageData;
  } catch (error) {
    handleError(error);
    throw new Error("Error fetching user images");
  }
};

/**
 * Slices an array of images to fit the required count.
 * @param {Array} images - The list of images.
 * @param {number} count - The number of images to slice.
 * @returns {Array} A sliced array of images.
 */
export const sliceImagesByUserCount = (images, count) => {
  return images.slice(0, count);
};

/**
 * Sets the state of user images based on the male and female image counts.
 * @param {Function} setUserImages - The state setter for user images.
 * @param {Array} maleImages - The list of male images.
 * @param {Array} womanImages - The list of female images.
 * @param {number} maleCount - The number of male users.
 * @param {number} womanCount - The number of female users.
 */
export const setUserImagesState = (
  setUserImages,
  maleImages,
  womanImages,
  maleCount,
  womanCount
) => {
  setUserImages({
    male: sliceImagesByUserCount(maleImages, maleCount),
    woman: sliceImagesByUserCount(womanImages, womanCount),
  });
};

/**
 * Fetches user images and assigns them to users based on their gender.
 * @param {Array} users - The list of users.
 * @param {Object} userImages - The current user images state.
 * @param {Function} setUserImages - The state setter for user images.
 * @throws Will throw an error if any fetching process fails.
 */
export const fetchAndHandleUserImages = async (
  users,
  userImages,
  setUserImages
) => {
  if (userImages.male.length > 0 && userImages.woman.length > 0) return;

  try {
    const imageData = await fetchUserImagesData();
    const maleImages = getImagesByGender(imageData, "men");
    const womanImages = getImagesByGender(imageData, "women");

    const maleCount = countUsersByGender(users, "man");
    const womanCount = countUsersByGender(users, "woman");

    setUserImagesState(
      setUserImages,
      maleImages,
      womanImages,
      maleCount,
      womanCount
    );
  } catch (error) {
    handleError(error);
  }
};

/**
 * Handles any errors by logging them to the console.
 * @param {string} errMessage - The error message to log.
 */
export const handleError = (errMessage) => {
  console.error(errMessage);
};
