<template>
  <el-card class="todo-card">
    <transition name="el-zoom-in-bottom">
      <el-input
        v-if="show_new_todo_item_input"
        v-model="new_todo_item_name"
        @blur="complete_add"
        class="todo-item-edit-input todo-add-item high-zindex"
        maxlength="32"
        show-word-limit
      >
        <el-button slot="append" icon="el-icon-plus" @click="complete_add"></el-button>
      </el-input>
      <el-button
        v-else
        class="todo-add-item high-zindex"
        icon="el-icon-plus"
        @click="add_todo_item"
        circle
      ></el-button>
    </transition>
    <el-tabs>
      <el-tab-pane label="Todo List">
        <div class="todo-item-holder">
          <transition-group name="el-zoom-in-top">
            <div class="todo-item" v-for="(item, i) in todo_list" :key="i">
              <div class="inline-item-left">
                <el-checkbox
                  class="todo-item-achieve-checkbox"
                  v-model="item.achieved"
                  @change="achieve_item(i, item.achieved)"
                ></el-checkbox>
              </div>
              <el-input
                class="inline-item-left todo-item-edit-input"
                v-if="show_edit == i"
                @blur="edit_item(i)"
                v-model="new_todo_item_name"
                maxlength="32"
                show-word-limit
              ></el-input>
              <span v-else class="inline-item-left todo-item-content markdown-container" @click="show_edit_item(i)" v-html="render(item.name)"></span>

              <i
                class="el-icon-delete inline-item-right todo-item-delete"
                @click="delete_item(i)"
              ></i>
            </div>
          </transition-group>
          <div class="place-holder"></div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { Remarkable } from 'remarkable';
import { linkify } from 'remarkable/linkify';

import rkatex from 'remarkable-katex';
import DOMPurify from 'dompurify';

export default {
  name: 'Todo',
  data() {
    return {
      show_edit: Infinity,
      todo_list: new Array(),
      show_new_todo_item_input: false,
      new_todo_item_name: '',
      remark: null
    };
  },
  mounted() {
    this.remark = new Remarkable();
    this.remark.use(rkatex).use(linkify);
    this.todo_list = this.$store.state.todo.todo_list;
  },
  methods: {
    add_todo_item() {
      this.show_new_todo_item_input = true;
      this.new_todo_item_name = '';
    },
    complete_add() {
      if (this.new_todo_item_name.length > 0) {
        this.show_new_todo_item_input = false;
        this.$store.commit('addItem', {
          name: this.new_todo_item_name,
          achieved: false,
        });
      }
    },
    achieve_item(index, tar) {
      this.$store.commit('achieveItem', {
        index: index,
        tar: tar,
      });
    },
    delete_item(index) {
      setTimeout(() => {
        this.$store.commit('deleteItem', index);
      }, 200);
    },
    show_edit_item(index) {
      this.show_edit = index;
      this.new_todo_item_name = this.todo_list[index].name;
    },
    edit_item(index) {
      if (this.new_todo_item_name.length > 0) {
        this.$store.commit('renameItem', {
          index: index,
          name: this.new_todo_item_name,
        });
        this.show_edit = Infinity;
      }
    },
    render(md) {
      return DOMPurify.sanitize(this.remark.render(md));
    }
  },
};
</script>

<style>
.todo-item-content h1 {
    font-size: 22px;
}

.todo-item-content h1,
h2,
h3,
h4,
h5,
ol,
p,
ul,
blockquote {
    margin: 0;
}

.todo-item-content ul,
ol {
    padding-left: 40px;
}

.todo-item-content code {
    padding: 5px;
}

.todo-card {
    height: 300px;
}

.todo-item {
    height: 40px;
    border-top: 1px solid var(--color-lighter-border);
    border-bottom: 1px solid var(--color-lighter-border);
}

.inline-item-left {
    float: left;
    margin-right: 10px !important;
}

.inline-item-right {
    float: right;
}

.todo-item-edit-input {
    max-width: 220px;
}

.todo-item-achieve-checkbox {
    margin-left: 5px;
    margin-top: 11.4px;
    margin-right: 0;
}

.todo-item-delete {
    margin-right: 5px;
    margin-top: 11.4px;
    color: var(--color-red);
    opacity: 0.4;
}

.todo-item-delete:hover {
    opacity: 1;
    cursor: pointer;
}

.todo-item-content {
    font-size: 13px;
    font-family: var(--font-monospace);
    margin-top: calc((40px - 1em - 6px) / 2);
}

.todo-add-item {
    position: absolute;
    bottom: 10px;
    right: 10px;
}

.todo-item-holder {
    height: 205px;
    overflow-y: scroll;
}

.el-radio__label {
    display: none;
}

.place-holder {
    margin-bottom: 40px;
}
</style>
