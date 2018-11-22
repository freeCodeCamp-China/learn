webpackJsonp([76662671623916],{

/***/ 423:
/***/ (function(module, exports) {

	'use strict';
	var toString = Object.prototype.toString;
	
	module.exports = function (x) {
		var prototype;
		return toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
	};


/***/ }),

/***/ 58:
/***/ (function(module, exports) {

	module.exports = isPromise;
	
	function isPromise(obj) {
	  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
	}


/***/ }),

/***/ 437:
/***/ (function(module, exports) {

	/**
	 * Converts an ASCII `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function asciiToArray(string) {
	  return string.split('');
	}
	
	module.exports = asciiToArray;


/***/ }),

/***/ 438:
/***/ (function(module, exports) {

	/** Used to match words composed of alphanumeric characters. */
	var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
	
	/**
	 * Splits an ASCII `string` into an array of its words.
	 *
	 * @private
	 * @param {string} The string to inspect.
	 * @returns {Array} Returns the words of `string`.
	 */
	function asciiWords(string) {
	  return string.match(reAsciiWord) || [];
	}
	
	module.exports = asciiWords;


/***/ }),

/***/ 444:
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;
	
	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = end > length ? length : end;
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;
	
	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}
	
	module.exports = baseSlice;


/***/ }),

/***/ 445:
/***/ (function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(444);
	
	/**
	 * Casts `array` to a slice if it's needed.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {number} start The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the cast slice.
	 */
	function castSlice(array, start, end) {
	  var length = array.length;
	  end = end === undefined ? length : end;
	  return (!start && end >= length) ? array : baseSlice(array, start, end);
	}
	
	module.exports = castSlice;


/***/ }),

/***/ 447:
/***/ (function(module, exports, __webpack_require__) {

	var castSlice = __webpack_require__(445),
	    hasUnicode = __webpack_require__(226),
	    stringToArray = __webpack_require__(457),
	    toString = __webpack_require__(60);
	
	/**
	 * Creates a function like `_.lowerFirst`.
	 *
	 * @private
	 * @param {string} methodName The name of the `String` case method to use.
	 * @returns {Function} Returns the new case function.
	 */
	function createCaseFirst(methodName) {
	  return function(string) {
	    string = toString(string);
	
	    var strSymbols = hasUnicode(string)
	      ? stringToArray(string)
	      : undefined;
	
	    var chr = strSymbols
	      ? strSymbols[0]
	      : string.charAt(0);
	
	    var trailing = strSymbols
	      ? castSlice(strSymbols, 1).join('')
	      : string.slice(1);
	
	    return chr[methodName]() + trailing;
	  };
	}
	
	module.exports = createCaseFirst;


/***/ }),

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

	var arrayReduce = __webpack_require__(435),
	    deburr = __webpack_require__(463),
	    words = __webpack_require__(475);
	
	/** Used to compose unicode capture groups. */
	var rsApos = "['\u2019]";
	
	/** Used to match apostrophes. */
	var reApos = RegExp(rsApos, 'g');
	
	/**
	 * Creates a function like `_.camelCase`.
	 *
	 * @private
	 * @param {Function} callback The function to combine each word.
	 * @returns {Function} Returns the new compounder function.
	 */
	function createCompounder(callback) {
	  return function(string) {
	    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
	  };
	}
	
	module.exports = createCompounder;


/***/ }),

/***/ 448:
/***/ (function(module, exports, __webpack_require__) {

	var basePropertyOf = __webpack_require__(443);
	
	/** Used to map Latin Unicode letters to basic Latin letters. */
	var deburredLetters = {
	  // Latin-1 Supplement block.
	  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
	  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
	  '\xc7': 'C',  '\xe7': 'c',
	  '\xd0': 'D',  '\xf0': 'd',
	  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
	  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
	  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
	  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
	  '\xd1': 'N',  '\xf1': 'n',
	  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
	  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
	  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
	  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
	  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
	  '\xc6': 'Ae', '\xe6': 'ae',
	  '\xde': 'Th', '\xfe': 'th',
	  '\xdf': 'ss',
	  // Latin Extended-A block.
	  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
	  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
	  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
	  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
	  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
	  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
	  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
	  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
	  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
	  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
	  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
	  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
	  '\u0134': 'J',  '\u0135': 'j',
	  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
	  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
	  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
	  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
	  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
	  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
	  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
	  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
	  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
	  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
	  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
	  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
	  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
	  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
	  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
	  '\u0174': 'W',  '\u0175': 'w',
	  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
	  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
	  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
	  '\u0132': 'IJ', '\u0133': 'ij',
	  '\u0152': 'Oe', '\u0153': 'oe',
	  '\u0149': "'n", '\u017f': 's'
	};
	
	/**
	 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
	 * letters to basic Latin letters.
	 *
	 * @private
	 * @param {string} letter The matched letter to deburr.
	 * @returns {string} Returns the deburred letter.
	 */
	var deburrLetter = basePropertyOf(deburredLetters);
	
	module.exports = deburrLetter;


/***/ }),

/***/ 226:
/***/ (function(module, exports) {

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f',
	    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange = '\\u20d0-\\u20ff',
	    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
	    rsVarRange = '\\ufe0e\\ufe0f';
	
	/** Used to compose unicode capture groups. */
	var rsZWJ = '\\u200d';
	
	/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
	var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');
	
	/**
	 * Checks if `string` contains Unicode symbols.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
	 */
	function hasUnicode(string) {
	  return reHasUnicode.test(string);
	}
	
	module.exports = hasUnicode;


/***/ }),

/***/ 453:
/***/ (function(module, exports) {

	/** Used to detect strings that need a more robust regexp to match words. */
	var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
	
	/**
	 * Checks if `string` contains a word composed of Unicode symbols.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {boolean} Returns `true` if a word is found, else `false`.
	 */
	function hasUnicodeWord(string) {
	  return reHasUnicodeWord.test(string);
	}
	
	module.exports = hasUnicodeWord;


/***/ }),

/***/ 457:
/***/ (function(module, exports, __webpack_require__) {

	var asciiToArray = __webpack_require__(437),
	    hasUnicode = __webpack_require__(226),
	    unicodeToArray = __webpack_require__(458);
	
	/**
	 * Converts `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function stringToArray(string) {
	  return hasUnicode(string)
	    ? unicodeToArray(string)
	    : asciiToArray(string);
	}
	
	module.exports = stringToArray;


/***/ }),

/***/ 458:
/***/ (function(module, exports) {

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f',
	    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange = '\\u20d0-\\u20ff',
	    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
	    rsVarRange = '\\ufe0e\\ufe0f';
	
	/** Used to compose unicode capture groups. */
	var rsAstral = '[' + rsAstralRange + ']',
	    rsCombo = '[' + rsComboRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsZWJ = '\\u200d';
	
	/** Used to compose unicode regexes. */
	var reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
	
	/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
	var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');
	
	/**
	 * Converts a Unicode `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function unicodeToArray(string) {
	  return string.match(reUnicode) || [];
	}
	
	module.exports = unicodeToArray;


/***/ }),

/***/ 459:
/***/ (function(module, exports) {

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f',
	    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange = '\\u20d0-\\u20ff',
	    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
	    rsDingbatRange = '\\u2700-\\u27bf',
	    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
	    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
	    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
	    rsPunctuationRange = '\\u2000-\\u206f',
	    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
	    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
	    rsVarRange = '\\ufe0e\\ufe0f',
	    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
	
	/** Used to compose unicode capture groups. */
	var rsApos = "['\u2019]",
	    rsBreak = '[' + rsBreakRange + ']',
	    rsCombo = '[' + rsComboRange + ']',
	    rsDigits = '\\d+',
	    rsDingbat = '[' + rsDingbatRange + ']',
	    rsLower = '[' + rsLowerRange + ']',
	    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsUpper = '[' + rsUpperRange + ']',
	    rsZWJ = '\\u200d';
	
	/** Used to compose unicode regexes. */
	var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
	    rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
	    rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
	    rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
	    reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
	    rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;
	
	/** Used to match complex or compound words. */
	var reUnicodeWord = RegExp([
	  rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
	  rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
	  rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
	  rsUpper + '+' + rsOptContrUpper,
	  rsOrdUpper,
	  rsOrdLower,
	  rsDigits,
	  rsEmoji
	].join('|'), 'g');
	
	/**
	 * Splits a Unicode `string` into an array of its words.
	 *
	 * @private
	 * @param {string} The string to inspect.
	 * @returns {Array} Returns the words of `string`.
	 */
	function unicodeWords(string) {
	  return string.match(reUnicodeWord) || [];
	}
	
	module.exports = unicodeWords;


/***/ }),

/***/ 463:
/***/ (function(module, exports, __webpack_require__) {

	var deburrLetter = __webpack_require__(448),
	    toString = __webpack_require__(60);
	
	/** Used to match Latin Unicode letters (excluding mathematical operators). */
	var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
	
	/** Used to compose unicode character classes. */
	var rsComboMarksRange = '\\u0300-\\u036f',
	    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange = '\\u20d0-\\u20ff',
	    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
	
	/** Used to compose unicode capture groups. */
	var rsCombo = '[' + rsComboRange + ']';
	
	/**
	 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
	 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
	 */
	var reComboMark = RegExp(rsCombo, 'g');
	
	/**
	 * Deburrs `string` by converting
	 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
	 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
	 * letters to basic Latin letters and removing
	 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to deburr.
	 * @returns {string} Returns the deburred string.
	 * @example
	 *
	 * _.deburr('déjà vu');
	 * // => 'deja vu'
	 */
	function deburr(string) {
	  string = toString(string);
	  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
	}
	
	module.exports = deburr;


/***/ }),

/***/ 470:
/***/ (function(module, exports, __webpack_require__) {

	var createCompounder = __webpack_require__(225);
	
	/**
	 * Converts `string` to
	 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the kebab cased string.
	 * @example
	 *
	 * _.kebabCase('Foo Bar');
	 * // => 'foo-bar'
	 *
	 * _.kebabCase('fooBar');
	 * // => 'foo-bar'
	 *
	 * _.kebabCase('__FOO_BAR__');
	 * // => 'foo-bar'
	 */
	var kebabCase = createCompounder(function(result, word, index) {
	  return result + (index ? '-' : '') + word.toLowerCase();
	});
	
	module.exports = kebabCase;


/***/ }),

/***/ 471:
/***/ (function(module, exports, __webpack_require__) {

	var createCompounder = __webpack_require__(225),
	    upperFirst = __webpack_require__(474);
	
	/**
	 * Converts `string` to
	 * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.1.0
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the start cased string.
	 * @example
	 *
	 * _.startCase('--foo-bar--');
	 * // => 'Foo Bar'
	 *
	 * _.startCase('fooBar');
	 * // => 'Foo Bar'
	 *
	 * _.startCase('__FOO_BAR__');
	 * // => 'FOO BAR'
	 */
	var startCase = createCompounder(function(result, word, index) {
	  return result + (index ? ' ' : '') + upperFirst(word);
	});
	
	module.exports = startCase;


/***/ }),

/***/ 474:
/***/ (function(module, exports, __webpack_require__) {

	var createCaseFirst = __webpack_require__(447);
	
	/**
	 * Converts the first character of `string` to upper case.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.upperFirst('fred');
	 * // => 'Fred'
	 *
	 * _.upperFirst('FRED');
	 * // => 'FRED'
	 */
	var upperFirst = createCaseFirst('toUpperCase');
	
	module.exports = upperFirst;


/***/ }),

/***/ 475:
/***/ (function(module, exports, __webpack_require__) {

	var asciiWords = __webpack_require__(438),
	    hasUnicodeWord = __webpack_require__(453),
	    toString = __webpack_require__(60),
	    unicodeWords = __webpack_require__(459);
	
	/**
	 * Splits `string` into an array of its words.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to inspect.
	 * @param {RegExp|string} [pattern] The pattern to match words.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {Array} Returns the words of `string`.
	 * @example
	 *
	 * _.words('fred, barney, & pebbles');
	 * // => ['fred', 'barney', 'pebbles']
	 *
	 * _.words('fred, barney, & pebbles', /[^, ]+/g);
	 * // => ['fred', 'barney', '&', 'pebbles']
	 */
	function words(string, pattern, guard) {
	  string = toString(string);
	  pattern = guard ? undefined : pattern;
	
	  if (pattern === undefined) {
	    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
	  }
	  return string.match(pattern) || [];
	}
	
	module.exports = words;


/***/ }),

/***/ 476:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var url = __webpack_require__(532);
	var punycode = __webpack_require__(483);
	var queryString = __webpack_require__(477);
	var prependHttp = __webpack_require__(482);
	var sortKeys = __webpack_require__(528);
	var objectAssign = __webpack_require__(61);
	
	var DEFAULT_PORTS = {
		'http:': 80,
		'https:': 443,
		'ftp:': 21
	};
	
	// protocols that always contain a `//`` bit
	var slashedProtocol = {
		'http': true,
		'https': true,
		'ftp': true,
		'gopher': true,
		'file': true,
		'http:': true,
		'https:': true,
		'ftp:': true,
		'gopher:': true,
		'file:': true
	};
	
	function testParameter(name, filters) {
		return filters.some(function (filter) {
			return filter instanceof RegExp ? filter.test(name) : filter === name;
		});
	}
	
	module.exports = function (str, opts) {
		opts = objectAssign({
			normalizeProtocol: true,
			normalizeHttps: false,
			stripFragment: true,
			stripWWW: true,
			removeQueryParameters: [/^utm_\w+/i],
			removeTrailingSlash: true,
			removeDirectoryIndex: false
		}, opts);
	
		if (typeof str !== 'string') {
			throw new TypeError('Expected a string');
		}
	
		var hasRelativeProtocol = str.indexOf('//') === 0;
	
		// prepend protocol
		str = prependHttp(str.trim()).replace(/^\/\//, 'http://');
	
		var urlObj = url.parse(str);
	
		if (opts.normalizeHttps && urlObj.protocol === 'https:') {
			urlObj.protocol = 'http:';
		}
	
		if (!urlObj.hostname && !urlObj.pathname) {
			throw new Error('Invalid URL');
		}
	
		// prevent these from being used by `url.format`
		delete urlObj.host;
		delete urlObj.query;
	
		// remove fragment
		if (opts.stripFragment) {
			delete urlObj.hash;
		}
	
		// remove default port
		var port = DEFAULT_PORTS[urlObj.protocol];
		if (Number(urlObj.port) === port) {
			delete urlObj.port;
		}
	
		// remove duplicate slashes
		if (urlObj.pathname) {
			urlObj.pathname = urlObj.pathname.replace(/\/{2,}/g, '/');
		}
	
		// decode URI octets
		if (urlObj.pathname) {
			urlObj.pathname = decodeURI(urlObj.pathname);
		}
	
		// remove directory index
		if (opts.removeDirectoryIndex === true) {
			opts.removeDirectoryIndex = [/^index\.[a-z]+$/];
		}
	
		if (Array.isArray(opts.removeDirectoryIndex) && opts.removeDirectoryIndex.length) {
			var pathComponents = urlObj.pathname.split('/');
			var lastComponent = pathComponents[pathComponents.length - 1];
	
			if (testParameter(lastComponent, opts.removeDirectoryIndex)) {
				pathComponents = pathComponents.slice(0, pathComponents.length - 1);
				urlObj.pathname = pathComponents.slice(1).join('/') + '/';
			}
		}
	
		// resolve relative paths, but only for slashed protocols
		if (slashedProtocol[urlObj.protocol]) {
			var domain = urlObj.protocol + '//' + urlObj.hostname;
			var relative = url.resolve(domain, urlObj.pathname);
			urlObj.pathname = relative.replace(domain, '');
		}
	
		if (urlObj.hostname) {
			// IDN to Unicode
			urlObj.hostname = punycode.toUnicode(urlObj.hostname).toLowerCase();
	
			// remove trailing dot
			urlObj.hostname = urlObj.hostname.replace(/\.$/, '');
	
			// remove `www.`
			if (opts.stripWWW) {
				urlObj.hostname = urlObj.hostname.replace(/^www\./, '');
			}
		}
	
		// remove URL with empty query string
		if (urlObj.search === '?') {
			delete urlObj.search;
		}
	
		var queryParameters = queryString.parse(urlObj.search);
	
		// remove query unwanted parameters
		if (Array.isArray(opts.removeQueryParameters)) {
			for (var key in queryParameters) {
				if (testParameter(key, opts.removeQueryParameters)) {
					delete queryParameters[key];
				}
			}
		}
	
		// sort query parameters
		urlObj.search = queryString.stringify(sortKeys(queryParameters));
	
		// decode query parameters
		urlObj.search = decodeURIComponent(urlObj.search);
	
		// take advantage of many of the Node `url` normalizations
		str = url.format(urlObj);
	
		// remove ending `/`
		if (opts.removeTrailingSlash || urlObj.pathname === '/') {
			str = str.replace(/\/$/, '');
		}
	
		// restore relative protocol, if applicable
		if (hasRelativeProtocol && !opts.normalizeProtocol) {
			str = str.replace(/^http:\/\//, '//');
		}
	
		return str;
	};


/***/ }),

/***/ 477:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var strictUriEncode = __webpack_require__(365);
	var objectAssign = __webpack_require__(61);
	
	function encoderForArrayFormat(opts) {
		switch (opts.arrayFormat) {
			case 'index':
				return function (key, value, index) {
					return value === null ? [
						encode(key, opts),
						'[',
						index,
						']'
					].join('') : [
						encode(key, opts),
						'[',
						encode(index, opts),
						']=',
						encode(value, opts)
					].join('');
				};
	
			case 'bracket':
				return function (key, value) {
					return value === null ? encode(key, opts) : [
						encode(key, opts),
						'[]=',
						encode(value, opts)
					].join('');
				};
	
			default:
				return function (key, value) {
					return value === null ? encode(key, opts) : [
						encode(key, opts),
						'=',
						encode(value, opts)
					].join('');
				};
		}
	}
	
	function parserForArrayFormat(opts) {
		var result;
	
		switch (opts.arrayFormat) {
			case 'index':
				return function (key, value, accumulator) {
					result = /\[(\d*)\]$/.exec(key);
	
					key = key.replace(/\[\d*\]$/, '');
	
					if (!result) {
						accumulator[key] = value;
						return;
					}
	
					if (accumulator[key] === undefined) {
						accumulator[key] = {};
					}
	
					accumulator[key][result[1]] = value;
				};
	
			case 'bracket':
				return function (key, value, accumulator) {
					result = /(\[\])$/.exec(key);
					key = key.replace(/\[\]$/, '');
	
					if (!result) {
						accumulator[key] = value;
						return;
					} else if (accumulator[key] === undefined) {
						accumulator[key] = [value];
						return;
					}
	
					accumulator[key] = [].concat(accumulator[key], value);
				};
	
			default:
				return function (key, value, accumulator) {
					if (accumulator[key] === undefined) {
						accumulator[key] = value;
						return;
					}
	
					accumulator[key] = [].concat(accumulator[key], value);
				};
		}
	}
	
	function encode(value, opts) {
		if (opts.encode) {
			return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
		}
	
		return value;
	}
	
	function keysSorter(input) {
		if (Array.isArray(input)) {
			return input.sort();
		} else if (typeof input === 'object') {
			return keysSorter(Object.keys(input)).sort(function (a, b) {
				return Number(a) - Number(b);
			}).map(function (key) {
				return input[key];
			});
		}
	
		return input;
	}
	
	exports.extract = function (str) {
		return str.split('?')[1] || '';
	};
	
	exports.parse = function (str, opts) {
		opts = objectAssign({arrayFormat: 'none'}, opts);
	
		var formatter = parserForArrayFormat(opts);
	
		// Create an object with no prototype
		// https://github.com/sindresorhus/query-string/issues/47
		var ret = Object.create(null);
	
		if (typeof str !== 'string') {
			return ret;
		}
	
		str = str.trim().replace(/^(\?|#|&)/, '');
	
		if (!str) {
			return ret;
		}
	
		str.split('&').forEach(function (param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			// Firefox (pre 40) decodes `%3D` to `=`
			// https://github.com/sindresorhus/query-string/pull/37
			var key = parts.shift();
			var val = parts.length > 0 ? parts.join('=') : undefined;
	
			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);
	
			formatter(decodeURIComponent(key), val, ret);
		});
	
		return Object.keys(ret).sort().reduce(function (result, key) {
			var val = ret[key];
			if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
				// Sort object keys, not values
				result[key] = keysSorter(val);
			} else {
				result[key] = val;
			}
	
			return result;
		}, Object.create(null));
	};
	
	exports.stringify = function (obj, opts) {
		var defaults = {
			encode: true,
			strict: true,
			arrayFormat: 'none'
		};
	
		opts = objectAssign(defaults, opts);
	
		var formatter = encoderForArrayFormat(opts);
	
		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];
	
			if (val === undefined) {
				return '';
			}
	
			if (val === null) {
				return encode(key, opts);
			}
	
			if (Array.isArray(val)) {
				var result = [];
	
				val.slice().forEach(function (val2) {
					if (val2 === undefined) {
						return;
					}
	
					result.push(formatter(key, val2, result.length));
				});
	
				return result.join('&');
			}
	
			return encode(key, opts) + '=' + encode(val, opts);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};


/***/ }),

/***/ 482:
/***/ (function(module, exports) {

	'use strict';
	module.exports = function (url) {
		if (typeof url !== 'string') {
			throw new TypeError('Expected a string, got ' + typeof url);
		}
	
		url = url.trim();
	
		if (/^\.*\/|^(?!localhost)\w+:/.test(url)) {
			return url;
		}
	
		return url.replace(/^(?!(?:\w+:)?\/\/)/, 'http://');
	};


/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _createChainableTypeChecker = __webpack_require__(232);
	
	var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function validate(props, propName, componentName, location, propFullName) {
	  var propValue = props[propName];
	  var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
	
	  if (_react2.default.isValidElement(propValue)) {
	    return new Error('Invalid ' + location + ' `' + propFullName + '` of type ReactElement ' + ('supplied to `' + componentName + '`, expected a ReactComponent or a ') + 'DOMElement. You can usually obtain a ReactComponent or DOMElement ' + 'from a ReactElement by attaching a ref to it.');
	  }
	
	  if ((propType !== 'object' || typeof propValue.render !== 'function') && propValue.nodeType !== 1) {
	    return new Error('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected a ReactComponent or a ') + 'DOMElement.');
	  }
	
	  return null;
	}
	
	exports.default = (0, _createChainableTypeChecker2.default)(validate);
	module.exports = exports['default'];

/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = deprecated;
	
	var _warning = __webpack_require__(31);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var warned = {};
	
	function deprecated(validator, reason) {
	  return function validate(props, propName, componentName, location, propFullName) {
	    var componentNameSafe = componentName || '<<anonymous>>';
	    var propFullNameSafe = propFullName || propName;
	
	    if (props[propName] != null) {
	      var messageKey = componentName + '.' + propName;
	
	      (0, _warning2.default)(warned[messageKey], 'The ' + location + ' `' + propFullNameSafe + '` of ' + ('`' + componentNameSafe + '` is deprecated. ' + reason + '.'));
	
	      warned[messageKey] = true;
	    }
	
	    for (var _len = arguments.length, args = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
	      args[_key - 5] = arguments[_key];
	    }
	
	    return validator.apply(undefined, [props, propName, componentName, location, propFullName].concat(args));
	  };
	}
	
	/* eslint-disable no-underscore-dangle */
	function _resetWarned() {
	  warned = {};
	}
	
	deprecated._resetWarned = _resetWarned;
	/* eslint-enable no-underscore-dangle */
	
	module.exports = exports['default'];

/***/ }),

/***/ 483:
/***/ (function(module, exports) {

	'use strict';
	
	/** Highest positive signed 32-bit float value */
	const maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
	
	/** Bootstring parameters */
	const base = 36;
	const tMin = 1;
	const tMax = 26;
	const skew = 38;
	const damp = 700;
	const initialBias = 72;
	const initialN = 128; // 0x80
	const delimiter = '-'; // '\x2D'
	
	/** Regular expressions */
	const regexPunycode = /^xn--/;
	const regexNonASCII = /[^\0-\x7E]/; // non-ASCII chars
	const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
	
	/** Error messages */
	const errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	};
	
	/** Convenience shortcuts */
	const baseMinusTMin = base - tMin;
	const floor = Math.floor;
	const stringFromCharCode = String.fromCharCode;
	
	/*--------------------------------------------------------------------------*/
	
	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}
	
	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		const result = [];
		let length = array.length;
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}
	
	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		const parts = string.split('@');
		let result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		const labels = string.split('.');
		const encoded = map(labels, fn).join('.');
		return result + encoded;
	}
	
	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		const output = [];
		let counter = 0;
		const length = string.length;
		while (counter < length) {
			const value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// It's a high surrogate, and there is a next character.
				const extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// It's an unmatched surrogate; only append this code unit, in case the
					// next code unit is the high surrogate of a surrogate pair.
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}
	
	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	const ucs2encode = array => String.fromCodePoint(...array);
	
	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	const basicToDigit = function(codePoint) {
		if (codePoint - 0x30 < 0x0A) {
			return codePoint - 0x16;
		}
		if (codePoint - 0x41 < 0x1A) {
			return codePoint - 0x41;
		}
		if (codePoint - 0x61 < 0x1A) {
			return codePoint - 0x61;
		}
		return base;
	};
	
	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	const digitToBasic = function(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	};
	
	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	const adapt = function(delta, numPoints, firstTime) {
		let k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	};
	
	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	const decode = function(input) {
		// Don't use UCS-2.
		const output = [];
		const inputLength = input.length;
		let i = 0;
		let n = initialN;
		let bias = initialBias;
	
		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.
	
		let basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}
	
		for (let j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}
	
		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.
	
		for (let index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {
	
			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			let oldi = i;
			for (let w = 1, k = base; /* no condition */; k += base) {
	
				if (index >= inputLength) {
					error('invalid-input');
				}
	
				const digit = basicToDigit(input.charCodeAt(index++));
	
				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}
	
				i += digit * w;
				const t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
	
				if (digit < t) {
					break;
				}
	
				const baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}
	
				w *= baseMinusT;
	
			}
	
			const out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);
	
			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}
	
			n += floor(i / out);
			i %= out;
	
			// Insert `n` at position `i` of the output.
			output.splice(i++, 0, n);
	
		}
	
		return String.fromCodePoint(...output);
	};
	
	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	const encode = function(input) {
		const output = [];
	
		// Convert the input in UCS-2 to an array of Unicode code points.
		input = ucs2decode(input);
	
		// Cache the length.
		let inputLength = input.length;
	
		// Initialize the state.
		let n = initialN;
		let delta = 0;
		let bias = initialBias;
	
		// Handle the basic code points.
		for (const currentValue of input) {
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}
	
		let basicLength = output.length;
		let handledCPCount = basicLength;
	
		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.
	
		// Finish the basic string with a delimiter unless it's empty.
		if (basicLength) {
			output.push(delimiter);
		}
	
		// Main encoding loop:
		while (handledCPCount < inputLength) {
	
			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			let m = maxInt;
			for (const currentValue of input) {
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}
	
			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow.
			const handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}
	
			delta += (m - n) * handledCPCountPlusOne;
			n = m;
	
			for (const currentValue of input) {
				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}
				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer.
					let q = delta;
					for (let k = base; /* no condition */; k += base) {
						const t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						const qMinusT = q - t;
						const baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}
	
					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}
	
			++delta;
			++n;
	
		}
		return output.join('');
	};
	
	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	const toUnicode = function(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	};
	
	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	const toASCII = function(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	};
	
	/*--------------------------------------------------------------------------*/
	
	/** Define the public API */
	const punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '2.1.0',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};
	
	module.exports = punycode;


/***/ }),

/***/ 484:
/***/ (function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};
	
	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }
	
	  var regexp = /\+/g;
	  qs = qs.split(sep);
	
	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }
	
	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }
	
	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;
	
	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }
	
	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);
	
	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }
	
	  return obj;
	};


/***/ }),

/***/ 485:
/***/ (function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;
	
	    case 'boolean':
	      return v ? 'true' : 'false';
	
	    case 'number':
	      return isFinite(v) ? v : '';
	
	    default:
	      return '';
	  }
	};
	
	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }
	
	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	
	  }
	
	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};


/***/ }),

/***/ 486:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.decode = exports.parse = __webpack_require__(484);
	exports.encode = exports.stringify = __webpack_require__(485);


/***/ }),

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireDefault = __webpack_require__(5);
	
	exports.__esModule = true;
	exports.default = void 0;
	
	var _values = _interopRequireDefault(__webpack_require__(191));
	
	var _extends3 = _interopRequireDefault(__webpack_require__(8));
	
	var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(10));
	
	var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(6));
	
	var _classnames = _interopRequireDefault(__webpack_require__(11));
	
	var _react = _interopRequireDefault(__webpack_require__(2));
	
	var _propTypes = _interopRequireDefault(__webpack_require__(4));
	
	var _bootstrapUtils = __webpack_require__(12);
	
	var _StyleConfig = __webpack_require__(28);
	
	var _CloseButton = _interopRequireDefault(__webpack_require__(74));
	
	var propTypes = {
	  onDismiss: _propTypes.default.func,
	  closeLabel: _propTypes.default.string
	};
	var defaultProps = {
	  closeLabel: 'Close alert'
	};
	
	var Alert =
	/*#__PURE__*/
	function (_React$Component) {
	  (0, _inheritsLoose2.default)(Alert, _React$Component);
	
	  function Alert() {
	    return _React$Component.apply(this, arguments) || this;
	  }
	
	  var _proto = Alert.prototype;
	
	  _proto.render = function render() {
	    var _extends2;
	
	    var _this$props = this.props,
	        onDismiss = _this$props.onDismiss,
	        closeLabel = _this$props.closeLabel,
	        className = _this$props.className,
	        children = _this$props.children,
	        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["onDismiss", "closeLabel", "className", "children"]);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
	        bsProps = _splitBsProps[0],
	        elementProps = _splitBsProps[1];
	
	    var dismissable = !!onDismiss;
	    var classes = (0, _extends3.default)({}, (0, _bootstrapUtils.getClassSet)(bsProps), (_extends2 = {}, _extends2[(0, _bootstrapUtils.prefix)(bsProps, 'dismissable')] = dismissable, _extends2));
	    return _react.default.createElement("div", (0, _extends3.default)({}, elementProps, {
	      role: "alert",
	      className: (0, _classnames.default)(className, classes)
	    }), dismissable && _react.default.createElement(_CloseButton.default, {
	      onClick: onDismiss,
	      label: closeLabel
	    }), children);
	  };
	
	  return Alert;
	}(_react.default.Component);
	
	Alert.propTypes = propTypes;
	Alert.defaultProps = defaultProps;
	
	var _default = (0, _bootstrapUtils.bsStyles)((0, _values.default)(_StyleConfig.State), _StyleConfig.State.INFO, (0, _bootstrapUtils.bsClass)('alert', Alert));
	
	exports.default = _default;
	module.exports = exports["default"];

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireDefault = __webpack_require__(5);
	
	exports.__esModule = true;
	exports.default = void 0;
	
	var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(6));
	
	var _propTypes = _interopRequireDefault(__webpack_require__(4));
	
	var _react = _interopRequireDefault(__webpack_require__(2));
	
	var propTypes = {
	  label: _propTypes.default.string.isRequired,
	  onClick: _propTypes.default.func
	};
	var defaultProps = {
	  label: 'Close'
	};
	
	var CloseButton =
	/*#__PURE__*/
	function (_React$Component) {
	  (0, _inheritsLoose2.default)(CloseButton, _React$Component);
	
	  function CloseButton() {
	    return _React$Component.apply(this, arguments) || this;
	  }
	
	  var _proto = CloseButton.prototype;
	
	  _proto.render = function render() {
	    var _this$props = this.props,
	        label = _this$props.label,
	        onClick = _this$props.onClick;
	    return _react.default.createElement("button", {
	      type: "button",
	      className: "close",
	      onClick: onClick
	    }, _react.default.createElement("span", {
	      "aria-hidden": "true"
	    }, "\xD7"), _react.default.createElement("span", {
	      className: "sr-only"
	    }, label));
	  };
	
	  return CloseButton;
	}(_react.default.Component);
	
	CloseButton.propTypes = propTypes;
	CloseButton.defaultProps = defaultProps;
	var _default = CloseButton;
	exports.default = _default;
	module.exports = exports["default"];

/***/ }),

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireDefault = __webpack_require__(5);
	
	exports.__esModule = true;
	exports.default = void 0;
	
	var _extends2 = _interopRequireDefault(__webpack_require__(8));
	
	var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(10));
	
	var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(6));
	
	var _classnames = _interopRequireDefault(__webpack_require__(11));
	
	var _react = _interopRequireDefault(__webpack_require__(2));
	
	var _propTypes = _interopRequireDefault(__webpack_require__(4));
	
	var _warning = _interopRequireDefault(__webpack_require__(31));
	
	var _bootstrapUtils = __webpack_require__(12);
	
	var propTypes = {
	  /**
	   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
	   */
	  htmlFor: _propTypes.default.string,
	  srOnly: _propTypes.default.bool
	};
	var defaultProps = {
	  srOnly: false
	};
	var contextTypes = {
	  $bs_formGroup: _propTypes.default.object
	};
	
	var ControlLabel =
	/*#__PURE__*/
	function (_React$Component) {
	  (0, _inheritsLoose2.default)(ControlLabel, _React$Component);
	
	  function ControlLabel() {
	    return _React$Component.apply(this, arguments) || this;
	  }
	
	  var _proto = ControlLabel.prototype;
	
	  _proto.render = function render() {
	    var formGroup = this.context.$bs_formGroup;
	    var controlId = formGroup && formGroup.controlId;
	    var _this$props = this.props,
	        _this$props$htmlFor = _this$props.htmlFor,
	        htmlFor = _this$props$htmlFor === void 0 ? controlId : _this$props$htmlFor,
	        srOnly = _this$props.srOnly,
	        className = _this$props.className,
	        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["htmlFor", "srOnly", "className"]);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
	        bsProps = _splitBsProps[0],
	        elementProps = _splitBsProps[1];
	
	     false ? (0, _warning.default)(controlId == null || htmlFor === controlId, '`controlId` is ignored on `<ControlLabel>` when `htmlFor` is specified.') : void 0;
	    var classes = (0, _extends2.default)({}, (0, _bootstrapUtils.getClassSet)(bsProps), {
	      'sr-only': srOnly
	    });
	    return _react.default.createElement("label", (0, _extends2.default)({}, elementProps, {
	      htmlFor: htmlFor,
	      className: (0, _classnames.default)(className, classes)
	    }));
	  };
	
	  return ControlLabel;
	}(_react.default.Component);
	
	ControlLabel.propTypes = propTypes;
	ControlLabel.defaultProps = defaultProps;
	ControlLabel.contextTypes = contextTypes;
	
	var _default = (0, _bootstrapUtils.bsClass)('control-label', ControlLabel);
	
	exports.default = _default;
	module.exports = exports["default"];

