module.exports = {
	defaultSeverity: 'warning',
	extends: 'stylelint-config-standard',
	plugins: ['stylelint-order', 'stylelint-scss'],
	ignoreFiles: ['./node_modules', './src/assets/styles/base/_normalize.sass'],
	rules: {
		'block-closing-brace-empty-line-before': null,
		'block-closing-brace-newline-after': null,
		'block-closing-brace-newline-before': null,
		'block-closing-brace-space-after': null,
		'block-closing-brace-space-before': null,
		'block-opening-brace-newline-after': null,
		'block-opening-brace-newline-before': null,
		'block-opening-brace-space-after': null,
		'block-opening-brace-space-before': null,
		'declaration-block-trailing-semicolon': 'never',
		'number-leading-zero': 'never',
		'order/properties-alphabetical-order': true,
		'rule-empty-line-before': 'always'
	}
};
