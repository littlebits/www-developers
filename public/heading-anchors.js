/*
 *  Heading Anchors v1.0.2
 *  Copyright (c) 2010-2012 Rafaël Blais Masson <http://twitter.com/rafBM>
 *
 *  Freely distributable under the terms of the MIT license.
 *  <http://github.com/rafBM/heading-anchors>
 *
 */

window.HeadingAnchors = {

  init: function(customSelector) {
    if (!document.querySelectorAll || ![].forEach)
      return

    var $ = function(selector) {
      return [].slice.call(document.querySelectorAll(selector), 0)
    }

    var slugize = function(str) {
      return str.replace(/['’]/g, '').replace(/[^a-z0-9]+/ig, '-')
    }

    var existingSlugsNumbers = {}
      , selector = customSelector ? customSelector : 'h2, h3, h4'

    $(selector).forEach(function(heading) {
      var anchor = document.createElement('a')
        , slug = slugize(heading.id ? heading.id : heading.textContent)

      anchor.className = 'heading-anchor'

      // if slug #Foo-bar already exists, create #Foo-bar-2, #Foo-bar-3 and so on
      if (slug in existingSlugsNumbers) {
        existingSlugsNumbers[slug] += 1
        slug += '-' + existingSlugsNumbers[slug]
      } else {
        existingSlugsNumbers[slug] = 1
      }

      anchor.href = '#' + slug
      heading.id = slug

      anchor.innerHTML = '¶'
      heading.appendChild(anchor)
    })

    var headingInHash = document.getElementById(location.hash.substr(1))
    if (headingInHash)
      window.scrollTo(0, headingInHash.offsetTop)
  }
}
