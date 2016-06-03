var AnterosStringUtils = (function() {
    'use strict';


    function abbreviate(string, maxWidth, offset) {
        if (isEmpty(string)) {
            return null;
        }

        if (offset >= 4) {
            return '...' + String(string).substring(offset, maxWidth) + '...';
        }

        return String(string).substring(0, maxWidth) + '...';
    };

    function abbreviateMiddle(string, middle, length) {
        if (isEmpty(string)) {
            return null;
        }

        string = String(string);

        if (length > 0 && length < string.length) {
            return string.substring(0, length) + middle + string.substring(length);
        }

        return string;
    };

    function appendIfMissing(string, suffix, suffixes) {
        var endsWith = false;

        if (isEmpty(string)) {
            return string;
        }

        string = String(string);
        suffix = String(suffix);

        if (suffixes !== undefined && suffixes.length > 0) {
            endsWith = suffixes.every(function(s) {
                return this.endsWith(string, String(s));
            }.bind(this));
        } else {
            endsWith = this.endsWith(string, suffix);
        }

        return !endsWith ? string += suffix : string;
    };

    function capitalize(string) {
        if (isEmpty(string)) {
            return null;
        }

        string = String(string);

        return string.substring(0, 1).toUpperCase() + string.substring(1);
    };

    function chomp(string) {
        var regexp = /[\n\r]{1}$/;

        if (isEmpty(string)) {
            return null;
        }

        return string.replace(regexp, '');
    };

    function chop(string) {
        if (isEmpty(string)) {
            return null;
        }

        return string.indexOf('\r\n') === string.length - 2 ? string.substring(0, string.length - 2) : string.substring(0, string.length - 1);
    };

    function difference(string, comparison) {
        if (isEmpty(string) || isEmpty(comparison)) {
            return null;
        }

        var position = 0,
            stringArray = String(string).split(''),
            comparisonArray = String(comparison).split('');

        stringArray.forEach(function(char, index) {
            if (char === comparisonArray[index]) {
                position = index + 1;
            }
        });

        return comparisonArray.join('').substring(position);
    };

    function endsWith(string, suffix) {
        string = String(string);
        suffix = String(suffix);

        return string.indexOf(suffix) === string.length - suffix.length;
    };

    function endsWithIgnoreCase(string, suffix) {
        return this.endsWith(String(string).toLowerCase(), String(suffix).toLowerCase());
    };

    function endsWithAny(string, suffixArray) {
        return suffixArray.some(function(suffix) {
            return this.endsWith(string, suffix);
        }.bind(this));
    };

    function indexOfDifference(string, comparison) {
        return String(string) === String(comparison) ? -1 : String(comparison).indexOf(this.difference(string, comparison));
    };

    function isAllLowercase(string) {
        if (isEmpty(string)) {
            return false;
        }

        return /^[a-z]*$/.test(string);
    };

    function isAllUppercase(string) {
        if (isEmpty(string)) {
            return false;
        }

        return /^[A-Z]*$/.test(string);
    };

    function isAnyEmpty() {
        var stringArray = Array.prototype.slice.call(arguments);

        return stringArray.some(function(string) {
            return isEmpty(string);
        });
    };

    function isEmpty(string) {
        return (string == null || string.length == 0);
    };

    function isNoneEmpty() {
        var stringArray = Array.prototype.slice.call(arguments);

        return stringArray.every(function(string) {
            return isNotEmpty(String(string));
        });
    };

    function isNotEmpty(string) {
        return (string !== null && string.length > 0);
    };

    function leftPad(string, length, char) {
        var padString = '';

        char = char !== undefined ? String(char) : '';

        for (var i = 0; i < length; i++) {
            if (char.length > 0) {
                padString += String(char);
            } else {
                padString += ' ';
            }
        }

        return padString + String(string);
    };

    function normalizeSpace(string) {
        return String(string).replace(/\s\s+/g, ' ').trim();
    };

    function prependIfMissing(string, prefix, prefixes) {
        var startsWith = false;

        if (isEmpty(string)) {
            return string;
        }

        string = String(string);
        prefix = String(prefix);

        if (prefixes !== undefined && prefixes.length > 0) {
            startsWith = prefixes.every(function(s) {
                return startsWith(string, String(s));
            }.bind(this));
        } else {
            startsWith = this.startsWith(string, prefix);
        }

        return !startsWith ? prefix + string : string;
    };

    function removeEnd(string, remove) {
        var position;

        if (isEmpty(string)) {
            return null;
        }

        string = String(string);
        remove = String(remove);
        position = string.indexOf(remove);

        if (position === string.length - remove.length) {
            return string.substring(0, position);
        } else {
            return string;
        }
    };

    function removeEndIgnoreCase(string, remove) {
        var position,
            tempString;

        if (isEmpty(string)) {
            return null;
        }

        string = String(string);
        tempString = string;
        remove = String(remove).toLowerCase();
        string = string.toLowerCase();
        position = string.indexOf(remove);

        if (position === string.length - remove.length) {
            return tempString.substring(0, position);
        } else {
            return tempString;
        }
    };

    function removeStart(string, remove) {
        if (isEmpty(string)) {
            return null;
        }

        string = String(string);
        remove = String(remove);

        if (string.indexOf(remove) === 0) {
            return string.substring(remove.length);
        } else {
            return string;
        }
    };

    function removeStartIgnoreCase(string, remove) {
        var tempString;

        if (isEmpty(string)) {
            return null;
        }

        string = String(string);
        tempString = string;
        remove = String(remove).toLowerCase();
        string = string.toLowerCase();

        if (string.indexOf(remove) === 0) {
            return tempString.substring(remove.length);
        } else {
            return tempString;
        }
    };

    function repeat(string, times, separator) {
        var returnString = '';

        if (string === null || string === undefined) {
            return null;
        }

        if (separator !== undefined) {
            for (var i = 0; i < times - 1; i++) {
                returnString += String(string) + separator;
            }

            returnString += String(string);
        } else {
            for (var i = 0; i < times; i++) {
                returnString += String(string);
            }
        }

        return returnString;
    };

    function rightPad(string, length, char) {
        var padString = '';

        char = char !== undefined ? String(char) : '';

        for (var i = 0; i < length; i++) {
            if (char.length > 0) {
                padString += String(char);
            } else {
                padString += ' ';
            }
        }

        return String(string) + padString;
    };

    function startsWith(string, prefix) {
        return String(string).indexOf(String(prefix)) === 0;
    };

    function startsWithIgnoreCase(string, prefix) {
        return this.startsWith(String(string).toLowerCase(), String(prefix).toLowerCase());
    };

    function startsWithAny(string, prefixArray) {
        return prefixArray.some(function(prefix) {
            return this.startsWith(string, prefix);
        }.bind(this));
    };

    function swapCase(string) {
        var returnString = '';

        if (isEmpty(string)) {
            return null;
        }

        string.split('').forEach(function(character) {
            if (character === character.toUpperCase()) {
                returnString += character.toLowerCase();
            } else {
                returnString += character.toUpperCase();
            }
        });

        return returnString;
    };

    function uncapitalize(string) {
        if (isEmpty(string)) {
            return null;
        }

        string = String(string);

        return string.substring(0, 1).toLowerCase() + string.substring(1);
    };

    function wrap(string, char) {
        return String(char) + String(string) + String(char);
    };


    function StringBuilder() {
        var strings = [];

        this.append = function(string) {
            string = verify(string);
            if (string.length > 0) strings[strings.length] = string;
            return this;
        };

        this.appendLine = function(string) {
            string = verify(string);
            if (this.isEmpty()) {
                if (string.length > 0) strings[strings.length] = string;
                else return this;
            } else strings[strings.length] = string.length > 0 ? "\r\n" + string : "\r\n";
            return this;
        };

        this.clear = function() {
            strings = [];
            return this;
        };

        this.isEmpty = function() {
            return strings.length == 0;
        };

        this.toString = function() {
            return strings.join("");
        };

        var verify = function(string) {
            if (!defined(string)) return "";
            if (getType(string) != getType(new String())) return String(string);
            return string;
        };

        var defined = function(el) {
            // Changed per Ryan O'Hara's comment:
            return el != null && typeof(el) != "undefined";
        };

        var getType = function(instance) {
            if (!defined(instance.constructor)) throw Error("Unexpected object type");
            var type = String(instance.constructor).match(/function\s+(\w+)/);

            return defined(type) ? type[1] : "undefined";
        };
    };

    function createStringBuilder() {
        return new StringBuilder();
    }

    var result = {
        abbreviate: abbreviate,
        abbreviateMiddle: abbreviateMiddle,
        appendIfMissing: appendIfMissing,
        capitalize: capitalize,
        chomp: chomp,
        chop: chop,
        createStringBuilder : createStringBuilder,
        difference: difference,
        endsWith: endsWith,
        endsWithIgnoreCase: endsWithIgnoreCase,
        endsWithAny: endsWithAny,
        indexOfDifference: indexOfDifference,
        isAllLowercase: isAllLowercase,
        isAllUppercase: isAllUppercase,
        isAnyEmpty: isAnyEmpty,
        isEmpty: isEmpty,
        isNoneEmpty: isNoneEmpty,
        isNotEmpty: isNotEmpty,
        leftPad: leftPad,
        normalizeSpace: normalizeSpace,
        prependIfMissing: prependIfMissing,
        removeEnd: removeEnd,
        removeEndIgnoreCase: removeEndIgnoreCase,
        removeStart: removeStart,
        removeStartIgnoreCase: removeStartIgnoreCase,
        repeat: repeat,
        rightPad: rightPad,
        startsWith: startsWith,
        startsWithIgnoreCase: startsWithIgnoreCase,
        startsWithAny: startsWithAny,
        swapCase: swapCase,
        uncapitalize: uncapitalize,
        wrap: wrap
    };

    return result;
}());