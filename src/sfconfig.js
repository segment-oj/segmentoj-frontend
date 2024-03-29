export default {
  api: {
    server: 'http://localhost:8000/api'
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
  majorLangTable: [{
    stringCode: 'c',
    numberCode: 1,
    label: 'C',
    codeMirror: '1',
    options: [{
      label: 'Standard',
      list: ['89', '99', '11',],
      default: 0,
    }, {
      label: 'Compiler',
      list: ['clang', 'gcc',],
      default: 0,
    }, {
      label: 'Optimize',
      list: ['O0', 'O1', 'O2', 'O3', 'Ofast',],
      default: 2,
    },],
  }, {
    stringCode: 'cxx',
    numberCode: 2,
    label: 'C++',
    codeMirror: '0',
    options: [{
      label: 'Standard',
      list: ['98', '11', '14', '17', '20',],
      default: 3,
    }, {
      label: 'Compiler',
      list: ['clang', 'gcc',],
      default: 0,
    }, {
      label: 'Optimize',
      list: ['O0', 'O1', 'O2', 'O3', 'Ofast',],
      default: 2,
    },],
  }, {
    stringCode: 'py',
    numberCode: 3,
    label: 'Python',
    codeMirror: '6',
    options: [{
      label: 'Version',
      list: ['27', '36', '37', '38', '39',],
      default: 1,
    }, {
      label: 'Interpreter',
      list: ['python', 'pypy',],
      default: 0,
    },],
  }, {
    stringCode: 'rs',
    numberCode: 4,
    label: 'Rust',
    codeMirror: '4',
    options: [],
  }, {
    stringCode: 'js',
    numberCode: 5,
    label: 'Node.JS',
    codeMirror: '12',
    options: [],
  }, {
    stringCode: 'go',
    numberCode: 6,
    label: 'Go',
    codeMirror: '10',
    options: [],
  }, {
    stringCode: 'java',
    numberCode: 7,
    label: 'Java',
    codeMirror: '2',
    options: [{
      label: 'Frontend',
      list: ['java', 'scala', 'kotlin',],
      default: 0,
    },],
  }, {
    stringCode: 'rb',
    numberCode: 8,
    label: 'Ruby',
    codeMirror: '8',
    options: [],
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
    mode: 'gfm'
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
  }, {
    value: '12',
    label: 'Javascript',
    mode: 'text/javascript'
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
    icon: 'el-icon-loading',
    label: 'Waiting',
    color: 'var(--color-grey)'
  }, {
    value: '1',
    icon: 'el-icon-loading',
    label: 'Compiling',
    color: 'var(--color-yellow-light)'
  }, {
    value: '2',
    icon: 'el-icon-loading',
    label: 'Judging',
    color: 'var(--color-blue)'
  }, {
    value: '3',
    icon: 'el-icon-loading',
    label: 'Waiting',
    color: 'var(--color-grey)'
  }, {
    value: '10',
    icon: 'el-icon-check',
    label: 'Accepted',
    color: 'var(--color-green)'
  }, {
    value: '11',
    icon: 'el-icon-minus',
    label: 'Partly Correct',
    color: 'var(--color-yellow-light)'
  }, {
    value: '12',
    icon: 'el-icon-time',
    label: 'Time Limit Exceed',
    color: 'var(--color-yellow-light)'
  }, {
    value: '13',
    icon: 'el-icon-coin',
    label: 'Memory Limit Exceeded',
    color: 'var(--color-blue-grey-1)'
  }, {
    value: '14',
    icon: 'el-icon-warning-outline',
    label: 'Runtime Error',
    color: 'var(--color-blue-grey-1)'
  }, {
    value: '15',
    icon: 'el-icon-close',
    label: 'Wrong Answer',
    color: 'var(--color-red)'
  }, {
    value: '16',
    icon: 'el-icon-circle-close',
    label: 'Unknown Error',
    color: 'var(--color-blue-grey-2)'
  }, {
    value: '17',
    icon: 'el-icon-close',
    label: 'Compile Error',
    color: 'var(--color-yellow-light)'
  }, {
    value: '18',
    icon: 'el-icon-close',
    label: 'Output Limit Exceeded',
    color: 'var(--color-red)'
  }, {
    value: '20',
    icon: 'el-icon-circle-close',
    label: 'System Error',
    color: 'var(--color-red-bright)'
  }, {
    value: '21',
    icon: 'el-icon-circle-close',
    label: 'File Error',
    color: 'var(--color-red-bright)'
  }, {
    value: '22',
    icon: 'el-icon-circle-close',
    label: 'Judger Configure Error',
    color: 'var(--color-red-bright)'
  }, {
    value: '23',
    icon: 'el-icon-circle-close',
    label: 'Judger Resources Limit Exceeded',
    color: 'var(--color-red-bright)'
  }, {
    value: '24',
    icon: 'el-icon-circle-close',
    label: 'Unsupported Language',
    color: 'var(--color-red-bright)'
  }],
  captchaKeyMax: 2000000000,
  navColorPreset: [
    '#545c64',
    '#58B7FF',
    '#20A0FF',
    '#67C23A',
    '#E6A23C',
    '#F56C6C',
    '#909399',
    '#1F2D3D',
    '#324057',
    '#475669',
  ],
  tagColorPreset: [
    '#409eff',
    '#67c23a',
    '#e6a23c',
    '#f56c6c',
    '#909399',
  ],
};
