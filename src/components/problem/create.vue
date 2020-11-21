<template>
  <el-dialog
    title="Create New Problem"
    :visible.sync="$store.state.createProblem.displayCreateProblem"
    width="500px"
    class="max-screen"
  >
    <el-form>
      <div class="icon-lable">
        <i class="el-icon-s-operation" />
        PID
      </div>
      <el-form-item prop="username">
        <el-input v-model="pid" placeholder="PID">
          <template slot="prepend">#.</template>
          <i v-if="errorPID" slot="suffix" class="icon-error el-input__icon el-icon-circle-close"></i>
          <i v-else slot="suffix" class="icon-success el-input__icon el-icon-circle-check"></i>
        </el-input>
      </el-form-item>
      <div class="icon-lable">
        <i class="el-icon-edit-outline" />
        Title
      </div>
      <el-form-item>
        <el-input v-model="title" placeholder="Title">
          <i v-if="errorTitle" slot="suffix" class="icon-error el-input__icon el-icon-circle-close"></i>
          <i v-else slot="suffix" class="icon-success el-input__icon el-icon-circle-check"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          v-on:click="Submit();"
          :disabled="errorPID || errorTitle"
        >
          Edit Detail
        </el-button>
        <el-button v-on:click="$store.state.createProblem.displayCreateProblem = false">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import apiurl from './../../apiurl';

export default {
  name: 'CreateProblem',
  data() {
    return {
      pid: null,
      title: null,
      errorPID: true,
      errorTitle: true
    };
  },
  watch: {
    pid(val) {
      if (val === '') {
        this.errorPID = true;
      } else if (val.length >= 8) {
        this.errorPID = true;
      } else {
        let flag = false;
        for (let i = 0; i < val.length; i += 1) {
          let now = val.charAt(i);
          if (isNaN(parseInt(now))) {
            this.errorPID = true;
            flag = true;
          }
        }
        if (flag == false) {
          this.$axios
            .get(apiurl('/problem/' + String(val)))
            .then(() => {
              this.errorPID = true;
            })
            .catch(() => {
              this.errorPID = false;
            });
        }
      }
    },
    title(val) {
      if (val !== null && val !== '') {
        this.errorTitle = false;
      }
    }
  },
  methods: {
    Submit() {
      this.$axios
        .post(apiurl('/problem'), {
          pid: this.pid,
          title: this.title,
          description: 'Input description'
        })
        .then(() => {
          this.$store.state.createProblem.displayCreateProblem = false;
          this.$router.push('/problem/' + this.pid + '/edit');
        })
        .catch(err => {
          if (err.request.status === 400) {
            this.$SegmentMessage.error(this, 'PID or title is empty');
          } else if(err.request.status === 403) {
            this.$SegmentMessage.error(this, 'Permission denied');
          } else {
            this.$SegmentMessage.error(this, 'Unknown error');
          }
        });
    }
  }
};
</script>
