# Running Regex-Poc

node index.js --src "asp-mvc-crud/\*\*/\*.cs" --token aspmvc.tokens.json --rule aspmvc.rules.json

### --src - patterns of the files to be passed through the regex-poc

### --token - file containing set of tokens to be matched

### --rule - file containing an array of rules to be matched
	