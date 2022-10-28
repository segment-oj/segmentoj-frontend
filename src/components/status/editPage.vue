<template>
  <ProblemSubmit v-if="is_mine" :pid="pid" :resubmit="true" :base_code="code" :base_lang="lang"></ProblemSubmit>
  <ProblemSubmit v-else :pid="pid" :readonly="true" :base_code="code" :base_lang="lang"></ProblemSubmit>
</template>

<script>
import ProblemSubmit from '../problem/submit';

export default {
  name: 'StatusEdit',
  props: {
    pid: {
      type: Number,
      require: true
    }, code: {
      type: String,
      default: ''
    }, lang: {
      type: Number
    }, is_mine: {
      type: Boolean,
      default: false,
    }
  },
  mounted() {
  },
  components: {
    ProblemSubmit,
  }
};
</script>