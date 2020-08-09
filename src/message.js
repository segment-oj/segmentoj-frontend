export default {
  name: 'message',
  success: (element, content) => {
    element.$message({
      showClose: true,
      message: content,
      type: 'success',
      customClass: 'top-zindex'
    });
  },
  error: (element, content) => {
    element.$message({
      showClose: true,
      message: content,
      type: 'error',
      customClass: 'top-zindex'
    });
  }
};