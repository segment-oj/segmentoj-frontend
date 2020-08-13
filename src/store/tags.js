const tagsstore = {
  state: {
    displayTags: false
  },
  mutations: {
    setDisplayTag(state, data) {
      state.displayTags = data.val;
    }
  }
};

export default tagsstore;