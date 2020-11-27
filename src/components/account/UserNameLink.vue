<template>
  <div>
    <router-link :to="( '/account/' + String(this.userid))" class="color-regular-text text-normal">{{this.username}} </router-link>
  </div>
</template>

<script>
import apiurl from './../../apiurl';

export default {
  name: 'UserNameLink',
  props: {
    userid: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      username: new String()
    };
  },
  methods: {
    loadusername(id) {
      this.$axios
        .get(apiurl('/account/' + String(id)))
        .then(res => {
          this.username = res.data.res.username;
        })
        .catch(() => {
          this.username = id;
        });
    }
  },
  watch: {
    userid() {
      this.username = this.userid;
      this.loadusername(this.userid);
    }
  },
  mounted() {
    this.username = this.userid;
    this.loadusername(this.userid);
  }
};
</script>