/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireDefault = __webpack_require__(5);
	
	var _interopRequireWildcard = __webpack_require__(165);
	
	exports.__esModule = true;
	exports.default = void 0;
	
	var _extends2 = _interopRequireDefault(__webpack_require__(8));
	
	var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(10));
	
	var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(6));
	
	var _classnames = _interopRequireDefault(__webpack_require__(11));
	
	var _react = _interopRequireDefault(__webpack_require__(2));
	
	var _propTypes = _interopRequireDefault(__webpack_require__(4));
	
	var _Transition = _interopRequireWildcard(__webpack_require__(159));
	
	var _fadeStyles;
	
	var propTypes = {
	  /**
	   * Show the component; triggers the fade in or fade out animation
	   */
	  in: _propTypes.default.bool,
	
	  /**
	   * Wait until the first "enter" transition to mount the component (add it to the DOM)
	   */
	  mountOnEnter: _propTypes.default.bool,
	
	  /**
	   * Unmount the component (remove it from the DOM) when it is faded out
	   */
	  unmountOnExit: _propTypes.default.bool,
	
	  /**
	   * Run the fade in animation when the component mounts, if it is initially
	   * shown
	   */
	  appear: _propTypes.default.bool,
	
	  /**
	   * Duration of the fade animation in milliseconds, to ensure that finishing
	   * callbacks are fired even if the original browser transition end events are
	   * canceled
	   */
	  timeout: _propTypes.default.number,
	
	  /**
	   * Callback fired before the component fades in
	   */
	  onEnter: _propTypes.default.func,
	
	  /**
	   * Callback fired after the component starts to fade in
	   */
	  onEntering: _propTypes.default.func,
	
	  /**
	   * Callback fired after the has component faded in
	   */
	  onEntered: _propTypes.default.func,
	
	  /**
	   * Callback fired before the component fades out
	   */
	  onExit: _propTypes.default.func,
	
	  /**
	   * Callback fired after the component starts to fade out
	   */
	  onExiting: _propTypes.default.func,
	
	  /**
	   * Callback fired after the component has faded out
	   */
	  onExited: _propTypes.default.func
	};
	var defaultProps = {
	  in: false,
	  timeout: 300,
	  mountOnEnter: false,
	  unmountOnExit: false,
	  appear: false
	};
	var fadeStyles = (_fadeStyles = {}, _fadeStyles[_Transition.ENTERING] = 'in', _fadeStyles[_Transition.ENTERED] = 'in', _fadeStyles);
	
	var Fade =
	/*#__PURE__*/
	function (_React$Component) {
	  (0, _inheritsLoose2.default)(Fade, _React$Component);
	
	  function Fade() {
	    return _React$Component.apply(this, arguments) || this;
	  }
	
	  var _proto = Fade.prototype;
	
	  _proto.render = function render() {
	    var _this$props = this.props,
	        className = _this$props.className,
	        children = _this$props.children,
	        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "children"]);
	    return _react.default.createElement(_Transition.default, props, function (status, innerProps) {
	      return _react.default.cloneElement(children, (0, _extends2.default)({}, innerProps, {
	        className: (0, _classnames.default)('fade', className, children.props.className, fadeStyles[status])
	      }));
	    });
	  };
	
	  return Fade;
	}(_react.default.Component);
	
	Fade.propTypes = propTypes;
	Fade.defaultProps = defaultProps;
	var _default = Fade;
	exports.default = _default;
	module.exports = exports["default"];

/***/ }),

/***/ 487:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireDefault = __webpack_require__(5);
	
	exports.__esModule = true;
	exports.default = void 0;
	
	var _extends2 = _interopRequireDefault(__webpack_require__(8));
	
	var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(10));
	
	var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(6));
	
	var _classnames = _interopRequireDefault(__webpack_require__(11));
	
	var _react = _interopRequireDefault(__webpack_require__(2));
	
	var _propTypes = _interopRequireDefault(__webpack_require__(4));
	
	var _elementType = _interopRequireDefault(__webpack_require__(17));
	
	var _warning = _interopRequireDefault(__webpack_require__(31));
	
	var _FormControlFeedback = _interopRequireDefault(__webpack_require__(488));
	
	var _FormControlStatic = _interopRequireDefault(__webpack_require__(489));
	
	var _bootstrapUtils = __webpack_require__(12);
	
	var _StyleConfig = __webpack_require__(28);
	
	var propTypes = {
	  componentClass: _elementType.default,
	
	  /**
	   * Only relevant if `componentClass` is `'input'`.
	   */
	  type: _propTypes.default.string,
	
	  /**
	   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
	   */
	  id: _propTypes.default.string,
	
	  /**
	   * Attaches a ref to the `<input>` element. Only functions can be used here.
	   *
	   * ```js
	   * <FormControl inputRef={ref => { this.input = ref; }} />
	   * ```
	   */
	  inputRef: _propTypes.default.func
	};
	var defaultProps = {
	  componentClass: 'input'
	};
	var contextTypes = {
	  $bs_formGroup: _propTypes.default.object
	};
	
	var FormControl =
	/*#__PURE__*/
	function (_React$Component) {
	  (0, _inheritsLoose2.default)(FormControl, _React$Component);
	
	  function FormControl() {
	    return _React$Component.apply(this, arguments) || this;
	  }
	
	  var _proto = FormControl.prototype;
	
	  _proto.render = function render() {
	    var formGroup = this.context.$bs_formGroup;
	    var controlId = formGroup && formGroup.controlId;
	    var _this$props = this.props,
	        Component = _this$props.componentClass,
	        type = _this$props.type,
	        _this$props$id = _this$props.id,
	        id = _this$props$id === void 0 ? controlId : _this$props$id,
	        inputRef = _this$props.inputRef,
	        className = _this$props.className,
	        bsSize = _this$props.bsSize,
	        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["componentClass", "type", "id", "inputRef", "className", "bsSize"]);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
	        bsProps = _splitBsProps[0],
	        elementProps = _splitBsProps[1];
	
	     false ? (0, _warning.default)(controlId == null || id === controlId, '`controlId` is ignored on `<FormControl>` when `id` is specified.') : void 0; // input[type="file"] should not have .form-control.
	
	    var classes;
	
	    if (type !== 'file') {
	      classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	    } // If user provides a size, make sure to append it to classes as input-
	    // e.g. if bsSize is small, it will append input-sm
	
	
	    if (bsSize) {
	      var size = _StyleConfig.SIZE_MAP[bsSize] || bsSize;
	      classes[(0, _bootstrapUtils.prefix)({
	        bsClass: 'input'
	      }, size)] = true;
	    }
	
	    return _react.default.createElement(Component, (0, _extends2.default)({}, elementProps, {
	      type: type,
	      id: id,
	      ref: inputRef,
	      className: (0, _classnames.default)(className, classes)
	    }));
	  };
	
	  return FormControl;
	}(_react.default.Component);
	
	FormControl.propTypes = propTypes;
	FormControl.defaultProps = defaultProps;
	FormControl.contextTypes = contextTypes;
	FormControl.Feedback = _FormControlFeedback.default;
	FormControl.Static = _FormControlStatic.default;
	
	var _default = (0, _bootstrapUtils.bsClass)('form-control', (0, _bootstrapUtils.bsSizes)([_StyleConfig.Size.SMALL, _StyleConfig.Size.LARGE], FormControl));
	
	exports.default = _default;
	module.exports = exports["default"];

/***/ }),

/***/ 488:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireDefault = __webpack_require__(5);
	
	exports.__esModule = true;
	exports.default = void 0;
	
	var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(10));
	
	var _extends2 = _interopRequireDefault(__webpack_require__(8));
	
	var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(6));
	
	var _classnames = _interopRequireDefault(__webpack_require__(11));
	
	var _react = _interopRequireDefault(__webpack_require__(2));
	
	var _propTypes = _interopRequireDefault(__webpack_require__(4));
	
	var _Glyphicon = _interopRequireDefault(__webpack_require__(490));
	
	var _bootstrapUtils = __webpack_require__(12);
	
	var defaultProps = {
	  bsRole: 'feedback'
	};
	var contextTypes = {
	  $bs_formGroup: _propTypes.default.object
	};
	
	var FormControlFeedback =
	/*#__PURE__*/
	function (_React$Component) {
	  (0, _inheritsLoose2.default)(FormControlFeedback, _React$Component);
	
	  function FormControlFeedback() {
	    return _React$Component.apply(this, arguments) || this;
	  }
	
	  var _proto = FormControlFeedback.prototype;
	
	  _proto.getGlyph = function getGlyph(validationState) {
	    switch (validationState) {
	      case 'success':
	        return 'ok';
	
	      case 'warning':
	        return 'warning-sign';
	
	      case 'error':
	        return 'remove';
	
	      default:
	        return null;
	    }
	  };
	
	  _proto.renderDefaultFeedback = function renderDefaultFeedback(formGroup, className, classes, elementProps) {
	    var glyph = this.getGlyph(formGroup && formGroup.validationState);
	
	    if (!glyph) {
	      return null;
	    }
	
	    return _react.default.createElement(_Glyphicon.default, (0, _extends2.default)({}, elementProps, {
	      glyph: glyph,
	      className: (0, _classnames.default)(className, classes)
	    }));
	  };
	
	  _proto.render = function render() {
	    var _this$props = this.props,
	        className = _this$props.className,
	        children = _this$props.children,
	        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "children"]);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
	        bsProps = _splitBsProps[0],
	        elementProps = _splitBsProps[1];
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    if (!children) {
	      return this.renderDefaultFeedback(this.context.$bs_formGroup, className, classes, elementProps);
	    }
	
	    var child = _react.default.Children.only(children);
	
	    return _react.default.cloneElement(child, (0, _extends2.default)({}, elementProps, {
	      className: (0, _classnames.default)(child.props.className, className, classes)
	    }));
	  };
	
	  return FormControlFeedback;
	}(_react.default.Component);
	
	FormControlFeedback.defaultProps = defaultProps;
	FormControlFeedback.contextTypes = contextTypes;
	
	var _default = (0, _bootstrapUtils.bsClass)('form-control-feedback', FormControlFeedback);
	
	exports.default = _default;
	module.exports = exports["default"];

/***/ }),

/***/ 489:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireDefault = __webpack_require__(5);
	
	exports.__esModule = true;
	exports.default = void 0;
	
	var _extends2 = _interopRequireDefault(__webpack_require__(8));
	
	var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(10));
	
	var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(6));
	
	var _classnames = _interopRequireDefault(__webpack_require__(11));
	
	var _react = _interopRequireDefault(__webpack_require__(2));
	
	var _elementType = _interopRequireDefault(__webpack_require__(17));
	
	var _bootstrapUtils = __webpack_require__(12);
	
	var propTypes = {
	  componentClass: _elementType.default
	};
	var defaultProps = {
	  componentClass: 'p'
	};
	
	var FormControlStatic =
	/*#__PURE__*/
	function (_React$Component) {
	  (0, _inheritsLoose2.default)(FormControlStatic, _React$Component);
	
	  function FormControlStatic() {
	    return _React$Component.apply(this, arguments) || this;
	  }
	
	  var _proto = FormControlStatic.prototype;
	
	  _proto.render = function render() {
	    var _this$props = this.props,
	        Component = _this$props.componentClass,
	        className = _this$props.className,
	        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["componentClass", "className"]);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
	        bsProps = _splitBsProps[0],
	        elementProps = _splitBsProps[1];
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	    return _react.default.createElement(Component, (0, _extends2.default)({}, elementProps, {
	      className: (0, _classnames.default)(className, classes)
	    }));
	  };
	
	  return FormControlStatic;
	}(_react.default.Component);
	
	FormControlStatic.propTypes = propTypes;
	FormControlStatic.defaultProps = defaultProps;
	
	var _default = (0, _bootstrapUtils.bsClass)('form-control-static', FormControlStatic);
	
	exports.default = _default;
	module.exports = exports["default"];

/***/ }),

/***/ 490:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireDefault = __webpack_require__(5);
	
	exports.__esModule = true;
	exports.default = void 0;
	
	var _extends3 = _interopRequireDefault(__webpack_require__(8));
	
	var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(10));
	
	var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(6));
	
	var _classnames = _interopRequireDefault(__webpack_require__(11));
	
	var _react = _interopRequireDefault(__webpack_require__(2));
	
	var _propTypes = _interopRequireDefault(__webpack_require__(4));
	
	var _bootstrapUtils = __webpack_require__(12);
	
	var propTypes = {
	  /**
	   * An icon name without "glyphicon-" prefix. See e.g. http://getbootstrap.com/components/#glyphicons
	   */
	  glyph: _propTypes.default.string.isRequired
	};
	
	var Glyphicon =
	/*#__PURE__*/
	function (_React$Component) {
	  (0, _inheritsLoose2.default)(Glyphicon, _React$Component);
	
	  function Glyphicon() {
	    return _React$Component.apply(this, arguments) || this;
	  }
	
	  var _proto = Glyphicon.prototype;
	
	  _proto.render = function render() {
	    var _extends2;
	
	    var _this$props = this.props,
	        glyph = _this$props.glyph,
	        className = _this$props.className,
	        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["glyph", "className"]);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
	        bsProps = _splitBsProps[0],
	        elementProps = _splitBsProps[1];
	
	    var classes = (0, _extends3.default)({}, (0, _bootstrapUtils.getClassSet)(bsProps), (_extends2 = {}, _extends2[(0, _bootstrapUtils.prefix)(bsProps, glyph)] = true, _extends2));
	    return _react.default.createElement("span", (0, _extends3.default)({}, elementProps, {
	      className: (0, _classnames.default)(className, classes)
	    }));
	  };
	
	  return Glyphicon;
	}(_react.default.Component);
	
	Glyphicon.propTypes = propTypes;
	
	var _default = (0, _bootstrapUtils.bsClass)('glyphicon', Glyphicon);
	
	exports.default = _default;
	module.exports = exports["default"];

/***/ }),

/***/ 491:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireDefault = __webpack_require__(5);
	
	exports.__esModule = true;
	exports.default = void 0;
	
	var _extends2 = _interopRequireDefault(__webpack_require__(8));
	
	var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(10));
	
	var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(6));
	
	var _classnames = _interopRequireDefault(__webpack_require__(11));
	
	var _react = _interopRequireDefault(__webpack_require__(2));
	
	var _bootstrapUtils = __webpack_require__(12);
	
	var HelpBlock =
	/*#__PURE__*/
	function (_React$Component) {
	  (0, _inheritsLoose2.default)(HelpBlock, _React$Component);
	
	  function HelpBlock() {
	    return _React$Component.apply(this, arguments) || this;
	  }
	
	  var _proto = HelpBlock.prototype;
	
	  _proto.render = function render() {
	    var _this$props = this.props,
	        className = _this$props.className,
	        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className"]);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
	        bsProps = _splitBsProps[0],
	        elementProps = _splitBsProps[1];
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	    return _react.default.createElement("span", (0, _extends2.default)({}, elementProps, {
	      className: (0, _classnames.default)(className, classes)
	    }));
	  };
	
	  return HelpBlock;
	}(_react.default.Component);
	
	var _default = (0, _bootstrapUtils.bsClass)('help-block', HelpBlock);
	
	exports.default = _default;
	module.exports = exports["default"];

/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireDefault = __webpack_require__(5);
	
	exports.__esModule = true;
	exports.default = void 0;
	
	var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(10));
	
	var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(6));
	
	var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(192));
	
	var _extends2 = _interopRequireDefault(__webpack_require__(8));
	
	var _classnames = _interopRequireDefault(__webpack_require__(11));
	
	var _events = _interopRequireDefault(__webpack_require__(308));
	
	var _ownerDocument = _interopRequireDefault(__webpack_require__(49));
	
	var _inDOM = _interopRequireDefault(__webpack_require__(35));
	
	var _scrollbarSize = _interopRequireDefault(__webpack_require__(100));
	
	var _react = _interopRequireDefault(__webpack_require__(2));
	
	var _propTypes = _interopRequireDefault(__webpack_require__(4));
	
	var _reactDom = _interopRequireDefault(__webpack_require__(14));
	
	var _Modal = _interopRequireDefault(__webpack_require__(152));
	
	var _isOverflowing = _interopRequireDefault(__webpack_require__(63));
	
	var _elementType = _interopRequireDefault(__webpack_require__(17));
	
	var _Fade = _interopRequireDefault(__webpack_require__(142));
	
	var _ModalBody = _interopRequireDefault(__webpack_require__(143));
	
	var _ModalDialog = _interopRequireDefault(__webpack_require__(144));
	
	var _ModalFooter = _interopRequireDefault(__webpack_require__(145));
	
	var _ModalHeader = _interopRequireDefault(__webpack_require__(146));
	
	var _ModalTitle = _interopRequireDefault(__webpack_require__(147));
	
	var _bootstrapUtils = __webpack_require__(12);
	
	var _createChainedFunction = _interopRequireDefault(__webpack_require__(88));
	
	var _splitComponentProps2 = _interopRequireDefault(__webpack_require__(148));
	
	var _StyleConfig = __webpack_require__(28);
	
	var propTypes = (0, _extends2.default)({}, _Modal.default.propTypes, _ModalDialog.default.propTypes, {
	  /**
	   * Include a backdrop component. Specify 'static' for a backdrop that doesn't
	   * trigger an "onHide" when clicked.
	   */
	  backdrop: _propTypes.default.oneOf(['static', true, false]),
	
	  /**
	   * Add an optional extra class name to .modal-backdrop
	   * It could end up looking like class="modal-backdrop foo-modal-backdrop in".
	   */
	  backdropClassName: _propTypes.default.string,
	
	  /**
	   * Close the modal when escape key is pressed
	   */
	  keyboard: _propTypes.default.bool,
	
	  /**
	   * Open and close the Modal with a slide and fade animation.
	   */
	  animation: _propTypes.default.bool,
	
	  /**
	   * A Component type that provides the modal content Markup. This is a useful
	   * prop when you want to use your own styles and markup to create a custom
	   * modal component.
	   */
	  dialogComponentClass: _elementType.default,
	
	  /**
	   * When `true` The modal will automatically shift focus to itself when it
	   * opens, and replace it to the last focused element when it closes.
	   * Generally this should never be set to false as it makes the Modal less
	   * accessible to assistive technologies, like screen-readers.
	   */
	  autoFocus: _propTypes.default.bool,
	
	  /**
	   * When `true` The modal will prevent focus from leaving the Modal while
	   * open. Consider leaving the default value here, as it is necessary to make
	   * the Modal work well with assistive technologies, such as screen readers.
	   */
	  enforceFocus: _propTypes.default.bool,
	
	  /**
	   * When `true` The modal will restore focus to previously focused element once
	   * modal is hidden
	   */
	  restoreFocus: _propTypes.default.bool,
	
	  /**
	   * When `true` The modal will show itself.
	   */
	  show: _propTypes.default.bool,
	
	  /**
	   * A callback fired when the header closeButton or non-static backdrop is
	   * clicked. Required if either are specified.
	   */
	  onHide: _propTypes.default.func,
	
	  /**
	   * Callback fired before the Modal transitions in
	   */
	  onEnter: _propTypes.default.func,
	
	  /**
	   * Callback fired as the Modal begins to transition in
	   */
	  onEntering: _propTypes.default.func,
	
	  /**
	   * Callback fired after the Modal finishes transitioning in
	   */
	  onEntered: _propTypes.default.func,
	
	  /**
	   * Callback fired right before the Modal transitions out
	   */
	  onExit: _propTypes.default.func,
	
	  /**
	   * Callback fired as the Modal begins to transition out
	   */
	  onExiting: _propTypes.default.func,
	
	  /**
	   * Callback fired after the Modal finishes transitioning out
	   */
	  onExited: _propTypes.default.func,
	
	  /**
	   * @private
	   */
	  container: _Modal.default.propTypes.container
	});
	var defaultProps = (0, _extends2.default)({}, _Modal.default.defaultProps, {
	  animation: true,
	  dialogComponentClass: _ModalDialog.default
	});
	var childContextTypes = {
	  $bs_modal: _propTypes.default.shape({
	    onHide: _propTypes.default.func
	  })
	};
	/* eslint-disable no-use-before-define, react/no-multi-comp */
	
	function DialogTransition(props) {
	  return _react.default.createElement(_Fade.default, (0, _extends2.default)({}, props, {
	    timeout: Modal.TRANSITION_DURATION
	  }));
	}
	
	function BackdropTransition(props) {
	  return _react.default.createElement(_Fade.default, (0, _extends2.default)({}, props, {
	    timeout: Modal.BACKDROP_TRANSITION_DURATION
	  }));
	}
	/* eslint-enable no-use-before-define */
	
	
	var Modal =
	/*#__PURE__*/
	function (_React$Component) {
	  (0, _inheritsLoose2.default)(Modal, _React$Component);
	
	  function Modal(props, context) {
	    var _this;
	
	    _this = _React$Component.call(this, props, context) || this;
	    _this.handleEntering = _this.handleEntering.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
	    _this.handleExited = _this.handleExited.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
	    _this.handleWindowResize = _this.handleWindowResize.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
	    _this.handleDialogClick = _this.handleDialogClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
	    _this.setModalRef = _this.setModalRef.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
	    _this.state = {
	      style: {}
	    };
	    return _this;
	  }
	
	  var _proto = Modal.prototype;
	
	  _proto.getChildContext = function getChildContext() {
	    return {
	      $bs_modal: {
	        onHide: this.props.onHide
	      }
	    };
	  };
	
	  _proto.componentWillUnmount = function componentWillUnmount() {
	    // Clean up the listener if we need to.
	    this.handleExited();
	  };
	
	  _proto.setModalRef = function setModalRef(ref) {
	    this._modal = ref;
	  };
	
	  _proto.handleDialogClick = function handleDialogClick(e) {
	    if (e.target !== e.currentTarget) {
	      return;
	    }
	
	    this.props.onHide();
	  };
	
	  _proto.handleEntering = function handleEntering() {
	    // FIXME: This should work even when animation is disabled.
	    _events.default.on(window, 'resize', this.handleWindowResize);
	
	    this.updateStyle();
	  };
	
	  _proto.handleExited = function handleExited() {
	    // FIXME: This should work even when animation is disabled.
	    _events.default.off(window, 'resize', this.handleWindowResize);
	  };
	
	  _proto.handleWindowResize = function handleWindowResize() {
	    this.updateStyle();
	  };
	
	  _proto.updateStyle = function updateStyle() {
	    if (!_inDOM.default) {
	      return;
	    }
	
	    var dialogNode = this._modal.getDialogElement();
	
	    var dialogHeight = dialogNode.scrollHeight;
	    var document = (0, _ownerDocument.default)(dialogNode);
	    var bodyIsOverflowing = (0, _isOverflowing.default)(_reactDom.default.findDOMNode(this.props.container || document.body));
	    var modalIsOverflowing = dialogHeight > document.documentElement.clientHeight;
	    this.setState({
	      style: {
	        paddingRight: bodyIsOverflowing && !modalIsOverflowing ? (0, _scrollbarSize.default)() : undefined,
	        paddingLeft: !bodyIsOverflowing && modalIsOverflowing ? (0, _scrollbarSize.default)() : undefined
	      }
	    });
	  };
	
	  _proto.render = function render() {
	    var _this$props = this.props,
	        backdrop = _this$props.backdrop,
	        backdropClassName = _this$props.backdropClassName,
	        animation = _this$props.animation,
	        show = _this$props.show,
	        Dialog = _this$props.dialogComponentClass,
	        className = _this$props.className,
	        style = _this$props.style,
	        children = _this$props.children,
	        onEntering = _this$props.onEntering,
	        onExited = _this$props.onExited,
	        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["backdrop", "backdropClassName", "animation", "show", "dialogComponentClass", "className", "style", "children", "onEntering", "onExited"]);
	
	    var _splitComponentProps = (0, _splitComponentProps2.default)(props, _Modal.default),
	        baseModalProps = _splitComponentProps[0],
	        dialogProps = _splitComponentProps[1];
	
	    var inClassName = show && !animation && 'in';
	    return _react.default.createElement(_Modal.default, (0, _extends2.default)({}, baseModalProps, {
	      ref: this.setModalRef,
	      show: show,
	      containerClassName: (0, _bootstrapUtils.prefix)(props, 'open'),
	      transition: animation ? DialogTransition : undefined,
	      backdrop: backdrop,
	      backdropTransition: animation ? BackdropTransition : undefined,
	      backdropClassName: (0, _classnames.default)((0, _bootstrapUtils.prefix)(props, 'backdrop'), backdropClassName, inClassName),
	      onEntering: (0, _createChainedFunction.default)(onEntering, this.handleEntering),
	      onExited: (0, _createChainedFunction.default)(onExited, this.handleExited)
	    }), _react.default.createElement(Dialog, (0, _extends2.default)({}, dialogProps, {
	      style: (0, _extends2.default)({}, this.state.style, style),
	      className: (0, _classnames.default)(className, inClassName),
	      onClick: backdrop === true ? this.handleDialogClick : null
	    }), children));
	  };
	
	  return Modal;
	}(_react.default.Component);
	
	Modal.propTypes = propTypes;
	Modal.defaultProps = defaultProps;
	Modal.childContextTypes = childContextTypes;
	Modal.Body = _ModalBody.default;
	Modal.Header = _ModalHeader.default;
	Modal.Title = _ModalTitle.default;
	Modal.Footer = _ModalFooter.default;
	Modal.Dialog = _ModalDialog.default;
	Modal.TRANSITION_DURATION = 300;
	Modal.BACKDROP_TRANSITION_DURATION = 150;
	
	var _default = (0, _bootstrapUtils.bsClass)('modal', (0, _bootstrapUtils.bsSizes)([_StyleConfig.Size.LARGE, _StyleConfig.Size.SMALL], Modal));
	
	exports.default = _default;
	module.exports = exports["default"];

/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireDefault = __webpack_require__(5);
	
	exports.__esModule = true;
	exports.default = void 0;
	
	var _extends2 = _interopRequireDefault(__webpack_require__(8));
	
	var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(10));
	
	var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(6));
	
	var _classnames = _interopRequireDefault(__webpack_require__(11));
	
	var _react = _interopRequireDefault(__webpack_require__(2));
	
	var _elementType = _interopRequireDefault(__webpack_require__(17));
	
	var _bootstrapUtils = __webpack_require__(12);
	
	var propTypes = {
	  componentClass: _elementType.default
	};
	var defaultProps = {
	  componentClass: 'div'
	};
	
	var ModalBody =
	/*#__PURE__*/
	function (_React$Component) {
	  (0, _inheritsLoose2.default)(ModalBody, _React$Component);
	
	  function ModalBody() {
	    return _React$Component.apply(this, arguments) || this;
	  }
	
	  var _proto = ModalBody.prototype;
	
	  _proto.render = function render() {
	    var _this$props = this.props,
	        Component = _this$props.componentClass,
	        className = _this$props.className,
	        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["componentClass", "className"]);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
	        bsProps = _splitBsProps[0],
	        elementProps = _splitBsProps[1];
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	    return _react.default.createElement(Component, (0, _extends2.default)({}, elementProps, {
	      className: (0, _classnames.default)(className, classes)
	    }));
	  };
	
	  return ModalBody;
	}(_react.default.Component);
	
	ModalBody.propTypes = propTypes;
	ModalBody.defaultProps = defaultProps;
	
	var _default = (0, _bootstrapUtils.bsClass)('modal-body', ModalBody);
	
	exports.default = _default;
	module.exports = exports["default"];

/***/ }),

/***/ 144:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireDefault = __webpack_require__(5);
	
	exports.__esModule = true;
	exports.default = void 0;
	
	var _extends3 = _interopRequireDefault(__webpack_require__(8));
	
	var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(10));
	
	var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(6));
	
	var _classnames = _interopRequireDefault(__webpack_require__(11));
	
	var _react = _interopRequireDefault(__webpack_require__(2));
	
	var _propTypes = _interopRequireDefault(__webpack_require__(4));
	
	var _bootstrapUtils = __webpack_require__(12);
	
	var _StyleConfig = __webpack_require__(28);
	
	var propTypes = {
	  /**
	   * A css class to apply to the Modal dialog DOM node.
	   */
	  dialogClassName: _propTypes.default.string
	};
	
	var ModalDialog =
	/*#__PURE__*/
	function (_React$Component) {
	  (0, _inheritsLoose2.default)(ModalDialog, _React$Component);
	
	  function ModalDialog() {
	    return _React$Component.apply(this, arguments) || this;
	  }
	
	  var _proto = ModalDialog.prototype;
	
	  _proto.render = function render() {
	    var _extends2;
	
	    var _this$props = this.props,
	        dialogClassName = _this$props.dialogClassName,
	        className = _this$props.className,
	        style = _this$props.style,
	        children = _this$props.children,
	        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["dialogClassName", "className", "style", "children"]);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
	        bsProps = _splitBsProps[0],
	        elementProps = _splitBsProps[1];
	
	    var bsClassName = (0, _bootstrapUtils.prefix)(bsProps);
	    var modalStyle = (0, _extends3.default)({
	      display: 'block'
	    }, style);
	    var dialogClasses = (0, _extends3.default)({}, (0, _bootstrapUtils.getClassSet)(bsProps), (_extends2 = {}, _extends2[bsClassName] = false, _extends2[(0, _bootstrapUtils.prefix)(bsProps, 'dialog')] = true, _extends2));
	    return _react.default.createElement("div", (0, _extends3.default)({}, elementProps, {
	      tabIndex: "-1",
	      role: "dialog",
	      style: modalStyle,
	      className: (0, _classnames.default)(className, bsClassName)
	    }), _react.default.createElement("div", {
	      className: (0, _classnames.default)(dialogClassName, dialogClasses)
	    }, _react.default.createElement("div", {
	      className: (0, _bootstrapUtils.prefix)(bsProps, 'content'),
	      role: "document"
	    }, children)));
	  };
	
	  return ModalDialog;
	}(_react.default.Component);
	
	ModalDialog.propTypes = propTypes;
	
	var _default = (0, _bootstrapUtils.bsClass)('modal', (0, _bootstrapUtils.bsSizes)([_StyleConfig.Size.LARGE, _StyleConfig.Size.SMALL], ModalDialog));
	
	exports.default = _default;
	module.exports = exports["default"];

/***/ }),

/***/ 145:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireDefault = __webpack_require__(5);
	
	exports.__esModule = true;
	exports.default = void 0;
	
	var _extends2 = _interopRequireDefault(__webpack_require__(8));
	
	var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(10));
	
	var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(6));
	
	var _classnames = _interopRequireDefault(__webpack_require__(11));
	
	var _react = _interopRequireDefault(__webpack_require__(2));
	
	var _elementType = _interopRequireDefault(__webpack_require__(17));
	
	var _bootstrapUtils = __webpack_require__(12);
	
	var propTypes = {
	  componentClass: _elementType.default
	};
	var defaultProps = {
	  componentClass: 'div'
	};
	
	var ModalFooter =
	/*#__PURE__*/
	function (_React$Component) {
	  (0, _inheritsLoose2.default)(ModalFooter, _React$Component);
	
	  function ModalFooter() {
	    return _React$Component.apply(this, arguments) || this;
	  }
	
	  var _proto = ModalFooter.prototype;
	
	  _proto.render = function render() {
	    var _this$props = this.props,
	        Component = _this$props.componentClass,
	        className = _this$props.className,
	        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["componentClass", "className"]);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
	        bsProps = _splitBsProps[0],
	        elementProps = _splitBsProps[1];
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	    return _react.default.createElement(Component, (0, _extends2.default)({}, elementProps, {
	      className: (0, _classnames.default)(className, classes)
	    }));
	  };
	
	  return ModalFooter;
	}(_react.default.Component);
	
	ModalFooter.propTypes = propTypes;
	ModalFooter.defaultProps = defaultProps;
	
	var _default = (0, _bootstrapUtils.bsClass)('modal-footer', ModalFooter);
	
	exports.default = _default;
	module.exports = exports["default"];

/***/ }),

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireDefault = __webpack_require__(5);
	
	exports.__esModule = true;
	exports.default = void 0;
	
	var _extends2 = _interopRequireDefault(__webpack_require__(8));
	
	var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(10));
	
	var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(6));
	
	var _classnames = _interopRequireDefault(__webpack_require__(11));
	
	var _propTypes = _interopRequireDefault(__webpack_require__(4));
	
	var _react = _interopRequireDefault(__webpack_require__(2));
	
	var _bootstrapUtils = __webpack_require__(12);
	
	var _createChainedFunction = _interopRequireDefault(__webpack_require__(88));
	
	var _CloseButton = _interopRequireDefault(__webpack_require__(74));
	
	// TODO: `aria-label` should be `closeLabel`.
	var propTypes = {
	  /**
	   * Provides an accessible label for the close
	   * button. It is used for Assistive Technology when the label text is not
	   * readable.
	   */
	  closeLabel: _propTypes.default.string,
	
	  /**
	   * Specify whether the Component should contain a close button
	   */
	  closeButton: _propTypes.default.bool,
	
	  /**
	   * A Callback fired when the close button is clicked. If used directly inside
	   * a Modal component, the onHide will automatically be propagated up to the
	   * parent Modal `onHide`.
	   */
	  onHide: _propTypes.default.func
	};
	var defaultProps = {
	  closeLabel: 'Close',
	  closeButton: false
	};
	var contextTypes = {
	  $bs_modal: _propTypes.default.shape({
	    onHide: _propTypes.default.func
	  })
	};
	
	var ModalHeader =
	/*#__PURE__*/
	function (_React$Component) {
	  (0, _inheritsLoose2.default)(ModalHeader, _React$Component);
	
	  function ModalHeader() {
	    return _React$Component.apply(this, arguments) || this;
	  }
	
	  var _proto = ModalHeader.prototype;
	
	  _proto.render = function render() {
	    var _this$props = this.props,
	        closeLabel = _this$props.closeLabel,
	        closeButton = _this$props.closeButton,
	        onHide = _this$props.onHide,
	        className = _this$props.className,
	        children = _this$props.children,
	        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["closeLabel", "closeButton", "onHide", "className", "children"]);
	    var modal = this.context.$bs_modal;
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
	        bsProps = _splitBsProps[0],
	        elementProps = _splitBsProps[1];
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	    return _react.default.createElement("div", (0, _extends2.default)({}, elementProps, {
	      className: (0, _classnames.default)(className, classes)
	    }), closeButton && _react.default.createElement(_CloseButton.default, {
	      label: closeLabel,
	      onClick: (0, _createChainedFunction.default)(modal && modal.onHide, onHide)
	    }), children);
	  };
	
	  return ModalHeader;
	}(_react.default.Component);
	
	ModalHeader.propTypes = propTypes;
	ModalHeader.defaultProps = defaultProps;
	ModalHeader.contextTypes = contextTypes;
	
	var _default = (0, _bootstrapUtils.bsClass)('modal-header', ModalHeader);
	
	exports.default = _default;
	module.exports = exports["default"];

/***/ }),

/***/ 147:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireDefault = __webpack_require__(5);
	
	exports.__esModule = true;
	exports.default = void 0;
	
	var _extends2 = _interopRequireDefault(__webpack_require__(8));
	
	var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(10));
	
	var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(6));
	
	var _classnames = _interopRequireDefault(__webpack_require__(11));
	
	var _react = _interopRequireDefault(__webpack_require__(2));
	
	var _elementType = _interopRequireDefault(__webpack_require__(17));
	
	var _bootstrapUtils = __webpack_require__(12);
	
	var propTypes = {
	  componentClass: _elementType.default
	};
	var defaultProps = {
	  componentClass: 'h4'
	};
	
	var ModalTitle =
	/*#__PURE__*/
	function (_React$Component) {
	  (0, _inheritsLoose2.default)(ModalTitle, _React$Component);
	
	  function ModalTitle() {
	    return _React$Component.apply(this, arguments) || this;
	  }
	
	  var _proto = ModalTitle.prototype;
	
	  _proto.render = function render() {
	    var _this$props = this.props,
	        Component = _this$props.componentClass,
	        className = _this$props.className,
	        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["componentClass", "className"]);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
	        bsProps = _splitBsProps[0],
	        elementProps = _splitBsProps[1];
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	    return _react.default.createElement(Component, (0, _extends2.default)({}, elementProps, {
	      className: (0, _classnames.default)(className, classes)
	    }));
	  };
	
	  return ModalTitle;
	}(_react.default.Component);
	
	ModalTitle.propTypes = propTypes;
	ModalTitle.defaultProps = defaultProps;
	
	var _default = (0, _bootstrapUtils.bsClass)('modal-title', ModalTitle);
	
	exports.default = _default;
	module.exports = exports["default"];

/***/ }),

/***/ 148:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireDefault = __webpack_require__(5);
	
	exports.__esModule = true;
	exports.default = splitComponentProps;
	
	var _entries = _interopRequireDefault(__webpack_require__(190));
	
	function splitComponentProps(props, Component) {
	  var componentPropTypes = Component.propTypes;
	  var parentProps = {};
	  var childProps = {};
	  (0, _entries.default)(props).forEach(function (_ref) {
	    var propName = _ref[0],
	        propValue = _ref[1];
	
	    if (componentPropTypes[propName]) {
	      parentProps[propName] = propValue;
	    } else {
	      childProps[propName] = propValue;
	    }
	  });
	  return [parentProps, childProps];
	}
	
	module.exports = exports["default"];

/***/ }),

