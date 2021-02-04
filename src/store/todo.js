const todostore = {
  state: {
    todo_list: JSON.parse(localStorage.getItem('todo-list') || '[]'),
  },
  mutations: {
    addItem(state, data) {
      state.todo_list.push(data);
      localStorage.setItem('todo-list', JSON.stringify(state.todo_list));
    },
    editItem(state, data) {
      state.todo_list[data.index].name = data.name;
      localStorage.setItem('todo-list', JSON.stringify(state.todo_list));
    },
    achieveItem(state, index) {
      state.todo_list.splice(index, 1);
      localStorage.setItem('todo-list', JSON.stringify(state.todo_list));
    }
  }
};

export default todostore;