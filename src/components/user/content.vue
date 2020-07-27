<template>
  <div>
    <span class="text-extra-big">{{username}}  </span>
    <span>{{email}}</span>
    <br>
    <span class="text-extra-big">Introduction</span>
    <div class="introduction">
      <MarkdownContainer v-if="introduction" :content="introduction"/>
    </div>
  </div>
</template>

<script>
import apiurl from './../../apiurl';
import MarkdownContainer from './../lib/MarkdownContainer.vue';

export default {
  name: 'UserHomepage',
  data() {
    return {
      username: '',
      email: '',
      introduction: null
    };
  },
  methods: {
    showHomepage() {
      this.$axios
        .get(apiurl('/account/' + this.$route.params.id))
        .then(res => {
          let data = res.data.res;
          this.username = data.username;
          this.email = data.email;
          this.introduction = data.introduction;
        })
        .catch(err => {
          if(err.request.status === 404) {
            this.$SegmentMessage.error(this, 'User does not exist');
          } else {
            this.$SegmentMessage.error(this, 'Unkown error');
          }
        });
    }
  },
  mounted() {
    this.showHomepage();
  },
  components: {
    MarkdownContainer
  }
};
</script>

<style scoped>
.introduction {
  border: dashed 1px rgb(189, 189, 189);
  padding: 15px;
}
</style>