// get user from localStorage JSON string
export const getUser = () => {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (error) {
    console.error("Failed to get user from localStorage:", error);
    return null;
  }
};