/***/ 236:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _deepEqual = __webpack_require__(131);
	
	var _deepEqual2 = _interopRequireDefault(_deepEqual);
	
	function intersects(array1, array2) {
	  return !!(array1 && array2 && array1.some(function (item) {
	    return ~array2.indexOf(item);
	  }));
	}
	
	var LazyCache = (function () {
	  function LazyCache(component, calculators) {
	    var _this = this;
	
	    _classCallCheck(this, LazyCache);
	
	    this.component = component;
	    this.allProps = [];
	    this.cache = Object.keys(calculators).reduce(function (accumulator, key) {
	      var _extends2;
	
	      var calculator = calculators[key];
	      var fn = calculator.fn;
	      var paramNames = calculator.params;
	      paramNames.forEach(function (param) {
	        if (! ~_this.allProps.indexOf(param)) {
	          _this.allProps.push(param);
	        }
	      });
	      return _extends({}, accumulator, (_extends2 = {}, _extends2[key] = {
	        value: undefined,
	        props: paramNames,
	        fn: fn
	      }, _extends2));
	    }, {});
	  }
	
	  LazyCache.prototype.get = function get(key) {
	    var component = this.component;
	    var _cache$key = this.cache[key];
	    var value = _cache$key.value;
	    var fn = _cache$key.fn;
	    var props = _cache$key.props;
	
	    if (value !== undefined) {
	      return value;
	    }
	    var params = props.map(function (prop) {
	      return component.props[prop];
	    });
	    var result = fn.apply(undefined, params);
	    this.cache[key].value = result;
	    return result;
	  };
	
	  LazyCache.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    var _this2 = this;
	
	    var component = this.component;
	
	    var diffProps = [];
	    this.allProps.forEach(function (prop) {
	      if (!_deepEqual2['default'](component.props[prop], nextProps[prop])) {
	        diffProps.push(prop);
	      }
	    });
	    if (diffProps.length) {
	      Object.keys(this.cache).forEach(function (key) {
	        if (intersects(diffProps, _this2.cache[key].props)) {
	          delete _this2.cache[key].value; // uncache value
	        }
	      });
	    }
	  };
	
	  return LazyCache;
	})();
	
	exports['default'] = LazyCache;
	module.exports = exports['default'];

/***/ }),

/***/ 237:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(236);


/***/ }),

/***/ 150:
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	function componentWillMount() {
	  // Call this.constructor.gDSFP to support sub-classes.
	  var state = this.constructor.getDerivedStateFromProps(this.props, this.state);
	  if (state !== null && state !== undefined) {
	    this.setState(state);
	  }
	}
	
	function componentWillReceiveProps(nextProps) {
	  // Call this.constructor.gDSFP to support sub-classes.
	  // Use the setState() updater to ensure state isn't stale in certain edge cases.
	  function updater(prevState) {
	    var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);
	    return state !== null && state !== undefined ? state : null;
	  }
	  // Binding "this" is important for shallow renderer support.
	  this.setState(updater.bind(this));
	}
	
	function componentWillUpdate(nextProps, nextState) {
	  try {
	    var prevProps = this.props;
	    var prevState = this.state;
	    this.props = nextProps;
	    this.state = nextState;
	    this.__reactInternalSnapshotFlag = true;
	    this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(
	      prevProps,
	      prevState
	    );
	  } finally {
	    this.props = prevProps;
	    this.state = prevState;
	  }
	}
	
	// React may warn about cWM/cWRP/cWU methods being deprecated.
	// Add a flag to suppress these warnings for this special case.
	componentWillMount.__suppressDeprecationWarning = true;
	componentWillReceiveProps.__suppressDeprecationWarning = true;
	componentWillUpdate.__suppressDeprecationWarning = true;
	
	function polyfill(Component) {
	  var prototype = Component.prototype;
	
	  if (!prototype || !prototype.isReactComponent) {
	    throw new Error('Can only polyfill class components');
	  }
	
	  if (
	    typeof Component.getDerivedStateFromProps !== 'function' &&
	    typeof prototype.getSnapshotBeforeUpdate !== 'function'
	  ) {
	    return Component;
	  }
	
	  // If new component APIs are defined, "unsafe" lifecycles won't be called.
	  // Error if any of these lifecycles are present,
	  // Because they would work differently between older and newer (16.3+) versions of React.
	  var foundWillMountName = null;
	  var foundWillReceivePropsName = null;
	  var foundWillUpdateName = null;
	  if (typeof prototype.componentWillMount === 'function') {
	    foundWillMountName = 'componentWillMount';
	  } else if (typeof prototype.UNSAFE_componentWillMount === 'function') {
	    foundWillMountName = 'UNSAFE_componentWillMount';
	  }
	  if (typeof prototype.componentWillReceiveProps === 'function') {
	    foundWillReceivePropsName = 'componentWillReceiveProps';
	  } else if (typeof prototype.UNSAFE_componentWillReceiveProps === 'function') {
	    foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';
	  }
	  if (typeof prototype.componentWillUpdate === 'function') {
	    foundWillUpdateName = 'componentWillUpdate';
	  } else if (typeof prototype.UNSAFE_componentWillUpdate === 'function') {
	    foundWillUpdateName = 'UNSAFE_componentWillUpdate';
	  }
	  if (
	    foundWillMountName !== null ||
	    foundWillReceivePropsName !== null ||
	    foundWillUpdateName !== null
	  ) {
	    var componentName = Component.displayName || Component.name;
	    var newApiName =
	      typeof Component.getDerivedStateFromProps === 'function'
	        ? 'getDerivedStateFromProps()'
	        : 'getSnapshotBeforeUpdate()';
	
	    throw Error(
	      'Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' +
	        componentName +
	        ' uses ' +
	        newApiName +
	        ' but also contains the following legacy lifecycles:' +
	        (foundWillMountName !== null ? '\n  ' + foundWillMountName : '') +
	        (foundWillReceivePropsName !== null
	          ? '\n  ' + foundWillReceivePropsName
	          : '') +
	        (foundWillUpdateName !== null ? '\n  ' + foundWillUpdateName : '') +
	        '\n\nThe above lifecycles should be removed. Learn more about this warning here:\n' +
	        'https://fb.me/react-async-component-lifecycle-hooks'
	    );
	  }
	
	  // React <= 16.2 does not support static getDerivedStateFromProps.
	  // As a workaround, use cWM and cWRP to invoke the new static lifecycle.
	  // Newer versions of React will ignore these lifecycles if gDSFP exists.
	  if (typeof Component.getDerivedStateFromProps === 'function') {
	    prototype.componentWillMount = componentWillMount;
	    prototype.componentWillReceiveProps = componentWillReceiveProps;
	  }
	
	  // React <= 16.2 does not support getSnapshotBeforeUpdate.
	  // As a workaround, use cWU to invoke the new lifecycle.
	  // Newer versions of React will ignore that lifecycle if gSBU exists.
	  if (typeof prototype.getSnapshotBeforeUpdate === 'function') {
	    if (typeof prototype.componentDidUpdate !== 'function') {
	      throw new Error(
	        'Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype'
	      );
	    }
	
	    prototype.componentWillUpdate = componentWillUpdate;
	
	    var componentDidUpdate = prototype.componentDidUpdate;
	
	    prototype.componentDidUpdate = function componentDidUpdatePolyfill(
	      prevProps,
	      prevState,
	      maybeSnapshot
	    ) {
	      // 16.3+ will not execute our will-update method;
	      // It will pass a snapshot value to did-update though.
	      // Older versions will require our polyfilled will-update value.
	      // We need to handle both cases, but can't just check for the presence of "maybeSnapshot",
	      // Because for <= 15.x versions this might be a "prevContext" object.
	      // We also can't just check "__reactInternalSnapshot",
	      // Because get-snapshot might return a falsy value.
	      // So check for the explicit __reactInternalSnapshotFlag flag to determine behavior.
	      var snapshot = this.__reactInternalSnapshotFlag
	        ? this.__reactInternalSnapshot
	        : maybeSnapshot;
	
	      componentDidUpdate.call(this, prevProps, prevState, snapshot);
	    };
	  }
	
	  return Component;
	}
	
	exports.polyfill = polyfill;


/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _componentOrElement = __webpack_require__(36);
	
	var _componentOrElement2 = _interopRequireDefault(_componentOrElement);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(14);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _getContainer = __webpack_require__(38);
	
	var _getContainer2 = _interopRequireDefault(_getContainer);
	
	var _ownerDocument = __webpack_require__(39);
	
	var _ownerDocument2 = _interopRequireDefault(_ownerDocument);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * The `<Portal/>` component renders its children into a new "subtree" outside of current component hierarchy.
	 * You can think of it as a declarative `appendChild()`, or jQuery's `$.fn.appendTo()`.
	 * The children of `<Portal/>` component will be appended to the `container` specified.
	 */
	var Portal = function (_React$Component) {
	  _inherits(Portal, _React$Component);
	
	  function Portal() {
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, Portal);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this._mountOverlayTarget = function () {
	      if (!_this._overlayTarget) {
	        _this._overlayTarget = document.createElement('div');
	        _this._portalContainerNode = (0, _getContainer2.default)(_this.props.container, (0, _ownerDocument2.default)(_this).body);
	        _this._portalContainerNode.appendChild(_this._overlayTarget);
	      }
	    }, _this._unmountOverlayTarget = function () {
	      if (_this._overlayTarget) {
	        _this._portalContainerNode.removeChild(_this._overlayTarget);
	        _this._overlayTarget = null;
	      }
	      _this._portalContainerNode = null;
	    }, _this._renderOverlay = function () {
	      var overlay = !_this.props.children ? null : _react2.default.Children.only(_this.props.children);
	
	      // Save reference for future access.
	      if (overlay !== null) {
	        _this._mountOverlayTarget();
	
	        var initialRender = !_this._overlayInstance;
	
	        _this._overlayInstance = _reactDom2.default.unstable_renderSubtreeIntoContainer(_this, overlay, _this._overlayTarget, function () {
	          if (initialRender && _this.props.onRendered) {
	            _this.props.onRendered();
	          }
	        });
	      } else {
	        // Unrender if the component is null for transitions to null
	        _this._unrenderOverlay();
	        _this._unmountOverlayTarget();
	      }
	    }, _this._unrenderOverlay = function () {
	      if (_this._overlayTarget) {
	        _reactDom2.default.unmountComponentAtNode(_this._overlayTarget);
	        _this._overlayInstance = null;
	      }
	    }, _this.getMountNode = function () {
	      return _this._overlayTarget;
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  Portal.prototype.componentDidMount = function componentDidMount() {
	    this._isMounted = true;
	    this._renderOverlay();
	  };
	
	  Portal.prototype.componentDidUpdate = function componentDidUpdate() {
	    this._renderOverlay();
	  };
	
	  Portal.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    if (this._overlayTarget && nextProps.container !== this.props.container) {
	      this._portalContainerNode.removeChild(this._overlayTarget);
	      this._portalContainerNode = (0, _getContainer2.default)(nextProps.container, (0, _ownerDocument2.default)(this).body);
	      this._portalContainerNode.appendChild(this._overlayTarget);
	    }
	  };
	
	  Portal.prototype.componentWillUnmount = function componentWillUnmount() {
	    this._isMounted = false;
	    this._unrenderOverlay();
	    this._unmountOverlayTarget();
	  };
	
	  Portal.prototype.render = function render() {
	    return null;
	  };
	
	  return Portal;
	}(_react2.default.Component);
	
	Portal.displayName = 'Portal';
	Portal.propTypes = {
	  /**
	   * A Node, Component instance, or function that returns either. The `container` will have the Portal children
	   * appended to it.
	   */
	  container: _propTypes2.default.oneOfType([_componentOrElement2.default, _propTypes2.default.func]),
	
	  onRendered: _propTypes2.default.func
	};
	exports.default = Portal;
	module.exports = exports['default'];

/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _activeElement = __webpack_require__(306);
	
	var _activeElement2 = _interopRequireDefault(_activeElement);
	
	var _contains = __webpack_require__(215);
	
	var _contains2 = _interopRequireDefault(_contains);
	
	var _inDOM = __webpack_require__(35);
	
	var _inDOM2 = _interopRequireDefault(_inDOM);
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _componentOrElement = __webpack_require__(36);
	
	var _componentOrElement2 = _interopRequireDefault(_componentOrElement);
	
	var _deprecated = __webpack_require__(140);
	
	var _deprecated2 = _interopRequireDefault(_deprecated);
	
	var _elementType = __webpack_require__(17);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(14);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _warning = __webpack_require__(31);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _ModalManager = __webpack_require__(153);
	
	var _ModalManager2 = _interopRequireDefault(_ModalManager);
	
	var _Portal = __webpack_require__(154);
	
	var _Portal2 = _interopRequireDefault(_Portal);
	
	var _RefHolder = __webpack_require__(155);
	
	var _RefHolder2 = _interopRequireDefault(_RefHolder);
	
	var _addEventListener = __webpack_require__(156);
	
	var _addEventListener2 = _interopRequireDefault(_addEventListener);
	
	var _addFocusListener = __webpack_require__(157);
	
	var _addFocusListener2 = _interopRequireDefault(_addFocusListener);
	
	var _getContainer = __webpack_require__(38);
	
	var _getContainer2 = _interopRequireDefault(_getContainer);
	
	var _ownerDocument = __webpack_require__(39);
	
	var _ownerDocument2 = _interopRequireDefault(_ownerDocument);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/prop-types */
	
	var modalManager = new _ModalManager2.default();
	
	/**
	 * Love them or hate them, `<Modal/>` provides a solid foundation for creating dialogs, lightboxes, or whatever else.
	 * The Modal component renders its `children` node in front of a backdrop component.
	 *
	 * The Modal offers a few helpful features over using just a `<Portal/>` component and some styles:
	 *
	 * - Manages dialog stacking when one-at-a-time just isn't enough.
	 * - Creates a backdrop, for disabling interaction below the modal.
	 * - It properly manages focus; moving to the modal content, and keeping it there until the modal is closed.
	 * - It disables scrolling of the page content while open.
	 * - Adds the appropriate ARIA roles are automatically.
	 * - Easily pluggable animations via a `<Transition/>` component.
	 *
	 * Note that, in the same way the backdrop element prevents users from clicking or interacting
	 * with the page content underneath the Modal, Screen readers also need to be signaled to not to
	 * interact with page content while the Modal is open. To do this, we use a common technique of applying
	 * the `aria-hidden='true'` attribute to the non-Modal elements in the Modal `container`. This means that for
	 * a Modal to be truly modal, it should have a `container` that is _outside_ your app's
	 * React hierarchy (such as the default: document.body).
	 */
	
	var Modal = function (_React$Component) {
	  _inherits(Modal, _React$Component);
	
	  function Modal() {
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, Modal);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  Modal.prototype.omitProps = function omitProps(props, propTypes) {
	
	    var keys = Object.keys(props);
	    var newProps = {};
	    keys.map(function (prop) {
	      if (!Object.prototype.hasOwnProperty.call(propTypes, prop)) {
	        newProps[prop] = props[prop];
	      }
	    });
	
	    return newProps;
	  };
	
	  Modal.prototype.render = function render() {
	    var _props = this.props,
	        show = _props.show,
	        container = _props.container,
	        children = _props.children,
	        Transition = _props.transition,
	        backdrop = _props.backdrop,
	        className = _props.className,
	        style = _props.style,
	        onExit = _props.onExit,
	        onExiting = _props.onExiting,
	        onEnter = _props.onEnter,
	        onEntering = _props.onEntering,
	        onEntered = _props.onEntered;
	
	
	    var dialog = _react2.default.Children.only(children);
	    var filteredProps = this.omitProps(this.props, Modal.propTypes);
	
	    var mountModal = show || Transition && !this.state.exited;
	    if (!mountModal) {
	      return null;
	    }
	
	    var _dialog$props = dialog.props,
	        role = _dialog$props.role,
	        tabIndex = _dialog$props.tabIndex;
	
	
	    if (role === undefined || tabIndex === undefined) {
	      dialog = (0, _react.cloneElement)(dialog, {
	        role: role === undefined ? 'document' : role,
	        tabIndex: tabIndex == null ? '-1' : tabIndex
	      });
	    }
	
	    if (Transition) {
	      dialog = _react2.default.createElement(
	        Transition,
	        {
	          appear: true,
	          unmountOnExit: true,
	          'in': show,
	          onExit: onExit,
	          onExiting: onExiting,
	          onExited: this.handleHidden,
	          onEnter: onEnter,
	          onEntering: onEntering,
	          onEntered: onEntered
	        },
	        dialog
	      );
	    }
	
	    return _react2.default.createElement(
	      _Portal2.default,
	      {
	        ref: this.setMountNode,
	        container: container,
	        onRendered: this.onPortalRendered
	      },
	      _react2.default.createElement(
	        'div',
	        _extends({
	          ref: this.setModalNodeRef,
	          role: role || 'dialog'
	        }, filteredProps, {
	          style: style,
	          className: className
	        }),
	        backdrop && this.renderBackdrop(),
	        _react2.default.createElement(
	          _RefHolder2.default,
	          { ref: this.setDialogRef },
	          dialog
	        )
	      )
	    );
	  };
	
	  Modal.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    if (nextProps.show) {
	      this.setState({ exited: false });
	    } else if (!nextProps.transition) {
	      // Otherwise let handleHidden take care of marking exited.
	      this.setState({ exited: true });
	    }
	  };
	
	  Modal.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
	    if (!this.props.show && nextProps.show) {
	      this.checkForFocus();
	    }
	  };
	
	  Modal.prototype.componentDidMount = function componentDidMount() {
	    this._isMounted = true;
	    if (this.props.show) {
	      this.onShow();
	    }
	  };
	
	  Modal.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
	    var transition = this.props.transition;
	
	
	    if (prevProps.show && !this.props.show && !transition) {
	      // Otherwise handleHidden will call this.
	      this.onHide();
	    } else if (!prevProps.show && this.props.show) {
	      this.onShow();
	    }
	  };
	
	  Modal.prototype.componentWillUnmount = function componentWillUnmount() {
	    var _props2 = this.props,
	        show = _props2.show,
	        transition = _props2.transition;
	
	
	    this._isMounted = false;
	
	    if (show || transition && !this.state.exited) {
	      this.onHide();
	    }
	  };
	
	  Modal.prototype.autoFocus = function autoFocus() {
	    if (!this.props.autoFocus) {
	      return;
	    }
	
	    var dialogElement = this.getDialogElement();
	    var currentActiveElement = (0, _activeElement2.default)((0, _ownerDocument2.default)(this));
	
	    if (dialogElement && !(0, _contains2.default)(dialogElement, currentActiveElement)) {
	      this.lastFocus = currentActiveElement;
	
	      if (!dialogElement.hasAttribute('tabIndex')) {
	        (0, _warning2.default)(false, 'The modal content node does not accept focus. For the benefit of ' + 'assistive technologies, the tabIndex of the node is being set ' + 'to "-1".');
	
	        dialogElement.setAttribute('tabIndex', -1);
	      }
	
	      dialogElement.focus();
	    }
	  };
	
	  Modal.prototype.restoreLastFocus = function restoreLastFocus() {
	    // Support: <=IE11 doesn't support `focus()` on svg elements (RB: #917)
	    if (this.lastFocus && this.lastFocus.focus) {
	      this.lastFocus.focus();
	      this.lastFocus = null;
	    }
	  };
	
	  Modal.prototype.getDialogElement = function getDialogElement() {
	    return _reactDom2.default.findDOMNode(this.dialog);
	  };
	
	  Modal.prototype.isTopModal = function isTopModal() {
	    return this.props.manager.isTopModal(this);
	  };
	
	  return Modal;
	}(_react2.default.Component);
	
	Modal.propTypes = _extends({}, _Portal2.default.propTypes, {
	
	  /**
	   * Set the visibility of the Modal
	   */
	  show: _propTypes2.default.bool,
	
	  /**
	   * A Node, Component instance, or function that returns either. The Modal is appended to it's container element.
	   *
	   * For the sake of assistive technologies, the container should usually be the document body, so that the rest of the
	   * page content can be placed behind a virtual backdrop as well as a visual one.
	   */
	  container: _propTypes2.default.oneOfType([_componentOrElement2.default, _propTypes2.default.func]),
	
	  /**
	   * A callback fired when the Modal is opening.
	   */
	  onShow: _propTypes2.default.func,
	
	  /**
	   * A callback fired when either the backdrop is clicked, or the escape key is pressed.
	   *
	   * The `onHide` callback only signals intent from the Modal,
	   * you must actually set the `show` prop to `false` for the Modal to close.
	   */
	  onHide: _propTypes2.default.func,
	
	  /**
	   * Include a backdrop component.
	   */
	  backdrop: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.oneOf(['static'])]),
	
	  /**
	   * A function that returns a backdrop component. Useful for custom
	   * backdrop rendering.
	   *
	   * ```js
	   *  renderBackdrop={props => <MyBackdrop {...props} />}
	   * ```
	   */
	  renderBackdrop: _propTypes2.default.func,
	
	  /**
	   * A callback fired when the escape key, if specified in `keyboard`, is pressed.
	   */
	  onEscapeKeyDown: _propTypes2.default.func,
	
	  /**
	   * Support for this function will be deprecated. Please use `onEscapeKeyDown` instead
	   * A callback fired when the escape key, if specified in `keyboard`, is pressed.
	   * @deprecated
	   */
	  onEscapeKeyUp: (0, _deprecated2.default)(_propTypes2.default.func, 'Please use onEscapeKeyDown instead for consistency'),
	
	  /**
	   * A callback fired when the backdrop, if specified, is clicked.
	   */
	  onBackdropClick: _propTypes2.default.func,
	
	  /**
	   * A style object for the backdrop component.
	   */
	  backdropStyle: _propTypes2.default.object,
	
	  /**
	   * A css class or classes for the backdrop component.
	   */
	  backdropClassName: _propTypes2.default.string,
	
	  /**
	   * A css class or set of classes applied to the modal container when the modal is open,
	   * and removed when it is closed.
	   */
	  containerClassName: _propTypes2.default.string,
	
	  /**
	   * Close the modal when escape key is pressed
	   */
	  keyboard: _propTypes2.default.bool,
	
	  /**
	   * A `react-transition-group@2.0.0` `<Transition/>` component used
	   * to control animations for the dialog component.
	   */
	  transition: _elementType2.default,
	
	  /**
	   * A `react-transition-group@2.0.0` `<Transition/>` component used
	   * to control animations for the backdrop components.
	   */
	  backdropTransition: _elementType2.default,
	
	  /**
	   * When `true` The modal will automatically shift focus to itself when it opens, and
	   * replace it to the last focused element when it closes. This also
	   * works correctly with any Modal children that have the `autoFocus` prop.
	   *
	   * Generally this should never be set to `false` as it makes the Modal less
	   * accessible to assistive technologies, like screen readers.
	   */
	  autoFocus: _propTypes2.default.bool,
	
	  /**
	   * When `true` The modal will prevent focus from leaving the Modal while open.
	   *
	   * Generally this should never be set to `false` as it makes the Modal less
	   * accessible to assistive technologies, like screen readers.
	   */
	  enforceFocus: _propTypes2.default.bool,
	
	  /**
	   * When `true` The modal will restore focus to previously focused element once
	   * modal is hidden
	   */
	  restoreFocus: _propTypes2.default.bool,
	
	  /**
	   * Callback fired before the Modal transitions in
	   */
	  onEnter: _propTypes2.default.func,
	
	  /**
	   * Callback fired as the Modal begins to transition in
	   */
	  onEntering: _propTypes2.default.func,
	
	  /**
	   * Callback fired after the Modal finishes transitioning in
	   */
	  onEntered: _propTypes2.default.func,
	
	  /**
	   * Callback fired right before the Modal transitions out
	   */
	  onExit: _propTypes2.default.func,
	
	  /**
	   * Callback fired as the Modal begins to transition out
	   */
	  onExiting: _propTypes2.default.func,
	
	  /**
	   * Callback fired after the Modal finishes transitioning out
	   */
	  onExited: _propTypes2.default.func,
	
	  /**
	   * A ModalManager instance used to track and manage the state of open
	   * Modals. Useful when customizing how modals interact within a container
	   */
	  manager: _propTypes2.default.object.isRequired
	});
	Modal.defaultProps = {
	  show: false,
	  backdrop: true,
	  keyboard: true,
	  autoFocus: true,
	  enforceFocus: true,
	  restoreFocus: true,
	  onHide: function onHide() {},
	  manager: modalManager,
	  renderBackdrop: function renderBackdrop(props) {
	    return _react2.default.createElement('div', props);
	  }
	};
	
	var _initialiseProps = function _initialiseProps() {
	  var _this2 = this;
	
	  this.state = { exited: !this.props.show };
	
	  this.renderBackdrop = function () {
	    var _props3 = _this2.props,
	        backdropStyle = _props3.backdropStyle,
	        backdropClassName = _props3.backdropClassName,
	        renderBackdrop = _props3.renderBackdrop,
	        Transition = _props3.backdropTransition;
	
	
	    var backdropRef = function backdropRef(ref) {
	      return _this2.backdrop = ref;
	    };
	
	    var backdrop = renderBackdrop({
	      ref: backdropRef,
	      style: backdropStyle,
	      className: backdropClassName,
	      onClick: _this2.handleBackdropClick
	    });
	
	    if (Transition) {
	      backdrop = _react2.default.createElement(
	        Transition,
	        {
	          appear: true,
	          'in': _this2.props.show
	        },
	        backdrop
	      );
	    }
	
	    return backdrop;
	  };
	
	  this.onPortalRendered = function () {
	    _this2.autoFocus();
	
	    if (_this2.props.onShow) {
	      _this2.props.onShow();
	    }
	  };
	
	  this.onShow = function () {
	    var doc = (0, _ownerDocument2.default)(_this2);
	    var container = (0, _getContainer2.default)(_this2.props.container, doc.body);
	
	    _this2.props.manager.add(_this2, container, _this2.props.containerClassName);
	
	    _this2._onDocumentKeydownListener = (0, _addEventListener2.default)(doc, 'keydown', _this2.handleDocumentKeyDown);
	
	    _this2._onDocumentKeyupListener = (0, _addEventListener2.default)(doc, 'keyup', _this2.handleDocumentKeyUp);
	
	    _this2._onFocusinListener = (0, _addFocusListener2.default)(_this2.enforceFocus);
	  };
	
	  this.onHide = function () {
	    _this2.props.manager.remove(_this2);
	
	    _this2._onDocumentKeydownListener.remove();
	
	    _this2._onDocumentKeyupListener.remove();
	
	    _this2._onFocusinListener.remove();
	
	    if (_this2.props.restoreFocus) {
	      _this2.restoreLastFocus();
	    }
	  };
	
	  this.setMountNode = function (ref) {
	    _this2.mountNode = ref ? ref.getMountNode() : ref;
	  };
	
	  this.setModalNodeRef = function (ref) {
	    _this2.modalNode = ref;
	  };
	
	  this.setDialogRef = function (ref) {
	    _this2.dialog = ref;
	  };
	
	  this.handleHidden = function () {
	    _this2.setState({ exited: true });
	    _this2.onHide();
	
	    if (_this2.props.onExited) {
	      var _props4;
	
	      (_props4 = _this2.props).onExited.apply(_props4, arguments);
	    }
	  };
	
	  this.handleBackdropClick = function (e) {
	    if (e.target !== e.currentTarget) {
	      return;
	    }
	
	    if (_this2.props.onBackdropClick) {
	      _this2.props.onBackdropClick(e);
	    }
	
	    if (_this2.props.backdrop === true) {
	      _this2.props.onHide();
	    }
	  };
	
	  this.handleDocumentKeyDown = function (e) {
	    if (_this2.props.keyboard && e.keyCode === 27 && _this2.isTopModal()) {
	      if (_this2.props.onEscapeKeyDown) {
	        _this2.props.onEscapeKeyDown(e);
	      }
	
	      _this2.props.onHide();
	    }
	  };
	
	  this.handleDocumentKeyUp = function (e) {
	    if (_this2.props.keyboard && e.keyCode === 27 && _this2.isTopModal()) {
	      if (_this2.props.onEscapeKeyUp) {
	        _this2.props.onEscapeKeyUp(e);
	      }
	    }
	  };
	
	  this.checkForFocus = function () {
	    if (_inDOM2.default) {
	      _this2.lastFocus = (0, _activeElement2.default)();
	    }
	  };
	
	  this.enforceFocus = function () {
	    if (!_this2.props.enforceFocus || !_this2._isMounted || !_this2.isTopModal()) {
	      return;
	    }
	
	    var dialogElement = _this2.getDialogElement();
	    var currentActiveElement = (0, _activeElement2.default)((0, _ownerDocument2.default)(_this2));
	
	    if (dialogElement && !(0, _contains2.default)(dialogElement, currentActiveElement)) {
	      dialogElement.focus();
	    }
	  };
	};
	
	Modal.Manager = _ModalManager2.default;
	
	exports.default = Modal;
	module.exports = exports['default'];

/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _class = __webpack_require__(307);
	
	var _class2 = _interopRequireDefault(_class);
	
	var _style = __webpack_require__(309);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _scrollbarSize = __webpack_require__(100);
	
	var _scrollbarSize2 = _interopRequireDefault(_scrollbarSize);
	
	var _isOverflowing = __webpack_require__(63);
	
	var _isOverflowing2 = _interopRequireDefault(_isOverflowing);
	
	var _manageAriaHidden = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function findIndexOf(arr, cb) {
	  var idx = -1;
	  arr.some(function (d, i) {
	    if (cb(d, i)) {
	      idx = i;
	      return true;
	    }
	  });
	  return idx;
	}
	
	function findContainer(data, modal) {
	  return findIndexOf(data, function (d) {
	    return d.modals.indexOf(modal) !== -1;
	  });
	}
	
	function setContainerStyle(state, container) {
	  var style = { overflow: 'hidden' };
	
	  // we are only interested in the actual `style` here
	  // becasue we will override it
	  state.style = {
	    overflow: container.style.overflow,
	    paddingRight: container.style.paddingRight
	  };
	
	  if (state.overflowing) {
	    // use computed style, here to get the real padding
	    // to add our scrollbar width
	    style.paddingRight = parseInt((0, _style2.default)(container, 'paddingRight') || 0, 10) + (0, _scrollbarSize2.default)() + 'px';
	  }
	
	  (0, _style2.default)(container, style);
	}
	
	function removeContainerStyle(_ref, container) {
	  var style = _ref.style;
	
	
	  Object.keys(style).forEach(function (key) {
	    return container.style[key] = style[key];
	  });
	}
	/**
	 * Proper state managment for containers and the modals in those containers.
	 *
	 * @internal Used by the Modal to ensure proper styling of containers.
	 */
	
	var ModalManager = function ModalManager() {
	  var _this = this;
	
	  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      _ref2$hideSiblingNode = _ref2.hideSiblingNodes,
	      hideSiblingNodes = _ref2$hideSiblingNode === undefined ? true : _ref2$hideSiblingNode,
	      _ref2$handleContainer = _ref2.handleContainerOverflow,
	      handleContainerOverflow = _ref2$handleContainer === undefined ? true : _ref2$handleContainer;
	
	  _classCallCheck(this, ModalManager);
	
	  this.add = function (modal, container, className) {
	    var modalIdx = _this.modals.indexOf(modal);
	    var containerIdx = _this.containers.indexOf(container);
	
	    if (modalIdx !== -1) {
	      return modalIdx;
	    }
	
	    modalIdx = _this.modals.length;
	    _this.modals.push(modal);
	
	    if (_this.hideSiblingNodes) {
	      (0, _manageAriaHidden.hideSiblings)(container, modal.mountNode);
	    }
	
	    if (containerIdx !== -1) {
	      _this.data[containerIdx].modals.push(modal);
	      return modalIdx;
	    }
	
	    var data = {
	      modals: [modal],
	      //right now only the first modal of a container will have its classes applied
	      classes: className ? className.split(/\s+/) : [],
	
	      overflowing: (0, _isOverflowing2.default)(container)
	    };
	
	    if (_this.handleContainerOverflow) {
	      setContainerStyle(data, container);
	    }
	
	    data.classes.forEach(_class2.default.addClass.bind(null, container));
	
	    _this.containers.push(container);
	    _this.data.push(data);
	
	    return modalIdx;
	  };
	
	  this.remove = function (modal) {
	    var modalIdx = _this.modals.indexOf(modal);
	
	    if (modalIdx === -1) {
	      return;
	    }
	
	    var containerIdx = findContainer(_this.data, modal);
	    var data = _this.data[containerIdx];
	    var container = _this.containers[containerIdx];
	
	    data.modals.splice(data.modals.indexOf(modal), 1);
	
	    _this.modals.splice(modalIdx, 1);
	
	    // if that was the last modal in a container,
	    // clean up the container
	    if (data.modals.length === 0) {
	      data.classes.forEach(_class2.default.removeClass.bind(null, container));
	
	      if (_this.handleContainerOverflow) {
	        removeContainerStyle(data, container);
	      }
	
	      if (_this.hideSiblingNodes) {
	        (0, _manageAriaHidden.showSiblings)(container, modal.mountNode);
	      }
	      _this.containers.splice(containerIdx, 1);
	      _this.data.splice(containerIdx, 1);
	    } else if (_this.hideSiblingNodes) {
	      //otherwise make sure the next top modal is visible to a SR
	      (0, _manageAriaHidden.ariaHidden)(false, data.modals[data.modals.length - 1].mountNode);
	    }
	  };
	
	  this.isTopModal = function (modal) {
	    return !!_this.modals.length && _this.modals[_this.modals.length - 1] === modal;
	  };
	
	  this.hideSiblingNodes = hideSiblingNodes;
	  this.handleContainerOverflow = handleContainerOverflow;
	  this.modals = [];
	  this.containers = [];
	  this.data = [];
	};
	
	exports.default = ModalManager;
	module.exports = exports['default'];

/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _componentOrElement = __webpack_require__(36);
	
	var _componentOrElement2 = _interopRequireDefault(_componentOrElement);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(14);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _getContainer = __webpack_require__(38);
	
	var _getContainer2 = _interopRequireDefault(_getContainer);
	
	var _ownerDocument = __webpack_require__(39);
	
	var _ownerDocument2 = _interopRequireDefault(_ownerDocument);
	
	var _LegacyPortal = __webpack_require__(151);
	
	var _LegacyPortal2 = _interopRequireDefault(_LegacyPortal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * The `<Portal/>` component renders its children into a new "subtree" outside of current component hierarchy.
	 * You can think of it as a declarative `appendChild()`, or jQuery's `$.fn.appendTo()`.
	 * The children of `<Portal/>` component will be appended to the `container` specified.
	 */
	var Portal = function (_React$Component) {
	  _inherits(Portal, _React$Component);
	
	  function Portal() {
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, Portal);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.setContainer = function () {
	      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props;
	
	      _this._portalContainerNode = (0, _getContainer2.default)(props.container, (0, _ownerDocument2.default)(_this).body);
	    }, _this.getMountNode = function () {
	      return _this._portalContainerNode;
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  Portal.prototype.componentDidMount = function componentDidMount() {
	    this.setContainer();
	    this.forceUpdate(this.props.onRendered);
	  };
	
	  Portal.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    if (nextProps.container !== this.props.container) {
	      this.setContainer(nextProps);
	    }
	  };
	
	  Portal.prototype.componentWillUnmount = function componentWillUnmount() {
	    this._portalContainerNode = null;
	  };
	
	  Portal.prototype.render = function render() {
	    return this.props.children && this._portalContainerNode ? _reactDom2.default.createPortal(this.props.children, this._portalContainerNode) : null;
	  };
	
	  return Portal;
	}(_react2.default.Component);
	
	Portal.displayName = 'Portal';
	Portal.propTypes = {
	  /**
	   * A Node, Component instance, or function that returns either. The `container` will have the Portal children
	   * appended to it.
	   */
	  container: _propTypes2.default.oneOfType([_componentOrElement2.default, _propTypes2.default.func]),
	
	  onRendered: _propTypes2.default.func
	};
	exports.default = _reactDom2.default.createPortal ? Portal : _LegacyPortal2.default;
	module.exports = exports['default'];

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var propTypes = {
	  children: _propTypes2.default.node
	};
	
	/**
	 * Internal helper component to allow attaching a non-conflicting ref to a
	 * child element that may not accept refs.
	 */
	
	var RefHolder = function (_React$Component) {
	  _inherits(RefHolder, _React$Component);
	
	  function RefHolder() {
	    _classCallCheck(this, RefHolder);
	
	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }
	
	  RefHolder.prototype.render = function render() {
	    return this.props.children;
	  };
	
	  return RefHolder;
	}(_react2.default.Component);
	
	RefHolder.propTypes = propTypes;
	
	exports.default = RefHolder;
	module.exports = exports['default'];

/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	exports.default = function (node, event, handler, capture) {
	  (0, _on2.default)(node, event, handler, capture);
	
	  return {
	    remove: function remove() {
	      (0, _off2.default)(node, event, handler, capture);
	    }
	  };
	};
	
	var _on = __webpack_require__(133);
	
	var _on2 = _interopRequireDefault(_on);
	
	var _off = __webpack_require__(132);
	
	var _off2 = _interopRequireDefault(_off);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = exports['default'];

/***/ }),

