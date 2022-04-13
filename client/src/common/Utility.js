export const signOut = () => {
  localStorage.clear();
  window.location.href = "/signin";
};

/**
 * Get date & time
 * @param {*} value
 * @returns
 */
 export const getDateTime = (value) => {
  const dateObj = new Date(value);
  const year = dateObj.getFullYear();
  const month = padZero(dateObj.getMonth() + 1);
  const date = padZero(dateObj.getDate());
  const hours = padZero(dateObj.getHours());
  const minutes = padZero(dateObj.getMinutes());
  return year + "-" + month + "-" + date + ", " + hours + ":" + minutes;
};

/**
 * Add zero to single digit time value
 * @param {*} value
 * @returns
 */
 export const padZero = (value) => {
  if (value < 10) {
    return "0" + value;
  }
  return value;
};
