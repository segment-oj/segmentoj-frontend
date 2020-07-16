const userstore = {
    state: {
        authenticated: false,
        username: null,
        userid: null
    },
    mutations: {
        userLogin(state, data) {
            state.authenticated = true;
            state.userid = data.userid;
            state.username = data.username;
        },
        userLogout(state) {
            state.authenticated = false;
            state.userid = null;
            state.username = null;
        }
    }
}

export default userstore;