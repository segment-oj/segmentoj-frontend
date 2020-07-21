import sfconfig from './sfconfig';

let apiurl = (url) => {
  if (url[0] !== '/') {
    url = '/' + url;
  }
  let res = sfconfig.api.server + url;
  console.log(res);
  return res;
};

export default apiurl;