module.exports = {
	env: {
		browser: false,
		es2021: true,
		mocha: true,
		node: true,
	},
	plugins: ["react", "prettier", "@typescript-eslint"],
	parser: "@typescript-eslint/parser",
	extends: [
		'standard',
		'plugin:prettier/recommended',
		'plugin:node/recommended', 
		"@typescript-eslint",
		"plugin:react/recommended"
	],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
		project: [
      		"tsconfig.json",
      		"tailwind.config.js"
    	],
		
	},
	overrides: [
		{
			files: ['hardhat.config.js'],
			globals: { task: true },
		},
	],
};
