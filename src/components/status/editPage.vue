<template>
  <ProblemSubmit :pid="pid" :resubmit="true" :base_code="code" :base_lang="lang"></ProblemSubmit>
</template>

<script>
import ProblemSubmit from '../problem/submit';

export default {
  name: 'StatusEdit',
  props: {
    pid: {
      type: Number,
      require: true
    },
    code: {
      type: String,
      default: ''
    },
    lang: {
      type: Number
    }
  },
  mounted() {
  },
  components: {
    ProblemSubmit,
  }
};
</script>