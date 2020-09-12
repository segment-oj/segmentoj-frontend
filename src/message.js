export default {
  name: 'message',
  success: (element, content) => {
    element.$message({
      showClose: true,
      message: content,
      type: 'success',
      customClass: 'layer-level-zindex'
    });
  },
  error: (element, content) => {
    element.$message({
      showClose: true,
      message: content,
      type: 'error',
      customClass: 'layer-level-zindex'
    });
  }
};