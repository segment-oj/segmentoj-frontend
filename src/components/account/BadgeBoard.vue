<template>
  <el-card class="margin-top-20">
    <div slot="header">
      <i class="el-icon-price-tag" />
      Badges
      <i v-if="can_edit" class="el-icon-edit" style="float: right;" @click="on_edit = !on_edit;"></i>
    </div>

    <div>
      <span 
        v-for="(item, i) in url_list"
        :key="i"
        style="margin-right: 5px;"
      >
        <el-input v-if="on_edit" v-model="item.url" style="margin-top: 10px;">
          <el-button slot="append" icon="el-icon-close" @click="url_list.splice(i, 1);" circle></el-button>
        </el-input>
        <img :src="item.url"/>
      </span>
      <br>

      <el-button-group v-if="on_edit" style="margin-top: 10px;">
        <el-button icon="el-icon-check" type="primary" circle @click="done_edit();"></el-button>
        <el-button icon="el-icon-plus" circle @click="new_badge_visible = true;"></el-button>
      </el-button-group>
    </div>

    <el-popover
      placement="top"
      v-model="new_badge_visible"
    >
      <el-input v-model="new_badge_url" placeholder="New Badge URL"></el-input>
      <el-button type="primary" icon="el-icon-plus" @click="new_badge();" style="width: 100%; margin-top: 10px;"></el-button>
    </el-popover>
  </el-card>
</template>

<script>
import apiurl from './../../apiurl';

export default {
  name: 'BadgeBoard',
  data() {
    return {
      extra_data: JSON.parse(this.$store.state.user.extra_data),
      new_badge_visible: false,
      new_badge_url: '',
      on_edit: false,
      url_list: [],
    };
  },
  props: {
    can_edit: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    submit() {
      console.log(this.extra_data.badges);
      this.extra_data.badges = this.url_list;

      const tmp_extra_data = {segmentoj_extra_data: this.extra_data};
      this.$axios
        .patch(apiurl(`/account/${this.$store.state.user.userid}`), {
          extra_data: JSON.stringify(tmp_extra_data),
        });
      this.$store.commit('userConfigChange', {
        extra_data: JSON.stringify(tmp_extra_data.segmentoj_extra_data),
      });
    },
    new_badge() {
      this.url_list.push({url: this.new_badge_url});
      this.new_badge_visible = false;
      this.new_badge_url = '';
      this.submit();
    },
    done_edit() {
      this.on_edit = false;
      this.submit();
    },
    get_info() {
      this.$axios
        .get(apiurl(`/account/${this.$route.params.id}`))
        .then(res => {
          let data = JSON.parse(res.data.res.extra_data);
          this.url_list = data.segmentoj_extra_data.badges;
        });
    }
  },
  mounted() {
    this.get_info();
  }
};
</script>
