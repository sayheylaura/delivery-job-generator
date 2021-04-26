module.exports = {
	parser: '@babel/eslint-parser',
	env: {
		browser: true,
		node: true
	},
	extends: ['airbnb', 'plugin:prettier/recommended'],
	plugins: ['import', 'jsx-a11y', 'react', 'react-hooks'],
	rules: {
		'import/no-extraneous-dependencies': [
			'error',
			{ devDependencies: ['webpack.*.js'] }
		],
		'no-unused-expressions': [
			'error',
			{
				allowShortCircuit: true,
				allowTernary: true
			}
		],
		'react-hooks/exhaustive-deps': 'warn',
		'react-hooks/rules-of-hooks': 'error',
		'react/button-has-type': 'off',
		'react/jsx-filename-extension': 'off'
	}
};