/***/ 157:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = addFocusListener;
	/**
	 * Firefox doesn't have a focusin event so using capture is easiest way to get bubbling
	 * IE8 can't do addEventListener, but does have onfocusin, so we use that in ie8
	 *
	 * We only allow one Listener at a time to avoid stack overflows
	 */
	function addFocusListener(handler) {
	  var useFocusin = !document.addEventListener;
	  var remove = void 0;
	
	  if (useFocusin) {
	    document.attachEvent('onfocusin', handler);
	    remove = function remove() {
	      return document.detachEvent('onfocusin', handler);
	    };
	  } else {
	    document.addEventListener('focus', handler, true);
	    remove = function remove() {
	      return document.removeEventListener('focus', handler, true);
	    };
	  }
	
	  return { remove: remove };
	}
	module.exports = exports['default'];

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = getContainer;
	
	var _reactDom = __webpack_require__(14);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getContainer(container, defaultContainer) {
	  container = typeof container === 'function' ? container() : container;
	  return _reactDom2.default.findDOMNode(container) || defaultContainer;
	}
	module.exports = exports['default'];

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = isOverflowing;
	
	var _isWindow = __webpack_require__(176);
	
	var _isWindow2 = _interopRequireDefault(_isWindow);
	
	var _ownerDocument = __webpack_require__(49);
	
	var _ownerDocument2 = _interopRequireDefault(_ownerDocument);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function isBody(node) {
	  return node && node.tagName.toLowerCase() === 'body';
	}
	
	function bodyIsOverflowing(node) {
	  var doc = (0, _ownerDocument2.default)(node);
	  var win = (0, _isWindow2.default)(doc);
	  var fullWidth = win.innerWidth;
	
	  // Support: ie8, no innerWidth
	  if (!fullWidth) {
	    var documentElementRect = doc.documentElement.getBoundingClientRect();
	    fullWidth = documentElementRect.right - Math.abs(documentElementRect.left);
	  }
	
	  return doc.body.clientWidth < fullWidth;
	}
	
	function isOverflowing(container) {
	  var win = (0, _isWindow2.default)(container);
	
	  return win || isBody(container) ? bodyIsOverflowing(container) : container.scrollHeight > container.clientHeight;
	}
	module.exports = exports['default'];

/***/ }),

/***/ 158:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.ariaHidden = ariaHidden;
	exports.hideSiblings = hideSiblings;
	exports.showSiblings = showSiblings;
	
	var BLACKLIST = ['template', 'script', 'style'];
	
	var isHidable = function isHidable(_ref) {
	  var nodeType = _ref.nodeType,
	      tagName = _ref.tagName;
	  return nodeType === 1 && BLACKLIST.indexOf(tagName.toLowerCase()) === -1;
	};
	
	var siblings = function siblings(container, mount, cb) {
	  mount = [].concat(mount);
	
	  [].forEach.call(container.children, function (node) {
	    if (mount.indexOf(node) === -1 && isHidable(node)) {
	      cb(node);
	    }
	  });
	};
	
	function ariaHidden(show, node) {
	  if (!node) {
	    return;
	  }
	  if (show) {
	    node.setAttribute('aria-hidden', 'true');
	  } else {
	    node.removeAttribute('aria-hidden');
	  }
	}
	
	function hideSiblings(container, mountNode) {
	  siblings(container, mountNode, function (node) {
	    return ariaHidden(true, node);
	  });
	}
	
	function showSiblings(container, mountNode) {
	  siblings(container, mountNode, function (node) {
	    return ariaHidden(false, node);
	  });
	}

/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	exports.default = function (componentOrElement) {
	  return (0, _ownerDocument2.default)(_reactDom2.default.findDOMNode(componentOrElement));
	};
	
	var _reactDom = __webpack_require__(14);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _ownerDocument = __webpack_require__(49);
	
	var _ownerDocument2 = _interopRequireDefault(_ownerDocument);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = exports['default'];

/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.EXITING = exports.ENTERED = exports.ENTERING = exports.EXITED = exports.UNMOUNTED = undefined;
	
	var _propTypes = __webpack_require__(4);
	
	var PropTypes = _interopRequireWildcard(_propTypes);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(14);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _reactLifecyclesCompat = __webpack_require__(150);
	
	var _PropTypes = __webpack_require__(160);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var UNMOUNTED = exports.UNMOUNTED = 'unmounted';
	var EXITED = exports.EXITED = 'exited';
	var ENTERING = exports.ENTERING = 'entering';
	var ENTERED = exports.ENTERED = 'entered';
	var EXITING = exports.EXITING = 'exiting';
	
	/**
	 * The Transition component lets you describe a transition from one component
	 * state to another _over time_ with a simple declarative API. Most commonly
	 * it's used to animate the mounting and unmounting of a component, but can also
	 * be used to describe in-place transition states as well.
	 *
	 * By default the `Transition` component does not alter the behavior of the
	 * component it renders, it only tracks "enter" and "exit" states for the components.
	 * It's up to you to give meaning and effect to those states. For example we can
	 * add styles to a component when it enters or exits:
	 *
	 * ```jsx
	 * import Transition from 'react-transition-group/Transition';
	 *
	 * const duration = 300;
	 *
	 * const defaultStyle = {
	 *   transition: `opacity ${duration}ms ease-in-out`,
	 *   opacity: 0,
	 * }
	 *
	 * const transitionStyles = {
	 *   entering: { opacity: 0 },
	 *   entered:  { opacity: 1 },
	 * };
	 *
	 * const Fade = ({ in: inProp }) => (
	 *   <Transition in={inProp} timeout={duration}>
	 *     {(state) => (
	 *       <div style={{
	 *         ...defaultStyle,
	 *         ...transitionStyles[state]
	 *       }}>
	 *         I'm a fade Transition!
	 *       </div>
	 *     )}
	 *   </Transition>
	 * );
	 * ```
	 *
	 * As noted the `Transition` component doesn't _do_ anything by itself to its child component.
	 * What it does do is track transition states over time so you can update the
	 * component (such as by adding styles or classes) when it changes states.
	 *
	 * There are 4 main states a Transition can be in:
	 *  - `'entering'`
	 *  - `'entered'`
	 *  - `'exiting'`
	 *  - `'exited'`
	 *
	 * Transition state is toggled via the `in` prop. When `true` the component begins the
	 * "Enter" stage. During this stage, the component will shift from its current transition state,
	 * to `'entering'` for the duration of the transition and then to the `'entered'` stage once
	 * it's complete. Let's take the following example:
	 *
	 * ```jsx
	 * state = { in: false };
	 *
	 * toggleEnterState = () => {
	 *   this.setState({ in: true });
	 * }
	 *
	 * render() {
	 *   return (
	 *     <div>
	 *       <Transition in={this.state.in} timeout={500} />
	 *       <button onClick={this.toggleEnterState}>Click to Enter</button>
	 *     </div>
	 *   );
	 * }
	 * ```
	 *
	 * When the button is clicked the component will shift to the `'entering'` state and
	 * stay there for 500ms (the value of `timeout`) before it finally switches to `'entered'`.
	 *
	 * When `in` is `false` the same thing happens except the state moves from `'exiting'` to `'exited'`.
	 *
	 * ## Timing
	 *
	 * Timing is often the trickiest part of animation, mistakes can result in slight delays
	 * that are hard to pin down. A common example is when you want to add an exit transition,
	 * you should set the desired final styles when the state is `'exiting'`. That's when the
	 * transition to those styles will start and, if you matched the `timeout` prop with the
	 * CSS Transition duration, it will end exactly when the state changes to `'exited'`.
	 *
	 * > **Note**: For simpler transitions the `Transition` component might be enough, but
	 * > take into account that it's platform-agnostic, while the `CSSTransition` component
	 * > [forces reflows](https://github.com/reactjs/react-transition-group/blob/5007303e729a74be66a21c3e2205e4916821524b/src/CSSTransition.js#L208-L215)
	 * > in order to make more complex transitions more predictable. For example, even though
	 * > classes `example-enter` and `example-enter-active` are applied immediately one after
	 * > another, you can still transition from one to the other because of the forced reflow
	 * > (read [this issue](https://github.com/reactjs/react-transition-group/issues/159#issuecomment-322761171)
	 * > for more info). Take this into account when choosing between `Transition` and
	 * > `CSSTransition`.
	 *
	 * ## Example
	 *
	 * <iframe src="https://codesandbox.io/embed/741op4mmj0?fontsize=14" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
	 *
	 */
	
	var Transition = function (_React$Component) {
	  _inherits(Transition, _React$Component);
	
	  function Transition(props, context) {
	    _classCallCheck(this, Transition);
	
	    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));
	
	    var parentGroup = context.transitionGroup;
	    // In the context of a TransitionGroup all enters are really appears
	    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
	
	    var initialStatus = void 0;
	
	    _this.appearStatus = null;
	
	    if (props.in) {
	      if (appear) {
	        initialStatus = EXITED;
	        _this.appearStatus = ENTERING;
	      } else {
	        initialStatus = ENTERED;
	      }
	    } else {
	      if (props.unmountOnExit || props.mountOnEnter) {
	        initialStatus = UNMOUNTED;
	      } else {
	        initialStatus = EXITED;
	      }
	    }
	
	    _this.state = { status: initialStatus };
	
	    _this.nextCallback = null;
	    return _this;
	  }
	
	  Transition.prototype.getChildContext = function getChildContext() {
	    return { transitionGroup: null // allows for nested Transitions
	    };
	  };
	
	  Transition.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
	    var nextIn = _ref.in;
	
	    if (nextIn && prevState.status === UNMOUNTED) {
	      return { status: EXITED };
	    }
	    return null;
	  };
	
	  // getSnapshotBeforeUpdate(prevProps) {
	  //   let nextStatus = null
	
	  //   if (prevProps !== this.props) {
	  //     const { status } = this.state
	
	  //     if (this.props.in) {
	  //       if (status !== ENTERING && status !== ENTERED) {
	  //         nextStatus = ENTERING
	  //       }
	  //     } else {
	  //       if (status === ENTERING || status === ENTERED) {
	  //         nextStatus = EXITING
	  //       }
	  //     }
	  //   }
	
	  //   return { nextStatus }
	  // }
	
	  Transition.prototype.componentDidMount = function componentDidMount() {
	    this.updateStatus(true, this.appearStatus);
	  };
	
	  Transition.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
	    var nextStatus = null;
	    if (prevProps !== this.props) {
	      var status = this.state.status;
	
	
	      if (this.props.in) {
	        if (status !== ENTERING && status !== ENTERED) {
	          nextStatus = ENTERING;
	        }
	      } else {
	        if (status === ENTERING || status === ENTERED) {
	          nextStatus = EXITING;
	        }
	      }
	    }
	    this.updateStatus(false, nextStatus);
	  };
	
	  Transition.prototype.componentWillUnmount = function componentWillUnmount() {
	    this.cancelNextCallback();
	  };
	
	  Transition.prototype.getTimeouts = function getTimeouts() {
	    var timeout = this.props.timeout;
	
	    var exit = void 0,
	        enter = void 0,
	        appear = void 0;
	
	    exit = enter = appear = timeout;
	
	    if (timeout != null && typeof timeout !== 'number') {
	      exit = timeout.exit;
	      enter = timeout.enter;
	      appear = timeout.appear;
	    }
	    return { exit: exit, enter: enter, appear: appear };
	  };
	
	  Transition.prototype.updateStatus = function updateStatus() {
	    var mounting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	    var nextStatus = arguments[1];
	
	    if (nextStatus !== null) {
	      // nextStatus will always be ENTERING or EXITING.
	      this.cancelNextCallback();
	      var node = _reactDom2.default.findDOMNode(this);
	
	      if (nextStatus === ENTERING) {
	        this.performEnter(node, mounting);
	      } else {
	        this.performExit(node);
	      }
	    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
	      this.setState({ status: UNMOUNTED });
	    }
	  };
	
	  Transition.prototype.performEnter = function performEnter(node, mounting) {
	    var _this2 = this;
	
	    var enter = this.props.enter;
	
	    var appearing = this.context.transitionGroup ? this.context.transitionGroup.isMounting : mounting;
	
	    var timeouts = this.getTimeouts();
	
	    // no enter animation skip right to ENTERED
	    // if we are mounting and running this it means appear _must_ be set
	    if (!mounting && !enter) {
	      this.safeSetState({ status: ENTERED }, function () {
	        _this2.props.onEntered(node);
	      });
	      return;
	    }
	
	    this.props.onEnter(node, appearing);
	
	    this.safeSetState({ status: ENTERING }, function () {
	      _this2.props.onEntering(node, appearing);
	
	      // FIXME: appear timeout?
	      _this2.onTransitionEnd(node, timeouts.enter, function () {
	        _this2.safeSetState({ status: ENTERED }, function () {
	          _this2.props.onEntered(node, appearing);
	        });
	      });
	    });
	  };
	
	  Transition.prototype.performExit = function performExit(node) {
	    var _this3 = this;
	
	    var exit = this.props.exit;
	
	    var timeouts = this.getTimeouts();
	
	    // no exit animation skip right to EXITED
	    if (!exit) {
	      this.safeSetState({ status: EXITED }, function () {
	        _this3.props.onExited(node);
	      });
	      return;
	    }
	    this.props.onExit(node);
	
	    this.safeSetState({ status: EXITING }, function () {
	      _this3.props.onExiting(node);
	
	      _this3.onTransitionEnd(node, timeouts.exit, function () {
	        _this3.safeSetState({ status: EXITED }, function () {
	          _this3.props.onExited(node);
	        });
	      });
	    });
	  };
	
	  Transition.prototype.cancelNextCallback = function cancelNextCallback() {
	    if (this.nextCallback !== null) {
	      this.nextCallback.cancel();
	      this.nextCallback = null;
	    }
	  };
	
	  Transition.prototype.safeSetState = function safeSetState(nextState, callback) {
	    // This shouldn't be necessary, but there are weird race conditions with
	    // setState callbacks and unmounting in testing, so always make sure that
	    // we can cancel any pending setState callbacks after we unmount.
	    callback = this.setNextCallback(callback);
	    this.setState(nextState, callback);
	  };
	
	  Transition.prototype.setNextCallback = function setNextCallback(callback) {
	    var _this4 = this;
	
	    var active = true;
	
	    this.nextCallback = function (event) {
	      if (active) {
	        active = false;
	        _this4.nextCallback = null;
	
	        callback(event);
	      }
	    };
	
	    this.nextCallback.cancel = function () {
	      active = false;
	    };
	
	    return this.nextCallback;
	  };
	
	  Transition.prototype.onTransitionEnd = function onTransitionEnd(node, timeout, handler) {
	    this.setNextCallback(handler);
	
	    if (node) {
	      if (this.props.addEndListener) {
	        this.props.addEndListener(node, this.nextCallback);
	      }
	      if (timeout != null) {
	        setTimeout(this.nextCallback, timeout);
	      }
	    } else {
	      setTimeout(this.nextCallback, 0);
	    }
	  };
	
	  Transition.prototype.render = function render() {
	    var status = this.state.status;
	    if (status === UNMOUNTED) {
	      return null;
	    }
	
	    var _props = this.props,
	        children = _props.children,
	        childProps = _objectWithoutProperties(_props, ['children']);
	    // filter props for Transtition
	
	
	    delete childProps.in;
	    delete childProps.mountOnEnter;
	    delete childProps.unmountOnExit;
	    delete childProps.appear;
	    delete childProps.enter;
	    delete childProps.exit;
	    delete childProps.timeout;
	    delete childProps.addEndListener;
	    delete childProps.onEnter;
	    delete childProps.onEntering;
	    delete childProps.onEntered;
	    delete childProps.onExit;
	    delete childProps.onExiting;
	    delete childProps.onExited;
	
	    if (typeof children === 'function') {
	      return children(status, childProps);
	    }
	
	    var child = _react2.default.Children.only(children);
	    return _react2.default.cloneElement(child, childProps);
	  };
	
	  return Transition;
	}(_react2.default.Component);
	
	Transition.contextTypes = {
	  transitionGroup: PropTypes.object
	};
	Transition.childContextTypes = {
	  transitionGroup: function transitionGroup() {}
	};
	
	
	Transition.propTypes =  false ? {
	  /**
	   * A `function` child can be used instead of a React element.
	   * This function is called with the current transition status
	   * ('entering', 'entered', 'exiting', 'exited', 'unmounted'), which can be used
	   * to apply context specific props to a component.
	   *
	   * ```jsx
	   * <Transition timeout={150}>
	   *   {(status) => (
	   *     <MyComponent className={`fade fade-${status}`} />
	   *   )}
	   * </Transition>
	   * ```
	   */
	  children: PropTypes.oneOfType([PropTypes.func.isRequired, PropTypes.element.isRequired]).isRequired,
	
	  /**
	   * Show the component; triggers the enter or exit states
	   */
	  in: PropTypes.bool,
	
	  /**
	   * By default the child component is mounted immediately along with
	   * the parent `Transition` component. If you want to "lazy mount" the component on the
	   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
	   * mounted, even on "exited", unless you also specify `unmountOnExit`.
	   */
	  mountOnEnter: PropTypes.bool,
	
	  /**
	   * By default the child component stays mounted after it reaches the `'exited'` state.
	   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
	   */
	  unmountOnExit: PropTypes.bool,
	
	  /**
	   * Normally a component is not transitioned if it is shown when the `<Transition>` component mounts.
	   * If you want to transition on the first mount set `appear` to `true`, and the
	   * component will transition in as soon as the `<Transition>` mounts.
	   *
	   * > Note: there are no specific "appear" states. `appear` only adds an additional `enter` transition.
	   */
	  appear: PropTypes.bool,
	
	  /**
	   * Enable or disable enter transitions.
	   */
	  enter: PropTypes.bool,
	
	  /**
	   * Enable or disable exit transitions.
	   */
	  exit: PropTypes.bool,
	
	  /**
	   * The duration of the transition, in milliseconds.
	   * Required unless `addEndListener` is provided
	   *
	   * You may specify a single timeout for all transitions like: `timeout={500}`,
	   * or individually like:
	   *
	   * ```jsx
	   * timeout={{
	   *  enter: 300,
	   *  exit: 500,
	   * }}
	   * ```
	   *
	   * @type {number | { enter?: number, exit?: number }}
	   */
	  timeout: function timeout(props) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }
	
	    var pt = _PropTypes.timeoutsShape;
	    if (!props.addEndListener) pt = pt.isRequired;
	    return pt.apply(undefined, [props].concat(args));
	  },
	
	  /**
	   * Add a custom transition end trigger. Called with the transitioning
	   * DOM node and a `done` callback. Allows for more fine grained transition end
	   * logic. **Note:** Timeouts are still used as a fallback if provided.
	   *
	   * ```jsx
	   * addEndListener={(node, done) => {
	   *   // use the css transitionend event to mark the finish of a transition
	   *   node.addEventListener('transitionend', done, false);
	   * }}
	   * ```
	   */
	  addEndListener: PropTypes.func,
	
	  /**
	   * Callback fired before the "entering" status is applied. An extra parameter
	   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
	   *
	   * @type Function(node: HtmlElement, isAppearing: bool) -> void
	   */
	  onEnter: PropTypes.func,
	
	  /**
	   * Callback fired after the "entering" status is applied. An extra parameter
	   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
	   *
	   * @type Function(node: HtmlElement, isAppearing: bool)
	   */
	  onEntering: PropTypes.func,
	
	  /**
	   * Callback fired after the "entered" status is applied. An extra parameter
	   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
	   *
	   * @type Function(node: HtmlElement, isAppearing: bool) -> void
	   */
	  onEntered: PropTypes.func,
	
	  /**
	   * Callback fired before the "exiting" status is applied.
	   *
	   * @type Function(node: HtmlElement) -> void
	   */
	  onExit: PropTypes.func,
	
	  /**
	   * Callback fired after the "exiting" status is applied.
	   *
	   * @type Function(node: HtmlElement) -> void
	   */
	  onExiting: PropTypes.func,
	
	  /**
	   * Callback fired after the "exited" status is applied.
	   *
	   * @type Function(node: HtmlElement) -> void
	   */
	  onExited: PropTypes.func
	
	  // Name the function so it is clearer in the documentation
	} : {};function noop() {}
	
	Transition.defaultProps = {
	  in: false,
	  mountOnEnter: false,
	  unmountOnExit: false,
	  appear: false,
	  enter: true,
	  exit: true,
	
	  onEnter: noop,
	  onEntering: noop,
	  onEntered: noop,
	
	  onExit: noop,
	  onExiting: noop,
	  onExited: noop
	};
	
	Transition.UNMOUNTED = 0;
	Transition.EXITED = 1;
	Transition.ENTERING = 2;
	Transition.ENTERED = 3;
	Transition.EXITING = 4;
	
	exports.default = (0, _reactLifecyclesCompat.polyfill)(Transition);

/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.classNamesShape = exports.timeoutsShape = undefined;
	exports.transitionTimeout = transitionTimeout;
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function transitionTimeout(transitionType) {
	  var timeoutPropName = 'transition' + transitionType + 'Timeout';
	  var enabledPropName = 'transition' + transitionType;
	
	  return function (props) {
	    // If the transition is enabled
	    if (props[enabledPropName]) {
	      // If no timeout duration is provided
	      if (props[timeoutPropName] == null) {
	        return new Error(timeoutPropName + ' wasn\'t supplied to CSSTransitionGroup: ' + 'this can cause unreliable animations and won\'t be supported in ' + 'a future version of React. See ' + 'https://fb.me/react-animation-transition-group-timeout for more ' + 'information.');
	
	        // If the duration isn't a number
	      } else if (typeof props[timeoutPropName] !== 'number') {
	        return new Error(timeoutPropName + ' must be a number (in milliseconds)');
	      }
	    }
	
	    return null;
	  };
	}
	
	var timeoutsShape = exports.timeoutsShape = _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.shape({
	  enter: _propTypes2.default.number,
	  exit: _propTypes2.default.number
	}).isRequired]);
	
	var classNamesShape = exports.classNamesShape = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
	  enter: _propTypes2.default.string,
	  exit: _propTypes2.default.string,
	  active: _propTypes2.default.string
	}), _propTypes2.default.shape({
	  enter: _propTypes2.default.string,
	  enterDone: _propTypes2.default.string,
	  enterActive: _propTypes2.default.string,
	  exit: _propTypes2.default.string,
	  exitDone: _propTypes2.default.string,
	  exitActive: _propTypes2.default.string
	})]);

/***/ }),

/***/ 64:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var ADD_ARRAY_VALUE = exports.ADD_ARRAY_VALUE = 'redux-form/ADD_ARRAY_VALUE';
	var AUTOFILL = exports.AUTOFILL = 'redux-form/AUTOFILL';
	var BLUR = exports.BLUR = 'redux-form/BLUR';
	var CHANGE = exports.CHANGE = 'redux-form/CHANGE';
	var DESTROY = exports.DESTROY = 'redux-form/DESTROY';
	var FOCUS = exports.FOCUS = 'redux-form/FOCUS';
	var INITIALIZE = exports.INITIALIZE = 'redux-form/INITIALIZE';
	var REMOVE_ARRAY_VALUE = exports.REMOVE_ARRAY_VALUE = 'redux-form/REMOVE_ARRAY_VALUE';
	var RESET = exports.RESET = 'redux-form/RESET';
	var START_ASYNC_VALIDATION = exports.START_ASYNC_VALIDATION = 'redux-form/START_ASYNC_VALIDATION';
	var START_SUBMIT = exports.START_SUBMIT = 'redux-form/START_SUBMIT';
	var STOP_ASYNC_VALIDATION = exports.STOP_ASYNC_VALIDATION = 'redux-form/STOP_ASYNC_VALIDATION';
	var STOP_SUBMIT = exports.STOP_SUBMIT = 'redux-form/STOP_SUBMIT';
	var SUBMIT_FAILED = exports.SUBMIT_FAILED = 'redux-form/SUBMIT_FAILED';
	var SWAP_ARRAY_VALUES = exports.SWAP_ARRAY_VALUES = 'redux-form/SWAP_ARRAY_VALUES';
	var TOUCH = exports.TOUCH = 'redux-form/TOUCH';
	var UNTOUCH = exports.UNTOUCH = 'redux-form/UNTOUCH';

/***/ }),

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.untouch = exports.touch = exports.swapArrayValues = exports.submitFailed = exports.stopSubmit = exports.stopAsyncValidation = exports.startSubmit = exports.startAsyncValidation = exports.reset = exports.removeArrayValue = exports.initialize = exports.focus = exports.destroy = exports.change = exports.blur = exports.autofill = exports.addArrayValue = undefined;
	
	var _actionTypes = __webpack_require__(64);
	
	var addArrayValue = exports.addArrayValue = function addArrayValue(path, value, index, fields) {
	  return { type: _actionTypes.ADD_ARRAY_VALUE, path: path, value: value, index: index, fields: fields };
	};
	
	var autofill = exports.autofill = function autofill(field, value) {
	  return { type: _actionTypes.AUTOFILL, field: field, value: value };
	};
	
	var blur = exports.blur = function blur(field, value) {
	  return { type: _actionTypes.BLUR, field: field, value: value };
	};
	
	var change = exports.change = function change(field, value) {
	  return { type: _actionTypes.CHANGE, field: field, value: value };
	};
	
	var destroy = exports.destroy = function destroy() {
	  return { type: _actionTypes.DESTROY };
	};
	
	var focus = exports.focus = function focus(field) {
	  return { type: _actionTypes.FOCUS, field: field };
	};
	
	var initialize = exports.initialize = function initialize(data, fields) {
	  var overwriteValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	
	  if (!Array.isArray(fields)) {
	    throw new Error('must provide fields array to initialize() action creator');
	  }
	  return { type: _actionTypes.INITIALIZE, data: data, fields: fields, overwriteValues: overwriteValues };
	};
	
	var removeArrayValue = exports.removeArrayValue = function removeArrayValue(path, index) {
	  return { type: _actionTypes.REMOVE_ARRAY_VALUE, path: path, index: index };
	};
	
	var reset = exports.reset = function reset() {
	  return { type: _actionTypes.RESET };
	};
	
	var startAsyncValidation = exports.startAsyncValidation = function startAsyncValidation(field) {
	  return { type: _actionTypes.START_ASYNC_VALIDATION, field: field };
	};
	
	var startSubmit = exports.startSubmit = function startSubmit() {
	  return { type: _actionTypes.START_SUBMIT };
	};
	
	var stopAsyncValidation = exports.stopAsyncValidation = function stopAsyncValidation(errors) {
	  return { type: _actionTypes.STOP_ASYNC_VALIDATION, errors: errors };
	};
	
	var stopSubmit = exports.stopSubmit = function stopSubmit(errors) {
	  return { type: _actionTypes.STOP_SUBMIT, errors: errors };
	};
	
	var submitFailed = exports.submitFailed = function submitFailed() {
	  return { type: _actionTypes.SUBMIT_FAILED };
	};
	
	var swapArrayValues = exports.swapArrayValues = function swapArrayValues(path, indexA, indexB) {
	  return { type: _actionTypes.SWAP_ARRAY_VALUES, path: path, indexA: indexA, indexB: indexB };
	};
	
	var touch = exports.touch = function touch() {
	  for (var _len = arguments.length, fields = Array(_len), _key = 0; _key < _len; _key++) {
	    fields[_key] = arguments[_key];
	  }
	
	  return { type: _actionTypes.TOUCH, fields: fields };
	};
	
	var untouch = exports.untouch = function untouch() {
	  for (var _len2 = arguments.length, fields = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    fields[_key2] = arguments[_key2];
	  }
	
	  return { type: _actionTypes.UNTOUCH, fields: fields };
	};

/***/ }),

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _isPromise = __webpack_require__(58);
	
	var _isPromise2 = _interopRequireDefault(_isPromise);
	
	var _isValid = __webpack_require__(44);
	
	var _isValid2 = _interopRequireDefault(_isValid);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var asyncValidation = function asyncValidation(fn, start, stop, field) {
	  start(field);
	  var promise = fn();
	  if (!(0, _isPromise2.default)(promise)) {
	    throw new Error('asyncValidate function passed to reduxForm must return a promise');
	  }
	  var handleErrors = function handleErrors(rejected) {
	    return function (errors) {
	      if (!(0, _isValid2.default)(errors)) {
	        stop(errors);
	        return Promise.reject();
	      } else if (rejected) {
	        stop();
	        throw new Error('Asynchronous validation promise was rejected without errors.');
	      }
	      stop();
	      return Promise.resolve();
	    };
	  };
	  return promise.then(handleErrors(false), handleErrors(true));
	};
	
	exports.default = asyncValidation;

/***/ }),

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = bindActionData;
	
	var _mapValues = __webpack_require__(65);
	
	var _mapValues2 = _interopRequireDefault(_mapValues);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Adds additional properties to the results of the function or map of functions passed
	 */
	function bindActionData(action, data) {
	  if (typeof action === 'function') {
	    return function () {
	      return _extends({}, action.apply(undefined, arguments), data);
	    };
	  }
	  if (typeof action === 'object') {
	    return (0, _mapValues2.default)(action, function (value) {
	      return bindActionData(value, data);
	    });
	  }
	  return action;
	}

/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = createAll;
	
	var _reducer = __webpack_require__(66);
	
	var _reducer2 = _interopRequireDefault(_reducer);
	
	var _createReduxForm = __webpack_require__(244);
	
	var _createReduxForm2 = _interopRequireDefault(_createReduxForm);
	
	var _mapValues = __webpack_require__(65);
	
	var _mapValues2 = _interopRequireDefault(_mapValues);
	
	var _bindActionData = __webpack_require__(105);
	
	var _bindActionData2 = _interopRequireDefault(_bindActionData);
	
	var _actions = __webpack_require__(104);
	
	var actions = _interopRequireWildcard(_actions);
	
	var _actionTypes = __webpack_require__(64);
	
	var actionTypes = _interopRequireWildcard(_actionTypes);
	
	var _createPropTypes = __webpack_require__(243);
	
	var _createPropTypes2 = _interopRequireDefault(_createPropTypes);
	
	var _getValuesFromState = __webpack_require__(113);
	
	var _getValuesFromState2 = _interopRequireDefault(_getValuesFromState);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// bind form as first parameter of action creators
	var boundActions = _extends({}, (0, _mapValues2.default)(_extends({}, actions, {
	  autofillWithKey: function autofillWithKey(key) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }
	
	    return (0, _bindActionData2.default)(actions.autofill, { key: key }).apply(undefined, args);
	  },
	  changeWithKey: function changeWithKey(key) {
	    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      args[_key2 - 1] = arguments[_key2];
	    }
	
	    return (0, _bindActionData2.default)(actions.change, { key: key }).apply(undefined, args);
	  },
	  initializeWithKey: function initializeWithKey(key) {
	    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	      args[_key3 - 1] = arguments[_key3];
	    }
	
	    return (0, _bindActionData2.default)(actions.initialize, { key: key }).apply(undefined, args);
	  },
	  reset: function reset(key) {
	    return (0, _bindActionData2.default)(actions.reset, { key: key })();
	  },
	  touchWithKey: function touchWithKey(key) {
	    for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	      args[_key4 - 1] = arguments[_key4];
	    }
	
	    return (0, _bindActionData2.default)(actions.touch, { key: key }).apply(undefined, args);
	  },
	  untouchWithKey: function untouchWithKey(key) {
	    for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
	      args[_key5 - 1] = arguments[_key5];
	    }
	
	    return (0, _bindActionData2.default)(actions.untouch, { key: key }).apply(undefined, args);
	  },
	  destroy: function destroy(key) {
	    return (0, _bindActionData2.default)(actions.destroy, { key: key })();
	  }
	}), function (action) {
	  return function (form) {
	    for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
	      args[_key6 - 1] = arguments[_key6];
	    }
	
	    return (0, _bindActionData2.default)(action, { form: form }).apply(undefined, args);
	  };
	}));
	
	var addArrayValue = boundActions.addArrayValue;
	var autofill = boundActions.autofill;
	var autofillWithKey = boundActions.autofillWithKey;
	var blur = boundActions.blur;
	var change = boundActions.change;
	var changeWithKey = boundActions.changeWithKey;
	var destroy = boundActions.destroy;
	var focus = boundActions.focus;
	var initialize = boundActions.initialize;
	var initializeWithKey = boundActions.initializeWithKey;
	var removeArrayValue = boundActions.removeArrayValue;
	var reset = boundActions.reset;
	var startAsyncValidation = boundActions.startAsyncValidation;
	var startSubmit = boundActions.startSubmit;
	var stopAsyncValidation = boundActions.stopAsyncValidation;
	var stopSubmit = boundActions.stopSubmit;
	var submitFailed = boundActions.submitFailed;
	var swapArrayValues = boundActions.swapArrayValues;
	var touch = boundActions.touch;
	var touchWithKey = boundActions.touchWithKey;
	var untouch = boundActions.untouch;
	var untouchWithKey = boundActions.untouchWithKey;
	
	function createAll(isReactNative, React, connect) {
	  return {
	    actionTypes: actionTypes,
	    addArrayValue: addArrayValue,
	    autofill: autofill,
	    autofillWithKey: autofillWithKey,
	    blur: blur,
	    change: change,
	    changeWithKey: changeWithKey,
	    destroy: destroy,
	    focus: focus,
	    getValues: _getValuesFromState2.default,
	    initialize: initialize,
	    initializeWithKey: initializeWithKey,
	    propTypes: (0, _createPropTypes2.default)(),
	    reduxForm: (0, _createReduxForm2.default)(isReactNative, React, connect),
	    reducer: _reducer2.default,
	    removeArrayValue: removeArrayValue,
	    reset: reset,
	    startAsyncValidation: startAsyncValidation,
	    startSubmit: startSubmit,
	    stopAsyncValidation: stopAsyncValidation,
	    stopSubmit: stopSubmit,
	    submitFailed: submitFailed,
	    swapArrayValues: swapArrayValues,
	    touch: touch,
	    touchWithKey: touchWithKey,
	    untouch: untouch,
	    untouchWithKey: untouchWithKey
	  };
	}

