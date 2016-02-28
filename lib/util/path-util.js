/**
 * @fileoverview Common helpers for operations on filenames and paths
 * @author Ian VanSchooten
 * @copyright 2016 Ian VanSchooten. All rights reserved.
 * See LICENSE in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var path = require("path"),
    isAbsolute = require("path-is-absolute");

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------

/**
 * Replace Windows with Unix style paths and remove ./ prefix and any
 * unnecessary "../"
 *
 * @param {string} filepath Path to normalize
 * @returns {string} Normalized filepath
 */
function normalizeFilepath(filepath) {
    var posixFilepath = filepath.replace(/\\/g, "/");
    return path.normalize(posixFilepath);
}

/**
 * Converts an absolute filepath to a relative path from a given base bath
 *
 * For example, if the filepath is `/my/awesome/project/foo.bar`,
 * and the base directory is `/my/awesome/project/`,
 * then this function should return `foo.bar`.
 *
 * It does not take into account symlinks (for now).
 *
 * @param {string} filepath  Path to convert to relative path.  If already relative,
 *                           it will be assumed to be relative to process.cwd(),
 *                           converted to absolute, and then processed.
 * @param {string} [baseDir] Absolute base directory to resolve the filepath from.
 *                           If not provided, all this function will do is remove
 *                           a leading slash.
 * @returns {string} Relative filepath
 */
function getRelativePath(filepath, baseDir) {
    var relativePath;
    if (!isAbsolute(filepath)) {
        filepath = path.resolve(filepath);
    }
    if (baseDir) {
        if (!isAbsolute(baseDir)) {
            throw new Error("baseDir should be an absolute path");
        }
        relativePath = path.relative(baseDir, filepath);
    } else {
        relativePath = filepath.replace(/^\//, "");
    }
    return relativePath;
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = {
    normalizeFilepath: normalizeFilepath,
    getRelativePath: getRelativePath
};
