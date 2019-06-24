export default (value, maxValue) => {
  return value.length >= maxValue
    ? value.substring(0, maxValue) + "..."
    : value;
};
