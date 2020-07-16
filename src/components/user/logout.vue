<template>
    <div>
        
    </div>
</template>

<script>
import apiurl from '../../apiurl';

export default {
    name: "UserLogout",
    mounted() {
        this.$axios
            .delete(apiurl('/user'))
            .then(() => {
                this.$store.commit('userLogout');
                this.$router.push('/');
            })
            .catch(err => {
                if (err.request.status === 401) {
                    console.log("not logged in!");
                }
            })
    }
}
</script>