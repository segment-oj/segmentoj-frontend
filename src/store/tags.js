const tagsstore = {
  state: {
    displayTags: false,
    tagsData: new Array(),
    tagsLock: new Array()
  },
  mutations: {
    setDisplayTag(state, data) {
      state.displayTags = data.val;
    }
  }
};

export default tagsstore;