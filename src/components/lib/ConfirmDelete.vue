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
      <p>Once you delete this {{this.name}}, <strong class="color-warning">THERE IS NO GOING BACK</strong>.</p>
      <p>Please type <strong>{{this.confirmInput}}</strong> to confirm.</p>
      <el-input :placeholder="`Type ${this.confirmInput}`" v-model="confirmAnswer"></el-input>
      <div style="text-align: right; margin: 10px;">
        <el-button
          size="mini"
          type="text"
          @click="visible = false;"
        >
          Cancel
        </el-button>
        <el-button
          type="primary"
          size="mini"
          @click="confirmed"
          :disabled="!confirmAnswerCorrect"
        >
          Confirm
        </el-button>
      </div>
      <el-button
        :icon="this.buttonIcon"
        :type="this.buttonType"
        slot="reference"
        style="margin-left: 10px;"
        :circle="this.buttonCircle"
      >
        {{buttonName}}
      </el-button>
    </el-popover>
  </span>
</template>

<script>
export default {
  name: 'ConfirmDelete',
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
    buttonIcon: {
      type: String,
      default: ''
    },
    buttonCircle: {
      type: Boolean,
      default: false
    },
    buttonType: {
      type: String,
      default: 'primary'
    },
    buttonFunction: {
      type: Function,
      required: true
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
    },
  },
  watch: {
    confirmAnswer(val) {
      this.confirmAnswerCorrect = false;
      if (val == this.confirmInput) {
        this.confirmAnswerCorrect = true;
      }
    }
  },
  methods: {
    confirmed() {
      this.visible = false;
      this.buttonFunction();
    }
  }
};
</script>