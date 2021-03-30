<template>
  <ProblemSubmit :pid="pid"></ProblemSubmit>
</template>

<script>
import ProblemSubmit from './submit';

export default {
  data() {
    return {
      pid: this.$route.params.id,
    };
  },
  components: {
    ProblemSubmit,
  }
};
</script>