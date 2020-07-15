<template>
    <div>
        <el-link type="primary" v-on:click="logout()">logout</el-link>
    </div>
</template>

<script>
import apiurl from '../../apiurl';

export default {
    name: "UserLogout",
    methods: {
        logout() {
            console.log('logout!');
            this.$axios
                .delete(apiurl('/user'))
                .then(() => {
                    localStorage.removeItem("authenticated");
                    localStorage.removeItem("userid");
                    localStorage.removeItem("username");
                })
                .catch(err => {
                    if (err.request.status === 401) {
                        console.log("not logged in!");
                    }
                })
        }
    }
}
</script>