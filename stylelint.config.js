module.exports = {
	defaultSeverity: 'warning',
	extends: 'stylelint-config-standard',
	plugins: ['stylelint-order', 'stylelint-scss'],
	rules: {
		'order/properties-alphabetical-order': true,
		'declaration-block-trailing-semicolon': 'never'
	}
};