/***/ }),

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _actions = __webpack_require__(104);
	
	var importedActions = _interopRequireWildcard(_actions);
	
	var _getDisplayName = __webpack_require__(111);
	
	var _getDisplayName2 = _interopRequireDefault(_getDisplayName);
	
	var _reducer = __webpack_require__(66);
	
	var _deepEqual = __webpack_require__(131);
	
	var _deepEqual2 = _interopRequireDefault(_deepEqual);
	
	var _bindActionData = __webpack_require__(105);
	
	var _bindActionData2 = _interopRequireDefault(_bindActionData);
	
	var _getValues = __webpack_require__(112);
	
	var _getValues2 = _interopRequireDefault(_getValues);
	
	var _isValid = __webpack_require__(44);
	
	var _isValid2 = _interopRequireDefault(_isValid);
	
	var _readFields = __webpack_require__(255);
	
	var _readFields2 = _interopRequireDefault(_readFields);
	
	var _handleSubmit2 = __webpack_require__(251);
	
	var _handleSubmit3 = _interopRequireDefault(_handleSubmit2);
	
	var _asyncValidation = __webpack_require__(240);
	
	var _asyncValidation2 = _interopRequireDefault(_asyncValidation);
	
	var _silenceEvents = __webpack_require__(250);
	
	var _silenceEvents2 = _interopRequireDefault(_silenceEvents);
	
	var _silenceEvent = __webpack_require__(110);
	
	var _silenceEvent2 = _interopRequireDefault(_silenceEvent);
	
	var _wrapMapDispatchToProps = __webpack_require__(261);
	
	var _wrapMapDispatchToProps2 = _interopRequireDefault(_wrapMapDispatchToProps);
	
	var _wrapMapStateToProps = __webpack_require__(262);
	
	var _wrapMapStateToProps2 = _interopRequireDefault(_wrapMapStateToProps);
	
	var _createInitialState = __webpack_require__(106);
	
	var _createInitialState2 = _interopRequireDefault(_createInitialState);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Creates a HOC that knows how to create redux-connected sub-components.
	 */
	var createHigherOrderComponent = function createHigherOrderComponent(config, isReactNative, React, connect, WrappedComponent, mapStateToProps, mapDispatchToProps, mergeProps, options) {
	  var Component = React.Component;
	
	  return function (reduxMountPoint, formName, formKey, getFormState) {
	    var _ref = options || {},
	        _ref$withRef = _ref.withRef,
	        withRef = _ref$withRef === undefined ? false : _ref$withRef;
	
	    var ReduxForm = function (_Component) {
	      _inherits(ReduxForm, _Component);
	
	      function ReduxForm(props) {
	        _classCallCheck(this, ReduxForm);
	
	        // bind functions
	        var _this = _possibleConstructorReturn(this, _Component.call(this, props));
	
	        _this.asyncValidate = _this.asyncValidate.bind(_this);
	        _this.handleSubmit = _this.handleSubmit.bind(_this);
	        var _this$props = _this.props,
	            initialValues = _this$props.initialValues,
	            submitPassback = _this$props.submitPassback;
	        // Check if form state was initialized, if not, initialize it.
	
	        var form = (0, _deepEqual2.default)(props.form, _reducer.initialState) ? (0, _createInitialState2.default)(initialValues, config.fields, {}, true, false) : props.form;
	        _this.fields = (0, _readFields2.default)(_extends({}, props, { form: form }), {}, {}, _this.asyncValidate, isReactNative);
	        submitPassback(function () {
	          return _this.handleSubmit();
	        }); // wrapped in function to disallow params
	        return _this;
	      }
	
	      ReduxForm.prototype.componentWillMount = function componentWillMount() {
	        var _props = this.props,
	            fields = _props.fields,
	            form = _props.form,
	            initialize = _props.initialize,
	            initialValues = _props.initialValues;
	
	        if (initialValues && !form._initialized) {
	          initialize(initialValues, fields);
	        }
	      };
	
	      ReduxForm.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        if (!(0, _deepEqual2.default)(this.props.fields, nextProps.fields) || !(0, _deepEqual2.default)(this.props.form, nextProps.form, { strict: true })) {
	          this.fields = (0, _readFields2.default)(nextProps, this.props, this.fields, this.asyncValidate, isReactNative);
	        }
	        if (!(0, _deepEqual2.default)(this.props.initialValues, nextProps.initialValues)) {
	          this.props.initialize(nextProps.initialValues, nextProps.fields, this.props.overwriteOnInitialValuesChange || !this.props.form._initialized);
	        }
	      };
	
	      ReduxForm.prototype.componentWillUnmount = function componentWillUnmount() {
	        if (config.destroyOnUnmount) {
	          this.props.destroy();
	        }
	      };
	
	      ReduxForm.prototype.asyncValidate = function asyncValidate(name, value) {
	        var _this2 = this;
	
	        var _props2 = this.props,
	            alwaysAsyncValidate = _props2.alwaysAsyncValidate,
	            asyncValidate = _props2.asyncValidate,
	            dispatch = _props2.dispatch,
	            fields = _props2.fields,
	            form = _props2.form,
	            startAsyncValidation = _props2.startAsyncValidation,
	            stopAsyncValidation = _props2.stopAsyncValidation,
	            validate = _props2.validate;
	
	        var isSubmitting = !name;
	        if (asyncValidate) {
	          var values = (0, _getValues2.default)(fields, form);
	          if (name) {
	            values[name] = value;
	          }
	          var syncErrors = validate(values, this.props);
	          var allPristine = this.fields._meta.allPristine;
	
	          var initialized = form._initialized;
	
	          // if blur validating, only run async validate if sync validation passes
	          // and submitting (not blur validation) or form is dirty or form was never initialized
	          // unless alwaysAsyncValidate is true
	          var syncValidationPasses = isSubmitting || (0, _isValid2.default)(syncErrors[name]);
	          if (alwaysAsyncValidate || syncValidationPasses && (isSubmitting || !allPristine || !initialized)) {
	            return (0, _asyncValidation2.default)(function () {
	              return asyncValidate(values, dispatch, _this2.props);
	            }, startAsyncValidation, stopAsyncValidation, name);
	          }
	        }
	      };
	
	      ReduxForm.prototype.handleSubmit = function handleSubmit(submitOrEvent) {
	        var _this3 = this;
	
	        var _props3 = this.props,
	            onSubmit = _props3.onSubmit,
	            fields = _props3.fields,
	            form = _props3.form;
	
	        var check = function check(submit) {
	          if (!submit || typeof submit !== 'function') {
	            throw new Error('You must either pass handleSubmit() an onSubmit function or pass onSubmit as a prop');
	          }
	          return submit;
	        };
	        return !submitOrEvent || (0, _silenceEvent2.default)(submitOrEvent) ?
	        // submitOrEvent is an event: fire submit
	        (0, _handleSubmit3.default)(check(onSubmit), (0, _getValues2.default)(fields, form), this.props, this.asyncValidate) :
	        // submitOrEvent is the submit function: return deferred submit thunk
	        (0, _silenceEvents2.default)(function () {
	          return (0, _handleSubmit3.default)(check(submitOrEvent), (0, _getValues2.default)(fields, form), _this3.props, _this3.asyncValidate);
	        });
	      };
	
	      ReduxForm.prototype.render = function render() {
	        var _this4 = this,
	            _ref2;
	
	        var allFields = this.fields;
	
	        var _props4 = this.props,
	            addArrayValue = _props4.addArrayValue,
	            asyncBlurFields = _props4.asyncBlurFields,
	            autofill = _props4.autofill,
	            blur = _props4.blur,
	            change = _props4.change,
	            destroy = _props4.destroy,
	            focus = _props4.focus,
	            fields = _props4.fields,
	            form = _props4.form,
	            initialValues = _props4.initialValues,
	            initialize = _props4.initialize,
	            onSubmit = _props4.onSubmit,
	            propNamespace = _props4.propNamespace,
	            reset = _props4.reset,
	            removeArrayValue = _props4.removeArrayValue,
	            returnRejectedSubmitPromise = _props4.returnRejectedSubmitPromise,
	            startAsyncValidation = _props4.startAsyncValidation,
	            startSubmit = _props4.startSubmit,
	            stopAsyncValidation = _props4.stopAsyncValidation,
	            stopSubmit = _props4.stopSubmit,
	            submitFailed = _props4.submitFailed,
	            swapArrayValues = _props4.swapArrayValues,
	            touch = _props4.touch,
	            untouch = _props4.untouch,
	            validate = _props4.validate,
	            passableProps = _objectWithoutProperties(_props4, ['addArrayValue', 'asyncBlurFields', 'autofill', 'blur', 'change', 'destroy', 'focus', 'fields', 'form', 'initialValues', 'initialize', 'onSubmit', 'propNamespace', 'reset', 'removeArrayValue', 'returnRejectedSubmitPromise', 'startAsyncValidation', 'startSubmit', 'stopAsyncValidation', 'stopSubmit', 'submitFailed', 'swapArrayValues', 'touch', 'untouch', 'validate']); // eslint-disable-line no-redeclare
	
	
	        var _allFields$_meta = allFields._meta,
	            allPristine = _allFields$_meta.allPristine,
	            allValid = _allFields$_meta.allValid,
	            errors = _allFields$_meta.errors,
	            formError = _allFields$_meta.formError,
	            values = _allFields$_meta.values;
	
	
	        var props = {
	          // State:
	          active: form._active,
	          asyncValidating: form._asyncValidating,
	          dirty: !allPristine,
	          error: formError,
	          errors: errors,
	          fields: allFields,
	          formKey: formKey,
	          invalid: !allValid,
	          pristine: allPristine,
	          submitting: form._submitting,
	          submitFailed: form._submitFailed,
	          valid: allValid,
	          values: values,
	
	          // Actions:
	          asyncValidate: (0, _silenceEvents2.default)(function () {
	            return _this4.asyncValidate();
	          }),
	          // ^ doesn't just pass this.asyncValidate to disallow values passing
	          destroyForm: (0, _silenceEvents2.default)(destroy),
	          handleSubmit: this.handleSubmit,
	          initializeForm: (0, _silenceEvents2.default)(function (initValues) {
	            return initialize(initValues, fields);
	          }),
	          resetForm: (0, _silenceEvents2.default)(reset),
	          touch: (0, _silenceEvents2.default)(function () {
	            return touch.apply(undefined, arguments);
	          }),
	          touchAll: (0, _silenceEvents2.default)(function () {
	            return touch.apply(undefined, fields);
	          }),
	          untouch: (0, _silenceEvents2.default)(function () {
	            return untouch.apply(undefined, arguments);
	          }),
	          untouchAll: (0, _silenceEvents2.default)(function () {
	            return untouch.apply(undefined, fields);
	          })
	        };
	        var passedProps = propNamespace ? (_ref2 = {}, _ref2[propNamespace] = props, _ref2) : props;
	        if (withRef) {
	          return React.createElement(WrappedComponent, _extends({}, _extends({}, passableProps, passedProps), { ref: 'wrappedInstance' }));
	        }
	        return React.createElement(WrappedComponent, _extends({}, passableProps, passedProps));
	      };
	
	      return ReduxForm;
	    }(Component);
	
	    ReduxForm.displayName = 'ReduxForm(' + (0, _getDisplayName2.default)(WrappedComponent) + ')';
	    ReduxForm.WrappedComponent = WrappedComponent;
	    ReduxForm.propTypes = {
	      // props:
	      alwaysAsyncValidate: _propTypes2.default.bool,
	      asyncBlurFields: _propTypes2.default.arrayOf(_propTypes2.default.string),
	      asyncValidate: _propTypes2.default.func,
	      dispatch: _propTypes2.default.func.isRequired,
	      fields: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
	      form: _propTypes2.default.object,
	      initialValues: _propTypes2.default.any,
	      onSubmit: _propTypes2.default.func,
	      onSubmitSuccess: _propTypes2.default.func,
	      onSubmitFail: _propTypes2.default.func,
	      overwriteOnInitialValuesChange: _propTypes2.default.bool.isRequired,
	      propNamespace: _propTypes2.default.string,
	      readonly: _propTypes2.default.bool,
	      returnRejectedSubmitPromise: _propTypes2.default.bool,
	      submitPassback: _propTypes2.default.func.isRequired,
	      validate: _propTypes2.default.func,
	
	      // actions:
	      addArrayValue: _propTypes2.default.func.isRequired,
	      autofill: _propTypes2.default.func.isRequired,
	      blur: _propTypes2.default.func.isRequired,
	      change: _propTypes2.default.func.isRequired,
	      destroy: _propTypes2.default.func.isRequired,
	      focus: _propTypes2.default.func.isRequired,
	      initialize: _propTypes2.default.func.isRequired,
	      removeArrayValue: _propTypes2.default.func.isRequired,
	      reset: _propTypes2.default.func.isRequired,
	      startAsyncValidation: _propTypes2.default.func.isRequired,
	      startSubmit: _propTypes2.default.func.isRequired,
	      stopAsyncValidation: _propTypes2.default.func.isRequired,
	      stopSubmit: _propTypes2.default.func.isRequired,
	      submitFailed: _propTypes2.default.func.isRequired,
	      swapArrayValues: _propTypes2.default.func.isRequired,
	      touch: _propTypes2.default.func.isRequired,
	      untouch: _propTypes2.default.func.isRequired
	    };
	    ReduxForm.defaultProps = {
	      asyncBlurFields: [],
	      form: _reducer.initialState,
	      readonly: false,
	      returnRejectedSubmitPromise: false,
	      validate: function validate() {
	        return {};
	      }
	    };
	
	    // bind touch flags to blur and change
	    var unboundActions = _extends({}, importedActions, {
	      blur: (0, _bindActionData2.default)(importedActions.blur, {
	        touch: !!config.touchOnBlur
	      }),
	      change: (0, _bindActionData2.default)(importedActions.change, {
	        touch: !!config.touchOnChange
	      })
	    });
	
	    // make redux connector with or without form key
	    var decorate = formKey !== undefined && formKey !== null ? connect((0, _wrapMapStateToProps2.default)(mapStateToProps, function (state) {
	      var formState = getFormState(state, reduxMountPoint);
	      if (!formState) {
	        throw new Error('You need to mount the redux-form reducer at "' + reduxMountPoint + '"');
	      }
	      return formState && formState[formName] && formState[formName][formKey];
	    }), (0, _wrapMapDispatchToProps2.default)(mapDispatchToProps, (0, _bindActionData2.default)(unboundActions, {
	      form: formName,
	      key: formKey
	    })), mergeProps, options) : connect((0, _wrapMapStateToProps2.default)(mapStateToProps, function (state) {
	      var formState = getFormState(state, reduxMountPoint);
	      if (!formState) {
	        throw new Error('You need to mount the redux-form reducer at "' + reduxMountPoint + '"');
	      }
	      return formState && formState[formName];
	    }), (0, _wrapMapDispatchToProps2.default)(mapDispatchToProps, (0, _bindActionData2.default)(unboundActions, { form: formName })), mergeProps, options);
	
	    return decorate(ReduxForm);
	  };
	};
	
	exports.default = createHigherOrderComponent;

/***/ }),

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _reducer = __webpack_require__(66);
	
	var _initializeState = __webpack_require__(114);
	
	var _initializeState2 = _interopRequireDefault(_initializeState);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createInitialState = function createInitialState(data, fields, state) {
	  var _extends2;
	
	  var overwriteValues = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
	  var markInitialized = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
	
	  return _extends({}, (0, _initializeState2.default)(data, fields, state, overwriteValues), (_extends2 = {
	    _asyncValidating: false,
	    _active: undefined
	  }, _extends2[_reducer.globalErrorKey] = undefined, _extends2._initialized = markInitialized, _extends2._submitting = false, _extends2._submitFailed = false, _extends2));
	};
	
	exports.default = createInitialState;

/***/ }),

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createPropTypes = function createPropTypes() {
	  return {
	    // State:
	    active: _propTypes2.default.string, // currently active field
	    asyncValidating: _propTypes2.default.bool.isRequired, // true if async validation is running
	    autofilled: _propTypes2.default.bool, // true if set programmatically by autofill
	    dirty: _propTypes2.default.bool.isRequired, // true if any values are different from initialValues
	    error: _propTypes2.default.any, // form-wide error from '_error' key in validation result
	    errors: _propTypes2.default.object, // a map of errors corresponding to structure of form data (result of validation)
	    fields: _propTypes2.default.object.isRequired, // the map of fields
	    formKey: _propTypes2.default.any, // the form key if one was provided (used when doing multirecord forms)
	    invalid: _propTypes2.default.bool.isRequired, // true if there are any validation errors
	    pristine: _propTypes2.default.bool.isRequired, // true if the values are the same as initialValues
	    submitting: _propTypes2.default.bool.isRequired, // true if the form is in the process of being submitted
	    submitFailed: _propTypes2.default.bool.isRequired, // true if the form was submitted and failed for any reason
	    valid: _propTypes2.default.bool.isRequired, // true if there are no validation errors
	    values: _propTypes2.default.object.isRequired, // the values of the form as they will be submitted
	
	    // Actions:
	    asyncValidate: _propTypes2.default.func.isRequired, // function to trigger async validation
	    destroyForm: _propTypes2.default.func.isRequired, // action to destroy the form's data in Redux
	    handleSubmit: _propTypes2.default.func.isRequired, // function to submit the form
	    initializeForm: _propTypes2.default.func.isRequired, // action to initialize form data
	    resetForm: _propTypes2.default.func.isRequired, // action to reset the form data to previously initialized values
	    touch: _propTypes2.default.func.isRequired, // action to mark fields as touched
	    touchAll: _propTypes2.default.func.isRequired, // action to mark ALL fields as touched
	    untouch: _propTypes2.default.func.isRequired, // action to mark fields as untouched
	    untouchAll: _propTypes2.default.func.isRequired // action to mark ALL fields as untouched
	  };
	};
	
	exports.default = createPropTypes;

/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createReduxFormConnector = __webpack_require__(245);
	
	var _createReduxFormConnector2 = _interopRequireDefault(_createReduxFormConnector);
	
	var _hoistNonReactStatics = __webpack_require__(222);
	
	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);
	
	var _invariant = __webpack_require__(23);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * The decorator that is the main API to redux-form
	 */
	var createReduxForm = function createReduxForm(isReactNative, React, connect) {
	  var Component = React.Component;
	
	  var reduxFormConnector = (0, _createReduxFormConnector2.default)(isReactNative, React, connect);
	  return function (config, mapStateToProps, mapDispatchToProps, mergeProps, options) {
	    return function (WrappedComponent) {
	      var ReduxFormConnector = reduxFormConnector(WrappedComponent, mapStateToProps, mapDispatchToProps, mergeProps, options);
	
	      var _ref = options || {},
	          _ref$withRef = _ref.withRef,
	          withRef = _ref$withRef === undefined ? false : _ref$withRef;
	
	      var configWithDefaults = _extends({
	        overwriteOnInitialValuesChange: true,
	        touchOnBlur: true,
	        touchOnChange: false,
	        destroyOnUnmount: true
	      }, config);
	
	      var ConnectedForm = function (_Component) {
	        _inherits(ConnectedForm, _Component);
	
	        function ConnectedForm(props) {
	          _classCallCheck(this, ConnectedForm);
	
	          var _this = _possibleConstructorReturn(this, _Component.call(this, props));
	
	          _this.handleSubmitPassback = _this.handleSubmitPassback.bind(_this);
	          return _this;
	        }
	
	        ConnectedForm.prototype.getWrappedInstance = function getWrappedInstance() {
	          (0, _invariant2.default)(withRef, 'To access the wrapped instance, you need to specify ' + '{ withRef: true } as the fourth argument of the connect() call.');
	          return this.refs.wrappedInstance.refs.wrappedInstance.getWrappedInstance().refs.wrappedInstance;
	        };
	
	        ConnectedForm.prototype.handleSubmitPassback = function handleSubmitPassback(submit) {
	          this.submit = submit;
	        };
	
	        ConnectedForm.prototype.render = function render() {
	          if (withRef) {
	            return React.createElement(ReduxFormConnector, _extends({}, configWithDefaults, this.props, {
	              ref: 'wrappedInstance',
	              submitPassback: this.handleSubmitPassback }));
	          }
	          return React.createElement(ReduxFormConnector, _extends({}, configWithDefaults, this.props, {
	            submitPassback: this.handleSubmitPassback }));
	        };
	
	        return ConnectedForm;
	      }(Component);
	
	      return (0, _hoistNonReactStatics2.default)(ConnectedForm, WrappedComponent);
	    };
	  };
	};
	
	exports.default = createReduxForm;

/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _noGetters = __webpack_require__(237);
	
	var _noGetters2 = _interopRequireDefault(_noGetters);
	
	var _getDisplayName = __webpack_require__(111);
	
	var _getDisplayName2 = _interopRequireDefault(_getDisplayName);
	
	var _createHigherOrderComponent = __webpack_require__(242);
	
	var _createHigherOrderComponent2 = _interopRequireDefault(_createHigherOrderComponent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * This component tracks props that affect how the form is mounted to the store. Normally these should not change,
	 * but if they do, the connected components below it need to be redefined.
	 */
	var createReduxFormConnector = function createReduxFormConnector(isReactNative, React, connect) {
	  return function (WrappedComponent, mapStateToProps, mapDispatchToProps, mergeProps, options) {
	    var Component = React.Component;
	
	    var _ref = options || {},
	        _ref$withRef = _ref.withRef,
	        withRef = _ref$withRef === undefined ? false : _ref$withRef;
	
	    var ReduxFormConnector = function (_Component) {
	      _inherits(ReduxFormConnector, _Component);
	
	      function ReduxFormConnector(props) {
	        _classCallCheck(this, ReduxFormConnector);
	
	        var _this = _possibleConstructorReturn(this, _Component.call(this, props));
	
	        _this.cache = new _noGetters2.default(_this, {
	          ReduxForm: {
	            params: [
	            // props that effect how redux-form connects to the redux store
	            'reduxMountPoint', 'form', 'formKey', 'getFormState'],
	            fn: (0, _createHigherOrderComponent2.default)(props, isReactNative, React, connect, WrappedComponent, mapStateToProps, mapDispatchToProps, mergeProps, options)
	          }
	        });
	        return _this;
	      }
	
	      ReduxFormConnector.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        this.cache.componentWillReceiveProps(nextProps);
	      };
	
	      ReduxFormConnector.prototype.render = function render() {
	        var ReduxForm = this.cache.get('ReduxForm');
	        // remove some redux-form config-only props
	
	        var _props = this.props,
	            reduxMountPoint = _props.reduxMountPoint,
	            destroyOnUnmount = _props.destroyOnUnmount,
	            form = _props.form,
	            getFormState = _props.getFormState,
	            touchOnBlur = _props.touchOnBlur,
	            touchOnChange = _props.touchOnChange,
	            passableProps = _objectWithoutProperties(_props, ['reduxMountPoint', 'destroyOnUnmount', 'form', 'getFormState', 'touchOnBlur', 'touchOnChange']); // eslint-disable-line no-redeclare
	
	
	        if (withRef) {
	          return React.createElement(ReduxForm, _extends({}, passableProps, { ref: 'wrappedInstance' }));
	        }
	        return React.createElement(ReduxForm, passableProps);
	      };
	
	      return ReduxFormConnector;
	    }(Component);
	
	    ReduxFormConnector.displayName = 'ReduxFormConnector(' + (0, _getDisplayName2.default)(WrappedComponent) + ')';
	    ReduxFormConnector.WrappedComponent = WrappedComponent;
	    ReduxFormConnector.propTypes = {
	      destroyOnUnmount: _propTypes2.default.bool,
	      reduxMountPoint: _propTypes2.default.string,
	      form: _propTypes2.default.string.isRequired,
	      formKey: _propTypes2.default.string,
	      getFormState: _propTypes2.default.func,
	      touchOnBlur: _propTypes2.default.bool,
	      touchOnChange: _propTypes2.default.bool
	    };
	    ReduxFormConnector.defaultProps = {
	      reduxMountPoint: 'form',
	      getFormState: function getFormState(state, reduxMountPoint) {
	        return state[reduxMountPoint];
	      }
	    };
	    return ReduxFormConnector;
	  };
	};
	
	exports.default = createReduxFormConnector;

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _getValue = __webpack_require__(108);
	
	var _getValue2 = _interopRequireDefault(_getValue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createOnBlur = function createOnBlur(name, blur, isReactNative, afterBlur) {
	  return function (event) {
	    var value = (0, _getValue2.default)(event, isReactNative);
	    blur(name, value);
	    if (afterBlur) {
	      afterBlur(name, value);
	    }
	  };
	};
	exports.default = createOnBlur;

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _getValue = __webpack_require__(108);
	
	var _getValue2 = _interopRequireDefault(_getValue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createOnChange = function createOnChange(name, change, isReactNative) {
	  return function (event) {
	    return change(name, (0, _getValue2.default)(event, isReactNative));
	  };
	};
	exports.default = createOnChange;

/***/ }),

/***/ 107:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var dataKey = exports.dataKey = 'value';
	var createOnDragStart = function createOnDragStart(name, getValue) {
	  return function (event) {
	    event.dataTransfer.setData(dataKey, getValue());
	  };
	};
	
	exports.default = createOnDragStart;

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _createOnDragStart = __webpack_require__(107);
	
	var createOnDrop = function createOnDrop(name, change) {
	  return function (event) {
	    change(name, event.dataTransfer.getData(_createOnDragStart.dataKey));
	  };
	};
	exports.default = createOnDrop;

/***/ }),

/***/ 249:
/***/ (function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	var createOnFocus = function createOnFocus(name, focus) {
	  return function () {
	    return focus(name);
	  };
	};
	exports.default = createOnFocus;

/***/ }),

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _isEvent = __webpack_require__(109);
	
	var _isEvent2 = _interopRequireDefault(_isEvent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var getSelectedValues = function getSelectedValues(options) {
	  var result = [];
	  if (options) {
	    for (var index = 0; index < options.length; index++) {
	      var option = options[index];
	      if (option.selected) {
	        result.push(option.value);
	      }
	    }
	  }
	  return result;
	};
	
	var getValue = function getValue(event, isReactNative) {
	  if ((0, _isEvent2.default)(event)) {
	    if (!isReactNative && event.nativeEvent && event.nativeEvent.text !== undefined) {
	      return event.nativeEvent.text;
	    }
	    if (isReactNative && event.nativeEvent !== undefined) {
	      return event.nativeEvent.text;
	    }
	    var _event$target = event.target,
	        type = _event$target.type,
	        value = _event$target.value,
	        checked = _event$target.checked,
	        files = _event$target.files,
	        dataTransfer = event.dataTransfer;
	
	    if (type === 'checkbox') {
	      return checked;
	    }
	    if (type === 'radio') {
	      return checked ? value : '';
	    }
	    if (type === 'file') {
	      return files || dataTransfer && dataTransfer.files;
	    }
	    if (type === 'select-multiple') {
	      return getSelectedValues(event.target.options);
	    }
	    if (value !== '' && (type === 'number' || type === 'range')) {
	      return parseFloat(value);
	    }
	    return value;
	  }
	  // not an event, so must be either our value or an object containing our value in the 'value' key
	  return event && typeof event === 'object' && event.value !== undefined ? event.value : // extract value from { value: value } structure. https://github.com/nikgraf/belle/issues/58
	  event;
	};
	
	exports.default = getValue;

/***/ }),

/***/ 109:
/***/ (function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	var isEvent = function isEvent(candidate) {
	  return !!(candidate && candidate.stopPropagation && candidate.preventDefault);
	};
	
	exports.default = isEvent;

/***/ }),

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _isEvent = __webpack_require__(109);
	
	var _isEvent2 = _interopRequireDefault(_isEvent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var silenceEvent = function silenceEvent(event) {
	  var is = (0, _isEvent2.default)(event);
	  if (is) {
	    event.preventDefault();
	  }
	  return is;
	};
	
	exports.default = silenceEvent;

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _silenceEvent = __webpack_require__(110);
	
	var _silenceEvent2 = _interopRequireDefault(_silenceEvent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var silenceEvents = function silenceEvents(fn) {
	  return function (event) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }
	
	    return (0, _silenceEvent2.default)(event) ? fn.apply(undefined, args) : fn.apply(undefined, [event].concat(args));
	  };
	};
	
	exports.default = silenceEvents;

/***/ }),

/***/ 25:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.makeFieldValue = makeFieldValue;
	exports.isFieldValue = isFieldValue;
	var flag = '_isFieldValue';
	var isObject = function isObject(object) {
	  return typeof object === 'object';
	};
	
	function makeFieldValue(object) {
	  if (object && isObject(object)) {
	    // This flag has to be enumerable, because otherwise it is not possible
	    // to serialize object with this field.
	    // The consequence is you lose information that particular field is
	    // field or nested group of fields, so you're not able to fetch
	    // field value from state when it has been affected in some way
	    // by serializing/using immutable and so on.
	    // @fixme marking field as leaf should be made in other way
	    Object.defineProperty(object, flag, { value: true, enumerable: true });
	  }
	  return object;
	}
	
	function isFieldValue(object) {
	  return !!(object && isObject(object) && object[flag]);
	}

/***/ }),

/***/ 111:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = getDisplayName;
	function getDisplayName(Comp) {
	  return Comp.displayName || Comp.name || 'Component';
	}

/***/ }),

/***/ 112:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	/**
	 * Given a state[field], get the value.
	 *  Fallback to .initialValue when .value is undefined to prevent double render/initialize cycle.
	 *  See {@link https://github.com/erikras/redux-form/issues/621}.
	 */
	var itemToValue = function itemToValue(_ref) {
	  var value = _ref.value,
	      initialValue = _ref.initialValue;
	  return typeof value !== 'undefined' ? value : initialValue;
	};
	
	var getValue = function getValue(field, state, dest) {
	  var dotIndex = field.indexOf('.');
	  var openIndex = field.indexOf('[');
	  var closeIndex = field.indexOf(']');
	  if (openIndex > 0 && closeIndex !== openIndex + 1) {
	    throw new Error('found [ not followed by ]');
	  }
	  if (openIndex > 0 && (dotIndex < 0 || openIndex < dotIndex)) {
	    // array field
	    var key = field.substring(0, openIndex);
	    var rest = field.substring(closeIndex + 1);
	    if (rest[0] === '.') {
	      rest = rest.substring(1);
	    }
	    var array = state && state[key] || [];
	    if (rest) {
	      if (!dest[key]) {
	        dest[key] = [];
	      }
	      array.forEach(function (item, index) {
	        if (!dest[key][index]) {
	          dest[key][index] = {};
	        }
	        getValue(rest, item, dest[key][index]);
	      });
	    } else {
	      dest[key] = array.map(itemToValue);
	    }
	  } else if (dotIndex > 0) {
	    // subobject field
	    var _key = field.substring(0, dotIndex);
	    var _rest = field.substring(dotIndex + 1);
	    if (!dest[_key]) {
	      dest[_key] = {};
	    }
	    getValue(_rest, state && state[_key] || {}, dest[_key]);
	  } else {
	    dest[field] = state[field] && itemToValue(state[field]);
	  }
	};
	
	var getValues = function getValues(fields, state) {
	  return fields.reduce(function (accumulator, field) {
	    getValue(field, state, accumulator);
	    return accumulator;
	  }, {});
	};
	
	exports.default = getValues;

/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _fieldValue = __webpack_require__(25);
	
	/**
	 * A different version of getValues() that does not need the fields array
	 */
	var getValuesFromState = function getValuesFromState(state) {
	  if (!state) {
	    return state;
	  }
	  var keys = Object.keys(state);
	  if (!keys.length) {
	    return undefined;
	  }
	  return keys.reduce(function (accumulator, key) {
	    var field = state[key];
	    if (field) {
	      if ((0, _fieldValue.isFieldValue)(field)) {
	        if (field.value !== undefined) {
	          accumulator[key] = field.value;
	        }
	      } else if (Array.isArray(field)) {
	        accumulator[key] = field.map(function (arrayField) {
	          return (0, _fieldValue.isFieldValue)(arrayField) ? arrayField.value : getValuesFromState(arrayField);
	        });
	      } else if (typeof field === 'object') {
	        var result = getValuesFromState(field);
	
	        if (result && Object.keys(result).length > 0) {
	          accumulator[key] = result;
	        }
	      }
	    }
	    return accumulator;
	  }, {});
	};
	
	exports.default = getValuesFromState;

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _isPromise = __webpack_require__(58);
	
	var _isPromise2 = _interopRequireDefault(_isPromise);
	
	var _isValid = __webpack_require__(44);
	
	var _isValid2 = _interopRequireDefault(_isValid);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var handleSubmit = function handleSubmit(submit, values, props, asyncValidate) {
	  var dispatch = props.dispatch,
	      fields = props.fields,
	      onSubmitSuccess = props.onSubmitSuccess,
	      onSubmitFail = props.onSubmitFail,
	      startSubmit = props.startSubmit,
	      stopSubmit = props.stopSubmit,
	      submitFailed = props.submitFailed,
	      returnRejectedSubmitPromise = props.returnRejectedSubmitPromise,
	      touch = props.touch,
	      validate = props.validate;
	
	  var syncErrors = validate(values, props);
	  touch.apply(undefined, fields); // touch all fields
	  if ((0, _isValid2.default)(syncErrors)) {
	    var doSubmit = function doSubmit() {
	      var result = submit(values, dispatch, props);
	      if ((0, _isPromise2.default)(result)) {
	        startSubmit();
	        return result.then(function (submitResult) {
	          stopSubmit();
	          if (onSubmitSuccess) {
	            onSubmitSuccess(submitResult);
	          }
	          return submitResult;
	        }, function (submitError) {
	          stopSubmit(submitError);
	          if (onSubmitFail) {
	            onSubmitFail(submitError);
	          }
	          if (returnRejectedSubmitPromise) {
	            return Promise.reject(submitError);
	          }
	        });
	      }
	      if (onSubmitSuccess) {
	        onSubmitSuccess(result);
	      }
	      return result;
	    };
	    var asyncValidateResult = asyncValidate();
	    return (0, _isPromise2.default)(asyncValidateResult) ?
	    // asyncValidateResult will be rejected if async validation failed
	    asyncValidateResult.then(doSubmit, function () {
	      submitFailed();
	      if (onSubmitFail) {
	        onSubmitFail();
	      }
	      return returnRejectedSubmitPromise ? Promise.reject() : Promise.resolve();
	    }) : doSubmit(); // no async validation, so submit
	  }
	  submitFailed();
	
	  if (onSubmitFail) {
	    onSubmitFail(syncErrors);
	  }
	
	  if (returnRejectedSubmitPromise) {
	    return Promise.reject(syncErrors);
	  }
	};
	
	exports.default = handleSubmit;

