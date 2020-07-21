import sfconfig from './sfconfig';

let apiurl = (url) => {
  if (url[0] !== '/') {
    url = '/' + url;
  }
  let res = sfconfig.api.server + url;
  return res;
};

export default apiurl;