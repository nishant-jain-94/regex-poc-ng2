const highland = require('highland');
const tokens = require('./tokens-ng2.json');
var stackOfReg = {};
var tree = "";
var fs = require('fs');
var readLine = require('readline');
var glob = require('glob-array');
var checker = require('./checker.json');
var commandLineArgs = require('command-line-args');
var _ = require('underscore');
var optionDefinitions = [
	{
		name: 'src', type: String
	}	
];

var arguments = commandLineArgs(optionDefinitions);
var recursive = require('recursive-readdir');

function sortByIndex(a, b) {
	return a.index - b.index;
}

function extractToken(current) {
	var matches = [];
	highland.keys(tokens).each(function(token) {
		var regexp = new RegExp(token, "g");
		var result = regexp.exec(current);
		while(result != null) {
			var match = {};
			match.index = result.index;
			match.lastIndex = regexp.lastIndex; 
			match.token = tokens[token];
			matches.push(match);
			result = regexp.exec(current);
		}
	});
	return matches.sort(sortByIndex);
}

function buildTree(extractedTokens) {
	extractedTokens.forEach(function(extractedToken) {

			if(extractedToken.token.type === "startblock") {
				tree += ":{";
			} else if(extractedToken.token.type === "endblock") {
				tree += "}";
			} else {
				tree += extractedToken.token.type;
			}
		});
		this.stack = this.stack.concat(extractedTokens);
		
}	

function parseTree() {
	var parseObj = {}
	this.stack.forEach(function(item) {
		if(checker.indexOf(item.token.type) >= 0) {
			parseObj[item.token.type] = true;
		}
	});
	var keyDiff = _.difference(checker, _.keys(parseObj));
	keyDiff.forEach(function(key) {
		parseObj[key] = false;
	});
	// console.log(parseObj);
	return parseObj
}


// console.log(glob);
var files = glob.sync([arguments.src+'/**/*.component.ts', arguments.src+'/**/*-service.ts']);
	var promises = [];
	files.forEach(function(file) {
		var promise = new Promise(function(resolve, reject) {
			var data = fs.readFileSync(file);
			var lines = data.toString().split('\n');
			this.stack = [];
			highland(lines)
				.map(extractToken)
				.each(buildTree.bind(this))
				.done(function(){
					var parsedObj = parseTree(this.stack);
					// parsedObj.fileType = 'Component';
					stackOfReg[file] = parsedObj;
					resolve();
				});
		});
		promises.push(promise);
	});
	
	Promise.all(promises).then(function() {
		console.log(stackOfReg);
	});