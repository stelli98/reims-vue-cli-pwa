export default value => {
  const date = new Date(parseInt(value));
  return date.toLocaleDateString(["en-US"], {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};
