const userstore = {
  state: {
    extra_data: localStorage.getItem('user-config') || null,
    accessToken: localStorage.getItem('user-access-token') || null,
    refreshToken:  localStorage.getItem('user-refresh-token') || null,
    authenticated: localStorage.getItem('user-authenticated') === 'true' ? true : false || false,
    username: localStorage.getItem('user-username') || null,
    userid: localStorage.getItem('user-userid') || null,
    userlang: localStorage.getItem('user-userlang') || null,
    isStaff: localStorage.getItem('user-is-staff') === 'true' ? true : false || false,
    isRoot: localStorage.getItem('user-is-root') === 'true' ? true : false || false,
    navColor: localStorage.getItem('user-navcolor') || null,
    avatarURL: localStorage.getItem('user-avatar-url') || 'null',
    showlogin: false,
    showregister: false,
    showlogout: false,
  },
  mutations: {
    userLogin(state, data) {
      state.authenticated = true;
      state.userid = data.userid;
      state.username = data.username;
      state.accessToken = data.accessToken;
      state.refreshToken = data.refreshToken;
      state.avatarURL = data.avatarURL;
      localStorage.setItem('user-authenticated', true);
      localStorage.setItem('user-username', data.username);
      localStorage.setItem('user-userid', data.userid);
      localStorage.setItem('user-access-token', data.accessToken);
      localStorage.setItem('user-refresh-token', data.refreshToken);
      localStorage.setItem('user-avatar-url', data.avatarURL);
    },
    userStaffChange(state, data) {
      state.isStaff = data.isStaff;
      state.isRoot = data.isRoot;
      localStorage.setItem('user-is-root', data.isRoot);
      localStorage.setItem('user-is-staff', data.isStaff);
    },
    userStaff(state, data) {
      state.isStaff = data.is_staff;
      state.isRoot = data.is_superuser;
      localStorage.setItem('user-is-root', data.is_superuser);
      localStorage.setItem('user-is-staff', data.is_staff);
    },
    userLang(state, data) {
      state.userlang = data.lang;
      localStorage.setItem('user-userlang', data.lang); 
    },
    userAvatarURLChange(state, data) {
      state.avatarURL = data.avatar_url;
      localStorage.setItem('user-avatar-url', data.avatar_url);
    },
    userNavColorChange(state, data) {
      state.navColor = data.nav_color;

      localStorage.setItem('user-navcolor', data.nav_color);
    },
    userConfigChange(state, data) {
      state.extra_data = data.extra_data;
      localStorage.setItem('user-config', data.extra_data);
    },
    userLogout(state) {
      state.authenticated = false;
      state.userid = null;
      state.username = null;
      state.userlang = null;
      state.isStaff = false;
      state.isRoot = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.avatarURL = 'null';
      state.userConfig = null;
      localStorage.removeItem('user-is-root');
      localStorage.removeItem('user-is-staff');
      localStorage.removeItem('user-userlang'); 
      localStorage.removeItem('user-authenticated');
      localStorage.removeItem('user-userid');
      localStorage.removeItem('user-username');
      localStorage.removeItem('user-navcolor');
      localStorage.removeItem('user-access-token');
      localStorage.removeItem('user-refresh-token');
      localStorage.removeItem('user-avatar-url');
      localStorage.removeItem('user-config');
    },
  }
};

export default userstore;