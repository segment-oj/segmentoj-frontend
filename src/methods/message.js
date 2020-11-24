import { Message } from 'element-ui';

export default {
  name: 'message',
  success(content) {
    Message({
      showClose: true,
      message: content,
      type: 'success',
      customClass: 'layer-level-zindex'
    });
  },
  warning(content) {
    Message({
      showClose: true,
      message: content,
      type: 'warning',
      customClass: 'layer-level-zindex'
    });
  },
  error(content) {
    Message({
      showClose: true,
      message: content,
      type: 'error',
      customClass: 'layer-level-zindex'
    });
  },
};