/***/ }),

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.untouchWithKey = exports.untouch = exports.touchWithKey = exports.touch = exports.swapArrayValues = exports.stopSubmit = exports.stopAsyncValidation = exports.startSubmit = exports.startAsyncValidation = exports.reset = exports.propTypes = exports.initializeWithKey = exports.initialize = exports.getValues = exports.removeArrayValue = exports.reduxForm = exports.reducer = exports.focus = exports.destroy = exports.changeWithKey = exports.change = exports.blur = exports.autofillWithKey = exports.autofill = exports.addArrayValue = exports.actionTypes = undefined;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(21);
	
	var _createAll2 = __webpack_require__(241);
	
	var _createAll3 = _interopRequireDefault(_createAll2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var isNative = typeof window !== 'undefined' && window.navigator && window.navigator.product && window.navigator.product === 'ReactNative';
	
	var _createAll = (0, _createAll3.default)(isNative, _react2.default, _reactRedux.connect);
	
	var actionTypes = _createAll.actionTypes,
	    addArrayValue = _createAll.addArrayValue,
	    autofill = _createAll.autofill,
	    autofillWithKey = _createAll.autofillWithKey,
	    blur = _createAll.blur,
	    change = _createAll.change,
	    changeWithKey = _createAll.changeWithKey,
	    destroy = _createAll.destroy,
	    focus = _createAll.focus,
	    reducer = _createAll.reducer,
	    reduxForm = _createAll.reduxForm,
	    removeArrayValue = _createAll.removeArrayValue,
	    getValues = _createAll.getValues,
	    initialize = _createAll.initialize,
	    initializeWithKey = _createAll.initializeWithKey,
	    propTypes = _createAll.propTypes,
	    reset = _createAll.reset,
	    startAsyncValidation = _createAll.startAsyncValidation,
	    startSubmit = _createAll.startSubmit,
	    stopAsyncValidation = _createAll.stopAsyncValidation,
	    stopSubmit = _createAll.stopSubmit,
	    swapArrayValues = _createAll.swapArrayValues,
	    touch = _createAll.touch,
	    touchWithKey = _createAll.touchWithKey,
	    untouch = _createAll.untouch,
	    untouchWithKey = _createAll.untouchWithKey;
	exports.actionTypes = actionTypes;
	exports.addArrayValue = addArrayValue;
	exports.autofill = autofill;
	exports.autofillWithKey = autofillWithKey;
	exports.blur = blur;
	exports.change = change;
	exports.changeWithKey = changeWithKey;
	exports.destroy = destroy;
	exports.focus = focus;
	exports.reducer = reducer;
	exports.reduxForm = reduxForm;
	exports.removeArrayValue = removeArrayValue;
	exports.getValues = getValues;
	exports.initialize = initialize;
	exports.initializeWithKey = initializeWithKey;
	exports.propTypes = propTypes;
	exports.reset = reset;
	exports.startAsyncValidation = startAsyncValidation;
	exports.startSubmit = startSubmit;
	exports.stopAsyncValidation = stopAsyncValidation;
	exports.stopSubmit = stopSubmit;
	exports.swapArrayValues = swapArrayValues;
	exports.touch = touch;
	exports.touchWithKey = touchWithKey;
	exports.untouch = untouch;
	exports.untouchWithKey = untouchWithKey;

/***/ }),

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _fieldValue = __webpack_require__(25);
	
	var makeEntry = function makeEntry(value, previousValue, overwriteValues) {
	  if (value === undefined && previousValue === undefined) return (0, _fieldValue.makeFieldValue)({});
	  return (0, _fieldValue.makeFieldValue)({
	    initial: value,
	    value: overwriteValues ? value : previousValue
	  });
	};
	
	/**
	 * Sets the initial values into the state and returns a new copy of the state
	 */
	var initializeState = function initializeState(values, fields) {
	  var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  var overwriteValues = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
	
	  if (!fields) {
	    throw new Error('fields must be passed when initializing state');
	  }
	  if (!values || !fields.length) {
	    return state;
	  }
	  var initializeField = function initializeField(path, src, dest) {
	    var dotIndex = path.indexOf('.');
	    if (dotIndex === 0) {
	      return initializeField(path.substring(1), src, dest);
	    }
	    var openIndex = path.indexOf('[');
	    var closeIndex = path.indexOf(']');
	    var result = _extends({}, dest) || {};
	    if (dotIndex >= 0 && (openIndex < 0 || dotIndex < openIndex)) {
	      // is dot notation
	      var key = path.substring(0, dotIndex);
	      result[key] = src[key] && initializeField(path.substring(dotIndex + 1), src[key], result[key] || {});
	    } else if (openIndex >= 0 && (dotIndex < 0 || openIndex < dotIndex)) {
	      // is array notation
	      if (closeIndex < 0) {
	        throw new Error('found \'[\' but no \']\': \'' + path + '\'');
	      }
	      var _key = path.substring(0, openIndex);
	      var srcArray = src[_key];
	      var destArray = result[_key];
	      var rest = path.substring(closeIndex + 1);
	      if (Array.isArray(srcArray)) {
	        if (rest.length) {
	          // need to keep recursing
	          result[_key] = srcArray.map(function (srcValue, srcIndex) {
	            return initializeField(rest, srcValue, destArray && destArray[srcIndex]);
	          });
	        } else {
	          result[_key] = srcArray.map(function (srcValue, srcIndex) {
	            return makeEntry(srcValue, destArray && destArray[srcIndex] && destArray[srcIndex].value, overwriteValues);
	          });
	        }
	      } else {
	        result[_key] = [];
	      }
	    } else {
	      result[path] = makeEntry(src && src[path], dest && dest[path] && dest[path].value, overwriteValues);
	    }
	    return result;
	  };
	  return fields.reduce(function (accumulator, field) {
	    return initializeField(field, values, accumulator);
	  }, _extends({}, state));
	};
	
	exports.default = initializeState;

/***/ }),

/***/ 115:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var isChecked = function isChecked(value) {
	  if (typeof value === 'boolean') {
	    return value;
	  }
	  if (typeof value === 'string') {
	    var lower = value.toLowerCase();
	    if (lower === 'true') {
	      return true;
	    }
	    if (lower === 'false') {
	      return false;
	    }
	  }
	  return undefined;
	};
	
	exports.default = isChecked;

/***/ }),

/***/ 252:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = isPristine;
	function isPristine(initial, data) {
	  if (initial === data) {
	    return true;
	  }
	  if (typeof initial === 'boolean' || typeof data === 'boolean') {
	    return initial === data;
	  } else if (initial instanceof Date && data instanceof Date) {
	    return initial.getTime() === data.getTime();
	  } else if (initial && typeof initial === 'object') {
	    if (!data || typeof data !== 'object') {
	      return false;
	    }
	    var initialKeys = Object.keys(initial);
	    var dataKeys = Object.keys(data);
	    if (initialKeys.length !== dataKeys.length) {
	      return false;
	    }
	    for (var index = 0; index < dataKeys.length; index++) {
	      var key = dataKeys[index];
	      if (!isPristine(initial[key], data[key])) {
	        return false;
	      }
	    }
	  } else if (initial || data) {
	    // allow '' to equate to undefined or null
	    return initial === data;
	  } else if (initial === null && data === 0 || initial === 0 && data === null) {
	    return false;
	  }
	  return true;
	}

/***/ }),

/***/ 44:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = isValid;
	function isValid(error) {
	  if (Array.isArray(error)) {
	    return error.reduce(function (valid, errorValue) {
	      return valid && isValid(errorValue);
	    }, true);
	  }
	  if (error && typeof error === 'object') {
	    return Object.keys(error).reduce(function (valid, key) {
	      return valid && isValid(error[key]);
	    }, true);
	  }
	  return !error;
	}

/***/ }),

/***/ 65:
/***/ (function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = mapValues;
	/**
	 * Maps all the values in the given object through the given function and saves them, by key, to a result object
	 */
	function mapValues(obj, fn) {
	  return obj ? Object.keys(obj).reduce(function (accumulator, key) {
	    var _extends2;
	
	    return _extends({}, accumulator, (_extends2 = {}, _extends2[key] = fn(obj[key], key), _extends2));
	  }, {}) : obj;
	}

/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = normalizeFields;
	
	var _fieldValue = __webpack_require__(25);
	
	function extractKey(field) {
	  var dotIndex = field.indexOf('.');
	  var openIndex = field.indexOf('[');
	  var closeIndex = field.indexOf(']');
	
	  if (openIndex > 0 && closeIndex !== openIndex + 1) {
	    throw new Error('found [ not followed by ]');
	  }
	
	  var isArray = openIndex > 0 && (dotIndex < 0 || openIndex < dotIndex);
	  var key = void 0;
	  var nestedPath = void 0;
	
	  if (isArray) {
	    key = field.substring(0, openIndex);
	    nestedPath = field.substring(closeIndex + 1);
	
	    if (nestedPath[0] === '.') {
	      nestedPath = nestedPath.substring(1);
	    }
	  } else if (dotIndex > 0) {
	    key = field.substring(0, dotIndex);
	    nestedPath = field.substring(dotIndex + 1);
	  } else {
	    key = field;
	  }
	
	  return { isArray: isArray, key: key, nestedPath: nestedPath };
	}
	
	function normalizeField(field, fullFieldPath, state, previousState, values, previousValues, normalizers) {
	  if (field.isArray) {
	    if (field.nestedPath) {
	      var array = state && state[field.key] || [];
	      var previousArray = previousState && previousState[field.key] || [];
	      var nestedField = extractKey(field.nestedPath);
	
	      return array.map(function (nestedState, i) {
	        nestedState[nestedField.key] = normalizeField(nestedField, fullFieldPath, nestedState, previousArray[i], values, previousValues, normalizers);
	
	        return nestedState;
	      });
	    }
	
	    var _normalizer = normalizers[fullFieldPath];
	
	    var result = _normalizer(state && state[field.key], previousState && previousState[field.key], values, previousValues);
	    return field.isArray ? result && result.map(_fieldValue.makeFieldValue) : result;
	  } else if (field.nestedPath) {
	    var nestedState = state && state[field.key] || {};
	    var _nestedField = extractKey(field.nestedPath);
	
	    nestedState[_nestedField.key] = normalizeField(_nestedField, fullFieldPath, nestedState, previousState && previousState[field.key], values, previousValues, normalizers);
	
	    return nestedState;
	  }
	
	  var finalField = state && Object.assign({}, state[field.key] || {});
	  var normalizer = normalizers[fullFieldPath];
	
	  finalField.value = normalizer(finalField.value, previousState && previousState[field.key] && previousState[field.key].value, values, previousValues);
	
	  return (0, _fieldValue.makeFieldValue)(finalField);
	}
	
	function normalizeFields(normalizers, state, previousState, values, previousValues) {
	  var newState = Object.keys(normalizers).reduce(function (accumulator, field) {
	    var extracted = extractKey(field);
	
	    accumulator[extracted.key] = normalizeField(extracted, field, state, previousState, values, previousValues, normalizers);
	
	    return accumulator;
	  }, {});
	
	  return _extends({}, state, newState);
	}

/***/ }),

/***/ 116:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	/**
	 * Reads any potentially deep value from an object using dot and array syntax
	 */
	var read = function read(path, object) {
	  if (!path || !object) {
	    return object;
	  }
	  var dotIndex = path.indexOf('.');
	  if (dotIndex === 0) {
	    return read(path.substring(1), object);
	  }
	  var openIndex = path.indexOf('[');
	  var closeIndex = path.indexOf(']');
	  if (dotIndex >= 0 && (openIndex < 0 || dotIndex < openIndex)) {
	    // iterate down object tree
	    return read(path.substring(dotIndex + 1), object[path.substring(0, dotIndex)]);
	  }
	  if (openIndex >= 0 && (dotIndex < 0 || openIndex < dotIndex)) {
	    if (closeIndex < 0) {
	      throw new Error('found [ but no ]');
	    }
	    var key = path.substring(0, openIndex);
	    var index = path.substring(openIndex + 1, closeIndex);
	    if (!index.length) {
	      return object[key];
	    }
	    if (openIndex === 0) {
	      return read(path.substring(closeIndex + 1), object[index]);
	    }
	    if (!object[key]) {
	      return undefined;
	    }
	    return read(path.substring(closeIndex + 1), object[key][index]);
	  }
	  return object[path];
	};
	
	exports.default = read;

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createOnBlur = __webpack_require__(246);
	
	var _createOnBlur2 = _interopRequireDefault(_createOnBlur);
	
	var _createOnChange = __webpack_require__(247);
	
	var _createOnChange2 = _interopRequireDefault(_createOnChange);
	
	var _createOnDragStart = __webpack_require__(107);
	
	var _createOnDragStart2 = _interopRequireDefault(_createOnDragStart);
	
	var _createOnDrop = __webpack_require__(248);
	
	var _createOnDrop2 = _interopRequireDefault(_createOnDrop);
	
	var _createOnFocus = __webpack_require__(249);
	
	var _createOnFocus2 = _interopRequireDefault(_createOnFocus);
	
	var _silencePromise = __webpack_require__(259);
	
	var _silencePromise2 = _interopRequireDefault(_silencePromise);
	
	var _read = __webpack_require__(116);
	
	var _read2 = _interopRequireDefault(_read);
	
	var _updateField = __webpack_require__(260);
	
	var _updateField2 = _interopRequireDefault(_updateField);
	
	var _isChecked = __webpack_require__(115);
	
	var _isChecked2 = _interopRequireDefault(_isChecked);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getSuffix(input, closeIndex) {
	  var suffix = input.substring(closeIndex + 1);
	  if (suffix[0] === '.') {
	    suffix = suffix.substring(1);
	  }
	  return suffix;
	}
	
	var getNextKey = function getNextKey(path) {
	  var dotIndex = path.indexOf('.');
	  var openIndex = path.indexOf('[');
	  if (openIndex > 0 && (dotIndex < 0 || openIndex < dotIndex)) {
	    return path.substring(0, openIndex);
	  }
	  return dotIndex > 0 ? path.substring(0, dotIndex) : path;
	};
	
	var shouldAsyncValidate = function shouldAsyncValidate(name, asyncBlurFields) {
	  return (
	    // remove array indices
	    ~asyncBlurFields.indexOf(name.replace(/\[[0-9]+\]/g, '[]'))
	  );
	};
	
	var readField = function readField(state, fieldName) {
	  var pathToHere = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	  var fields = arguments[3];
	  var syncErrors = arguments[4];
	  var asyncValidate = arguments[5];
	  var isReactNative = arguments[6];
	  var props = arguments[7];
	  var callback = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : function () {
	    return null;
	  };
	  var prefix = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : '';
	  var asyncBlurFields = props.asyncBlurFields,
	      autofill = props.autofill,
	      blur = props.blur,
	      change = props.change,
	      focus = props.focus,
	      form = props.form,
	      initialValues = props.initialValues,
	      readonly = props.readonly,
	      addArrayValue = props.addArrayValue,
	      removeArrayValue = props.removeArrayValue,
	      swapArrayValues = props.swapArrayValues;
	
	  var dotIndex = fieldName.indexOf('.');
	  var openIndex = fieldName.indexOf('[');
	  var closeIndex = fieldName.indexOf(']');
	  if (openIndex > 0 && closeIndex !== openIndex + 1) {
	    throw new Error('found [ not followed by ]');
	  }
	
	  if (openIndex > 0 && (dotIndex < 0 || openIndex < dotIndex)) {
	    // array field
	    var key = fieldName.substring(0, openIndex);
	    var rest = getSuffix(fieldName, closeIndex);
	    var stateArray = state && state[key] || [];
	    var fullPrefix = prefix + fieldName.substring(0, closeIndex + 1);
	    var subfields = props.fields.reduce(function (accumulator, field) {
	      if (field.indexOf(fullPrefix) === 0) {
	        accumulator.push(field);
	      }
	      return accumulator;
	    }, []).map(function (field) {
	      return getSuffix(field, prefix.length + closeIndex);
	    });
	    var addMethods = function addMethods(dest) {
	      Object.defineProperty(dest, 'addField', {
	        value: function value(_value, index) {
	          return addArrayValue(pathToHere + key, _value, index, subfields);
	        }
	      });
	      Object.defineProperty(dest, 'removeField', {
	        value: function value(index) {
	          return removeArrayValue(pathToHere + key, index);
	        }
	      });
	      Object.defineProperty(dest, 'swapFields', {
	        value: function value(indexA, indexB) {
	          return swapArrayValues(pathToHere + key, indexA, indexB);
	        }
	      });
	      return dest;
	    };
	    if (!fields[key] || fields[key].length !== stateArray.length) {
	      fields[key] = fields[key] ? [].concat(fields[key]) : [];
	      addMethods(fields[key]);
	    }
	    var fieldArray = fields[key];
	    var changed = false;
	    stateArray.forEach(function (fieldState, index) {
	      if (rest && !fieldArray[index]) {
	        fieldArray[index] = {};
	        changed = true;
	      }
	      var dest = rest ? fieldArray[index] : {};
	      var nextPath = '' + pathToHere + key + '[' + index + ']' + (rest ? '.' : '');
	      var nextPrefix = '' + prefix + key + '[]' + (rest ? '.' : '');
	
	      var result = readField(fieldState, rest, nextPath, dest, syncErrors, asyncValidate, isReactNative, props, callback, nextPrefix);
	      if (fieldArray[index] !== result) {
	        if (rest) {
	          // if something's after [] in field name, the array item is an object field
	          // we need it to compare !== to the original (so react re-renders appropriately)
	          result = _extends({}, dest);
	        }
	        fieldArray[index] = result;
	        changed = true;
	      }
	    });
	    if (fieldArray.length > stateArray.length) {
	      // remove extra items that aren't in state array
	      fieldArray.splice(stateArray.length, fieldArray.length - stateArray.length);
	    }
	    if (changed) {
	      fieldArray = addMethods([].concat(fieldArray));
	    }
	    fields[key] = fieldArray;
	    return fieldArray;
	  }
	  if (dotIndex > 0) {
	    // subobject field
	    var _key = fieldName.substring(0, dotIndex);
	    var _rest = fieldName.substring(dotIndex + 1);
	    var subobject = fields[_key] || {};
	    var nextPath = pathToHere + _key + '.';
	    var nextKey = getNextKey(_rest);
	    var nextPrefix = prefix + _key + '.';
	    var previous = subobject[nextKey];
	    var result = readField(state[_key] || {}, _rest, nextPath, subobject, syncErrors, asyncValidate, isReactNative, props, callback, nextPrefix);
	    if (result !== previous) {
	      var _extends2;
	
	      subobject = _extends({}, subobject, (_extends2 = {}, _extends2[nextKey] = result, _extends2));
	    }
	    fields[_key] = subobject;
	    return subobject;
	  }
	  var name = pathToHere + fieldName;
	  var field = fields[fieldName] || {};
	  if (field.name !== name) {
	    var onChange = (0, _createOnChange2.default)(name, change, isReactNative);
	    var initialFormValue = (0, _read2.default)(name + '.initial', form);
	    var initialValue = initialFormValue || (0, _read2.default)(name, initialValues);
	    initialValue = initialValue === undefined ? '' : initialValue;
	    field.name = name;
	    field.checked = (0, _isChecked2.default)(initialValue);
	    field.value = initialValue;
	    field.initialValue = initialValue;
	    if (!readonly) {
	      field.autofill = function (value) {
	        return autofill(name, value);
	      };
	      field.onBlur = (0, _createOnBlur2.default)(name, blur, isReactNative, shouldAsyncValidate(name, asyncBlurFields) && function (blurName, blurValue) {
	        return (0, _silencePromise2.default)(asyncValidate(blurName, blurValue));
	      });
	      field.onChange = onChange;
	      field.onDragStart = (0, _createOnDragStart2.default)(name, function () {
	        return field.value;
	      });
	      field.onDrop = (0, _createOnDrop2.default)(name, change);
	      field.onFocus = (0, _createOnFocus2.default)(name, focus);
	      field.onUpdate = onChange; // alias to support belle. https://github.com/nikgraf/belle/issues/58
	    }
	    field.valid = true;
	    field.invalid = false;
	    Object.defineProperty(field, '_isField', { value: true });
	  }
	
	  var fieldState = (fieldName ? state[fieldName] : state) || {};
	  var syncError = (0, _read2.default)(name, syncErrors);
	  var updated = (0, _updateField2.default)(field, fieldState, name === form._active, syncError);
	  if (fieldName || fields[fieldName] !== updated) {
	    fields[fieldName] = updated;
	  }
	  callback(updated);
	  return updated;
	};
	
	exports.default = readField;

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _readField = __webpack_require__(254);
	
	var _readField2 = _interopRequireDefault(_readField);
	
	var _write = __webpack_require__(117);
	
	var _write2 = _interopRequireDefault(_write);
	
	var _getValues = __webpack_require__(112);
	
	var _getValues2 = _interopRequireDefault(_getValues);
	
	var _removeField = __webpack_require__(256);
	
	var _removeField2 = _interopRequireDefault(_removeField);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Reads props and generates (or updates) field structure
	 */
	var readFields = function readFields(props, previousProps, myFields, asyncValidate, isReactNative) {
	  var fields = props.fields,
	      form = props.form,
	      validate = props.validate;
	
	  var previousFields = previousProps.fields;
	  var values = (0, _getValues2.default)(fields, form);
	  var syncErrors = validate(values, props) || {};
	  var errors = {};
	  var formError = syncErrors._error || form._error;
	  var allValid = !formError;
	  var allPristine = true;
	  var tally = function tally(field) {
	    if (field.error) {
	      errors = (0, _write2.default)(field.name, field.error, errors);
	      allValid = false;
	    }
	    if (field.dirty) {
	      allPristine = false;
	    }
	  };
	  var fieldObjects = previousFields ? previousFields.reduce(function (accumulator, previousField) {
	    return ~fields.indexOf(previousField) ? accumulator : (0, _removeField2.default)(accumulator, previousField);
	  }, _extends({}, myFields)) : _extends({}, myFields);
	  fields.forEach(function (name) {
	    (0, _readField2.default)(form, name, undefined, fieldObjects, syncErrors, asyncValidate, isReactNative, props, tally);
	  });
	  Object.defineProperty(fieldObjects, '_meta', {
	    value: {
	      allPristine: allPristine,
	      allValid: allValid,
	      values: values,
	      errors: errors,
	      formError: formError
	    }
	  });
	  return fieldObjects;
	};
	exports.default = readFields;

/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.initialState = exports.globalErrorKey = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _initialState, _behaviors;
	
	var _actionTypes = __webpack_require__(64);
	
	var _mapValues = __webpack_require__(65);
	
	var _mapValues2 = _interopRequireDefault(_mapValues);
	
	var _read = __webpack_require__(116);
	
	var _read2 = _interopRequireDefault(_read);
	
	var _write = __webpack_require__(117);
	
	var _write2 = _interopRequireDefault(_write);
	
	var _getValuesFromState = __webpack_require__(113);
	
	var _getValuesFromState2 = _interopRequireDefault(_getValuesFromState);
	
	var _initializeState = __webpack_require__(114);
	
	var _initializeState2 = _interopRequireDefault(_initializeState);
	
	var _resetState = __webpack_require__(257);
	
	var _resetState2 = _interopRequireDefault(_resetState);
	
	var _setErrors = __webpack_require__(258);
	
	var _setErrors2 = _interopRequireDefault(_setErrors);
	
	var _fieldValue = __webpack_require__(25);
	
	var _normalizeFields = __webpack_require__(253);
	
	var _normalizeFields2 = _interopRequireDefault(_normalizeFields);
	
	var _createInitialState = __webpack_require__(106);
	
	var _createInitialState2 = _interopRequireDefault(_createInitialState);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var globalErrorKey = exports.globalErrorKey = '_error';
	
	var initialState = exports.initialState = (_initialState = {
	  _active: undefined,
	  _asyncValidating: false
	}, _initialState[globalErrorKey] = undefined, _initialState._initialized = false, _initialState._submitting = false, _initialState._submitFailed = false, _initialState);
	
	var behaviors = (_behaviors = {}, _behaviors[_actionTypes.ADD_ARRAY_VALUE] = function (state, _ref) {
	  var path = _ref.path,
	      index = _ref.index,
	      value = _ref.value,
	      fields = _ref.fields;
	
	  var array = (0, _read2.default)(path, state);
	  var stateCopy = _extends({}, state);
	  var arrayCopy = array ? [].concat(array) : [];
	  var newValue = value !== null && typeof value === 'object' ? (0, _initializeState2.default)(value, fields || Object.keys(value)) : (0, _fieldValue.makeFieldValue)({ value: value });
	  if (index === undefined) {
	    arrayCopy.push(newValue);
	  } else {
	    arrayCopy.splice(index, 0, newValue);
	  }
	  return (0, _write2.default)(path, arrayCopy, stateCopy);
	}, _behaviors[_actionTypes.AUTOFILL] = function (state, _ref2) {
	  var field = _ref2.field,
	      value = _ref2.value;
	
	  return (0, _write2.default)(field, function (previous) {
	    var _previous$value$autof = _extends({}, previous, { value: value, autofilled: true }),
	        asyncError = _previous$value$autof.asyncError,
	        submitError = _previous$value$autof.submitError,
	        result = _objectWithoutProperties(_previous$value$autof, ['asyncError', 'submitError']);
	
	    return (0, _fieldValue.makeFieldValue)(result);
	  }, state);
	}, _behaviors[_actionTypes.BLUR] = function (state, _ref3) {
	  var field = _ref3.field,
	      value = _ref3.value,
	      touch = _ref3.touch;
	
	  var _active = state._active,
	      stateCopy = _objectWithoutProperties(state, ['_active']);
	
	  if (_active && _active !== field) {
	    // remove _active from state
	    stateCopy._active = _active;
	  }
	  return (0, _write2.default)(field, function (previous) {
	    var result = _extends({}, previous);
	    if (value !== undefined) {
	      result.value = value;
	    }
	    if (touch) {
	      result.touched = true;
	    }
	    return (0, _fieldValue.makeFieldValue)(result);
	  }, stateCopy);
	}, _behaviors[_actionTypes.CHANGE] = function (state, _ref4) {
	  var field = _ref4.field,
	      value = _ref4.value,
	      touch = _ref4.touch;
	
	  return (0, _write2.default)(field, function (previous) {
	    var _previous$value = _extends({}, previous, { value: value }),
	        asyncError = _previous$value.asyncError,
	        submitError = _previous$value.submitError,
	        autofilled = _previous$value.autofilled,
	        result = _objectWithoutProperties(_previous$value, ['asyncError', 'submitError', 'autofilled']);
	
	    if (touch) {
	      result.touched = true;
	    }
	    return (0, _fieldValue.makeFieldValue)(result);
	  }, state);
	}, _behaviors[_actionTypes.DESTROY] = function () {
	  return undefined;
	}, _behaviors[_actionTypes.FOCUS] = function (state, _ref5) {
	  var field = _ref5.field;
	
	  var stateCopy = (0, _write2.default)(field, function (previous) {
	    return (0, _fieldValue.makeFieldValue)(_extends({}, previous, { visited: true }));
	  }, state);
	  stateCopy._active = field;
	  return stateCopy;
	}, _behaviors[_actionTypes.INITIALIZE] = function (state, _ref6) {
	  var data = _ref6.data,
	      fields = _ref6.fields,
	      overwriteValues = _ref6.overwriteValues;
	
	  return (0, _createInitialState2.default)(data, fields, state, overwriteValues);
	}, _behaviors[_actionTypes.REMOVE_ARRAY_VALUE] = function (state, _ref7) {
	  var path = _ref7.path,
	      index = _ref7.index;
	
	  var array = (0, _read2.default)(path, state);
	  var stateCopy = _extends({}, state);
	  var arrayCopy = array ? [].concat(array) : [];
	  if (index === undefined) {
	    arrayCopy.pop();
	  } else if (isNaN(index)) {
	    delete arrayCopy[index];
	  } else {
	    arrayCopy.splice(index, 1);
	  }
	  return (0, _write2.default)(path, arrayCopy, stateCopy);
	}, _behaviors[_actionTypes.RESET] = function (state) {
	  var _extends2;
	
	  return _extends({}, (0, _resetState2.default)(state), (_extends2 = {
	    _active: undefined,
	    _asyncValidating: false
	  }, _extends2[globalErrorKey] = undefined, _extends2._initialized = state._initialized, _extends2._submitting = false, _extends2._submitFailed = false, _extends2));
	}, _behaviors[_actionTypes.START_ASYNC_VALIDATION] = function (state, _ref8) {
	  var field = _ref8.field;
	
	  return _extends({}, state, {
	    _asyncValidating: field || true
	  });
	}, _behaviors[_actionTypes.START_SUBMIT] = function (state) {
	  return _extends({}, state, {
	    _submitting: true
	  });
	}, _behaviors[_actionTypes.STOP_ASYNC_VALIDATION] = function (state, _ref9) {
	  var _extends3;
	
	  var errors = _ref9.errors;
	
	  return _extends({}, (0, _setErrors2.default)(state, errors, 'asyncError'), (_extends3 = {
	    _asyncValidating: false
	  }, _extends3[globalErrorKey] = errors && errors[globalErrorKey], _extends3));
	}, _behaviors[_actionTypes.STOP_SUBMIT] = function (state, _ref10) {
	  var _extends4;
	
	  var errors = _ref10.errors;
	
	  return _extends({}, (0, _setErrors2.default)(state, errors, 'submitError'), (_extends4 = {}, _extends4[globalErrorKey] = errors && errors[globalErrorKey], _extends4._submitting = false, _extends4._submitFailed = !!(errors && Object.keys(errors).length), _extends4));
	}, _behaviors[_actionTypes.SUBMIT_FAILED] = function (state) {
	  return _extends({}, state, {
	    _submitFailed: true
	  });
	}, _behaviors[_actionTypes.SWAP_ARRAY_VALUES] = function (state, _ref11) {
	  var path = _ref11.path,
	      indexA = _ref11.indexA,
	      indexB = _ref11.indexB;
	
	  var array = (0, _read2.default)(path, state);
	  var arrayLength = array.length;
	  if (indexA === indexB || isNaN(indexA) || isNaN(indexB) || indexA >= arrayLength || indexB >= arrayLength) {
	    return state; // do nothing
	  }
	  var stateCopy = _extends({}, state);
	  var arrayCopy = [].concat(array);
	  arrayCopy[indexA] = array[indexB];
	  arrayCopy[indexB] = array[indexA];
	  return (0, _write2.default)(path, arrayCopy, stateCopy);
	}, _behaviors[_actionTypes.TOUCH] = function (state, _ref12) {
	  var fields = _ref12.fields;
	
	  return _extends({}, state, fields.reduce(function (accumulator, field) {
	    return (0, _write2.default)(field, function (value) {
	      return (0, _fieldValue.makeFieldValue)(_extends({}, value, { touched: true }));
	    }, accumulator);
	  }, state));
	}, _behaviors[_actionTypes.UNTOUCH] = function (state, _ref13) {
	  var fields = _ref13.fields;
	
	  return _extends({}, state, fields.reduce(function (accumulator, field) {
	    return (0, _write2.default)(field, function (value) {
	      if (value) {
	        var touched = value.touched,
	            rest = _objectWithoutProperties(value, ['touched']);
	
	        return (0, _fieldValue.makeFieldValue)(rest);
	      }
	      return (0, _fieldValue.makeFieldValue)(value);
	    }, accumulator);
	  }, state));
	}, _behaviors);
	
	var reducer = function reducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	  var behavior = behaviors[action.type];
	  return behavior ? behavior(state, action) : state;
	};
	
	function formReducer() {
	  var _extends10;
	
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	  var form = action.form,
	      key = action.key,
	      rest = _objectWithoutProperties(action, ['form', 'key']); // eslint-disable-line no-redeclare
	
	
	  if (!form) {
	    return state;
	  }
	  if (key) {
	    var _extends7, _extends8;
	
	    if (action.type === _actionTypes.DESTROY) {
	      var _extends6;
	
	      return _extends({}, state, (_extends6 = {}, _extends6[form] = state[form] && Object.keys(state[form]).reduce(function (accumulator, stateKey) {
	        var _extends5;
	
	        return stateKey === key ? accumulator : _extends({}, accumulator, (_extends5 = {}, _extends5[stateKey] = state[form][stateKey], _extends5));
	      }, {}), _extends6));
	    }
	    return _extends({}, state, (_extends8 = {}, _extends8[form] = _extends({}, state[form], (_extends7 = {}, _extends7[key] = reducer((state[form] || {})[key], rest), _extends7)), _extends8));
	  }
	  if (action.type === _actionTypes.DESTROY) {
	    return Object.keys(state).reduce(function (accumulator, formName) {
	      var _extends9;
	
	      return formName === form ? accumulator : _extends({}, accumulator, (_extends9 = {}, _extends9[formName] = state[formName], _extends9));
	    }, {});
	  }
	  return _extends({}, state, (_extends10 = {}, _extends10[form] = reducer(state[form], rest), _extends10));
	}
	
	/**
	 * Adds additional functionality to the reducer
	 */
	function decorate(target) {
	  target.plugin = function plugin(reducers) {
	    var _this = this;
	
	    // use 'function' keyword to enable 'this'
	    return decorate(function () {
	      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var result = _this(state, action);
	      return _extends({}, result, (0, _mapValues2.default)(reducers, function (pluginReducer, key) {
	        return pluginReducer(result[key] || initialState, action);
	      }));
	    });
	  };
	
	  target.normalize = function normalize(normalizers) {
	    var _this2 = this;
	
	    // use 'function' keyword to enable 'this'
	    return decorate(function () {
	      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var result = _this2(state, action);
	      return _extends({}, result, (0, _mapValues2.default)(normalizers, function (formNormalizers, form) {
	        var runNormalize = function runNormalize(previous, currentResult) {
	          var previousValues = (0, _getValuesFromState2.default)(_extends({}, initialState, previous));
	          var formResult = _extends({}, initialState, currentResult);
	          var values = (0, _getValuesFromState2.default)(formResult);
	          return (0, _normalizeFields2.default)(formNormalizers, formResult, previous, values, previousValues);
	        };
	        if (action.key) {
	          var _extends11;
	
	          return _extends({}, result[form], (_extends11 = {}, _extends11[action.key] = runNormalize(state[form][action.key], result[form][action.key]), _extends11));
	        }
	        return runNormalize(state[form], result[form]);
	      }));
	    });
	  };
	
	  return target;
	}
	
	exports.default = decorate(formReducer);

/***/ }),

/***/ 256:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var without = function without(object, key) {
	  var copy = _extends({}, object);
	  delete copy[key];
	  return copy;
	};
	
	var removeField = function removeField(fields, path) {
	  var dotIndex = path.indexOf('.');
	  var openIndex = path.indexOf('[');
	  var closeIndex = path.indexOf(']');
	  if (openIndex > 0 && closeIndex !== openIndex + 1) {
	    throw new Error('found [ not followed by ]');
	  }
	  if (openIndex > 0 && (dotIndex < 0 || openIndex < dotIndex)) {
	    // array field
	    var key = path.substring(0, openIndex);
	    if (!Array.isArray(fields[key])) {
	      return without(fields, key);
	    }
	    var rest = path.substring(closeIndex + 1);
	    if (rest[0] === '.') {
	      rest = rest.substring(1);
	    }
	    if (rest) {
	      var _extends2;
	
	      var copy = [];
	      fields[key].forEach(function (item, index) {
	        var result = removeField(item, rest);
	        if (Object.keys(result).length) {
	          copy[index] = result;
	        }
	      });
	      return copy.length ? _extends({}, fields, (_extends2 = {}, _extends2[key] = copy, _extends2)) : without(fields, key);
	    }
	    return without(fields, key);
	  }
	  if (dotIndex > 0) {
	    var _extends3;
	
	    // subobject field
	    var _key = path.substring(0, dotIndex);
	    var _rest = path.substring(dotIndex + 1);
	    if (!fields[_key]) {
	      return fields;
	    }
	    var result = removeField(fields[_key], _rest);
	    return Object.keys(result).length ? _extends({}, fields, (_extends3 = {}, _extends3[_key] = removeField(fields[_key], _rest), _extends3)) : without(fields, _key);
	  }
	  return without(fields, path);
	};
	
	exports.default = removeField;

/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _fieldValue = __webpack_require__(25);
	
	var reset = function reset(value) {
	  return (0, _fieldValue.makeFieldValue)(value === undefined || value && value.initial === undefined ? {} : { initial: value.initial, value: value.initial });
	};
	
	/**
	 * Sets the initial values into the state and returns a new copy of the state
	 */
	var resetState = function resetState(values) {
	  return values ? Object.keys(values).reduce(function (accumulator, key) {
	    var value = values[key];
	    if (Array.isArray(value)) {
	      accumulator[key] = value.map(function (item) {
	        return (0, _fieldValue.isFieldValue)(item) ? reset(item) : resetState(item);
	      });
	    } else if (value) {
	      if ((0, _fieldValue.isFieldValue)(value)) {
	        accumulator[key] = reset(value);
	      } else if (typeof value === 'object' && value !== null) {
	        accumulator[key] = resetState(value);
	      } else {
	        accumulator[key] = value;
	      }
	    }
	    return accumulator;
	  }, {}) : values;
	};
	
	exports.default = resetState;

/***/ }),

/***/ 258:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _fieldValue = __webpack_require__(25);
	
	var isMetaKey = function isMetaKey(key) {
	  return key[0] === '_';
	};
	
	/**
	 * Sets an error on a field deep in the tree, returning a new copy of the state
	 */
	var setErrors = function setErrors(state, errors, destKey) {
	  var clear = function clear() {
	    if (Array.isArray(state)) {
	      return state.map(function (stateItem, index) {
	        return setErrors(stateItem, errors && errors[index], destKey);
	      });
	    }
	    if (state && typeof state === 'object') {
	      var result = Object.keys(state).reduce(function (accumulator, key) {
	        var _extends2;
	
	        return isMetaKey(key) ? accumulator : _extends({}, accumulator, (_extends2 = {}, _extends2[key] = setErrors(state[key], errors && errors[key], destKey), _extends2));
	      }, state);
	      if ((0, _fieldValue.isFieldValue)(state)) {
	        (0, _fieldValue.makeFieldValue)(result);
	      }
	      return result;
	    }
	    return (0, _fieldValue.makeFieldValue)(state);
	  };
	  if (typeof File !== 'undefined' && state instanceof File) {
	    return state;
	  }
	  if (!errors) {
	    if (!state) {
	      return state;
	    }
	    if (state[destKey]) {
	      var copy = _extends({}, state);
	      delete copy[destKey];
	      return (0, _fieldValue.makeFieldValue)(copy);
	    }
	    return clear();
	  }
	  if (typeof errors === 'string') {
	    var _extends3;
	
	    return (0, _fieldValue.makeFieldValue)(_extends({}, state, (_extends3 = {}, _extends3[destKey] = errors, _extends3)));
	  }
	  if (Array.isArray(errors)) {
	    if (!state || Array.isArray(state)) {
	      var _copy = (state || []).map(function (stateItem, index) {
	        return setErrors(stateItem, errors[index], destKey);
	      });
	      errors.forEach(function (errorItem, index) {
	        return _copy[index] = setErrors(_copy[index], errorItem, destKey);
	      });
	      return _copy;
	    }
	    return setErrors(state, errors[0], destKey); // use first error
	  }
	  if ((0, _fieldValue.isFieldValue)(state)) {
	    var _extends4;
	
	    return (0, _fieldValue.makeFieldValue)(_extends({}, state, (_extends4 = {}, _extends4[destKey] = errors, _extends4)));
	  }
	  var errorKeys = Object.keys(errors);
	  if (!errorKeys.length && !state) {
	    return state;
	  }
	  return errorKeys.reduce(function (accumulator, key) {
	    var _extends5;
	
	    return isMetaKey(key) ? accumulator : _extends({}, accumulator, (_extends5 = {}, _extends5[key] = setErrors(state && state[key], errors[key], destKey), _extends5));
	  }, clear() || {});
	};
	
	exports.default = setErrors;

