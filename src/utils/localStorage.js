// localStorageUtils.js
// utils/encryption.js

const secretKey = 3; // Simple shift for demonstration purposes

export const encryptId = (id) => {
  return id
    .split("")
    .map((char) => String.fromCharCode(char.charCodeAt(0) + secretKey))
    .join("");
};

export const decryptId = (encryptedId) => {
  return encryptedId
    .split("")
    .map((char) => String.fromCharCode(char.charCodeAt(0) - secretKey))
    .join("");
};

export const getFollowingFromLocalStorage = () => {
  const following = localStorage.getItem("following");
  if (!following) return {};

  const parsed = JSON.parse(following);
  const decrypted = {};

  Object.keys(parsed).forEach((key) => {
    decrypted[decryptId(key)] = parsed[key];
  });

  return decrypted;
};

export const setFollowingInLocalStorage = (following) => {
  const encrypted = {};

  Object.keys(following).forEach((key) => {
    encrypted[encryptId(key)] = following[key];
  });

  localStorage.setItem("following", JSON.stringify(encrypted));
};

export const generateUniqueId = (username, followed_username) => {
  const randomPart = Array.from({ length: 2 }, () =>
    Math.random().toString(36).substring(2, 15)
  ).join("");
  const timestampPart = Date.now().toString(36);
  return `-${username?.username}**${followed_username}-${randomPart}-${timestampPart}-`;
};
