export default {
  api: {
    server: 'http://localhost:8000/api'
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
    label: 'C++',
    codeMirror: '0'
  }, {
    value: '1',
    label: 'C++11',
    codeMirror: '0'
  }, {
    value: '2',
    label: 'C++14',
    codeMirror: '0'
  }, {
    value: '3',
    label: 'C++17',
    codeMirror: '0'
  }, {
    value: '4',
    label: 'C++20',
    codeMirror: '0'
  }, {
    value: '5',
    label: 'C',
    codeMirror: '1'
  }, {
    value: '6',
    label: 'C#',
    codeMirror: '3'
  }, {
    value: '7',
    label: 'Clang',
    codeMirror: '0'
  }, {
    value: '8',
    label: 'Clang11',
    codeMirror: '0'
  }, {
    value: '9',
    label: 'Clang14',
    codeMirror: '0'
  }, {
    value: '10',
    label: 'Clang17',
    codeMirror: '0'
  }, {
    value: '11',
    label: 'Clang20',
    codeMirror: '0'
  }, {
    value: '12',
    label: 'Rust',
    codeMirror: '4'
  }, {
    value: '13',
    label: 'Python2',
    codeMirror: '6'
  }, {
    value: '14',
    label: 'Python3',
    codeMirror: '6'
  }, {
    value: '15',
    label: 'Pascal',
    codeMirror: '11'
  }, {
    value: '16',
    label: 'Go',
    codeMirror: '10'
  }, {
    value: '17',
    label: 'Ruby',
    codeMirror: '8'
  }, {
    value: '18',
    label: 'Java',
    codeMirror: '2'
  }],
  codeMirrorModeTable: [{
    value: '0',
    label: 'C++',
    mode: 'text/x-c++src'
  }, {
    value: '1',
    label: 'C',
    mode: 'text/x-csrc'
  }, {
    value: '2',
    label: 'JAVA',
    mode: 'text/x-java'
  }, {
    value: '3',
    label: 'C#',
    mode: 'text/x-csharp'
  }, {
    value: '4',
    label: 'Rust',
    mode: 'text/x-rustsrc'
  }, {
    value: '5',
    label: 'TypeScript',
    mode: 'text/typescript'
  }, {
    value: '6',
    label: 'Python',
    mode: 'text/x-python'
  }, {
    value: '7',
    label: 'Markdown',
    mode: 'text/x-markdown'
  }, {
    value: '8',
    label: 'Ruby',
    mode: 'text/x-ruby'
  }, {
    value: '9',
    label: 'php',
    mode: 'text/x-php'
  }, {
    value: '10',
    label: 'GO',
    mode: 'text/x-go'
  }, {
    value: '11',
    label: 'Pascal',
    mode: 'text/x-pascal'
  }],
  CodeMirrorThemeTableOptions: [{
    label: 'Light',
    themes: [{
      value: '0',
      label: 'Tomorrow'
    }, {
      value: '1',
      label: 'Neo',
      theme: 'neo'
    }]
  }, {
    label: 'Dark',
    themes: [{
      value: '2',
      label: 'Ayu Mirage',
      theme: 'ayu-mirage'
    }, {
      value: '3',
      label: 'Monokai',
      theme: 'monokai'
    }, {
      value: '4',
      label: 'Zenburn',
      theme: 'zenburn'
    }]
  }],
  CodeMirrorThemeTable: [{
    value: '0',
    theme: '3024-day'
  }, {
    value: '1',
    theme: 'neo'
  }, {
    value: '2',
    theme: 'ayu-mirage'
  }, {
    value: '3',
    theme: 'monokai'
  }, {
    value: '4',
    theme: 'zenburn'
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
