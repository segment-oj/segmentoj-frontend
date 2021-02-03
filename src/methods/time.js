let timeFormat = (origin) => {
  let time = new Date(origin);
  return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
};

export default timeFormat;
