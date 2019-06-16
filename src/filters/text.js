export default value => {
  return value
    ? value.toLowerCase().replace(/\b[a-z]/g, f => {
        return f.toUpperCase();
      })
    : "";
};
