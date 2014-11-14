var r = require('reactjs/react-bower:react-with-addons.js')
var App = require('./app')
var $ = document.querySelector.bind(document)


// Boot the application

bootstrap(App)



// Helpers

function bootstrap(app, selector = '#app-container'){
  document.addEventListener('DOMContentLoaded', function(){
    r.render(r.createElement(app), $(selector))
  })
}
