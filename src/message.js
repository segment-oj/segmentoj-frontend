export default {
  name: 'message',
  success: (element, content) => {
    element.$message({
      showClose: true,
      message: content,
      type: 'success',
      customClass: 'highzindex'
    });
  },
  error: (element, content) => {
    element.$message({
      showClose: true,
      message: content,
      type: 'error',
      customClass: 'highzindex'
    });
  }
};