export default {
  api: {
    server: 'http://backend.soj.szdytom.tk/api'
  },
  markdown: {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false,
  },
  langTable: [{
    value: '0',
    label: 'C++'
  }, {
    value: '1',
    label: 'C++11'
  }, {
    value: '2',
    label: 'C++14'
  }, {
    value: '3',
    label: 'C++17'
  }, {
    value: '4',
    label: 'C++20'
  }, {
    value: '5',
    label: 'C'
  }, {
    value: '6',
    label: 'C#'
  }, {
    value: '7',
    label: 'Clang'
  }, {
    value: '8',
    label: 'Clang11'
  }, {
    value: '9',
    label: 'Clang14'
  }, {
    value: '10',
    label: 'Clang17'
  }, {
    value: '11',
    label: 'Clang20'
  }, {
    value: '12',
    label: 'Rust'
  }, {
    value: '13',
    label: 'Python2'
  }, {
    value: '14',
    label: 'Python3'
  }, {
    value: '15',
    label: 'Pascal'
  }, {
    value: '16',
    label: 'Go'
  }, {
    value: '17',
    label: 'Ruby'
  }, {
    value: '18',
    label: 'Java'
  }],
  stateTable: [{
    value: '0',
    label: 'Waiting',
    color: '#909399'
  }, {
    value: '1',
    label: 'Compiling',
    color: '#f7ba2a'
  }, {
    value: '2',
    label: 'Judging',
    color: '#409eff'
  }, {
    value: '3',
    label: 'Waiting',
    color: '#909399'
  }, {
    value: '10',
    label: 'Accepted',
    color: '#67C23A'
  }, {
    value: '11',
    label: 'Partly Correct',
    color: '#F7BA2A'
  }, {
    value: '12',
    label: 'Time Limit Exceed',
    color: '#F7BA2A'
  }, {
    value: '13',
    label: 'Memory Limit Exceeded',
    color: '#324057'
  }, {
    value: '14',
    label: 'Runtime Error',
    color: '#324057'
  }, {
    value: '15',
    label: 'Wrong Answer',
    color: '#F56C6C'
  }, {
    value: '16',
    label: 'Unknown Error',
    color: '#324057'
  }, {
    value: '17',
    label: 'Compile Error',
    color: '#F7BA2A'
  }, {
    value: '18',
    label: 'Output Limit Exceeded',
    color: '#F56C6C'
  }, {
    value: '20',
    label: 'System Error',
    color: '#FF4949'
  }, {
    value: '21',
    label: 'Judger Configure Error',
    color: '#FF4949'
  }, {
    value: '22',
    label: 'Judger Resources Limit Exceeded',
    color: '#FF4949'
  }, {
    value: '23',
    label: 'Unsupported Language',
    color: '#FF4949'
  }],
  captchaKeyMax: 2000000000
};
