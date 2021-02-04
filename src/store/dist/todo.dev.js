"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var todostore = {
  state: {
    todo_list: JSON.parse(localStorage.getItem('todo-list') || '[]')
  },
  mutations: {
    addItem: function addItem(state, data) {
      state.todo_list.push(data);
      localStorage.setItem('todo-list', JSON.stringify(state.todo_list));
    },
    editItem: function editItem(state, data) {
      state.todo_list[data.index].name = data.name;
      localStorage.setItem('todo-list', JSON.stringify(state.todo_list));
    },
    achieveItem: function achieveItem(state, index) {
      state.todo_list.splice(index, 1);
      localStorage.setItem('todo-list', JSON.stringify(state.todo_list));
    }
  }
};
var _default = todostore;
exports["default"] = _default;