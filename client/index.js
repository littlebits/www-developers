var react = require('reactjs/react-bower:react-with-addons.js')
var E = react.DOM



var app = react.createClass({
  name: 'app',
  render: function(){
    return E.h1(null, 'Hello World!')
  }
})


document.addEventListener('DOMContentLoaded', function(){
  react.render(react.createElement(app), document.getElementById('app-container'))
})
