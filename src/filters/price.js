export default value => {
  return value
    ? "Rp. " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    : "";
};