/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _isPromise = __webpack_require__(58);
	
	var _isPromise2 = _interopRequireDefault(_isPromise);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var noop = function noop() {
	  return undefined;
	};
	
	var silencePromise = function silencePromise(promise) {
	  return (0, _isPromise2.default)(promise) ? promise.then(noop, noop) : promise;
	};
	
	exports.default = silencePromise;

/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _isPristine = __webpack_require__(252);
	
	var _isPristine2 = _interopRequireDefault(_isPristine);
	
	var _isValid = __webpack_require__(44);
	
	var _isValid2 = _interopRequireDefault(_isValid);
	
	var _isChecked = __webpack_require__(115);
	
	var _isChecked2 = _interopRequireDefault(_isChecked);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Updates a field object from the store values
	 */
	var updateField = function updateField(field, formField, active, syncError) {
	  var diff = {};
	  var formFieldValue = formField.value === undefined ? '' : formField.value;
	
	  // update field value
	  if (field.value !== formFieldValue) {
	    diff.value = formFieldValue;
	    diff.checked = (0, _isChecked2.default)(formFieldValue);
	  }
	
	  // update dirty/pristine
	  var pristine = (0, _isPristine2.default)(formFieldValue, formField.initial);
	  if (field.pristine !== pristine) {
	    diff.dirty = !pristine;
	    diff.pristine = pristine;
	  }
	
	  // update field error
	  var error = syncError || formField.submitError || formField.asyncError;
	  if (error !== field.error) {
	    diff.error = error;
	  }
	  var valid = (0, _isValid2.default)(error);
	  if (field.valid !== valid) {
	    diff.invalid = !valid;
	    diff.valid = valid;
	  }
	
	  if (active !== field.active) {
	    diff.active = active;
	  }
	  var touched = !!formField.touched;
	  if (touched !== field.touched) {
	    diff.touched = touched;
	  }
	  var visited = !!formField.visited;
	  if (visited !== field.visited) {
	    diff.visited = visited;
	  }
	  var autofilled = !!formField.autofilled;
	  if (autofilled !== field.autofilled) {
	    diff.autofilled = autofilled;
	  }
	
	  if ('initial' in formField && formField.initial !== field.initialValue) {
	    field.initialValue = formField.initial;
	  }
	
	  return Object.keys(diff).length ? _extends({}, field, diff) : field;
	};
	exports.default = updateField;

/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _redux = __webpack_require__(27);
	
	var wrapMapDispatchToProps = function wrapMapDispatchToProps(mapDispatchToProps, actionCreators) {
	  if (mapDispatchToProps) {
	    if (typeof mapDispatchToProps === 'function') {
	      if (mapDispatchToProps.length > 1) {
	        return function (dispatch, ownProps) {
	          return _extends({
	            dispatch: dispatch
	          }, mapDispatchToProps(dispatch, ownProps), (0, _redux.bindActionCreators)(actionCreators, dispatch));
	        };
	      }
	      return function (dispatch) {
	        return _extends({
	          dispatch: dispatch
	        }, mapDispatchToProps(dispatch), (0, _redux.bindActionCreators)(actionCreators, dispatch));
	      };
	    }
	    return function (dispatch) {
	      return _extends({
	        dispatch: dispatch
	      }, (0, _redux.bindActionCreators)(mapDispatchToProps, dispatch), (0, _redux.bindActionCreators)(actionCreators, dispatch));
	    };
	  }
	  return function (dispatch) {
	    return _extends({
	      dispatch: dispatch
	    }, (0, _redux.bindActionCreators)(actionCreators, dispatch));
	  };
	};
	
	exports.default = wrapMapDispatchToProps;

/***/ }),

/***/ 262:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var wrapMapStateToProps = function wrapMapStateToProps(mapStateToProps, getForm) {
	  if (mapStateToProps) {
	    if (typeof mapStateToProps !== 'function') {
	      throw new Error('mapStateToProps must be a function');
	    }
	    if (mapStateToProps.length > 1) {
	      return function (state, ownProps) {
	        return _extends({}, mapStateToProps(state, ownProps), {
	          form: getForm(state)
	        });
	      };
	    }
	    return function (state) {
	      return _extends({}, mapStateToProps(state), {
	        form: getForm(state)
	      });
	    };
	  }
	  return function (state) {
	    return {
	      form: getForm(state)
	    };
	  };
	};
	
	exports.default = wrapMapStateToProps;

/***/ }),

/***/ 117:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	/**
	 * Writes any potentially deep value from an object using dot and array syntax,
	 * and returns a new copy of the object.
	 */
	var write = function write(path, value, object) {
	  var _extends7;
	
	  var dotIndex = path.indexOf('.');
	  if (dotIndex === 0) {
	    return write(path.substring(1), value, object);
	  }
	  var openIndex = path.indexOf('[');
	  var closeIndex = path.indexOf(']');
	  if (dotIndex >= 0 && (openIndex < 0 || dotIndex < openIndex)) {
	    var _extends2;
	
	    // is dot notation
	    var key = path.substring(0, dotIndex);
	    return _extends({}, object, (_extends2 = {}, _extends2[key] = write(path.substring(dotIndex + 1), value, object[key] || {}), _extends2));
	  }
	  if (openIndex >= 0 && (dotIndex < 0 || openIndex < dotIndex)) {
	    var _extends6;
	
	    // is array notation
	    if (closeIndex < 0) {
	      throw new Error('found [ but no ]');
	    }
	    var _key = path.substring(0, openIndex);
	    var index = path.substring(openIndex + 1, closeIndex);
	    var array = object[_key] || [];
	    var rest = path.substring(closeIndex + 1);
	    if (index) {
	      var _extends4;
	
	      // indexed array
	      if (rest.length) {
	        var _extends3;
	
	        // need to keep recursing
	        var dest = array[index] || {};
	        var arrayCopy = [].concat(array);
	        arrayCopy[index] = write(rest, value, dest);
	        return _extends({}, object || {}, (_extends3 = {}, _extends3[_key] = arrayCopy, _extends3));
	      }
	      var copy = [].concat(array);
	      copy[index] = typeof value === 'function' ? value(copy[index]) : value;
	      return _extends({}, object || {}, (_extends4 = {}, _extends4[_key] = copy, _extends4));
	    }
	    // indexless array
	    if (rest.length) {
	      var _extends5;
	
	      // need to keep recursing
	      if ((!array || !array.length) && typeof value === 'function') {
	        return object; // don't even set a value under [key]
	      }
	      var _arrayCopy = array.map(function (dest) {
	        return write(rest, value, dest);
	      });
	      return _extends({}, object || {}, (_extends5 = {}, _extends5[_key] = _arrayCopy, _extends5));
	    }
	    var result = void 0;
	    if (Array.isArray(value)) {
	      result = value;
	    } else if (object[_key]) {
	      result = array.map(function (dest) {
	        return typeof value === 'function' ? value(dest) : value;
	      });
	    } else if (typeof value === 'function') {
	      return object; // don't even set a value under [key]
	    } else {
	      result = value;
	    }
	    return _extends({}, object || {}, (_extends6 = {}, _extends6[_key] = result, _extends6));
	  }
	  return _extends({}, object, (_extends7 = {}, _extends7[path] = typeof value === 'function' ? value(object[path]) : value, _extends7));
	};
	
	exports.default = write;

/***/ }),

/***/ 528:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var isPlainObj = __webpack_require__(423);
	
	module.exports = function (obj, opts) {
		if (!isPlainObj(obj)) {
			throw new TypeError('Expected a plain object');
		}
	
		opts = opts || {};
	
		// DEPRECATED
		if (typeof opts === 'function') {
			opts = {compare: opts};
		}
	
		var deep = opts.deep;
		var seenInput = [];
		var seenOutput = [];
	
		var sortKeys = function (x) {
			var seenIndex = seenInput.indexOf(x);
	
			if (seenIndex !== -1) {
				return seenOutput[seenIndex];
			}
	
			var ret = {};
			var keys = Object.keys(x).sort(opts.compare);
	
			seenInput.push(x);
			seenOutput.push(ret);
	
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				var val = x[key];
	
				ret[key] = deep && isPlainObj(val) ? sortKeys(val) : val;
			}
	
			return ret;
		};
	
		return sortKeys(obj);
	};


/***/ }),

/***/ 365:
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = function (str) {
	  return encodeURIComponent(str).replace(/[!'()*]/g, function (x) {
	    return '%' + x.charCodeAt(0).toString(16).toUpperCase();
	  });
	};

/***/ }),

/***/ 531:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/punycode v1.3.2 by @mathias */
	;(function(root) {
	
		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports &&
			!exports.nodeType && exports;
		var freeModule = typeof module == 'object' && module &&
			!module.nodeType && module;
		var freeGlobal = typeof global == 'object' && global;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}
	
		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,
	
		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1
	
		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'
	
		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators
	
		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},
	
		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,
	
		/** Temporary variable */
		key;
	
		/*--------------------------------------------------------------------------*/
	
		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw RangeError(errors[type]);
		}
	
		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}
	
		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}
	
		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}
	
		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}
	
		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}
	
		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}
	
		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * http://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}
	
		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;
	
			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.
	
			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}
	
			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}
	
			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.
	
			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {
	
				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {
	
					if (index >= inputLength) {
						error('invalid-input');
					}
	
					digit = basicToDigit(input.charCodeAt(index++));
	
					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}
	
					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
	
					if (digit < t) {
						break;
					}
	
					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}
	
					w *= baseMinusT;
	
				}
	
				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);
	
				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}
	
				n += floor(i / out);
				i %= out;
	
				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);
	
			}
	
			return ucs2encode(output);
		}
	
		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;
	
			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);
	
			// Cache the length
			inputLength = input.length;
	
			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;
	
			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}
	
			handledCPCount = basicLength = output.length;
	
			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.
	
			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}
	
			// Main encoding loop:
			while (handledCPCount < inputLength) {
	
				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}
	
				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}
	
				delta += (m - n) * handledCPCountPlusOne;
				n = m;
	
				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];
	
					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}
	
					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}
	
						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}
	
				++delta;
				++n;
	
			}
			return output.join('');
		}
	
		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}
	
		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}
	
		/*--------------------------------------------------------------------------*/
	
		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.3.2',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};
	
		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return punycode;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.punycode = punycode;
		}
	
	}(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(78)(module), (function() { return this; }())))

/***/ }),

/***/ 532:
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	var punycode = __webpack_require__(531);
	var util = __webpack_require__(533);
	
	exports.parse = urlParse;
	exports.resolve = urlResolve;
	exports.resolveObject = urlResolveObject;
	exports.format = urlFormat;
	
	exports.Url = Url;
	
	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}
	
	// Reference: RFC 3986, RFC 1808, RFC 2396
	
	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	    portPattern = /:[0-9]*$/,
	
	    // Special case for a simple path URL
	    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
	
	    // RFC 2396: characters reserved for delimiting URLs.
	    // We actually just auto-escape these.
	    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
	
	    // RFC 2396: characters not allowed for various reasons.
	    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
	
	    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	    autoEscape = ['\''].concat(unwise),
	    // Characters that are never ever allowed in a hostname.
	    // Note that any invalid chars are also handled, but these
	    // are the ones that are *expected* to be seen, so we fast-path
	    // them.
	    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	    hostEndingChars = ['/', '?', '#'],
	    hostnameMaxLen = 255,
	    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
	    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
	    // protocols that can allow "unsafe" and "unwise" chars.
	    unsafeProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that never have a hostname.
	    hostlessProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that always contain a // bit.
	    slashedProtocol = {
	      'http': true,
	      'https': true,
	      'ftp': true,
	      'gopher': true,
	      'file': true,
	      'http:': true,
	      'https:': true,
	      'ftp:': true,
	      'gopher:': true,
	      'file:': true
	    },
	    querystring = __webpack_require__(486);
	
	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && util.isObject(url) && url instanceof Url) return url;
	
	  var u = new Url;
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}
	
	Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
	  if (!util.isString(url)) {
	    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
	  }
	
	  // Copy chrome, IE, opera backslash-handling behavior.
	  // Back slashes before the query string get converted to forward slashes
	  // See: https://code.google.com/p/chromium/issues/detail?id=25916
	  var queryIndex = url.indexOf('?'),
	      splitter =
	          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
	      uSplit = url.split(splitter),
	      slashRegex = /\\/g;
	  uSplit[0] = uSplit[0].replace(slashRegex, '/');
	  url = uSplit.join(splitter);
	
	  var rest = url;
	
	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();
	
	  if (!slashesDenoteHost && url.split('#').length === 1) {
	    // Try fast path regexp
	    var simplePath = simplePathPattern.exec(rest);
	    if (simplePath) {
	      this.path = rest;
	      this.href = rest;
	      this.pathname = simplePath[1];
	      if (simplePath[2]) {
	        this.search = simplePath[2];
	        if (parseQueryString) {
	          this.query = querystring.parse(this.search.substr(1));
	        } else {
	          this.query = this.search.substr(1);
	        }
	      } else if (parseQueryString) {
	        this.search = '';
	        this.query = {};
	      }
	      return this;
	    }
	  }
	
	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    this.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }
	
	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }
	
	  if (!hostlessProtocol[proto] &&
	      (slashes || (proto && !slashedProtocol[proto]))) {
	
	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c
	
	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.
	
	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (var i = 0; i < hostEndingChars.length; i++) {
	      var hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	
	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }
	
	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = decodeURIComponent(auth);
	    }
	
	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (var i = 0; i < nonHostChars.length; i++) {
	      var hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1)
	      hostEnd = rest.length;
	
	    this.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);
	
	    // pull out port.
	    this.parseHost();
	
	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';
	
	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = this.hostname[0] === '[' &&
	        this.hostname[this.hostname.length - 1] === ']';
	
	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (var i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) continue;
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }
	
	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      this.hostname = this.hostname.toLowerCase();
	    }
	
	    if (!ipv6Hostname) {
	      // IDNA Support: Returns a punycoded representation of "domain".
	      // It only converts parts of the domain name that
	      // have non-ASCII characters, i.e. it doesn't matter if
	      // you call it with a domain that already is ASCII-only.
	      this.hostname = punycode.toASCII(this.hostname);
	    }
	
	    var p = this.port ? ':' + this.port : '';
	    var h = this.hostname || '';
	    this.host = h + p;
	    this.href += this.host;
	
	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }
	
	  // now rest is set to the post-host stuff.
	  // chop off any delim chars.
	  if (!unsafeProtocol[lowerProto]) {
	
	    // First, make 100% sure that any "autoEscape" chars get
	    // escaped, even if encodeURIComponent doesn't think they
	    // need to be.
	    for (var i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      if (rest.indexOf(ae) === -1)
	        continue;
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }
	
	
	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    this.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      this.query = querystring.parse(this.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    this.search = '';
	    this.query = {};
	  }
	  if (rest) this.pathname = rest;
	  if (slashedProtocol[lowerProto] &&
	      this.hostname && !this.pathname) {
	    this.pathname = '/';
	  }
	
	  //to support http.request
	  if (this.pathname || this.search) {
	    var p = this.pathname || '';
	    var s = this.search || '';
	    this.path = p + s;
	  }
	
	  // finally, reconstruct the href based on what has been validated.
	  this.href = this.format();
	  return this;
	};
	
	// format a parsed object into a url string
	function urlFormat(obj) {
	  // ensure it's an object, and not a string url.
	  // If it's an obj, this is a no-op.
	  // this way, you can call url_format() on strings
	  // to clean up potentially wonky urls.
	  if (util.isString(obj)) obj = urlParse(obj);
	  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
	  return obj.format();
	}
	
	Url.prototype.format = function() {
	  var auth = this.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }
	
	  var protocol = this.protocol || '',
	      pathname = this.pathname || '',
	      hash = this.hash || '',
	      host = false,
	      query = '';
	
	  if (this.host) {
	    host = auth + this.host;
	  } else if (this.hostname) {
	    host = auth + (this.hostname.indexOf(':') === -1 ?
	        this.hostname :
	        '[' + this.hostname + ']');
	    if (this.port) {
	      host += ':' + this.port;
	    }
	  }
	
	  if (this.query &&
	      util.isObject(this.query) &&
	      Object.keys(this.query).length) {
	    query = querystring.stringify(this.query);
	  }
	
	  var search = this.search || (query && ('?' + query)) || '';
	
	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';
	
	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	  // unless they had them to begin with.
	  if (this.slashes ||
	      (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	  } else if (!host) {
	    host = '';
	  }
	
	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	  if (search && search.charAt(0) !== '?') search = '?' + search;
	
	  pathname = pathname.replace(/[?#]/g, function(match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');
	
	  return protocol + host + pathname + search + hash;
	};
	
	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}
	
	Url.prototype.resolve = function(relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};
	
	function urlResolveObject(source, relative) {
	  if (!source) return relative;
	  return urlParse(source, false, true).resolveObject(relative);
	}
	
	Url.prototype.resolveObject = function(relative) {
	  if (util.isString(relative)) {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }
	
	  var result = new Url();
	  var tkeys = Object.keys(this);
	  for (var tk = 0; tk < tkeys.length; tk++) {
	    var tkey = tkeys[tk];
	    result[tkey] = this[tkey];
	  }
	
	  // hash is always overridden, no matter what.
	  // even href="" will remove it.
	  result.hash = relative.hash;
	
	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }
	
	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    var rkeys = Object.keys(relative);
	    for (var rk = 0; rk < rkeys.length; rk++) {
	      var rkey = rkeys[rk];
	      if (rkey !== 'protocol')
	        result[rkey] = relative[rkey];
	    }
	
	    //urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] &&
	        result.hostname && !result.pathname) {
	      result.path = result.pathname = '/';
	    }
	
	    result.href = result.format();
	    return result;
	  }
	
	  if (relative.protocol && relative.protocol !== result.protocol) {
	    // if it's a known url protocol, then changing
	    // the protocol does weird things
	    // first, if it's not file:, then we MUST have a host,
	    // and if there was a path
	    // to begin with, then we MUST have a path.
	    // if it is file:, then the host is dropped,
	    // because that's known to be hostless.
	    // anything else is assumed to be absolute.
	    if (!slashedProtocol[relative.protocol]) {
	      var keys = Object.keys(relative);
	      for (var v = 0; v < keys.length; v++) {
	        var k = keys[v];
	        result[k] = relative[k];
	      }
	      result.href = result.format();
	      return result;
	    }
	
	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      var relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift()));
	      if (!relative.host) relative.host = '';
	      if (!relative.hostname) relative.hostname = '';
	      if (relPath[0] !== '') relPath.unshift('');
	      if (relPath.length < 2) relPath.unshift('');
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }
	
	  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
	      isRelAbs = (
	          relative.host ||
	          relative.pathname && relative.pathname.charAt(0) === '/'
	      ),
	      mustEndAbs = (isRelAbs || isSourceAbs ||
	                    (result.host && relative.pathname)),
	      removeAllDots = mustEndAbs,
	      srcPath = result.pathname && result.pathname.split('/') || [],
	      relPath = relative.pathname && relative.pathname.split('/') || [],
	      psychotic = result.protocol && !slashedProtocol[result.protocol];
	
	  // if the url is a non-slashed url, then relative
	  // links like ../.. should be able
	  // to crawl up to the hostname, as well.  This is strange.
	  // result.protocol has already been set by now.
	  // Later on, put the first path part into the host field.
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') srcPath[0] = result.host;
	      else srcPath.unshift(result.host);
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') relPath[0] = relative.host;
	        else relPath.unshift(relative.host);
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }
	
	  if (isRelAbs) {
	    // it's absolute.
	    result.host = (relative.host || relative.host === '') ?
	                  relative.host : result.host;
	    result.hostname = (relative.hostname || relative.hostname === '') ?
	                      relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	    // it's relative
	    // throw away the existing file, and take the new path instead.
	    if (!srcPath) srcPath = [];
	    srcPath.pop();
	    srcPath = srcPath.concat(relPath);
	    result.search = relative.search;
	    result.query = relative.query;
	  } else if (!util.isNullOrUndefined(relative.search)) {
	    // just pull out the search.
	    // like href='?foo'.
	    // Put this after the other two cases because it simplifies the booleans
	    if (psychotic) {
	      result.hostname = result.host = srcPath.shift();
	      //occationaly the auth can get stuck only in host
	      //this especially happens in cases like
	      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	      var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                       result.host.split('@') : false;
	      if (authInHost) {
	        result.auth = authInHost.shift();
	        result.host = result.hostname = authInHost.shift();
	      }
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    //to support http.request
	    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
	      result.path = (result.pathname ? result.pathname : '') +
	                    (result.search ? result.search : '');
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  if (!srcPath.length) {
	    // no path at all.  easy.
	    // we've already handled the other stuff above.
	    result.pathname = null;
	    //to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  // if a url ENDs in . or .., then it must get a trailing slash.
	  // however, if it ends in anything else non-slashy,
	  // then it must NOT get a trailing slash.
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (
	      (result.host || relative.host || srcPath.length > 1) &&
	      (last === '.' || last === '..') || last === '');
	
	  // strip single dots, resolve double dots to parent dir
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last === '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }
	
	  if (mustEndAbs && srcPath[0] !== '' &&
	      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }
	
	  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
	    srcPath.push('');
	  }
	
	  var isAbsolute = srcPath[0] === '' ||
	      (srcPath[0] && srcPath[0].charAt(0) === '/');
	
	  // put the host back
	  if (psychotic) {
	    result.hostname = result.host = isAbsolute ? '' :
	                                    srcPath.length ? srcPath.shift() : '';
	    //occationaly the auth can get stuck only in host
	    //this especially happens in cases like
	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	    var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                     result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.host = result.hostname = authInHost.shift();
	    }
	  }
	
	  mustEndAbs = mustEndAbs || (result.host && srcPath.length);
	
	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }
	
	  if (!srcPath.length) {
	    result.pathname = null;
	    result.path = null;
	  } else {
	    result.pathname = srcPath.join('/');
	  }
	
	  //to support request.http
	  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
	    result.path = (result.pathname ? result.pathname : '') +
	                  (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};
	
	Url.prototype.parseHost = function() {
	  var host = this.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) this.hostname = host;
	};


/***/ }),

/***/ 533:
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = {
	  isString: function(arg) {
	    return typeof(arg) === 'string';
	  },
	  isObject: function(arg) {
	    return typeof(arg) === 'object' && arg !== null;
	  },
	  isNull: function(arg) {
	    return arg === null;
	  },
	  isNullOrUndefined: function(arg) {
	    return arg == null;
	  }
	};


/***/ }),

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isFQDN;
	
	var _assertString = __webpack_require__(53);
	
	var _assertString2 = _interopRequireDefault(_assertString);
	
	var _merge = __webpack_require__(121);
	
	var _merge2 = _interopRequireDefault(_merge);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var default_fqdn_options = {
	  require_tld: true,
	  allow_underscores: false,
	  allow_trailing_dot: false
	};
	
	function isFQDN(str, options) {
	  (0, _assertString2.default)(str);
	  options = (0, _merge2.default)(options, default_fqdn_options);
	
	  /* Remove the optional trailing dot before checking validity */
	  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
	    str = str.substring(0, str.length - 1);
	  }
	  var parts = str.split('.');
	  for (var i = 0; i < parts.length; i++) {
	    if (parts[i].length > 63) {
	      return false;
	    }
	  }
	  if (options.require_tld) {
	    var tld = parts.pop();
	    if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
	      return false;
	    }
	    // disallow spaces
	    if (/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20]/.test(tld)) {
	      return false;
	    }
	  }
	  for (var part, _i = 0; _i < parts.length; _i++) {
	    part = parts[_i];
	    if (options.allow_underscores) {
	      part = part.replace(/_/g, '');
	    }
	    if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
	      return false;
	    }
	    // disallow full-width chars
	    if (/[\uff01-\uff5e]/.test(part)) {
	      return false;
	    }
	    if (part[0] === '-' || part[part.length - 1] === '-') {
	      return false;
	    }
	  }
	  return true;
	}
	module.exports = exports['default'];

/***/ }),

/***/ 273:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isIP;
	
	var _assertString = __webpack_require__(53);
	
	var _assertString2 = _interopRequireDefault(_assertString);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ipv4Maybe = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
	var ipv6Block = /^[0-9A-F]{1,4}$/i;
	
	function isIP(str) {
	  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	
	  (0, _assertString2.default)(str);
	  version = String(version);
	  if (!version) {
	    return isIP(str, 4) || isIP(str, 6);
	  } else if (version === '4') {
	    if (!ipv4Maybe.test(str)) {
	      return false;
	    }
	    var parts = str.split('.').sort(function (a, b) {
	      return a - b;
	    });
	    return parts[3] <= 255;
	  } else if (version === '6') {
	    var blocks = str.split(':');
	    var foundOmissionBlock = false; // marker to indicate ::
	
	    // At least some OS accept the last 32 bits of an IPv6 address
	    // (i.e. 2 of the blocks) in IPv4 notation, and RFC 3493 says
	    // that '::ffff:a.b.c.d' is valid for IPv4-mapped IPv6 addresses,
	    // and '::a.b.c.d' is deprecated, but also valid.
	    var foundIPv4TransitionBlock = isIP(blocks[blocks.length - 1], 4);
	    var expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;
	
	    if (blocks.length > expectedNumberOfBlocks) {
	      return false;
	    }
	    // initial or final ::
	    if (str === '::') {
	      return true;
	    } else if (str.substr(0, 2) === '::') {
	      blocks.shift();
	      blocks.shift();
	      foundOmissionBlock = true;
	    } else if (str.substr(str.length - 2) === '::') {
	      blocks.pop();
	      blocks.pop();
	      foundOmissionBlock = true;
	    }
	
	    for (var i = 0; i < blocks.length; ++i) {
	      // test for a :: which can not be at the string start/end
	      // since those cases have been handled above
	      if (blocks[i] === '' && i > 0 && i < blocks.length - 1) {
	        if (foundOmissionBlock) {
	          return false; // multiple :: in address
	        }
	        foundOmissionBlock = true;
	      } else if (foundIPv4TransitionBlock && i === blocks.length - 1) {
	        // it has been checked before that the last
	        // block is a valid IPv4 address
	      } else if (!ipv6Block.test(blocks[i])) {
	        return false;
	      }
	    }
	    if (foundOmissionBlock) {
	      return blocks.length >= 1;
	    }
	    return blocks.length === expectedNumberOfBlocks;
	  }
	  return false;
	}
	module.exports = exports['default'];

/***/ }),

/***/ 534:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isURL;
	
	var _assertString = __webpack_require__(53);
	
	var _assertString2 = _interopRequireDefault(_assertString);
	
	var _isFQDN = __webpack_require__(272);
	
	var _isFQDN2 = _interopRequireDefault(_isFQDN);
	
	var _isIP = __webpack_require__(273);
	
	var _isIP2 = _interopRequireDefault(_isIP);
	
	var _merge = __webpack_require__(121);
	
	var _merge2 = _interopRequireDefault(_merge);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var default_url_options = {
	  protocols: ['http', 'https', 'ftp'],
	  require_tld: true,
	  require_protocol: false,
	  require_host: true,
	  require_valid_protocol: true,
	  allow_underscores: false,
	  allow_trailing_dot: false,
	  allow_protocol_relative_urls: false
	};
	
	var wrapped_ipv6 = /^\[([^\]]+)\](?::([0-9]+))?$/;
	
	function isRegExp(obj) {
	  return Object.prototype.toString.call(obj) === '[object RegExp]';
	}
	
	function checkHost(host, matches) {
	  for (var i = 0; i < matches.length; i++) {
	    var match = matches[i];
	    if (host === match || isRegExp(match) && match.test(host)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	function isURL(url, options) {
	  (0, _assertString2.default)(url);
	  if (!url || url.length >= 2083 || /[\s<>]/.test(url)) {
	    return false;
	  }
	  if (url.indexOf('mailto:') === 0) {
	    return false;
	  }
	  options = (0, _merge2.default)(options, default_url_options);
	  var protocol = void 0,
	      auth = void 0,
	      host = void 0,
	      hostname = void 0,
	      port = void 0,
	      port_str = void 0,
	      split = void 0,
	      ipv6 = void 0;
	
	  split = url.split('#');
	  url = split.shift();
	
	  split = url.split('?');
	  url = split.shift();
	
	  split = url.split('://');
	  if (split.length > 1) {
	    protocol = split.shift().toLowerCase();
	    if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
	      return false;
	    }
	  } else if (options.require_protocol) {
	    return false;
	  } else if (url.substr(0, 2) === '//') {
	    if (!options.allow_protocol_relative_urls) {
	      return false;
	    }
	    split[0] = url.substr(2);
	  }
	  url = split.join('://');
	
	  if (url === '') {
	    return false;
	  }
	
	  split = url.split('/');
	  url = split.shift();
	
	  if (url === '' && !options.require_host) {
	    return true;
	  }
	
	  split = url.split('@');
	  if (split.length > 1) {
	    auth = split.shift();
	    if (auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
	      return false;
	    }
	  }
	  hostname = split.join('@');
	
	  port_str = null;
	  ipv6 = null;
	  var ipv6_match = hostname.match(wrapped_ipv6);
	  if (ipv6_match) {
	    host = '';
	    ipv6 = ipv6_match[1];
	    port_str = ipv6_match[2] || null;
	  } else {
	    split = hostname.split(':');
	    host = split.shift();
	    if (split.length) {
	      port_str = split.join(':');
	    }
	  }
	
	  if (port_str !== null) {
	    port = parseInt(port_str, 10);
	    if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
	      return false;
	    }
	  }
	
	  if (!(0, _isIP2.default)(host) && !(0, _isFQDN2.default)(host, options) && (!ipv6 || !(0, _isIP2.default)(ipv6, 6))) {
	    return false;
	  }
	
	  host = host || ipv6;
	
	  if (options.host_whitelist && !checkHost(host, options.host_whitelist)) {
	    return false;
	  }
	  if (options.host_blacklist && checkHost(host, options.host_blacklist)) {
	    return false;
	  }
	
	  return true;
	}
	module.exports = exports['default'];

/***/ }),

/***/ 53:
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.default = assertString;
	function assertString(input) {
	  var isString = typeof input === 'string' || input instanceof String;
	
	  if (!isString) {
	    var invalidType = void 0;
	    if (input === null) {
	      invalidType = 'null';
	    } else {
	      invalidType = typeof input === 'undefined' ? 'undefined' : _typeof(input);
	      if (invalidType === 'object' && input.constructor && input.constructor.hasOwnProperty('name')) {
	        invalidType = input.constructor.name;
	      } else {
	        invalidType = 'a ' + invalidType;
	      }
	    }
	    throw new TypeError('Expected string but received ' + invalidType + '.');
	  }
	}
	module.exports = exports['default'];

/***/ }),

/***/ 121:
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = merge;
	function merge() {
	  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var defaults = arguments[1];
	
	  for (var key in defaults) {
	    if (typeof obj[key] === 'undefined') {
	      obj[key] = defaults[key];
	    }
	  }
	  return obj;
	}
	module.exports = exports['default'];

/***/ }),

/***/ 366:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _Button = __webpack_require__(37);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function BlockSaveButton(props) {
	  return _react2.default.createElement(
	    _Button2.default,
	    _extends({ block: true, bsStyle: 'primary' }, props, { type: 'submit' }),
	    props.children || 'Save'
	  );
	}
	
	BlockSaveButton.displayName = 'BlockSaveButton';
	BlockSaveButton.propTypes = {
	  children: _propTypes2.default.any
	};
	
	exports.default = BlockSaveButton;
	module.exports = exports['default'];

/***/ }),

/***/ 367:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var propTypes = {
	  children: _propTypes2.default.node
	};
	
	var style = {
	  padding: '0 15px'
	};
	
	function BlockSaveWrapper(_ref) {
	  var children = _ref.children;
	
	  return _react2.default.createElement(
	    'div',
	    { style: style },
	    children
	  );
	}
	
	BlockSaveWrapper.displayName = 'BlockSaveWrapper';
	BlockSaveWrapper.propTypes = propTypes;
	
	exports.default = BlockSaveWrapper;
	module.exports = exports['default'];

/***/ }),

/***/ 368:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.DynamicForm = DynamicForm;
	exports.default = Form;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _reduxForm = __webpack_require__(188);
	
	var _ = __webpack_require__(194);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var propTypes = {
	  buttonText: _propTypes2.default.string,
	  enableSubmit: _propTypes2.default.bool,
	  errors: _propTypes2.default.object,
	  fields: _propTypes2.default.objectOf(_propTypes2.default.shape({
	    name: _propTypes2.default.string.isRequired,
	    onChange: _propTypes2.default.func.isRequired,
	    value: _propTypes2.default.string.isRequired
	  })),
	  formFields: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
	  handleSubmit: _propTypes2.default.func,
	  hideButton: _propTypes2.default.bool,
	  id: _propTypes2.default.string.isRequired,
	  initialValues: _propTypes2.default.object,
	  options: _propTypes2.default.shape({
	    ignored: _propTypes2.default.arrayOf(_propTypes2.default.string),
	    required: _propTypes2.default.arrayOf(_propTypes2.default.string),
	    types: _propTypes2.default.objectOf(_propTypes2.default.string)
	  }),
	  submit: _propTypes2.default.func.isRequired
	};
	
	function DynamicForm(_ref) {
	  var errors = _ref.errors,
	      fields = _ref.fields,
	      handleSubmit = _ref.handleSubmit,
	      allPristine = _ref.fields._meta.allPristine,
	      buttonText = _ref.buttonText,
	      enableSubmit = _ref.enableSubmit,
	      hideButton = _ref.hideButton,
	      id = _ref.id,
	      options = _ref.options,
	      submit = _ref.submit;
	
	  return _react2.default.createElement(
	    'form',
	    {
	      id: 'dynamic-' + id,
	      onSubmit: handleSubmit(submit),
	      style: { width: '100%' }
	    },
	    _react2.default.createElement(_.FormFields, { errors: errors, fields: fields, options: options }),
	    _react2.default.createElement(
	      _.BlockSaveWrapper,
	      null,
	      hideButton ? null : _react2.default.createElement(
	        _.BlockSaveButton,
	        {
	          disabled: allPristine && !enableSubmit || !!Object.keys(errors).filter(function (key) {
	            return errors[key];
	          }).length
	        },
	        buttonText ? buttonText : null
	      )
	    )
	  );
	}
	
	DynamicForm.displayName = 'DynamicForm';
	DynamicForm.propTypes = propTypes;
	
	var DynamicFormWithRedux = (0, _reduxForm.reduxForm)()(DynamicForm);
	
	function Form(props) {
	  return _react2.default.createElement(DynamicFormWithRedux, _extends({}, props, {
	    fields: props.formFields,
	    form: props.id
	  }));
	}
	
	Form.propTypes = propTypes;

/***/ }),

