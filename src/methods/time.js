let timeFormat = (origin) => {
  let time = new Date(origin);
  let res = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
  return res;
};

export default timeFormat;