<template>
  <span>
    <el-popover
      :placement="this.placement"
      :width="this.width"
      v-model="visible"
    >
      <div style="font-size: 16px;">
        <strong>
          <i class="el-icon-warning" />
          Are you sure
        </strong>
      </div>
      <p>Are you sure to delete this {{this.name}}? This action cannot be undone!</p>
      <p>Please type <strong>{{this.confirmInput}}</strong> to confirm.</p>
      <el-input :placeholder="'Type ' + this.confirmInput" v-model="confirmAnswer"></el-input>
      <div style="text-align: right; margin: 10px;">
        <el-button size="mini" type="text" @click="visible = false">Cancel</el-button>
        <el-button type="primary" size="mini" @click="visible = false" :disabled="!confirmAnswerCorrect">Confirm</el-button>
      </div>
      <el-button :type="this.buttonType" slot="reference" style="margin-left: 10px;">{{buttonName}}</el-button>
    </el-popover>
  </span>
</template>

<script>
export default {
  name: 'Confirm',
  data() {
    return {
      visible: false,
      confirmAnswer: '',
      confirmAnswerCorrect: false
    };
  },
  props: {
    buttonName: {
      type: String,
      required: true
    },
    buttonType: {
      type: String,
      default: 'primary'
    },
    name: {
      type: String,
      required: true
    },
    confirmInput: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 300
    },
    placement: {
      type: String,
      default: 'top'
    }
  },
  watch: {
    confirmAnswer(val) {
      this.confirmAnswerCorrect = false;
      if (val == this.confirmInput) {
        this.confirmAnswerCorrect = true;
      }
    }
  },
};
</script>