/***/ 369:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _kebabCase = __webpack_require__(470);
	
	var _kebabCase2 = _interopRequireDefault(_kebabCase);
	
	var _startCase = __webpack_require__(471);
	
	var _startCase2 = _interopRequireDefault(_startCase);
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _Alert = __webpack_require__(233);
	
	var _Alert2 = _interopRequireDefault(_Alert);
	
	var _Col = __webpack_require__(141);
	
	var _Col2 = _interopRequireDefault(_Col);
	
	var _ControlLabel = __webpack_require__(234);
	
	var _ControlLabel2 = _interopRequireDefault(_ControlLabel);
	
	var _FormControl = __webpack_require__(487);
	
	var _FormControl2 = _interopRequireDefault(_FormControl);
	
	var _HelpBlock = __webpack_require__(491);
	
	var _HelpBlock2 = _interopRequireDefault(_HelpBlock);
	
	__webpack_require__(419);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var propTypes = {
	  errors: _propTypes2.default.objectOf(_propTypes2.default.string),
	  fields: _propTypes2.default.objectOf(_propTypes2.default.shape({
	    name: _propTypes2.default.string.isRequired,
	    onChange: _propTypes2.default.func.isRequired,
	    value: _propTypes2.default.string.isRequired
	  })).isRequired,
	  options: _propTypes2.default.shape({
	    errors: _propTypes2.default.objectOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(null)])),
	    ignored: _propTypes2.default.arrayOf(_propTypes2.default.string),
	    placeholder: _propTypes2.default.bool,
	    required: _propTypes2.default.arrayOf(_propTypes2.default.string),
	    types: _propTypes2.default.objectOf(_propTypes2.default.string)
	  })
	};
	
	function FormFields(props) {
	  var _props$errors = props.errors,
	      errors = _props$errors === undefined ? {} : _props$errors,
	      fields = props.fields,
	      _props$options = props.options,
	      options = _props$options === undefined ? {} : _props$options;
	  var _options$ignored = options.ignored,
	      ignored = _options$ignored === undefined ? [] : _options$ignored,
	      _options$placeholder = options.placeholder,
	      placeholder = _options$placeholder === undefined ? true : _options$placeholder,
	      _options$required = options.required,
	      required = _options$required === undefined ? [] : _options$required,
	      _options$types = options.types,
	      types = _options$types === undefined ? {} : _options$types;
	
	  return _react2.default.createElement(
	    'div',
	    null,
	    Object.keys(fields).filter(function (field) {
	      return !ignored.includes(field);
	    }).map(function (key) {
	      return fields[key];
	    }).map(function (_ref) {
	      var name = _ref.name,
	          onChange = _ref.onChange,
	          value = _ref.value,
	          pristine = _ref.pristine;
	
	      var key = (0, _kebabCase2.default)(name);
	      var type = name in types ? types[name] : 'text';
	      return _react2.default.createElement(
	        'div',
	        { className: 'inline-form-field', key: key },
	        _react2.default.createElement(
	          _Col2.default,
	          { sm: 3, xs: 12 },
	          type === 'hidden' ? null : _react2.default.createElement(
	            _ControlLabel2.default,
	            { htmlFor: key },
	            (0, _startCase2.default)(name)
	          )
	        ),
	        _react2.default.createElement(
	          _Col2.default,
	          { sm: 9, xs: 12 },
	          _react2.default.createElement(_FormControl2.default, {
	            bsSize: 'lg',
	            componentClass: type === 'textarea' ? type : 'input',
	            id: key,
	            name: name,
	            onChange: onChange,
	            placeholder: placeholder ? name : '',
	            required: required.includes(name),
	            rows: 4,
	            type: type,
	            value: value
	          }),
	          name in errors && !pristine ? _react2.default.createElement(
	            _HelpBlock2.default,
	            null,
	            _react2.default.createElement(
	              _Alert2.default,
	              { bsStyle: 'danger' },
	              errors[name]
	            )
	          ) : null
	        )
	      );
	    })
	  );
	}
	
	FormFields.displayName = 'FormFields';
	FormFields.propTypes = propTypes;
	
	exports.default = FormFields;
	module.exports = exports['default'];

/***/ }),

/***/ 419:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.FormFields = exports.Form = exports.BlockSaveWrapper = exports.BlockSaveButton = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _BlockSaveButton = __webpack_require__(366);
	
	Object.defineProperty(exports, 'BlockSaveButton', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_BlockSaveButton).default;
	  }
	});
	
	var _BlockSaveWrapper = __webpack_require__(367);
	
	Object.defineProperty(exports, 'BlockSaveWrapper', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_BlockSaveWrapper).default;
	  }
	});
	
	var _Form = __webpack_require__(368);
	
	Object.defineProperty(exports, 'Form', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Form).default;
	  }
	});
	
	var _FormFields = __webpack_require__(369);
	
	Object.defineProperty(exports, 'FormFields', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_FormFields).default;
	  }
	});
	exports.callIfDefined = callIfDefined;
	exports.formatUrl = formatUrl;
	exports.isValidURL = isValidURL;
	exports.makeOptional = makeOptional;
	exports.makeRequired = makeRequired;
	exports.createFormValidator = createFormValidator;
	exports.getValidationState = getValidationState;
	
	var _normalizeUrl = __webpack_require__(476);
	
	var _normalizeUrl2 = _interopRequireDefault(_normalizeUrl);
	
	var _isURL = __webpack_require__(534);
	
	var _isURL2 = _interopRequireDefault(_isURL);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var normalizeOptions = {
	  stripWWW: false
	};
	
	// callIfDefined(fn: (Any) => Any) => (value: Any) => Any
	function callIfDefined(fn) {
	  return function (value) {
	    return value ? fn(value) : value;
	  };
	}
	
	// formatUrl(url: String) => String
	function formatUrl(url) {
	  if (typeof url === 'string' && url.length > 4 && url.indexOf('.') !== -1) {
	    // prevent trailing / from being stripped during typing
	    var lastChar = '';
	    if (url.substring(url.length - 1) === '/') {
	      lastChar = '/';
	    }
	    // prevent normalize-url from stripping last dot during typing
	    if (url.substring(url.length - 1) === '.') {
	      lastChar = '.';
	    }
	    return (0, _normalizeUrl2.default)(url, normalizeOptions) + lastChar;
	  }
	  return url;
	}
	
	function isValidURL(data) {
	  /* eslint-disable camelcase */
	  return (0, _isURL2.default)(data, { require_protocol: true });
	  /* eslint-enable camelcase */
	}
	
	function makeOptional(validator) {
	  return function (val) {
	    return val ? validator(val) : true;
	  };
	}
	
	function makeRequired(validator) {
	  return function (val) {
	    return val ? validator(val) : false;
	  };
	}
	
	function createFormValidator(fieldValidators) {
	  var fieldKeys = Object.keys(fieldValidators);
	  return function (values) {
	    return fieldKeys.map(function (field) {
	      var _ref;
	
	      if (fieldValidators[field](values[field])) {
	        return null;
	      }
	      return _ref = {}, _ref[field] = !fieldValidators[field](values[field]), _ref;
	    }).filter(Boolean).reduce(function (errors, error) {
	      return _extends({}, errors, error);
	    }, {});
	  };
	}
	
	function getValidationState(field) {
	  if (field.pristine) {
	    return null;
	  }
	
	  if (/https?:\/\/glitch\.com\/edit\/#!\/.*/g.test(field.value)) {
	    return 'glitch-warning';
	  }
	
	  return field.error ? 'error' : 'success';
	}

/***/ }),

/***/ 195:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var propTypes = {
	  children: _propTypes2.default.string,
	  isCompleted: _propTypes2.default.bool
	};
	
	function ChallengeTitle(_ref) {
	  var children = _ref.children,
	      isCompleted = _ref.isCompleted;
	
	  console.log(children);
	
	  var icon = null;
	  if (isCompleted) {
	    icon =
	    // TODO Use SVG here
	    _react2.default.createElement('i', { className: 'ion-checkmark-circled text-primary', title: 'Completed' });
	  }
	  return _react2.default.createElement(
	    'h2',
	    { className: 'text-center challenge-title' },
	    children || 'Happy Coding!',
	    icon
	  );
	}
	
	ChallengeTitle.displayName = 'ChallengeTitle';
	ChallengeTitle.propTypes = propTypes;
	
	exports.default = ChallengeTitle;
	module.exports = exports['default'];

/***/ }),

/***/ 196:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.CompletionModal = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _noop = __webpack_require__(185);
	
	var _noop2 = _interopRequireDefault(_noop);
	
	var _reactRedux = __webpack_require__(21);
	
	var _reselect = __webpack_require__(45);
	
	var _Button = __webpack_require__(37);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _Modal = __webpack_require__(75);
	
	var _Modal2 = _interopRequireDefault(_Modal);
	
	var _analytics = __webpack_require__(79);
	
	var _analytics2 = _interopRequireDefault(_analytics);
	
	var _GreenPass = __webpack_require__(167);
	
	var _GreenPass2 = _interopRequireDefault(_GreenPass);
	
	var _utils = __webpack_require__(123);
	
	__webpack_require__(218);
	
	var _redux = __webpack_require__(19);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var mapStateToProps = (0, _reselect.createSelector)(_redux.challengeFilesSelector, _redux.challengeMetaSelector, _redux.isCompletionModalOpenSelector, _redux.successMessageSelector, function (files, _ref, isOpen, message) {
	  var title = _ref.title;
	  return {
	    files: files,
	    title: title,
	    isOpen: isOpen,
	    message: message
	  };
	});
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  var dispatchers = {
	    close: function close() {
	      return dispatch((0, _redux.closeModal)('completion'));
	    },
	    handleKeypress: function handleKeypress(e) {
	      if (e.keyCode === 13 && (e.ctrlKey || e.metaKey)) {
	        dispatch((0, _redux.submitChallenge)());
	      }
	    },
	    submitChallenge: function submitChallenge() {
	      dispatch((0, _redux.submitChallenge)());
	    }
	  };
	  return function () {
	    return dispatchers;
	  };
	};
	
	var propTypes = {
	  close: _propTypes2.default.func.isRequired,
	  files: _propTypes2.default.object.isRequired,
	  handleKeypress: _propTypes2.default.func.isRequired,
	  isOpen: _propTypes2.default.bool,
	  message: _propTypes2.default.string,
	  submitChallenge: _propTypes2.default.func.isRequired,
	  title: _propTypes2.default.string
	};
	
	var CompletionModal = exports.CompletionModal = function (_PureComponent) {
	  _inherits(CompletionModal, _PureComponent);
	
	  function CompletionModal() {
	    _classCallCheck(this, CompletionModal);
	
	    return _possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
	  }
	
	  CompletionModal.prototype.render = function render() {
	    var _props = this.props,
	        close = _props.close,
	        isOpen = _props.isOpen,
	        submitChallenge = _props.submitChallenge,
	        handleKeypress = _props.handleKeypress,
	        message = _props.message,
	        _props$files = _props.files,
	        files = _props$files === undefined ? {} : _props$files,
	        title = _props.title;
	
	    if (isOpen) {
	      _analytics2.default.modalview('/completion-modal');
	    }
	    var showDownloadButton = Object.keys(files).length;
	    var filesForDownload = Object.keys(files).map(function (key) {
	      return files[key];
	    }).reduce(function (allFiles, _ref2) {
	      var _extends2;
	
	      var path = _ref2.path,
	          contents = _ref2.contents;
	      return _extends({}, allFiles, (_extends2 = {}, _extends2[path] = contents, _extends2));
	    }, {});
	    var dashedName = (0, _utils.dasherize)(title);
	    return _react2.default.createElement(
	      _Modal2.default,
	      {
	        animation: false,
	        bsSize: 'lg',
	        dialogClassName: 'challenge-success-modal',
	        keyboard: true,
	        onHide: close,
	        onKeyDown: isOpen ? handleKeypress : _noop2.default,
	        show: isOpen
	      },
	      _react2.default.createElement(
	        _Modal2.default.Header,
	        {
	          className: 'challenge-list-header fcc-modal',
	          closeButton: true
	        },
	        _react2.default.createElement(
	          _Modal2.default.Title,
	          { className: 'text-center' },
	          message
	        )
	      ),
	      _react2.default.createElement(
	        _Modal2.default.Body,
	        { className: 'completion-modal-body' },
	        _react2.default.createElement(
	          'div',
	          { className: 'success-icon-wrapper' },
	          _react2.default.createElement(_GreenPass2.default, null)
	        )
	      ),
	      _react2.default.createElement(
	        _Modal2.default.Footer,
	        null,
	        _react2.default.createElement(
	          _Button2.default,
	          {
	            block: true,
	            bsSize: 'large',
	            bsStyle: 'primary',
	            onClick: submitChallenge
	          },
	          '\u7EE7\u7EED\u95EF\u5173'
	        ),
	        showDownloadButton ? _react2.default.createElement(
	          _Button2.default,
	          {
	            block: true,
	            bsSize: 'lg',
	            bsStyle: 'primary',
	            className: 'btn-primary-invert',
	            download: dashedName + '.json',
	            href: 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filesForDownload))
	          },
	          '\u4E0B\u8F7D\u4EE3\u7801'
	        ) : null
	      )
	    );
	  };
	
	  return CompletionModal;
	}(_react.PureComponent);
	
	CompletionModal.displayName = 'CompletionModal';
	CompletionModal.propTypes = propTypes;
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CompletionModal);

/***/ }),

/***/ 372:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.HelpModal = undefined;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _redux = __webpack_require__(27);
	
	var _reactRedux = __webpack_require__(21);
	
	var _Button = __webpack_require__(37);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _Modal = __webpack_require__(75);
	
	var _Modal2 = _interopRequireDefault(_Modal);
	
	var _analytics = __webpack_require__(79);
	
	var _analytics2 = _interopRequireDefault(_analytics);
	
	var _redux2 = __webpack_require__(19);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return { isOpen: (0, _redux2.isHelpModalOpenSelector)(state) };
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return (0, _redux.bindActionCreators)({ createQuestion: _redux2.createQuestion, closeHelpModal: function closeHelpModal() {
	      return (0, _redux2.closeModal)('help');
	    } }, dispatch);
	};
	
	var propTypes = {
	  closeHelpModal: _propTypes2.default.func.isRequired,
	  createQuestion: _propTypes2.default.func.isRequired,
	  isOpen: _propTypes2.default.bool
	};
	
	var RSA = 'https://forum.freecodecamp.one/t/topic/157';
	
	var HelpModal = exports.HelpModal = function (_PureComponent) {
	  _inherits(HelpModal, _PureComponent);
	
	  function HelpModal() {
	    _classCallCheck(this, HelpModal);
	
	    return _possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
	  }
	
	  HelpModal.prototype.render = function render() {
	    var _props = this.props,
	        isOpen = _props.isOpen,
	        closeHelpModal = _props.closeHelpModal,
	        createQuestion = _props.createQuestion;
	
	    if (isOpen) {
	      _analytics2.default.modalview('/help-modal');
	    }
	    return _react2.default.createElement(
	      _Modal2.default,
	      { onHide: closeHelpModal, show: isOpen },
	      _react2.default.createElement(
	        _Modal2.default.Header,
	        {
	          className: 'help-modal-header fcc-modal',
	          closeButton: true
	        },
	        _react2.default.createElement(
	          _Modal2.default.Title,
	          { className: 'text-center' },
	          '\u6BCF\u53EA\u8001\u9E1F\u90FD\u662F\u4ECE\u83DC\u9E1F\u9636\u6BB5\u8D70\u8FC7\u6765\u7684'
	        )
	      ),
	      _react2.default.createElement(
	        _Modal2.default.Body,
	        { className: 'text-center' },
	        _react2.default.createElement(
	          'h3',
	          null,
	          '\u5982\u679C\u4F60\u901A\u8FC7 \xA0',
	          _react2.default.createElement(
	            'a',
	            { href: RSA, target: '_blank', title: 'Read, search, ask' },
	            'Read-Search-Ask'
	          ),
	          '\xA0 \u65B9\u6CD5\u4F9D\u7136\u4E0D\u80FD\u89E3\u51B3\u95EE\u9898\uFF0C\u4F60\u6700\u540E\u8FD8\u53EF\u4EE5\u5728\u793E\u533A\u8BBA\u575B\u4E0A\u6C42\u52A9\u3002'
	        ),
	        _react2.default.createElement(
	          _Button2.default,
	          {
	            block: true,
	            bsSize: 'lg',
	            bsStyle: 'primary',
	            onClick: createQuestion
	          },
	          '\u5728\u793E\u533A\u8BBA\u575B\u53D1\u5E03\u4E00\u4E2A\u6C42\u52A9\u5E16\u5B50\u3002'
	        ),
	        _react2.default.createElement(
	          _Button2.default,
	          {
	            block: true,
	            bsSize: 'lg',
	            bsStyle: 'primary',
	            onClick: closeHelpModal
	          },
	          '\u6211\u7A81\u7136\u627E\u5230\u4E86\u89E3\u51B3\u529E\u6CD5\uFF0C\u4E0D\u7528\u6C42\u52A9\u4E86\u3002'
	        )
	      )
	    );
	  };
	
	  return HelpModal;
	}(_react.PureComponent);
	
	HelpModal.displayName = 'HelpModal';
	HelpModal.propTypes = propTypes;
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(HelpModal);

/***/ }),

/***/ 218:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 916:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.ProjectForm = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _formHelpers = __webpack_require__(194);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var propTypes = {
	  isFrontEnd: _propTypes2.default.bool,
	  isSubmitting: _propTypes2.default.bool,
	  openModal: _propTypes2.default.func.isRequired,
	  updateProjectForm: _propTypes2.default.func.isRequired
	};
	
	var frontEndFields = ['solution'];
	var backEndFields = ['solution', 'githubLink'];
	
	// const fieldValidators = {
	//   solution: makeRequired(isValidURL)
	// };
	
	// const backEndFieldValidators = {
	//   ...fieldValidators,
	//   githubLink: makeRequired(isValidURL)
	// };
	
	var options = {
	  types: {
	    solution: 'url',
	    githubLink: 'url'
	  },
	  required: ['solution', 'githubLink']
	};
	
	var ProjectForm = exports.ProjectForm = function (_PureComponent) {
	  _inherits(ProjectForm, _PureComponent);
	
	  function ProjectForm(props) {
	    _classCallCheck(this, ProjectForm);
	
	    var _this = _possibleConstructorReturn(this, _PureComponent.call(this, props));
	
	    _this.state = {
	      keysDown: {
	        Control: false,
	        Enter: false
	      }
	    };
	    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
	    _this.handleKeyUp = _this.handleKeyUp.bind(_this);
	    _this.handleSubmit = _this.handleSubmit.bind(_this);
	    return _this;
	  }
	
	  ProjectForm.prototype.componentDidMount = function componentDidMount() {
	    this.props.updateProjectForm({});
	    window.addEventListener('keydown', this.handleKeyDown);
	    window.addEventListener('keyup', this.handleKeyUp);
	  };
	
	  ProjectForm.prototype.componentDidUpdate = function componentDidUpdate() {
	    this.props.updateProjectForm({});
	  };
	
	  ProjectForm.prototype.componentWillUnmount = function componentWillUnmount() {
	    window.removeEventListener('keydown', this.handleKeyDown);
	    window.removeEventListener('keyup', this.handleKeyUp);
	  };
	
	  ProjectForm.prototype.handleKeyDown = function handleKeyDown(e) {
	    if (e.key === 'Control') {
	      this.setState(function (state) {
	        return _extends({}, state, {
	          keysDown: _extends({}, state.keysDown, { Control: true })
	        });
	      });
	    }
	    if (e.key === 'Enter') {
	      this.setState(function (state) {
	        return _extends({}, state, {
	          keysDown: _extends({}, state.keysDown, { Enter: true })
	        });
	      });
	    }
	  };
	
	  ProjectForm.prototype.handleKeyUp = function handleKeyUp(e) {
	    if (e.key === 'Control') {
	      this.setState(function (state) {
	        return _extends({}, state, {
	          keysDown: _extends({}, state.keysDown, { Control: false })
	        });
	      });
	    }
	    if (e.key === 'Enter') {
	      this.setState(function (state) {
	        return _extends({}, state, {
	          keysDown: _extends({}, state.keysDown, { Enter: false })
	        });
	      });
	    }
	  };
	
	  ProjectForm.prototype.handleSubmit = function handleSubmit(values) {
	    var _state$keysDown = this.state.keysDown,
	        Control = _state$keysDown.Control,
	        Enter = _state$keysDown.Enter;
	
	    if (Control && Enter || !Enter) {
	      this.props.openModal('completion');
	      this.props.updateProjectForm(values);
	    }
	  };
	
	  ProjectForm.prototype.render = function render() {
	    var _props = this.props,
	        isSubmitting = _props.isSubmitting,
	        isFrontEnd = _props.isFrontEnd;
	
	    var buttonCopy = isSubmitting ? 'Submit and go to my next challenge' : "I've completed this challenge";
	    return _react2.default.createElement(_formHelpers.Form, {
	      buttonText: buttonCopy + ' (Ctrl + Enter)',
	      formFields: isFrontEnd ? frontEndFields : backEndFields,
	      id: isFrontEnd ? 'front-end-form' : 'back-end-form',
	      options: options,
	      submit: this.handleSubmit
	      // validate={createFormValidator(
	      //   isFrontEnd ? fieldValidators : backEndFieldValidators
	      // )}
	    });
	  };
	
	  return ProjectForm;
	}(_react.PureComponent);
	
	ProjectForm.propTypes = propTypes;
	
	exports.default = ProjectForm;

/***/ }),

/***/ 917:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.query = exports.Project = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _reactRedux = __webpack_require__(21);
	
	var _reactHelmet = __webpack_require__(149);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _getWords = __webpack_require__(378);
	
	var _propTypes3 = __webpack_require__(122);
	
	var _ProjectForm = __webpack_require__(916);
	
	var _ProjectForm2 = _interopRequireDefault(_ProjectForm);
	
	var _SidePanel = __webpack_require__(918);
	
	var _SidePanel2 = _interopRequireDefault(_SidePanel);
	
	var _ToolPanel = __webpack_require__(377);
	
	var _ToolPanel2 = _interopRequireDefault(_ToolPanel);
	
	var _CompletionModal = __webpack_require__(196);
	
	var _CompletionModal2 = _interopRequireDefault(_CompletionModal);
	
	var _HelpModal = __webpack_require__(372);
	
	var _HelpModal2 = _interopRequireDefault(_HelpModal);
	
	var _redux = __webpack_require__(27);
	
	var _redux2 = __webpack_require__(19);
	
	var _challengeTypes = __webpack_require__(280);
	
	__webpack_require__(1227);
	
	var _Spacer = __webpack_require__(166);
	
	var _Spacer2 = _interopRequireDefault(_Spacer);
	
	var _utils = __webpack_require__(197);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global graphql */
	
	
	var mapStateToProps = function mapStateToProps() {
	  return {};
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return (0, _redux.bindActionCreators)({
	    updateChallengeMeta: _redux2.updateChallengeMeta,
	    createFiles: _redux2.createFiles,
	    updateProjectFormValues: _redux2.updateProjectFormValues,
	    updateSuccessMessage: _redux2.updateSuccessMessage,
	    openCompletionModal: function openCompletionModal() {
	      return (0, _redux2.openModal)('completion');
	    }
	  }, dispatch);
	};
	
	var propTypes = {
	  createFiles: _propTypes2.default.func.isRequired,
	  data: _propTypes2.default.shape({
	    challengeNode: _propTypes3.ChallengeNode
	  }),
	  openCompletionModal: _propTypes2.default.func.isRequired,
	  pathContext: _propTypes2.default.shape({
	    challengeMeta: _propTypes2.default.object
	  }),
	  updateChallengeMeta: _propTypes2.default.func.isRequired,
	  updateProjectFormValues: _propTypes2.default.func.isRequired,
	  updateSuccessMessage: _propTypes2.default.func.isRequired
	};
	
	var Project = exports.Project = function (_PureComponent) {
	  _inherits(Project, _PureComponent);
	
	  function Project() {
	    _classCallCheck(this, Project);
	
	    return _possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
	  }
	
	  Project.prototype.componentDidMount = function componentDidMount() {
	    var _props = this.props,
	        createFiles = _props.createFiles,
	        _props$data$challenge = _props.data.challengeNode,
	        title = _props$data$challenge.title,
	        challengeType = _props$data$challenge.challengeType,
	        challengeMeta = _props.pathContext.challengeMeta,
	        updateChallengeMeta = _props.updateChallengeMeta,
	        updateSuccessMessage = _props.updateSuccessMessage;
	
	    createFiles({});
	    updateSuccessMessage((0, _getWords.randomCompliment)());
	    return updateChallengeMeta(_extends({}, challengeMeta, { title: title, challengeType: challengeType }));
	  };
	
	  Project.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
	    var prevTitle = prevProps.data.challengeNode.title;
	    var _props2 = this.props,
	        createFiles = _props2.createFiles,
	        _props2$data$challeng = _props2.data.challengeNode,
	        currentTitle = _props2$data$challeng.title,
	        challengeType = _props2$data$challeng.challengeType,
	        challengeMeta = _props2.pathContext.challengeMeta,
	        updateChallengeMeta = _props2.updateChallengeMeta,
	        updateSuccessMessage = _props2.updateSuccessMessage;
	
	    updateSuccessMessage((0, _getWords.randomCompliment)());
	    if (prevTitle !== currentTitle) {
	      createFiles({});
	      updateChallengeMeta(_extends({}, challengeMeta, {
	        title: currentTitle,
	        challengeType: challengeType
	      }));
	    }
	  };
	
	  Project.prototype.render = function render() {
	    var _props3 = this.props,
	        _props3$data$challeng = _props3.data.challengeNode,
	        challengeType = _props3$data$challeng.challengeType,
	        _props3$data$challeng2 = _props3$data$challeng.fields,
	        blockName = _props3$data$challeng2.blockName,
	        slug = _props3$data$challeng2.slug,
	        title = _props3$data$challeng.title,
	        description = _props3$data$challeng.description,
	        guideUrl = _props3$data$challeng.guideUrl,
	        openCompletionModal = _props3.openCompletionModal,
	        updateProjectFormValues = _props3.updateProjectFormValues;
	
	    var isFrontEnd = challengeType === _challengeTypes.frontEndProject;
	
	    var blockNameTitle = blockName + ' - ' + title;
	    return _react2.default.createElement(
	      _react.Fragment,
	      null,
	      _react2.default.createElement(_reactHelmet2.default, { title: blockNameTitle + ' | Learn freeCodeCamp}' }),
	      _react2.default.createElement(
	        'div',
	        { className: 'project-show-wrapper' },
	        _react2.default.createElement(_SidePanel2.default, {
	          className: 'full-height',
	          description: description,
	          guideUrl: guideUrl,
	          title: blockNameTitle
	        }),
	        _react2.default.createElement(_ProjectForm2.default, {
	          isFrontEnd: isFrontEnd,
	          openModal: openCompletionModal,
	          updateProjectForm: updateProjectFormValues
	        }),
	        _react2.default.createElement(_ToolPanel2.default, { guideUrl: (0, _utils.createGuideUrl)(slug) }),
	        _react2.default.createElement(_Spacer2.default, null)
	      ),
	      _react2.default.createElement(_CompletionModal2.default, null),
	      _react2.default.createElement(_HelpModal2.default, null)
	    );
	  };
	
	  return Project;
	}(_react.PureComponent);
	
	Project.displayName = 'Project';
	Project.propTypes = propTypes;
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Project);
	var query = exports.query = '** extracted graphql fragment **';

/***/ }),

/***/ 918:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _ChallengeTitle = __webpack_require__(195);
	
	var _ChallengeTitle2 = _interopRequireDefault(_ChallengeTitle);
	
	var _Spacer = __webpack_require__(166);
	
	var _Spacer2 = _interopRequireDefault(_Spacer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var propTypes = {
	  description: _propTypes2.default.arrayOf(_propTypes2.default.string),
	  isCompleted: _propTypes2.default.bool,
	  isSignedIn: _propTypes2.default.bool,
	  title: _propTypes2.default.string
	};
	
	var SidePanel = function (_PureComponent) {
	  _inherits(SidePanel, _PureComponent);
	
	  function SidePanel() {
	    _classCallCheck(this, SidePanel);
	
	    return _possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
	  }
	
	  SidePanel.prototype.renderDescription = function renderDescription() {
	    var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    var description = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
	    return description.map(function (line, index) {
	      return _react2.default.createElement('li', {
	        className: 'step-text wrappable',
	        dangerouslySetInnerHTML: { __html: line },
	        key: title.slice(6) + index
	      });
	    });
	  };
	
	  SidePanel.prototype.render = function render() {
	    var _props = this.props,
	        title = _props.title,
	        description = _props.description,
	        isCompleted = _props.isCompleted;
	
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(_Spacer2.default, null),
	      _react2.default.createElement(
	        _ChallengeTitle2.default,
	        { isCompleted: isCompleted },
	        title
	      ),
	      _react2.default.createElement(
	        'ul',
	        null,
	        this.renderDescription(title, description)
	      )
	    );
	  };
	
	  return SidePanel;
	}(_react.PureComponent);
	
	exports.default = SidePanel;
	
	
	SidePanel.displayName = 'ProjectSidePanel';
	SidePanel.propTypes = propTypes;
	module.exports = exports['default'];

/***/ }),

/***/ 377:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.ToolPanel = undefined;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _redux = __webpack_require__(27);
	
	var _reactRedux = __webpack_require__(21);
	
	var _Button = __webpack_require__(37);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _redux2 = __webpack_require__(19);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var mapStateToProps = function mapStateToProps() {
	  return {};
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return (0, _redux.bindActionCreators)({
	    openHelpModal: function openHelpModal() {
	      return (0, _redux2.openModal)('help');
	    }
	  }, dispatch);
	};
	
	var propTypes = {
	  guideUrl: _propTypes2.default.string,
	  openHelpModal: _propTypes2.default.func.isRequired
	};
	
	var ToolPanel = exports.ToolPanel = function (_PureComponent) {
	  _inherits(ToolPanel, _PureComponent);
	
	  function ToolPanel() {
	    _classCallCheck(this, ToolPanel);
	
	    return _possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
	  }
	
	  ToolPanel.prototype.render = function render() {
	    var _props = this.props,
	        guideUrl = _props.guideUrl,
	        openHelpModal = _props.openHelpModal;
	
	    return _react2.default.createElement(
	      'div',
	      { className: 'tool-panel-group project-tool-panel' },
	      guideUrl && _react2.default.createElement(
	        _Button2.default,
	        {
	          block: true,
	          bsStyle: 'primary',
	          className: 'btn-primary-invert',
	          href: guideUrl,
	          target: '_blank'
	        },
	        'Get a hint'
	      ),
	      _react2.default.createElement(
	        _Button2.default,
	        {
	          block: true,
	          bsStyle: 'primary',
	          className: 'btn-primary-invert',
	          onClick: openHelpModal
	        },
	        'Ask for help'
	      )
	    );
	  };
	
	  return ToolPanel;
	}(_react.PureComponent);
	
	ToolPanel.displayName = 'ProjectToolPanel';
	ToolPanel.propTypes = propTypes;
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ToolPanel);
	
	/**
	 *
	 * <Fragment>
	        <ProjectForm isFrontEnd={isFrontEnd} openModal={openCompletionModal} />
	        <ButtonSpacer />
	        {guideUrl && (
	          <Fragment>
	            <Button
	              block={true}
	              bsStyle='primary'
	              className='btn-primary-ghost btn-big'
	              href={guideUrl}
	              target='_blank'
	              >
	              Get a hint
	            </Button>
	            <ButtonSpacer />
	          </Fragment>
	        )}
	        <Button
	          block={true}
	          bsStyle='primary'
	          className='btn-primary-ghost btn-big'
	          onClick={openHelpModal}
	          >
	          Ask for help on the forum
	        </Button>
	        <ButtonSpacer />
	      </Fragment>
	 */

/***/ }),

/***/ 1227:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 378:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.randomPhrase = randomPhrase;
	exports.randomVerb = randomVerb;
	exports.randomCompliment = randomCompliment;
	
	var _words = __webpack_require__(427);
	
	var _words2 = _interopRequireDefault(_words);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function randomItem(arr) {
	  return arr[Math.floor(Math.random() * arr.length)];
	}
	
	function randomPhrase() {
	  return randomItem(_words2.default.phrases);
	}
	
	function randomVerb() {
	  return randomItem(_words2.default.verbs);
	}
	
	function randomCompliment() {
	  return randomItem(_words2.default.compliments);
	}

/***/ }),

/***/ 197:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.createGuideUrl = createGuideUrl;
	var guideBase = 'https://guide.freecodecamp.org/certifications';
	
	function createGuideUrl() {
	  var slug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	  return guideBase + slug;
	}

/***/ }),

/***/ 427:
/***/ (function(module, exports) {

	module.exports = {"verbs":["aced","nailed","rocked","destroyed","owned","crushed","conquered","shredded","demolished","devoured","banished","wrangled"],"compliments":["Over the top!","Down the rabbit hole we go!","Bring that rain!","Target acquired!","Feel that need for speed!","You've got guts!","We have liftoff!","To infinity and beyond!","Encore!","Onward, ho!","Challenge destroyed!","It's on like Donkey Kong!","Power level? It's over 9000!","Coding spree!","Code long and prosper.","The crowd goes wild!","One for the guinness book!","Flawless victory!","Most efficient!","Party on, Wayne!","You've got the touch!","You're on fire!","Don't hurt 'em, Hammer!","The town is now red!","To the nines!","The world rejoices!","That's the way it's done!","You rock!","Woo-hoo!","We knew you could do it!","Hyper Combo Finish!","Nothing but net!","Boom-shakalaka!","You're a shooting star!","You're unstoppable!","Way cool!","You're king of the world!","Walk on that sunshine!","Keep on trucking!","Off the charts!","There is no spoon!","Cranked it up to 11!","Escape velocity reached!","You make this look easy!","Passed with flying colors!","You've got this!","Happy, happy, joy, joy!","Tomorrow, the world!","Your powers combined!","A winner is you!","It's alive. It's alive!","Sonic Boom!","Here's looking at you, Code!","Ride like the wind!","Legen - wait for it - dary!","Ludicrous Speed! Go!","Yes we can!","Most triumphant!","One loop to rule them all!","By the power of Grayskull!","You did it!","Storm that castle!","Face-melting guitar solo!","Checkmate!","Bodacious!","Tubular!","You're outta sight!","Keep calm and code on!","Even sad panda smiles!","Even grumpy cat approves!","Kool Aid Man says oh yeah!","Bullseye!","Far out!","You're heating up!","Hasta la vista, challenge!","Terminated.","Off the hook!","Thundercats, Hooo!","Shiver me timbers!","Raise the roof!","We've underestimated you.","I also live dangerously.","Get to the choppa!","Bingo!","And you're all out of gum.","Even honeybadger cares!","Helm, Warp Nine. Engage!","Gotta code 'em all!","Spool up the FTL drive!","Cool beans!","They're in another castle.","Power UP!","Nuclear launch detected.","Pikachu chooses you!","We're gonna pump you up!","I gotta have more cow bell."],"phrases":["Shout it from on top of a mountain","Tell everyone and their dogs","Show them. Show them all!","Inspire your friends","Tell the world of your greatness","Look accomplished on social media","Share news of your grand endeavor","Establish your alibi for the past two hours","Prove to mom that computers aren't just for games","With coding power comes sharing responsibility","Have you told your friends of your coding powers?"]}

/***/ }),

/***/ 123:
/***/ (function(module, exports) {

	'use strict';
	
	exports.dasherize = function dasherize(name) {
	  return ('' + name).toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9\-\.]/gi, '').replace(/\./g, '-').replace(/\:/g, '');
	};
	
	exports.nameify = function nameify(str) {
	  return ('' + str).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\:/g, '');
	};
	
	exports.unDasherize = function unDasherize(name) {
	  return ('' + name).
	  // replace dash with space
	  replace(/\-/g, ' ')
	  // strip nonalphanumarics chars except whitespace
	  .replace(/[^a-zA-Z\d\s]/g, '').trim();
	};
	
	exports.descriptionRegex = /\<blockquote|\<ol|\<h4|\<table/;

/***/ })

});
//# sourceMappingURL=component---src-templates-challenges-project-show-js-8544221ea71906ceef53.js.map