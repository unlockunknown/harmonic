var localconfig = require('../config');
var fs = require('fs');
var program = require('commander');

var util = require('../cli/util');
var logo = require('../cli/logo');

program
	.version(localconfig.version)

	/* Options */
	.option('-b, --build', 'Build your static website');

program
	.command('init')
	.description('Init your static website')
	.action(function (path) {
		console.log(logo);
		util.init(typeof path === 'string' ? path : './');
	});


program
	.command('config')
	.description('Config your static website')
	.action(function () {
		console.log(logo);
		util.config();
	});

program
	.command('build')
	.description('Build your static website')
	.action(function(env, options) {
		var core = require('../core');
		core.init();
	});

program
	.command('new_post ["title"]')
	.description('Create a new post')
	.action(function(title) {
		util.new_post(title).then(function (data) {
			console.log(data);
		});
	});

program
	.command('run [port]')
	.description('Run you static site locally. Port is optional')
	.action(function(_port) {		
		var port = _port ? _port : '9356';
		var core = require('../core');
		core.init().then(function() {
			util.run(port);
		});		
	});

program.parse(process.argv);

/* Not enough arguments */
if (!program.args.length) {
	console.log(logo);
	program.help();
}