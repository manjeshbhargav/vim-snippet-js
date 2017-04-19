# vim-snippet-js

Create an embeddable JavaScript code snippet with Vim styling

## Setup
```
npm install
```

## Build
```
# Output: dist/vim-snippet-js.js
npm run build
```

## Test Snippet
Open http://localhost:8080/test.html in the browser after this:
```
npm run serve
```

## Usage
```javascript
var code = 'var x = 42;';
var pre = vimSnippetJS(code);
document.body.appendChild(pre);
```
