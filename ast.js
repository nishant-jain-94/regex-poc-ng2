const espree = require('espree');
const util = require('util');
const glob = require('glob-array');
const fs = require('fs');
const commandLineArgs = require('command-line-args');


var optionDefinitions = [
	{
		name: 'src', type: String
	}	
];

var arguments = commandLineArgs(optionDefinitions);
var files = glob.sync([arguments.src+'/**/*.js']);
var data = fs.readFileSync(files[0]);
var ast = espree.parse(data);
console.log(util.inspect(ast,{showHidden: false, depth: null}));