// http://stylelint.cn/
// https://stylelint.io/
module.exports = {
  extends: [
    'stylelint-prettier/recommended',
    'stylelint-config-standard',
    'stylelint-config-prettier'
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['extends', 'ignores']
      }
    ],
    indentation: 2,
    'number-leading-zero': null,
    'media-feature-name-no-unknown': [
      true
    ],
    'unit-whitelist': ['px', '%', 's', 'em']
  },
  ignoreFiles: [
    '**/*.html',
    '**/*.js'
  ]
}
