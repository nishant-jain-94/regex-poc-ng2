# Running Regex-Poc

node index.js --src "asp-mvc-crud/\*\*/\*.cs" --token aspmvc.tokens.json --rule aspmvc.rules.json

### --src 
Patterns of the files to be passed through the regex-poc

### --token
file containing set of tokens to be matched

### --rule 
File containing an array of rules to be matched
	