export const getLocalstorage = (key) => {
  const data = localStorage.getItem(key);

  return JSON.parse(data);
};
