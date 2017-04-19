'use strict';

var esprima = require('esprima');

function vimSnippetJS(code) {
  code = code.replace(/<([^>]*)>/g, function(match, $1) {
    return '&lt;' + $1 + '&gt';
  });

  var tokens = esprima.tokenize(code, {
    comment: true,
    loc: true
  });

  var tokenElements = tokens.map(function(token) {
    if (token.type === 'BlockComment') {
      token.value = '/*' + token.value.replace(/\n /g, '<br>&nbsp;') + '*/';
    } else if (token.type === 'LineComment') {
      token.value = '//' + token.value;
    }
    return {
      start: token.loc.start,
      end: token.loc.end,
      html: '<span class="' + token.type + '">' + token.value + '</span>'
    };
  });

  var snippet = document.createElement('pre');
  snippet.className = 'vim-snippet-js';

  snippet.innerHTML = tokenElements.reduce(function(html, tokenElement, i) {
    var lineDiff = i ? tokenElement.start.line - tokenElements[i - 1].end.line
      : tokenElement.start.line;
    var columnDiff = i ? tokenElement.start.column - tokenElements[i - 1].end.column
      : tokenElement.start.column;
    return html + '<br>'.repeat(lineDiff < 0 ? tokenElement.start.line : lineDiff)
      + '<span>&nbsp;</span>'.repeat(columnDiff < 0 ? tokenElement.start.column : columnDiff)
      + tokenElement.html;
  }, '');

  return snippet;
}

module.exports = vimSnippetJS;
