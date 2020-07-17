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
                this.$message({
                    message: '登出成功',
                    type: 'success'
                });
                this.$router.push('/');
            })
            .catch(err => {
                if (err.request.status === 401) {
                    this.$message.error("未登录");
                }
            })
    }
}
</script>