const userstore = {
  state: {
    authenticated: localStorage.getItem('user-authenticated') || false,
    username: localStorage.getItem('user-username') || null,
    userid: localStorage.getItem('user-userid') || null,
    showlogin: false,
    showregister: false,
    showlogout: false
  },
  mutations: {
    userLogin(state, data) {
      state.authenticated = true;
      state.userid = data.userid;
      state.username = data.username;

      localStorage.setItem('user-authenticated', true);
      localStorage.setItem('user-username', data.username);
      localStorage.setItem('user-userid', data.userid);
    },
    userLogout(state) {
      state.authenticated = false;
      state.userid = null;
      state.username = null;

      localStorage.removeItem('user-authenticated');
      localStorage.removeItem('user-userid');
      localStorage.removeItem('user-username');
    }
  }
}

export default userstore;