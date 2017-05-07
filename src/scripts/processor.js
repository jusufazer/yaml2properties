var files = require('./files');
var parser = require('./parser');
var yaml = require('js-yaml');
var fs = require('fs');
var _ = require('lodash');

/**
 * Executes the conversion process. Depending on the given config, .json files are deflated into .properties  or
 * .propeties file are inflated into .json files. These processes are executed on each file identified within the src
 * directory identified by the src attribute of the provided options.config, and outputs the resultant file of each
 * input file within the destination directory identified by the dist attribute.
 *
 * @param options A json file having the following attributes:
 *  - config : An object having a src and dist attribute, identifying the source and destination directory
 *     respectively. Defaults to the current path if not provided.
 *  - reverse : A flag denoting if the reverse process, ie. converting properties to json should be done, and
 *     timestamp. Defaults to false.
 *  - timestamp: A flag identifying if a timestamp is to be prepended to the resultant files. Defaults to false.
 */
exports.processOptions = function (options) {
    var config = options.config;
       
    var data = yaml.safeLoad(fs.readFileSync(config.src, 'utf8'));
    
    var entries = parser.deflate(data); // Convert the JSON structure into an array of strings
    
    var dist = config.dist.split('/');
    var distFile = _.replace(_.last(dist), 'properties', 'json');
    var distDir = _.replace(config.dist, '/' + distFile, '');
    
    files.writeAsProperties(distDir, distFile, entries); // Writes the parsed result to the dist directory
};

/**
 * Consumes the provided options object and merges it with the default options. The conversion process is triggered
 * upon the resultant options object.
 *
 * @param options A json file having the following attributes:
 *  - config : An object having a src and dist attribute, identifying the source and destination directory
 *     respectively. Defaults to the current path if not provided.
 *  - reverse : A flag denoting if the reverse process, ie. converting properties to json should be done, and
 *     timestamp. Defaults to false.
 *  - timestamp: A flag identifying if a timestamp is to be prepended to the resultant files. Defaults to false.
 */
exports.process = function (options) {
    // Identify the current path
    var path = process.cwd();

    
    // The default options
    var _options = {
        config: { src: path, dist: path },
        reverse: false,
        spaces: 4
    };
    
    for (var key in options) {
        if (options.hasOwnProperty(key) && options[ key ]) {
            _options[ key ] = options[ key ];
        }
    }

    exports.processOptions(_options);
};
