var r = require('reactjs/react-bower:react-with-addons.js')
var e = r.DOM




var Banner = r.createClass({
  displayName: 'banner',
  render: function() {
    return e.
    div({ className: 'banner themeDark' },
      githubRibbon({ href: 'https://github.com/littlebits/www-developers' }),
      e.h1({className: 'fontHeading'}, 'littleBits Cloud Platform'))
  }
})

module.exports = r.createFactory(Banner)


var githubRibbon = r.createFactory(r.createClass({
  displayName: 'github-ribbon',
  render: function() {
    return e.
    div({ className: 'github-fork-ribbon-wrapper right'},
      e.div({ className: 'github-fork-ribbon' },
        e.a({ href: this.props.href }, 'Fork me on Github')
      )
    )
  }
}))
